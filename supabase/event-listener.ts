/**
 * XionNET Event Listener — HTTP Polling Version
 * Polls blockchain for events and indexes into Supabase
 * Run: npx ts-node supabase/event-listener.ts
 */

import { ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const CONTRACT_ADDRESS = "0x14160fC843204507E224552D0141B34B975f0850";
const RPC_URL = process.env.RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";
const POLL_INTERVAL = 5000; // 5 seconds

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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
  "event SystemWalletChanged(address indexed oldWallet, address indexed newWallet)",
  "event MasterWalletChanged(address indexed oldWallet, address indexed newWallet)",
];

const w = (a: string) => a.toLowerCase();
const ts = (unix: number) => new Date(unix * 1000).toISOString();
const today = (unix: number) => new Date(unix * 1000).toISOString().split("T")[0];

// ==================== EVENT HANDLERS ====================

async function handleUserRegistered(user: string, referrer: string, timestamp: number, txHash: string, block: number) {
  console.log(`  [UserRegistered] ${w(user)} → ${w(referrer)}`);
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
  await incrementStat("total_users", 1);
}

async function handleLevelActivated(user: string, level: number, price: bigint, actType: number, timestamp: number, txHash: string, block: number) {
  console.log(`  [LevelActivated] ${w(user)} L${level} type=${actType}`);
  await supabase.from("user_levels").update({
    active: true, activation_type: actType, activated_at: ts(timestamp),
  }).eq("wallet", w(user)).eq("level_num", level);

  // Recalculate active levels
  const { data } = await supabase.from("user_levels").select("level_num").eq("wallet", w(user)).eq("active", true);
  await supabase.from("users").update({
    active_levels: data?.length || 0, last_activity_at: ts(timestamp),
  }).eq("wallet", w(user));

  if (actType === 1) {
    const total = Number(price) + Number(price) / 10;
    const { data: usr } = await supabase.from("users").select("total_paid").eq("wallet", w(user)).single();
    await supabase.from("users").update({
      total_paid: (usr?.total_paid || 0) + total,
    }).eq("wallet", w(user));
    await incrementStat("total_paid_usdc", total);
  }
  if (actType === 3) await incrementStat("total_bonuses", 1);
}

async function handleSlotFilled(owner: string, source: string, level: number, slot: number, amount: bigint, srcType: number, timestamp: number, txHash: string, block: number) {
  console.log(`  [SlotFilled] ${w(owner)} L${level} slot${slot}`);
  const slotField = `slot${slot}_wallet`;
  await supabase.from("user_levels").update({
    [slotField]: w(source), slots_filled: slot,
  }).eq("wallet", w(owner)).eq("level_num", level);
  await supabase.from("slot_events").insert({
    owner_wallet: w(owner), source_wallet: w(source), level_num: level,
    slot_num: slot, amount: Number(amount), source_type: srcType,
    tx_hash: txHash, block_number: block,
  });
}

async function handlePayoutSent(receiver: string, sender: string, level: number, slot: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`  [PayoutSent] ${w(receiver)} +$${Number(amount)/1e6} L${level}`);
  await supabase.from("payouts").insert({
    receiver_wallet: w(receiver), sender_wallet: w(sender), level_num: level,
    slot_num: slot, amount: Number(amount), tx_hash: txHash, block_number: block,
  });
  const { data: usr } = await supabase.from("users").select("total_received").eq("wallet", w(receiver)).single();
  await supabase.from("users").update({
    total_received: (usr?.total_received || 0) + Number(amount),
    last_activity_at: ts(timestamp),
  }).eq("wallet", w(receiver));
  await incrementStat("total_payouts", Number(amount));
}

async function handleFundsFrozen(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`  [FundsFrozen] ${w(user)} L${level} $${Number(amount)/1e6}`);
  await supabase.from("user_levels").update({ frozen_amount: Number(amount), is_frozen: true })
    .eq("wallet", w(user)).eq("level_num", level);
  await supabase.from("frozen_log").insert({
    wallet: w(user), level_num: level, frozen_amount: Number(amount),
    status: "frozen", tx_hash_freeze: txHash, block_freeze: block,
  });
  await incrementStat("total_frozen", Number(amount));
}

