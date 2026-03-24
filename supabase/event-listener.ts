/**
 * XionNET Event Listener
 * Listens to on-chain events and indexes them into Supabase
 *
 * Run: npx ts-node supabase/event-listener.ts
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_KEY, RPC_WS_URL in .env
 */

import { ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const CONTRACT_ADDRESS = "0x14160fC843204507E224552D0141B34B975f0850";
const RPC_URL = process.env.RPC_WS_URL || "wss://ethereum-sepolia-rpc.publicnode.com";
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY!;

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

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function w(addr: string) { return addr.toLowerCase(); }
function ts(unix: number) { return new Date(unix * 1000).toISOString(); }

async function handleUserRegistered(user: string, referrer: string, timestamp: number, txHash: string, block: number) {
  console.log(`[UserRegistered] ${w(user)} → referrer: ${w(referrer)}`);

  // Insert user
  await supabase.from("users").upsert({
    wallet: w(user),
    referrer_wallet: w(referrer),
    registered_at: ts(timestamp),
    block_registered: block,
    tx_hash_registered: txHash,
  });

  // Insert 17 empty levels
  const levels = [];
  for (let i = 1; i <= 17; i++) {
    levels.push({ wallet: w(user), level_num: i, active: false });
  }
  await supabase.from("user_levels").upsert(levels);

  // Insert referral link
  await supabase.from("referrals").upsert({
    referrer_wallet: w(referrer),
    referred_wallet: w(user),
    block_number: block,
    tx_hash: txHash,
  }, { onConflict: "referred_wallet" });

  // Update stats
  await supabase.rpc("increment_stat", { field: "total_users", val: 1 });

  // Daily stats
  const date = new Date(timestamp * 1000).toISOString().split("T")[0];
  await supabase.from("daily_stats").upsert(
    { date, new_users: 1 },
    { onConflict: "date" }
  );
}

async function handleLevelActivated(user: string, level: number, price: bigint, actType: number, timestamp: number, txHash: string, block: number) {
  console.log(`[LevelActivated] ${w(user)} L${level} type=${actType} price=${price}`);

  await supabase.from("user_levels").update({
    active: true,
    activation_type: actType,
    activated_at: ts(timestamp),
  }).eq("wallet", w(user)).eq("level_num", level);

  // Increment active_levels count
  await supabase.rpc("increment_user_active_levels", { user_wallet: w(user) });

  if (actType === 1) {
    // Manual buy — update totalPaid
    const total = Number(price) + Number(price) / 10; // price + 10%
    await supabase.from("users").update({
      total_paid: supabase.rpc ? undefined : 0, // will use RPC
      last_activity_at: ts(timestamp),
    }).eq("wallet", w(user));
  }

  const date = new Date(timestamp * 1000).toISOString().split("T")[0];
  const field = actType === 2 ? "auto_activations" : actType === 3 ? "bonus_activations" : "levels_activated";
  await supabase.from("daily_stats").upsert(
    { date, [field]: 1 },
    { onConflict: "date" }
  );
}

async function handleSlotFilled(owner: string, source: string, level: number, slot: number, amount: bigint, srcType: number, timestamp: number, txHash: string, block: number) {
  console.log(`[SlotFilled] ${w(owner)} L${level} slot${slot} from ${w(source)} type=${srcType}`);

  // Update level slots
  const slotField = `slot${slot}_wallet`;
  await supabase.from("user_levels").update({
    [slotField]: w(source),
    slots_filled: slot,
  }).eq("wallet", w(owner)).eq("level_num", level);

  // Insert slot event
  await supabase.from("slot_events").insert({
    owner_wallet: w(owner),
    source_wallet: w(source),
    level_num: level,
    slot_num: slot,
    amount: Number(amount),
    source_type: srcType,
    tx_hash: txHash,
    block_number: block,
  });
}

async function handlePayoutSent(receiver: string, sender: string, level: number, slot: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`[PayoutSent] ${w(receiver)} +${Number(amount)/1e6} USDC L${level}`);

  await supabase.from("payouts").insert({
    receiver_wallet: w(receiver),
    sender_wallet: w(sender),
    level_num: level,
    slot_num: slot,
    amount: Number(amount),
    tx_hash: txHash,
    block_number: block,
  });

  // Update user totals
  const { data: user } = await supabase.from("users").select("total_received").eq("wallet", w(receiver)).single();
  if (user) {
    await supabase.from("users").update({
      total_received: (user.total_received || 0) + Number(amount),
      last_activity_at: ts(timestamp),
    }).eq("wallet", w(receiver));
  }

  await supabase.rpc("increment_stat", { field: "total_payouts", val: Number(amount) });
}

