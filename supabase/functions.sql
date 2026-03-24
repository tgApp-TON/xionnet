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
