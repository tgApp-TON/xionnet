-- ============================================
-- XionNET — Supabase Schema
-- All tables for indexing blockchain events
-- ============================================

-- 1. USERS — участники системы
CREATE TABLE users (
  wallet          TEXT PRIMARY KEY,          -- ethereum address, lowercase
  referrer_wallet TEXT,                       -- FK → users.wallet, NULL for master
  is_master       BOOLEAN DEFAULT false,
  registered_at   TIMESTAMPTZ DEFAULT NOW(),
  total_received  BIGINT DEFAULT 0,          -- USDC wei (6 decimals)
  total_paid      BIGINT DEFAULT 0,          -- USDC wei
  active_levels   INT2 DEFAULT 0,            -- denormalized count
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  block_registered BIGINT,                   -- block number of registration
  tx_hash_registered TEXT                    -- tx hash
);

-- 2. USER_LEVELS — состояние каждого уровня у каждого юзера
CREATE TABLE user_levels (
  wallet          TEXT NOT NULL REFERENCES users(wallet),
  level_num       INT2 NOT NULL CHECK (level_num BETWEEN 1 AND 17),
  active          BOOLEAN DEFAULT false,
  slots_filled    INT2 DEFAULT 0 CHECK (slots_filled BETWEEN 0 AND 4),
  slot1_wallet    TEXT,
  slot2_wallet    TEXT,
  slot3_wallet    TEXT,
  slot4_wallet    TEXT,
  frozen_amount   BIGINT DEFAULT 0,          -- USDC wei
  is_frozen       BOOLEAN DEFAULT false,
  cycle_count     INT4 DEFAULT 0,
  activation_type INT2,                       -- 1=manual, 2=auto, 3=bonus
  activated_at    TIMESTAMPTZ,
  auto_buy_enabled BOOLEAN DEFAULT false,
  PRIMARY KEY (wallet, level_num)
);

-- 3. REFERRALS — денормализованные связи для быстрых запросов дерева
CREATE TABLE referrals (
  id              BIGSERIAL PRIMARY KEY,
  referrer_wallet TEXT NOT NULL,              -- спонсор
  referred_wallet TEXT NOT NULL UNIQUE,       -- реферал
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  block_number    BIGINT,
  tx_hash         TEXT
);