async function handleFundsUnfrozen(user: string, level: number, amount: bigint, autoActivated: boolean, timestamp: number, txHash: string, block: number) {
  console.log(`  [FundsUnfrozen] ${w(user)} L${level} auto=${autoActivated}`);
  await supabase.from("user_levels").update({ frozen_amount: 0, is_frozen: false })
    .eq("wallet", w(user)).eq("level_num", level);
  const status = autoActivated ? "auto_used" : "to_sponsor";
  await supabase.from("frozen_log").update({
    status, resolved_at: ts(timestamp), tx_hash_unfreeze: txHash, block_unfreeze: block,
  }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");
  await incrementStat("total_frozen", -Number(amount));
}

async function handleFundsReturned(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`  [FundsReturned] ${w(user)} L${level}`);
  await supabase.from("user_levels").update({ frozen_amount: 0, is_frozen: false })
    .eq("wallet", w(user)).eq("level_num", level);
  await supabase.from("frozen_log").update({
    status: "returned", resolved_at: ts(timestamp), tx_hash_unfreeze: txHash, block_unfreeze: block,
  }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");
  await incrementStat("total_frozen", -Number(amount));
}

async function handleSpilloverSent(from: string, to: string, level: number, amount: bigint, hops: number, timestamp: number, txHash: string, block: number) {
  console.log(`  [SpilloverSent] ${w(from)} → ${w(to)} L${level} hops=${hops}`);
  await supabase.from("spillovers").insert({
    from_wallet: w(from), to_wallet: w(to), level_num: level,
    amount: Number(amount), hops, tx_hash: txHash, block_number: block,
  });
  await incrementStat("total_spillovers", 1);
}

async function handleLevelReactivated(user: string, level: number, cycleCount: number, timestamp: number, txHash: string, block: number) {
  console.log(`  [LevelReactivated] ${w(user)} L${level} cycle=${cycleCount}`);
  await supabase.from("user_levels").update({
    slots_filled: 0, slot1_wallet: null, slot2_wallet: null,
    slot3_wallet: null, slot4_wallet: null, frozen_amount: 0,
    is_frozen: false, cycle_count: cycleCount,
  }).eq("wallet", w(user)).eq("level_num", level);
  await supabase.from("reactivations").insert({
    wallet: w(user), level_num: level, cycle_count: cycleCount,
    tx_hash: txHash, block_number: block,
  });
  await incrementStat("total_reactivations", 1);
}

async function handleCommissionTaken(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`  [CommissionTaken] ${w(user)} L${level} $${Number(amount)/1e6}`);
  await supabase.from("commissions").insert({
    from_wallet: w(user), level_num: level, amount: Number(amount),
    tx_hash: txHash, block_number: block,
  });
  await incrementStat("total_fees", Number(amount));
}

async function handleBounced(user: string, level: number, reason: number, timestamp: number, txHash: string, block: number) {
  console.log(`  [BOUNCED!] ${w(user)} L${level} reason=${reason}`);
  await supabase.from("bounced").insert({
    wallet: w(user), level_num: level, reason,
    tx_hash: txHash, block_number: block,
  });
}

async function handleAutoBuyToggled(user: string, level: number, enabled: boolean, txHash: string, block: number) {
  console.log(`  [AutoBuyToggled] ${w(user)} L${level} ${enabled}`);
  await supabase.from("user_levels").update({ auto_buy_enabled: enabled })
    .eq("wallet", w(user)).eq("level_num", level);
  await supabase.from("autobuy_events").insert({
    wallet: w(user), level_num: level, enabled, tx_hash: txHash, block_number: block,
  });
}

// ==================== HELPERS ====================

async function incrementStat(field: string, val: number) {
  const { data } = await supabase.from("system_stats").select(field).eq("id", 1).single();
  if (data) {
    await supabase.from("system_stats").update({
      [field]: (data as any)[field] + val,
      updated_at: new Date().toISOString(),
    }).eq("id", 1);
  }
}

async function updateMonitor(block: number, txHash: string) {
  await supabase.from("monitor_state").update({
    last_block: block, last_tx_hash: txHash, updated_at: new Date().toISOString(),
  }).eq("id", 1);
}

// ==================== EVENT PROCESSOR ====================