async function handleFundsFrozen(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`[FundsFrozen] ${w(user)} L${level} $${Number(amount)/1e6}`);

  await supabase.from("user_levels").update({
    frozen_amount: Number(amount),
    is_frozen: true,
  }).eq("wallet", w(user)).eq("level_num", level);

  await supabase.from("frozen_log").insert({
    wallet: w(user),
    level_num: level,
    frozen_amount: Number(amount),
    status: "frozen",
    tx_hash_freeze: txHash,
    block_freeze: block,
  });

  await supabase.rpc("increment_stat", { field: "total_frozen", val: Number(amount) });
}

async function handleFundsUnfrozen(user: string, level: number, amount: bigint, autoActivated: boolean, timestamp: number, txHash: string, block: number) {
  console.log(`[FundsUnfrozen] ${w(user)} L${level} auto=${autoActivated}`);

  await supabase.from("user_levels").update({
    frozen_amount: 0,
    is_frozen: false,
  }).eq("wallet", w(user)).eq("level_num", level);

  const status = autoActivated ? "auto_used" : "to_sponsor";
  await supabase.from("frozen_log").update({
    status,
    resolved_at: ts(timestamp),
    tx_hash_unfreeze: txHash,
    block_unfreeze: block,
  }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");

  await supabase.rpc("increment_stat", { field: "total_frozen", val: -Number(amount) });
}

async function handleFundsReturned(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`[FundsReturned] ${w(user)} L${level} +$${Number(amount)/1e6}`);

  await supabase.from("user_levels").update({
    frozen_amount: 0,
    is_frozen: false,
  }).eq("wallet", w(user)).eq("level_num", level);

  await supabase.from("frozen_log").update({
    status: "returned",
    resolved_at: ts(timestamp),
    tx_hash_unfreeze: txHash,
    block_unfreeze: block,
  }).eq("wallet", w(user)).eq("level_num", level).eq("status", "frozen");

  await supabase.rpc("increment_stat", { field: "total_frozen", val: -Number(amount) });
}

async function handleSpilloverSent(from: string, to: string, level: number, amount: bigint, hops: number, timestamp: number, txHash: string, block: number) {
  console.log(`[SpilloverSent] ${w(from)} → ${w(to)} L${level} hops=${hops}`);

  await supabase.from("spillovers").insert({
    from_wallet: w(from),
    to_wallet: w(to),
    level_num: level,
    amount: Number(amount),
    hops,
    tx_hash: txHash,
    block_number: block,
  });

  await supabase.rpc("increment_stat", { field: "total_spillovers", val: 1 });
}

async function handleLevelReactivated(user: string, level: number, cycleCount: number, timestamp: number, txHash: string, block: number) {
  console.log(`[LevelReactivated] ${w(user)} L${level} cycle=${cycleCount}`);

  await supabase.from("user_levels").update({
    slots_filled: 0,
    slot1_wallet: null,
    slot2_wallet: null,
    slot3_wallet: null,
    slot4_wallet: null,
    frozen_amount: 0,
    is_frozen: false,
    cycle_count: cycleCount,
  }).eq("wallet", w(user)).eq("level_num", level);

  await supabase.from("reactivations").insert({
    wallet: w(user),
    level_num: level,
    cycle_count: cycleCount,
    tx_hash: txHash,
    block_number: block,
  });

  await supabase.rpc("increment_stat", { field: "total_reactivations", val: 1 });
}

async function handleCommissionTaken(user: string, level: number, amount: bigint, timestamp: number, txHash: string, block: number) {
  console.log(`[CommissionTaken] ${w(user)} L${level} $${Number(amount)/1e6}`);

  await supabase.from("commissions").insert({
    from_wallet: w(user),
    level_num: level,
    amount: Number(amount),
    tx_hash: txHash,
    block_number: block,
  });

  await supabase.rpc("increment_stat", { field: "total_fees", val: Number(amount) });
}

async function handleBounced(user: string, level: number, reason: number, timestamp: number, txHash: string, block: number) {
  console.log(`[BOUNCED] ${w(user)} L${level} reason=${reason}`);

  await supabase.from("bounced").insert({
    wallet: w(user),
    level_num: level,
    reason,
    tx_hash: txHash,
    block_number: block,
  });
}

async function handleAutoBuyToggled(user: string, level: number, enabled: boolean, txHash: string, block: number) {
  console.log(`[AutoBuyToggled] ${w(user)} L${level} enabled=${enabled}`);

  await supabase.from("user_levels").update({
    auto_buy_enabled: enabled,
  }).eq("wallet", w(user)).eq("level_num", level);

  await supabase.from("autobuy_events").insert({
    wallet: w(user),
    level_num: level,
    enabled,
    tx_hash: txHash,
    block_number: block,
  });
}