-- 4. PAYOUTS — история выплат
CREATE TABLE payouts (
  id              BIGSERIAL PRIMARY KEY,
  receiver_wallet TEXT NOT NULL,
  sender_wallet   TEXT NOT NULL,              -- кто заполнил слот
  level_num       INT2 NOT NULL,
  slot_num        INT2 NOT NULL,
  amount          BIGINT NOT NULL,            -- USDC wei (чистая выплата)
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SLOT_EVENTS — история заполнения слотов
CREATE TABLE slot_events (
  id              BIGSERIAL PRIMARY KEY,
  owner_wallet    TEXT NOT NULL,              -- чей слот заполнился
  source_wallet   TEXT NOT NULL,              -- кто зашёл
  level_num       INT2 NOT NULL,
  slot_num        INT2 NOT NULL,
  amount          BIGINT NOT NULL,
  source_type     INT2 NOT NULL,              -- 1=direct, 2=spillover, 3=unfreeze_3b
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FROZEN_LOG — история заморозок
CREATE TABLE frozen_log (
  id              BIGSERIAL PRIMARY KEY,
  wallet          TEXT NOT NULL,
  level_num       INT2 NOT NULL,
  frozen_amount   BIGINT NOT NULL,
  status          TEXT DEFAULT 'frozen',      -- frozen → auto_used | to_sponsor | returned
  frozen_at       TIMESTAMPTZ DEFAULT NOW(),
  resolved_at     TIMESTAMPTZ,
  tx_hash_freeze  TEXT NOT NULL,
  tx_hash_unfreeze TEXT,
  block_freeze    BIGINT,
  block_unfreeze  BIGINT
);

-- 7. SPILLOVERS — история spillover
CREATE TABLE spillovers (
  id              BIGSERIAL PRIMARY KEY,
  from_wallet     TEXT NOT NULL,
  to_wallet       TEXT NOT NULL,
  level_num       INT2 NOT NULL,
  amount          BIGINT NOT NULL,
  hops            INT2 NOT NULL,
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REACTIVATIONS — история реактиваций
CREATE TABLE reactivations (
  id              BIGSERIAL PRIMARY KEY,
  wallet          TEXT NOT NULL,
  level_num       INT2 NOT NULL,
  cycle_count     INT4 NOT NULL,
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COMMISSIONS — история комиссий (10% при покупке)
CREATE TABLE commissions (
  id              BIGSERIAL PRIMARY KEY,
  from_wallet     TEXT NOT NULL,              -- кто заплатил
  level_num       INT2 NOT NULL,
  amount          BIGINT NOT NULL,            -- USDC wei
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BOUNCED — ошибки spillover (MAX_HOPS и т.д.)
CREATE TABLE bounced (
  id              BIGSERIAL PRIMARY KEY,
  wallet          TEXT NOT NULL,
  level_num       INT2 NOT NULL,
  reason          INT2 NOT NULL,              -- 2=MAX_HOPS
  resolved        BOOLEAN DEFAULT false,
  tx_hash         TEXT NOT NULL,
  block_number    BIGINT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SYSTEM_STATS — глобальная статистика (одна строка)
CREATE TABLE system_stats (
  id                    INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_users           INT4 DEFAULT 0,
  total_paid_usdc       BIGINT DEFAULT 0,
  total_payouts         BIGINT DEFAULT 0,
  total_fees            BIGINT DEFAULT 0,
  total_frozen          BIGINT DEFAULT 0,
  total_spillovers      INT4 DEFAULT 0,
  total_reactivations   INT4 DEFAULT 0,
  total_bonuses         INT4 DEFAULT 0,
  last_block            BIGINT DEFAULT 0,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Initial row
INSERT INTO system_stats (id) VALUES (1);

-- 12. DAILY_STATS — ежедневная агрегация для графиков
CREATE TABLE daily_stats (
  date                DATE PRIMARY KEY,
  new_users           INT4 DEFAULT 0,
  levels_activated    INT4 DEFAULT 0,
  auto_activations    INT4 DEFAULT 0,
  bonus_activations   INT4 DEFAULT 0,
  total_volume        BIGINT DEFAULT 0,       -- USDC wei
  total_payouts       BIGINT DEFAULT 0,
  total_fees          BIGINT DEFAULT 0,
  spillover_count     INT4 DEFAULT 0,
  reactivation_count  INT4 DEFAULT 0
);

-- 13. MONITOR_STATE — состояние event listener
CREATE TABLE monitor_state (
  id              INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  last_block      BIGINT DEFAULT 0,
  last_tx_hash    TEXT,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO monitor_state (id) VALUES (1);

-- 14. AUTOBUY_EVENTS — история изменений autoBuy
CREATE TABLE autobuy_events (
  id              BIGSERIAL PRIMARY KEY,
  wallet          TEXT NOT NULL,
  level_num       INT2 NOT NULL,
  enabled         BOOLEAN NOT NULL,
  tx_hash         TEXT,
  block_number    BIGINT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- users
CREATE INDEX idx_users_referrer ON users(referrer_wallet);
CREATE INDEX idx_users_active ON users(active_levels) WHERE active_levels > 0;
CREATE INDEX idx_users_master ON users(is_master) WHERE is_master = true;

-- user_levels
CREATE INDEX idx_ul_wallet ON user_levels(wallet);
CREATE INDEX idx_ul_frozen ON user_levels(is_frozen) WHERE is_frozen = true;
CREATE INDEX idx_ul_active ON user_levels(active) WHERE active = true;

-- payouts
CREATE INDEX idx_payouts_receiver ON payouts(receiver_wallet, created_at DESC);
CREATE INDEX idx_payouts_sender ON payouts(sender_wallet, created_at DESC);
CREATE INDEX idx_payouts_level ON payouts(receiver_wallet, level_num);
CREATE INDEX idx_payouts_block ON payouts(block_number);

-- slot_events
CREATE INDEX idx_slots_owner ON slot_events(owner_wallet, created_at DESC);
CREATE INDEX idx_slots_source ON slot_events(source_wallet);
CREATE INDEX idx_slots_block ON slot_events(block_number);

-- frozen_log
CREATE INDEX idx_frozen_wallet ON frozen_log(wallet, frozen_at DESC);
CREATE INDEX idx_frozen_status ON frozen_log(status) WHERE status = 'frozen';

-- spillovers
CREATE INDEX idx_spill_from ON spillovers(from_wallet, created_at DESC);
CREATE INDEX idx_spill_to ON spillovers(to_wallet, created_at DESC);

-- referrals
CREATE INDEX idx_ref_referrer ON referrals(referrer_wallet);

-- reactivations
CREATE INDEX idx_react_wallet ON reactivations(wallet, created_at DESC);

-- commissions
CREATE INDEX idx_comm_wallet ON commissions(from_wallet, created_at DESC);

-- daily_stats
CREATE INDEX idx_daily_date ON daily_stats(date DESC);

-- autobuy_events
CREATE INDEX idx_autobuy_wallet ON autobuy_events(wallet, created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE frozen_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE spillovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactivations ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bounced ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE autobuy_events ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key can read everything)
CREATE POLICY "Public read" ON users FOR SELECT USING (true);
CREATE POLICY "Public read" ON user_levels FOR SELECT USING (true);
CREATE POLICY "Public read" ON referrals FOR SELECT USING (true);
CREATE POLICY "Public read" ON payouts FOR SELECT USING (true);
CREATE POLICY "Public read" ON slot_events FOR SELECT USING (true);
CREATE POLICY "Public read" ON frozen_log FOR SELECT USING (true);
CREATE POLICY "Public read" ON spillovers FOR SELECT USING (true);
CREATE POLICY "Public read" ON reactivations FOR SELECT USING (true);
CREATE POLICY "Public read" ON commissions FOR SELECT USING (true);
CREATE POLICY "Public read" ON bounced FOR SELECT USING (true);
CREATE POLICY "Public read" ON system_stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON daily_stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON monitor_state FOR SELECT USING (true);
CREATE POLICY "Public read" ON autobuy_events FOR SELECT USING (true);

-- Write only via service key (backend event listener)
-- No INSERT/UPDATE/DELETE policies for anon — only service_role can write

-- ============================================
-- REALTIME — enable for UI live updates
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE user_levels;
ALTER PUBLICATION supabase_realtime ADD TABLE payouts;
ALTER PUBLICATION supabase_realtime ADD TABLE frozen_log;
ALTER PUBLICATION supabase_realtime ADD TABLE slot_events;
ALTER PUBLICATION supabase_realtime ADD TABLE system_stats;