const processedLogs = new Set<string>();

async function processLog(contract: ethers.Contract, log: ethers.Log) {
  // Deduplicate: tx_hash + logIndex is unique per event
  const logKey = log.transactionHash + ':' + log.index;
  if (processedLogs.has(logKey)) return;
  processedLogs.add(logKey);
  // Keep set from growing forever
  if (processedLogs.size > 10000) {
    const arr = Array.from(processedLogs);
    arr.splice(0, 5000);
    processedLogs.clear();
    arr.forEach(k => processedLogs.add(k));
  }

  const parsed = contract.interface.parseLog({ topics: log.topics as string[], data: log.data });
  if (!parsed) return;

  const txHash = log.transactionHash;
  const block = log.blockNumber;
  const args = parsed.args;

  switch (parsed.name) {
    case "UserRegistered":
      await handleUserRegistered(args[0], args[1], Number(args[2]), txHash, block); break;
    case "LevelActivated":
      await handleLevelActivated(args[0], Number(args[1]), args[2], Number(args[3]), Number(args[4]), txHash, block); break;
    case "SlotFilled":
      await handleSlotFilled(args[0], args[1], Number(args[2]), Number(args[3]), args[4], Number(args[5]), Number(args[6]), txHash, block); break;
    case "PayoutSent":
      await handlePayoutSent(args[0], args[1], Number(args[2]), Number(args[3]), args[4], Number(args[5]), txHash, block); break;
    case "FundsFrozen":
      await handleFundsFrozen(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block); break;
    case "FundsUnfrozen":
      await handleFundsUnfrozen(args[0], Number(args[1]), args[2], args[3], Number(args[4]), txHash, block); break;
    case "FundsReturned":
      await handleFundsReturned(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block); break;
    case "SpilloverSent":
      await handleSpilloverSent(args[0], args[1], Number(args[2]), args[3], Number(args[4]), Number(args[5]), txHash, block); break;
    case "LevelReactivated":
      await handleLevelReactivated(args[0], Number(args[1]), Number(args[2]), Number(args[3]), txHash, block); break;
    case "CommissionTaken":
      await handleCommissionTaken(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block); break;
    case "Bounced":
      await handleBounced(args[0], Number(args[1]), Number(args[2]), Number(args[3]), txHash, block); break;
    case "AutoBuyToggled":
      await handleAutoBuyToggled(args[0], Number(args[1]), args[2], txHash, block); break;
  }

  await updateMonitor(block, txHash);
}

// ==================== MAIN POLLING LOOP ====================

async function main() {
  console.log("=== XionNET Event Listener ===");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("RPC:", RPC_URL);
  console.log("Supabase:", process.env.SUPABASE_URL);
  console.log("Poll interval:", POLL_INTERVAL + "ms");

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // Get last processed block
  const { data: state } = await supabase.from("monitor_state").select("last_block").eq("id", 1).single();
  let lastBlock = state?.last_block || 0;

  // If first run, start from contract deploy block
  if (lastBlock === 0) {
    // Find deploy block (approximate — use current - 1000)
    const current = await provider.getBlockNumber();
    lastBlock = Math.max(0, current - 10000);
    console.log("First run, starting from block:", lastBlock);
  }

  console.log("Last processed block:", lastBlock);
  console.log("Listening...\n");

  // Polling loop
  while (true) {
    try {
      const currentBlock = await provider.getBlockNumber();
      if (currentBlock > lastBlock) {
        const fromBlock = lastBlock + 1;
        const toBlock = Math.min(currentBlock, fromBlock + 2000); // max 2000 blocks per query

        const logs = await provider.getLogs({
          address: CONTRACT_ADDRESS,
          fromBlock,
          toBlock,
        });

        if (logs.length > 0) {
          console.log(`Block ${fromBlock}-${toBlock}: ${logs.length} events`);
          for (const log of logs) {
            try {
              await processLog(contract, log);
            } catch (e: any) {
              console.error("  Error processing log:", e.message);
            }
          }
        }

        lastBlock = toBlock;
      }
    } catch (e: any) {
      console.error("Poll error:", e.message);
    }

    await new Promise(r => setTimeout(r, POLL_INTERVAL));
  }
}

main().catch(console.error);
