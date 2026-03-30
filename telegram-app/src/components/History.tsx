import { useState } from 'react';
import type { HistoryEvent } from '../hooks/useUserData';

interface Props {
  events: HistoryEvent[];
}

const EVENT_MAP: Record<string, { label: string; icon: string; bg: string; color: string }> = {
  payout: { label: 'Payout', icon: '💰', bg: 'rgba(6,214,160,.15)', color: 'var(--green)' },
  frozen: { label: 'Frozen', icon: '❄️', bg: 'rgba(56,189,248,.15)', color: 'var(--frozen)' },
  spillover: { label: 'Spillover', icon: '⬆️', bg: 'rgba(124,58,237,.15)', color: 'var(--poly2)' },
  reactivation: { label: 'Reactivation', icon: '🔄', bg: 'rgba(245,158,11,.15)', color: 'var(--orange)' },
  activation: { label: 'Activated', icon: '⚡', bg: 'rgba(124,58,237,.15)', color: 'var(--poly2)' },
  bonus: { label: 'Bonus', icon: '🎁', bg: 'rgba(252,211,77,.15)', color: 'var(--gold)' },
  auto_open: { label: 'Auto-buy', icon: '🔓', bg: 'rgba(6,214,160,.15)', color: 'var(--green)' },
};

const FILTERS = ['all', 'payout', 'frozen', 'spillover', 'reactivation', 'activation'];

export default function History({ events }: Props) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? events : events.filter(e => e.event_type === filter);

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
      <div className="section-title">History</div>

      <div className="filter-chips">
        {FILTERS.map(f => (
          <button key={f} className={`chip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : (EVENT_MAP[f]?.icon || '') + ' ' + (EVENT_MAP[f]?.label || f)}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        {filtered.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', padding: '30px 0' }}>
            No events found
          </div>
        ) : (
          filtered.map((e, i) => {
            const ev = EVENT_MAP[e.event_type] || EVENT_MAP.activation;
            return (
              <div key={i} className="feed-item" style={{ flexWrap: 'wrap' }}>
                <div className="fi-icon" style={{ background: ev.bg }}>{ev.icon}</div>
                <div className="fi-body">
                  <div className="fi-title">Level {e.level_num} {ev.label}</div>
                  <div className="fi-sub">{e.counterparty ? `${e.counterparty.slice(0, 10)}...` : ''}</div>
                </div>
                <div className="fi-right">
                  {e.amount > 0 && (
                    <div className="fi-amt" style={{ color: ev.color }}>
                      {e.event_type === 'payout' ? '+' : ''}${(e.amount / 1e6).toFixed(2)}
                    </div>
                  )}
                  <div className="fi-time">{timeAgo(e.created_at)}</div>
                </div>
                {e.tx_hash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${e.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%', marginTop: 4, paddingLeft: 40,
                      fontSize: 9, color: 'var(--poly2)', textDecoration: 'none',
                      fontFamily: "'DM Mono',monospace", opacity: 0.7,
                    }}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    tx: {e.tx_hash.slice(0, 10)}...{e.tx_hash.slice(-6)} ↗
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
