import { ethers } from 'ethers';
import type { UserInfo, LevelInfo } from '../hooks/useXionContract';
import type { HistoryEvent, ReferralInfo } from '../hooks/useUserData';
import { MAX_LEVELS, LEVEL_PRICES } from '../config/constants';

interface Props {
  userInfo: UserInfo;
  levels: Record<number, LevelInfo>;
  history: HistoryEvent[];
  referrals: ReferralInfo[];
  onMintUsdc: () => void;
  loading: boolean;
  onGoLevels: () => void;
  onGoNetwork: () => void;
  address: string;
}

const EVENT_ICONS: Record<string, { icon: string; bg: string; color: string }> = {
  payout: { icon: '💰', bg: 'rgba(6,214,160,.15)', color: 'var(--green)' },
  frozen: { icon: '❄️', bg: 'rgba(56,189,248,.15)', color: 'var(--frozen)' },
  spillover: { icon: '⬆️', bg: 'rgba(124,58,237,.15)', color: 'var(--poly2)' },
  reactivation: { icon: '🔄', bg: 'rgba(245,158,11,.15)', color: 'var(--orange)' },
  activation: { icon: '⚡', bg: 'rgba(124,58,237,.15)', color: 'var(--poly2)' },
  bonus: { icon: '🎁', bg: 'rgba(252,211,77,.15)', color: 'var(--gold)' },
  auto_open: { icon: '🔓', bg: 'rgba(6,214,160,.15)', color: 'var(--green)' },
};

