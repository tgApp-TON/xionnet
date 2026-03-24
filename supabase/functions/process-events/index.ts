// XionNET Event Processor — Supabase Edge Function
// Runs every minute via cron, processes new blockchain events
// Deploy: supabase functions deploy process-events

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { ethers } from "https://esm.sh/ethers@6";

const CONTRACT_ADDRESS = "0x14160fC843204507E224552D0141B34B975f0850";
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com"; // Change for mainnet

const ABI = [
  "event UserRegistered(address indexed user, address indexed referrer, uint32 timestamp)",
  "event LevelActivated(address indexed user, uint8 level, uint256 price, uint8 actType, uint32 timestamp)",
  "event SlotFilled(address indexed owner, address indexed source, uint8 level, uint8 slot, uint256 amount, uint8 srcType, uint32 timestamp)",
  "event PayoutSent(address indexed receiver, address indexed sender, uint8 level, uint8 slot, uint256 amount, uint32 timestamp)",
  "event FundsFrozen(address indexed user, uint8 level, uint256 amount, uint32 timestamp)",
  "event FundsUnfrozen(address indexed user, uint8 level, uint256 amount, bool autoActivated, uint32 timestamp)",
  "event FundsReturned(address indexed user, uint8 level, uint256 amount, uint32 timestamp)",
  "event SpilloverSent(address indexed from, address indexed to, uint8 level, uint256 amount, uint16 hops, uint32 timestamp)",
  "event LevelReactivated(address indexed user, uint8 level, uint32 cycleCount, uint32 timestamp)",
  "event CommissionTaken(address indexed user, uint8 level, uint256 amount, uint32 timestamp)",
  "event Bounced(address indexed user, uint8 level, uint8 reason, uint32 timestamp)",
  "event AutoBuyToggled(address indexed user, uint8 level, bool enabled)",
];

