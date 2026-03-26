# XiaonNET — Session Report (March 26, 2026)

## Overview
Full production deployment of XiaonNET platform — from Sepolia testnet to Polygon mainnet with custom domain, Cloudflare protection, event indexing, and comprehensive frontend.

---

## 1. Bug Fixes — Level Display (Pips/Slots Disappearing)

### Problem
Level data (pips, wallet addresses in slots) appeared for 1-3 seconds then disappeared.

### Root Cause
Multiple issues compounded:
- `loadUserData()` was called from `selectLevel()` on every click, triggering async re-render
- `maybeRefresh()` on focus/visibility events triggered additional `loadUserData()` calls
- Second RPC call sometimes returned empty data, overwriting the grid
- **Critical:** `git push origin` went to `tgApp-TON/xionnet.git` but Vercel deployed from `drozarchuks-metamask/xionnet.git` — none of the fixes were ever deployed

### Fixes Applied
- Extracted `renderLevelDetail()` into separate function
- Removed `loadUserData()` from `selectLevel()` — data loaded once at connection
- Added DOM caching (`_lastHtml`) — skip re-render if data unchanged
- Removed `maybeRefresh()` entirely — no more focus/visibility triggers
- Added `_loadingUserData` mutex to prevent concurrent calls
- Protected against empty RPC responses — keep existing data if all calls fail
- **Fixed git push** — configured `origin` to push to both repos simultaneously

---

## 2. Smart Contract Deployment — Polygon Mainnet

### Contract
- Address: `0x8F14178823b89da0a4b027235968eF508689e8e2`
- Network: Polygon (chainId 137)
- USDC: `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` (native Polygon USDC)
- Verified on Polygonscan with full source code

### Configuration Changes
- Removed Mint USDC button (testnet only)
- Switched from Sepolia to Polygon: chain ID, RPC, native currency (POL)
- Updated `nativeCurrency` to POL with Polygonscan block explorer
- Contract address set in frontend

### Constructor Wallets
- Master: `0x07D7D2F65e01ec2B3ce97F58ED557830d46439BC` (all 17 levels)
- System: `0x48baFBeb829a6D5ea42f5BC80433bCC72E076021` (fee recipient)
- Wallet M: `0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF` (init participant)
- Wallet A: `0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65` (init participant)

---

## 3. Domain & Infrastructure

### Domain Setup
- Purchased `xiaonnet.com` on Cloudflare
- DNS: CNAME → `cname.vercel-dns.com` (proxied)
- SSL/TLS: Full (strict)
- Bot Fight Mode: ON
- AI crawlers: Blocked
- 11 basic security features: Enabled

### Vercel Configuration
- `vercel.json` with cache headers (HTML no-cache, static cached)
- `robots.txt` for SEO
- `favicon.svg` — XN gradient logo
- OG meta tags for link previews in messengers

### Git Deploy
- `origin` configured with two push URLs:
  - `tgApp-TON/xionnet.git` (GitHub)
  - `drozarchuks-metamask/xionnet.git` (Vercel deploy)
- Single `git push` deploys everywhere

---

## 4. Event Indexing (Supabase + Cloudflare Worker)

### Architecture
```
Polygon Contract → Events
    ↓ (every 60 seconds)
Cloudflare Worker (cron) → Supabase Edge Function → Supabase DB
    ↓
Frontend reads from Supabase
```

### Cloudflare Worker
- URL: `xiaonnet-cron.dr-ozarchuks.workers.dev`
- Cron: `* * * * *` (every minute)
- ~1,440 requests/day out of 100k free limit
- SUPABASE_SERVICE_KEY stored as encrypted secret

### Edge Function Fixes
- Removed lock mechanism (`try_lock_monitor`) — was causing deadlocks
- Reduced block range from 2000 to 500 per run (public RPC timeout)
- Made idempotent: check-before-insert for payouts/slots
- Added unique constraints on all event tables

### Database Schema Fixes
- Created missing SQL functions (`try_lock_monitor`, `unlock_monitor`)
- Added `processing` and `processing_started_at` columns to `monitor_state`
- Added unique constraints: payouts, slot_events, commissions, spillovers, bounced, autobuy_events, reactivations
- Manually inserted master + init wallets with 17 active levels
- Fixed doubled system_stats from dual event processing

---

## 5. Branding — XionNET → XiaonNET

- Renamed all references in HTML (title, logo, FAQ)
- Renamed in lang.js (all 26 languages, 97+ occurrences)
- Logo shimmer animation: gradient purple → green → white (4s cycle)
- Both connect screen and header logo animated
- Referral URLs updated to `https://xiaonnet.com`

---

## 6. Contract Tests — 306 Total