export default function Dashboard({ userInfo, levels, history, referrals, onMintUsdc, loading, onGoLevels, onGoNetwork, address }: Props) {
  const received = Number(ethers.formatUnits(userInfo.totalReceived, 6)).toFixed(2);
  const paid = Number(ethers.formatUnits(userInfo.totalPaid, 6)).toFixed(2);
  const activeLevels = Object.values(levels).filter(l => l.active).length;
  const frozenTotal = Object.values(levels).reduce((sum, l) => sum + l.frozenAmount, 0n);
  const frozen = Number(ethers.formatUnits(frozenTotal, 6)).toFixed(2);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <>
      <button className="mint-btn" onClick={onMintUsdc} disabled={loading}>
        {loading ? '⏳ Minting...' : '🪙 Mint $10,000 Test USDC'}
      </button>

      <div className="stat-grid">
        <div className="stat-box sb-green">
          <div className="stat-lbl">Total Received</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>${received}</div>
        </div>
        <div className="stat-box sb-poly">
          <div className="stat-lbl">Active Levels</div>
          <div className="stat-val" style={{ color: 'var(--poly2)' }}>{activeLevels}/{MAX_LEVELS}</div>
        </div>
        <div className="stat-box sb-orange">
          <div className="stat-lbl">Total Paid</div>
          <div className="stat-val">${paid}</div>
        </div>
        <div className="stat-box sb-frozen">
          <div className="stat-lbl">Frozen</div>
          <div className="stat-val" style={{ color: 'var(--frozen)' }}>${frozen}</div>
        </div>
      </div>

      {/* Level Overview */}
      <div className="card">
        <div className="card-hdr">
          <div className="card-title">Level Overview</div>
          <button className="ghost-btn" onClick={onGoLevels}>Full view</button>
        </div>
        <div className="lvl-grid">
          {Array.from({ length: MAX_LEVELS }, (_, i) => i + 1).map(i => {
            const l = levels[i];
            const isActive = l?.active;
            const isFrozen = l && l.frozenAmount > 0n;
            const isNext = !isActive && (i === 1 || levels[i - 1]?.active);
            const cls = isActive ? 'lc-on' : isFrozen ? 'lc-frz' : isNext ? 'lc-next' : 'lc-dim';
            const slots = l?.filledSlots || 0;
            return (
              <div key={i} className={`lvl-card ${cls} ${i >= 16 ? 'lc-wide' : ''}`} onClick={onGoLevels}>
                <div className="lc-top">
                  <span className="lc-label">Level {i}</span>
                  {l?.cycleCount > 0 && <span className="lc-cycle">C{l.cycleCount}</span>}
                </div>
                <div className={`lc-price ${cls === 'lc-dim' ? 'dim' : ''}`}>${LEVEL_PRICES[i]}</div>
                <div className="lc-pips">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className={`lc-pip ${s <= slots ? 'p-on' : ''}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network Preview */}
      <div className="card">
        <div className="card-hdr">
          <div className="card-title">Network</div>
          <button className="ghost-btn" onClick={onGoNetwork}>View</button>
        </div>
        {referrals.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', padding: '16px 0' }}>
            No referrals yet. Share your link!
          </div>
        ) : (
          <>
            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 12 }}>
              <div className="stat-box" style={{ padding: '8px 10px' }}>
                <div className="stat-lbl">Direct</div>
                <div className="stat-val" style={{ color: 'var(--poly2)', fontSize: 16 }}>{referrals.length}</div>
              </div>
              <div className="stat-box" style={{ padding: '8px 10px' }}>
                <div className="stat-lbl">Active</div>
                <div className="stat-val" style={{ color: 'var(--green)', fontSize: 16 }}>{referrals.filter(r => r.active_levels > 0).length}</div>
              </div>
              <div className="stat-box" style={{ padding: '8px 10px' }}>
                <div className="stat-lbl">Pending</div>
                <div className="stat-val" style={{ color: 'var(--orange)', fontSize: 16 }}>{referrals.filter(r => r.active_levels === 0).length}</div>
              </div>
            </div>
            {referrals.slice(0, 3).map((r, i) => (
              <div key={i} className="feed-item" onClick={onGoNetwork}>
                <div className="fi-icon" style={{ background: r.active_levels > 0 ? 'rgba(6,214,160,.15)' : 'rgba(245,158,11,.15)', fontSize: 10, fontWeight: 700 }}>
                  {r.wallet.slice(2, 4).toUpperCase()}
                </div>
                <div className="fi-body">
                  <div className="fi-title">{r.wallet.slice(0, 6)}...{r.wallet.slice(-4)}</div>
                  <div className="fi-sub">{r.active_levels > 0 ? `L${r.active_levels} active` : 'Pending'}</div>
                </div>
                <div className="fi-right">
                  <div className="fi-amt" style={{ color: r.active_levels > 0 ? 'var(--green)' : 'var(--text3)' }}>
                    {r.active_levels > 0 ? `L${r.active_levels}` : '—'}
                  </div>
                </div>
              </div>
            ))}
            {referrals.length > 3 && (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <button className="ghost-btn" onClick={onGoNetwork} style={{ fontSize: 11 }}>
                  +{referrals.length - 3} more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="card">
        <div className="card-hdr">
          <div className="card-title">Recent Activity</div>
        </div>
        {history.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
            No activity yet. Buy your first level!
          </div>
        ) : (
          history.slice(0, 5).map((e, i) => {
            const ev = EVENT_ICONS[e.event_type] || EVENT_ICONS.activation;
            return (
              <div key={i} className="feed-item">
                <div className="fi-icon" style={{ background: ev.bg }}>{ev.icon}</div>
                <div className="fi-body">
                  <div className="fi-title">Level {e.level_num} {e.event_type === 'payout' ? 'Payout' : e.event_type === 'frozen' ? 'Frozen' : e.event_type === 'activation' ? 'Activated' : e.event_type}</div>
                  <div className="fi-sub">{e.counterparty ? `${e.counterparty.slice(0, 10)}...` : ''}</div>
                </div>
                <div className="fi-right">
                  {e.amount > 0 && <div className="fi-amt" style={{ color: ev.color }}>+${(e.amount / 1e6).toFixed(2)}</div>}
                  <div className="fi-time">{timeAgo(e.created_at)}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