const w = (a: string) => a.toLowerCase();
const ts = (unix: number) => new Date(unix * 1000).toISOString();

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const currentBlock = await provider.getBlockNumber();

    // Get last processed block
    const { data: state } = await supabase.from("monitor_state").select("last_block").eq("id", 1).single();
    let lastBlock = state?.last_block || 0;

    if (lastBlock === 0) lastBlock = Math.max(0, currentBlock - 5000);
    if (lastBlock >= currentBlock) {
      return new Response(JSON.stringify({ status: "up_to_date", block: currentBlock }));
    }

    // Process max 2000 blocks per run
    const fromBlock = lastBlock + 1;
    const toBlock = Math.min(currentBlock, fromBlock + 2000);

    const logs = await provider.getLogs({ address: CONTRACT_ADDRESS, fromBlock, toBlock });

    let processed = 0;
    const seenTxLogs = new Set<string>();

    for (const log of logs) {
      const logKey = log.transactionHash + ":" + log.index;
      if (seenTxLogs.has(logKey)) continue;
      seenTxLogs.add(logKey);

      const parsed = contract.interface.parseLog({ topics: log.topics as string[], data: log.data });
      if (!parsed) continue;

      const txHash = log.transactionHash;
      const block = log.blockNumber;
      const args = parsed.args;

      switch (parsed.name) {
        case "UserRegistered": {
          const [user, referrer, timestamp] = [args[0], args[1], Number(args[2])];
          await supabase.from("users").upsert({
            wallet: w(user), referrer_wallet: w(referrer), registered_at: ts(timestamp),
            block_registered: block, tx_hash_registered: txHash,
          });
          const levels = [];
          for (let i = 1; i <= 17; i++) levels.push({ wallet: w(user), level_num: i });
          await supabase.from("user_levels").upsert(levels, { onConflict: "wallet,level_num" });
          await supabase.from("referrals").upsert(
            { referrer_wallet: w(referrer), referred_wallet: w(user), block_number: block, tx_hash: txHash },
            { onConflict: "referred_wallet" }
          );
          await incStat(supabase, "total_users", 1);
          break;
        }
        case "LevelActivated": {
          const [user, level, price, actType, timestamp] = [args[0], Number(args[1]), args[2], Number(args[3]), Number(args[4])];
          await supabase.from("user_levels").update({
            active: true, activation_type: actType, activated_at: ts(timestamp),
          }).eq("wallet", w(user)).eq("level_num", level);
          const { data } = await supabase.from("user_levels").select("level_num").eq("wallet", w(user)).eq("active", true);
          await supabase.from("users").update({
            active_levels: data?.length || 0, last_activity_at: ts(timestamp),
          }).eq("wallet", w(user));
          if (actType === 1) {
            const total = Number(price) + Number(price) / 10;
            const { data: usr } = await supabase.from("users").select("total_paid").eq("wallet", w(user)).single();
            await supabase.from("users").update({ total_paid: (usr?.total_paid || 0) + total }).eq("wallet", w(user));
            await incStat(supabase, "total_paid_usdc", total);
          }
          if (actType === 3) await incStat(supabase, "total_bonuses", 1);
          break;
        }
        case "SlotFilled": {
          const [owner, source, level, slot, amount, srcType] = [args[0], args[1], Number(args[2]), Number(args[3]), args[4], Number(args[5])];
          await supabase.from("user_levels").update({
            [`slot${slot}_wallet`]: w(source), slots_filled: slot,
          }).eq("wallet", w(owner)).eq("level_num", level);
          await supabase.from("slot_events").insert({
            owner_wallet: w(owner), source_wallet: w(source), level_num: level,
            slot_num: slot, amount: Number(amount), source_type: srcType,
            tx_hash: txHash, block_number: block,
          });
          break;
        }
        case "PayoutSent": {
          const [receiver, sender, level, slot, amount] = [args[0], args[1], Number(args[2]), Number(args[3]), args[4]];
          await supabase.from("payouts").insert({
            receiver_wallet: w(receiver), sender_wallet: w(sender), level_num: level,
            slot_num: slot, amount: Number(amount), tx_hash: txHash, block_number: block,
          });
          const { data: usr } = await supabase.from("users").select("total_received").eq("wallet", w(receiver)).single();
          if (usr) await supabase.from("users").update({ total_received: (usr.total_received || 0) + Number(amount) }).eq("wallet", w(receiver));
          await incStat(supabase, "total_payouts", Number(amount));
          break;
        }
        case "FundsFrozen": {
          const [user, level, amount] = [args[0], Number(args[1]), args[2]];
          await supabase.from("user_levels").update({ frozen_amount: Number(amount), is_frozen: true }).eq("wallet", w(user)).eq("level_num", level);
          await supabase.from("frozen_log").insert({
            wallet: w(user), level_num: level, frozen_amount: Number(amount),
            status: "frozen", tx_hash_freeze: txHash, block_freeze: block,
          });
          await incStat(supabase, "total_frozen", Number(amount));
          break;
        }
        case "FundsUnfrozen": {
          const [user, level, amount, autoActivated, timestamp] = [args[0], Number(args[1]), args[2], args[3], Number(args[4])];
          await supabase.from("user_levels").update({ frozen_amount: 0, is_frozen: false }).eq("wallet", w(user)).eq("level_num", level);
          await supabase.from("frozen_log").update({
            status: autoActivated ? "auto_used" : "to_sponsor",
            resolved_at: ts(timestamp), tx_hash_unfreeze: txHash, block_unfreeze: block,
          }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");
          await incStat(supabase, "total_frozen", -Number(amount));
          break;
        }
        case "FundsReturned": {
          const [user, level, amount, timestamp] = [args[0], Number(args[1]), args[2], Number(args[3])];
          await supabase.from("user_levels").update({ frozen_amount: 0, is_frozen: false }).eq("wallet", w(user)).eq("level_num", level);
          await supabase.from("frozen_log").update({
            status: "returned", resolved_at: ts(timestamp), tx_hash_unfreeze: txHash, block_unfreeze: block,
          }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");
          await incStat(supabase, "total_frozen", -Number(amount));
          break;
        }
        case "SpilloverSent": {
          const [from, to, level, amount, hops] = [args[0], args[1], Number(args[2]), args[3], Number(args[4])];
          await supabase.from("spillovers").insert({
            from_wallet: w(from), to_wallet: w(to), level_num: level,
            amount: Number(amount), hops, tx_hash: txHash, block_number: block,
          });
          await incStat(supabase, "total_spillovers", 1);
          break;
        }
        case "LevelReactivated": {
          const [user, level, cycleCount] = [args[0], Number(args[1]), Number(args[2])];
          await supabase.from("user_levels").update({
            slots_filled: 0, slot1_wallet: null, slot2_wallet: null,
            slot3_wallet: null, slot4_wallet: null, frozen_amount: 0,
            is_frozen: false, cycle_count: cycleCount,
          }).eq("wallet", w(user)).eq("level_num", level);
          await supabase.from("reactivations").insert({
            wallet: w(user), level_num: level, cycle_count: cycleCount,
            tx_hash: txHash, block_number: block,
          });
          await incStat(supabase, "total_reactivations", 1);
          break;
        }
        case "CommissionTaken": {
          const [user, level, amount] = [args[0], Number(args[1]), args[2]];
          await supabase.from("commissions").insert({
            from_wallet: w(user), level_num: level, amount: Number(amount),
            tx_hash: txHash, block_number: block,
          });
          await incStat(supabase, "total_fees", Number(amount));
          break;
        }
        case "Bounced": {
          const [user, level, reason] = [args[0], Number(args[1]), Number(args[2])];
          await supabase.from("bounced").insert({
            wallet: w(user), level_num: level, reason, tx_hash: txHash, block_number: block,
          });
          break;
        }
        case "AutoBuyToggled": {
          const [user, level, enabled] = [args[0], Number(args[1]), args[2]];
          await supabase.from("user_levels").update({ auto_buy_enabled: enabled }).eq("wallet", w(user)).eq("level_num", level);
          await supabase.from("autobuy_events").insert({
            wallet: w(user), level_num: level, enabled, tx_hash: txHash, block_number: block,
          });
          break;
        }
      }
      processed++;
    }

    // Update monitor state
    await supabase.from("monitor_state").update({
      last_block: toBlock, last_tx_hash: logs.length > 0 ? logs[logs.length - 1].transactionHash : null,
      updated_at: new Date().toISOString(),
    }).eq("id", 1);

    return new Response(JSON.stringify({
      status: "ok", from: fromBlock, to: toBlock, events: processed, remaining: currentBlock - toBlock,
    }));

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});

async function incStat(supabase: any, field: string, val: number) {
  const { data } = await supabase.from("system_stats").select(field).eq("id", 1).single();
  if (data) {
    await supabase.from("system_stats").update({
      [field]: (data as any)[field] + val, updated_at: new Date().toISOString(),
    }).eq("id", 1);
  }
}
