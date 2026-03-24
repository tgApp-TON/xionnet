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
-- ============================================
-- XionNET — Supabase RPC Functions
-- ============================================

-- Increment a field in system_stats
CREATE OR REPLACE FUNCTION increment_stat(field TEXT, val BIGINT)
RETURNS void AS $$
BEGIN
  EXECUTE format(
    'UPDATE system_stats SET %I = %I + $1, updated_at = NOW() WHERE id = 1',
    field, field
  ) USING val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment user active_levels count
CREATE OR REPLACE FUNCTION increment_user_active_levels(user_wallet TEXT)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET active_levels = (
    SELECT COUNT(*) FROM user_levels
    WHERE wallet = user_wallet AND active = true
  )
  WHERE wallet = user_wallet;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get referral tree (direct + 2nd tier) for a user
CREATE OR REPLACE FUNCTION get_referral_tree(user_wallet TEXT, depth INT DEFAULT 2)
RETURNS TABLE (
  wallet TEXT,
  referrer_wallet TEXT,
  level INT,
  active_levels INT2,
  total_received BIGINT,
  registered_at TIMESTAMPTZ
) AS $$
WITH RECURSIVE tree AS (
  -- Direct referrals
  SELECT u.wallet, u.referrer_wallet, 1 AS level, u.active_levels, u.total_received, u.registered_at
  FROM users u
  WHERE u.referrer_wallet = user_wallet

  UNION ALL

  -- Deeper levels
  SELECT u.wallet, u.referrer_wallet, t.level + 1, u.active_levels, u.total_received, u.registered_at
  FROM users u
  JOIN tree t ON u.referrer_wallet = t.wallet
  WHERE t.level < depth
)
SELECT * FROM tree ORDER BY level, registered_at;
$$ LANGUAGE sql SECURITY DEFINER;

-- Get user history (all events combined)
CREATE OR REPLACE FUNCTION get_user_history(user_wallet TEXT, page_limit INT DEFAULT 20, page_offset INT DEFAULT 0)
RETURNS TABLE (
  event_type TEXT,
  level_num INT2,
  amount BIGINT,
  counterparty TEXT,
  details TEXT,
  tx_hash TEXT,
  created_at TIMESTAMPTZ
) AS $$
  -- Payouts received
  SELECT 'payout'::TEXT, p.level_num, p.amount, p.sender_wallet, 'slot ' || p.slot_num, p.tx_hash, p.created_at
  FROM payouts p WHERE p.receiver_wallet = user_wallet

  UNION ALL

  -- Frozen
  SELECT 'frozen'::TEXT, f.level_num, f.frozen_amount, NULL, f.status, f.tx_hash_freeze, f.frozen_at
  FROM frozen_log f WHERE f.wallet = user_wallet

  UNION ALL

  -- Spillovers received
  SELECT 'spillover'::TEXT, s.level_num, s.amount, s.from_wallet, s.hops || ' hops', s.tx_hash, s.created_at
  FROM spillovers s WHERE s.to_wallet = user_wallet

  UNION ALL

  -- Reactivations
  SELECT 'reactivation'::TEXT, r.level_num, 0::BIGINT, NULL, 'cycle ' || r.cycle_count, r.tx_hash, r.created_at
  FROM reactivations r WHERE r.wallet = user_wallet

  UNION ALL

  -- Level activations
  SELECT
    CASE WHEN ul.activation_type = 2 THEN 'auto_open'
         WHEN ul.activation_type = 3 THEN 'bonus'
         ELSE 'activation' END,
    ul.level_num, 0::BIGINT, NULL, 'type ' || ul.activation_type, NULL, ul.activated_at
  FROM user_levels ul WHERE ul.wallet = user_wallet AND ul.active = true

  ORDER BY created_at DESC
  LIMIT page_limit OFFSET page_offset;
$$ LANGUAGE sql SECURITY DEFINER;

-- Get global leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(lim INT DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  wallet TEXT,
  active_levels INT2,
  total_received BIGINT,
  referral_count BIGINT
) AS $$
  SELECT
    ROW_NUMBER() OVER (ORDER BY u.total_received DESC) as rank,
    u.wallet,
    u.active_levels,
    u.total_received,
    (SELECT COUNT(*) FROM referrals r WHERE r.referrer_wallet = u.wallet) as referral_count
  FROM users u
  WHERE u.total_received > 0
  ORDER BY u.total_received DESC
  LIMIT lim;
$$ LANGUAGE sql SECURITY DEFINER;

-- Daily stats upsert helper
CREATE OR REPLACE FUNCTION upsert_daily_stat(
  stat_date DATE,
  field TEXT,
  val BIGINT
) RETURNS void AS $$
BEGIN
  INSERT INTO daily_stats (date) VALUES (stat_date) ON CONFLICT (date) DO NOTHING;
  EXECUTE format(
    'UPDATE daily_stats SET %I = %I + $1 WHERE date = $2',
    field, field
  ) USING val, stat_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
