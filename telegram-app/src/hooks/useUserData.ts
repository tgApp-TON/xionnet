import { useState, useCallback } from 'react';
import { supabase } from '../config/supabase';

export interface HistoryEvent {
  id: number;
  event_type: string;
  level_num: number;
  amount: number;
  counterparty: string;
  details: string;
  tx_hash: string;
  created_at: string;
}

export interface ReferralInfo {
  wallet: string;
  active_levels: number;
  total_received: number;
  registered_at: string;
  level?: number;
  referrer_wallet?: string;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  active_levels: number;
  total_received: number;
  referral_count: number;
}

export function useUserData() {
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [referrals, setReferrals] = useState<ReferralInfo[]>([]);
  const [indirectReferrals, setIndirectReferrals] = useState<ReferralInfo[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  const loadHistory = useCallback(async (wallet: string, limit = 20) => {
    try {
      const { data } = await supabase.rpc('get_user_history', {
        user_wallet: wallet.toLowerCase(),
        lim: limit,
        off: 0,
      });
      if (data) setHistory(data);
    } catch (e) {
      console.error('History load error:', e);
    }
  }, []);

  const loadReferrals = useCallback(async (wallet: string) => {
    try {
      // 1. Load direct referrals
      const { data: directData } = await supabase
        .from('referrals')
        .select('referred_wallet, created_at')
        .eq('referrer_wallet', wallet.toLowerCase())
        .order('created_at', { ascending: false });

      if (!directData) return;

      const directRefs: ReferralInfo[] = [];
      for (const r of directData) {
        const { data: userData } = await supabase
          .from('users')
          .select('active_levels, total_received, registered_at')
          .eq('wallet', r.referred_wallet)
          .single();

        directRefs.push({
          wallet: r.referred_wallet,
          active_levels: userData?.active_levels || 0,
          total_received: userData?.total_received || 0,
          registered_at: r.created_at,
          level: 1,
          referrer_wallet: wallet.toLowerCase(),
        });
      }
      setReferrals(directRefs);

      // 2. Load indirect referrals (referrals of my direct referrals)
      const directWallets = directRefs.map(r => r.wallet);
      if (directWallets.length === 0) {
        setIndirectReferrals([]);
        return;
      }

      const { data: indirectData } = await supabase
        .from('referrals')
        .select('referrer_wallet, referred_wallet, created_at')
        .in('referrer_wallet', directWallets)
        .order('created_at', { ascending: false });

      if (!indirectData || indirectData.length === 0) {
        setIndirectReferrals([]);
        return;
      }

      const indirectRefs: ReferralInfo[] = [];
      for (const r of indirectData) {
        const { data: userData } = await supabase
          .from('users')
          .select('active_levels, total_received, registered_at')
          .eq('wallet', r.referred_wallet)
          .single();

        indirectRefs.push({
          wallet: r.referred_wallet,
          active_levels: userData?.active_levels || 0,
          total_received: userData?.total_received || 0,
          registered_at: r.created_at,
          level: 2,
          referrer_wallet: r.referrer_wallet,
        });
      }
      setIndirectReferrals(indirectRefs);
    } catch (e) {
      console.error('Referrals load error:', e);
    }
  }, []);

  const loadLeaderboard = useCallback(async () => {
    try {
      const { data } = await supabase.rpc('get_leaderboard', { lim: 20 });
      if (data) setLeaderboard(data);
    } catch (e) {
      console.error('Leaderboard load error:', e);
    }
  }, []);

  const loadSystemStats = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('system_stats')
        .select('*')
        .eq('id', 1)
        .single();
      if (data) setSystemStats(data);
    } catch (e) {
      console.error('Stats load error:', e);
    }
  }, []);

  const loadAll = useCallback(async (wallet: string) => {
    setLoadingData(true);
    await Promise.all([
      loadHistory(wallet),
      loadReferrals(wallet),
      loadLeaderboard(),
      loadSystemStats(),
    ]);
    setLoadingData(false);
  }, [loadHistory, loadReferrals, loadLeaderboard, loadSystemStats]);

  return {
    history,
    referrals,
    indirectReferrals,
    leaderboard,
    systemStats,
    loadingData,
    loadHistory,
    loadReferrals,
    loadLeaderboard,
    loadSystemStats,
    loadAll,
  };
}