### New Test File: `XionNET.hardcore.test.ts` (39 tests)
- **50: Registration edge cases** — zero ref, fake ref, self-ref, double reg, no USDC needed
- **51: Level purchase** — skip levels, double buy, exact amounts ($3.29 vs $3.30)
- **52: Reentrancy** — nonReentrant guard, direct ETH → reverts
- **53: Integer precision** — fee calculation, all 17 levels, no wei loss
- **54: Race conditions** — 10 simultaneous registers, concurrent buys
- **55: Deep referral chain** — 10-15 depth, spillover gas (205k — safe)
- **56: Balance conservation** — 17 levels bought, 15 users L1
- **57: Master account** — all levels, spillover reception
- **58: Flashloan resistance** — state permanence
- **59: Admin security** — pause, withdraw, wallet changes
- **60: AutoBuy cascade** — freeze → auto-open L2
- **61: emergencyUnfreeze** — owner can/non-owner can't, funds returned
- **62: Multi-level autoBuy cascade** — L1→L2, L2 freeze
- **63: Extreme cycles** — 14 users, 3 full cycles

### Contract Enhancement
- Added `SpilloverMaxHops` event — emitted when spillover reaches MAX_HOPS=200

---

## 7. Landing Page (No-Wallet Visitors)

### Sections
1. **Hero** — "Decentralized Earning System" + 3 stat cards (17 Levels, USDC, $3 Entry)
2. **Language flags** — 26 flags in 2 rows, click to change language
3. **Navigation pills** — Get started, How it works, Mechanics, Why, Levels, FAQ, Contract
4. **Getting Started** — 5-step guide:
   - Install MetaMask (download link)
   - Open xiaonnet.com in MetaMask browser (copy button)
   - Add Polygon + POL for gas (with "What is gas?" explainer)
   - Get USDC on Polygon (exchange → withdraw → Polygon)
   - Connect & Activate Level 1
5. **How It Works** — 4 steps: activate, receive, auto-cycle, grow
6. **How Payouts Work** — 4 slot descriptions + 4 SVG diagrams:
   - Scenario A: All payouts (auto-buy OFF)
   - Scenario B: Auto-buy (next level opens free)
   - Scenario C: Spillover (sponsor doesn't have level)
   - Scenario D: Missed payout (you don't have the level)
7. **Why XiaonNET** — 4 cards with SVG icons (on-chain, USDC, instant, verified)
8. **Level Structure** — price/earnings table L1-L17
9. **FAQ** — 7 questions addressing pyramid concerns
10. **Token Addresses** — USDC, POL, Contract with copy buttons + Polygonscan links

### Scroll Fix
- `<html>` had `overflow:hidden; position:fixed` blocking all scroll
- Removed — now `body` scrolls normally, `#mainApp` uses `position:fixed` only when app is active

---

## 8. App FAQ Updates

### New Section: "Trust & Security"
- Is this a pyramid scheme?
- Where does the money come from?
- Can the admin steal funds?
- What is spillover?
- What is auto-buy?

### New Section: "Smart Contract"
- Where to verify the contract (shimmer link to Polygonscan)
- How to check token addresses in MetaMask (USDC, POL, Contract with copy buttons)

---

## 9. Admin Analytics Dashboard

Visible only to master + owner wallets on Stats tab:
- **Key Metrics**: Total Users, Volume, Protocol Fees, Frozen, Spillovers, Reactivations
- **Level Activity**: bar chart per level (L1-L17)
- **Recent Users**: last 20 with wallet, date, level, earnings
- **Top Earners**: top 10 with medals
- **Contract Balance**: USDC in contract + withdrawable fees
- **Referral earnings**: "earned you" + "their total" per referral

---

## 10. Telegram App Updates

### Dashboard
- Added Network preview card (direct/active/pending referral counts + top 3 referrals)

### Level Detail Panel
- Activation cost with 10% fee
- Sponsor receives amount
- Protocol fee breakdown
- Slot descriptions matching web version
- Auto-unlock info, last level indicator

---

## 11. WalletConnect Fix

- Upgraded SDK from 2.11.2 → 2.17.0 (MetaMask SES compatibility)
- Dynamic loading to catch SES errors
- Added `process` polyfill with `env`, `stderr`, `stdout`
- `Buffer` polyfill stub

---

## 12. Translation Coverage

- 318 translation keys total
- 26 languages supported
- en/ru/ua/es: 100% coverage
- pt/fr/de/pl/vi/ko/ja/hi/zh/tr: 92% (filling remaining)
- ar/th/id/tl/ms/it/nl/ro/cs/fa/bn/sw: 64% (filling remaining)

---

## Files Modified
- `index.html` — main web app (~40 edits)
- `lang.js` — translations (318 keys × 26 languages)
- `contracts/XionNET.sol` — SpilloverMaxHops event
- `test/XionNET.hardcore.test.ts` — 39 new tests
- `supabase/event-listener.ts` — Polygon RPC
- `supabase/functions/process-events/index.ts` — idempotent, no-lock, 500 blocks
- `cloudflare-worker/index.js` + `wrangler.toml` — cron trigger
- `scripts/deploy.ts` — Polygon mainnet deploy
- `scripts/verify-args.js` — Polygonscan verification
- `hardhat.config.ts` — etherscan API key
- `vercel.json` — cache headers
- `robots.txt` — SEO
- `favicon.svg` — site icon
- `telegram-app/src/components/Dashboard.tsx` — Network card
- `telegram-app/src/components/Levels.tsx` — financial details
- `telegram-app/src/App.tsx` — referrals prop