// ==================== MAIN LISTENER ====================

async function main() {
  console.log("XionNET Event Listener starting...");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("RPC:", RPC_URL);

  const provider = new ethers.WebSocketProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // Get last processed block
  const { data: state } = await supabase.from("monitor_state").select("last_block").eq("id", 1).single();
  const startBlock = (state?.last_block || 0) + 1;
  console.log("Starting from block:", startBlock);

  // Catch up on missed events
  console.log("Catching up...");
  const currentBlock = await provider.getBlockNumber();
  if (startBlock < currentBlock) {
    const events = await contract.queryFilter("*", startBlock, currentBlock);
    console.log(`Processing ${events.length} missed events...`);
    for (const event of events) {
      await processEvent(event);
    }
  }

  // Live listening
  console.log("Listening for live events...");

  contract.on("UserRegistered", async (user, referrer, ts, event) => {
    await processEvent(event);
  });

  contract.on("LevelActivated", async (user, level, price, actType, ts, event) => {
    await processEvent(event);
  });

  contract.on("SlotFilled", async (owner, source, level, slot, amount, srcType, ts, event) => {
    await processEvent(event);
  });

  contract.on("PayoutSent", async (receiver, sender, level, slot, amount, ts, event) => {
    await processEvent(event);
  });

  contract.on("FundsFrozen", async (user, level, amount, ts, event) => {
    await processEvent(event);
  });

  contract.on("FundsUnfrozen", async (user, level, amount, auto, ts, event) => {
    await processEvent(event);
  });

  contract.on("FundsReturned", async (user, level, amount, ts, event) => {
    await processEvent(event);
  });

  contract.on("SpilloverSent", async (from, to, level, amount, hops, ts, event) => {
    await processEvent(event);
  });

  contract.on("LevelReactivated", async (user, level, cycle, ts, event) => {
    await processEvent(event);
  });

  contract.on("CommissionTaken", async (user, level, amount, ts, event) => {
    await processEvent(event);
  });

  contract.on("Bounced", async (user, level, reason, ts, event) => {
    await processEvent(event);
  });

  contract.on("AutoBuyToggled", async (user, level, enabled, event) => {
    await processEvent(event);
  });
}

async function processEvent(event: any) {
  const txHash = event.transactionHash;
  const block = event.blockNumber;
  const log = event;
  const name = log.fragment?.name || log.eventName;
  const args = log.args;

  try {
    switch (name) {
      case "UserRegistered":
        await handleUserRegistered(args[0], args[1], Number(args[2]), txHash, block);
        break;
      case "LevelActivated":
        await handleLevelActivated(args[0], Number(args[1]), args[2], Number(args[3]), Number(args[4]), txHash, block);
        break;
      case "SlotFilled":
        await handleSlotFilled(args[0], args[1], Number(args[2]), Number(args[3]), args[4], Number(args[5]), Number(args[6]), txHash, block);
        break;
      case "PayoutSent":
        await handlePayoutSent(args[0], args[1], Number(args[2]), Number(args[3]), args[4], Number(args[5]), txHash, block);
        break;
      case "FundsFrozen":
        await handleFundsFrozen(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block);
        break;
      case "FundsUnfrozen":
        await handleFundsUnfrozen(args[0], Number(args[1]), args[2], args[3], Number(args[4]), txHash, block);
        break;
      case "FundsReturned":
        await handleFundsReturned(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block);
        break;
      case "SpilloverSent":
        await handleSpilloverSent(args[0], args[1], Number(args[2]), args[3], Number(args[4]), Number(args[5]), txHash, block);
        break;
      case "LevelReactivated":
        await handleLevelReactivated(args[0], Number(args[1]), Number(args[2]), Number(args[3]), txHash, block);
        break;
      case "CommissionTaken":
        await handleCommissionTaken(args[0], Number(args[1]), args[2], Number(args[3]), txHash, block);
        break;
      case "Bounced":
        await handleBounced(args[0], Number(args[1]), Number(args[2]), Number(args[3]), txHash, block);
        break;
      case "AutoBuyToggled":
        await handleAutoBuyToggled(args[0], Number(args[1]), args[2], txHash, block);
        break;
    }

    // Update monitor state
    await supabase.from("monitor_state").update({
      last_block: block,
      last_tx_hash: txHash,
      updated_at: new Date().toISOString(),
    }).eq("id", 1);

  } catch (err) {
    console.error(`Error processing ${name}:`, err);
  }
}

main().catch(console.error);
