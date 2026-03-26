import { ethers } from 'ethers';
import { useState } from 'react';
import type { LevelInfo } from '../hooks/useXionContract';
import { LEVEL_PRICES, MAX_LEVELS } from '../config/constants';

interface Props {
  levels: Record<number, LevelInfo>;
  autoBuys: Record<number, boolean>;
  onBuy: (level: number) => void;
  onAutoBuy: (level: number, enabled: boolean) => void;
  loading: boolean;
}

const ZERO = '0x0000000000000000000000000000000000000000';

export default function Levels({ levels, autoBuys, onBuy, onAutoBuy, loading }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const getClass = (i: number): string => {
    const l = levels[i];
    if (l?.active) return 'lc-on';
    if (l && l.frozenAmount > 0n) return 'lc-frz';
    // If no contract data, show L1 as next, rest as dim
    if (Object.keys(levels).length === 0) return i === 1 ? 'lc-next' : 'lc-dim';
    if (i === 1 || levels[i - 1]?.active) return 'lc-next';
    return 'lc-dim';
  };

  const shortAddr = (a: string) => (!a || a === ZERO) ? '—' : `${a.slice(0, 6)}...${a.slice(-4)}`;
  const lv = selected ? (levels[selected] || null) : null;
  const defaultLv = { active: false, filledSlots: 0, cycleCount: 0, activatedAt: 0, frozenAmount: 0n, s1: ZERO, s2: ZERO, s3: ZERO, s4: ZERO };
  const displayLv = lv || defaultLv;

  return (
    <>
      <div className="section-title">My Levels</div>

      {/* Detail panel */}
      {selected && (
        <div className="ld-panel">
          <div className="ld-hdr">
            <div className="ld-badge">{selected}</div>
            <div className="ld-info">
              <div className="ld-title">Level {selected}</div>
              <div className="ld-price">${LEVEL_PRICES[selected]?.toLocaleString()}.00</div>
              <div className="ld-tags">
                {displayLv.active && <span className="ld-tag t-active">ACTIVE</span>}
                {!displayLv.active && <span className="ld-tag t-inactive">INACTIVE</span>}
                {displayLv.frozenAmount > 0n && <span className="ld-tag t-frozen">FROZEN</span>}
              </div>
            </div>
          </div>

          <div className="slots-grid">
            {[
              { n: 1, a: displayLv.s1 }, { n: 2, a: displayLv.s2 },
              { n: 3, a: displayLv.s3 }, { n: 4, a: displayLv.s4 },
            ].map(s => {
              const isFrz = displayLv.frozenAmount > 0n;
              const isLast = selected === MAX_LEVELS;
              const desc = isLast
                ? (s.n <= 3 ? 'Payout to sponsor' : 'Spillover')
                : s.n === 1 ? 'Payout to sponsor'
                : s.n === 2 ? (isFrz ? 'Funds held (frozen)' : 'Payout / Freeze')
                : s.n === 3 ? 'Auto-unlock or payout'
                : 'Level resets (cycle)';
              return (
                <div key={s.n} className={`slot-box ${s.a !== ZERO ? 's-on' : ''} ${s.n === 2 && isFrz ? 's-frz' : ''} ${s.n === 4 && s.a !== ZERO ? 's-spill' : ''}`}>
                  <div className="slot-num">Slot {s.n}</div>
                  <div className="slot-who">{shortAddr(s.a)}</div>
                  <div className="slot-desc">{desc}</div>
                </div>
              );
            })}
          </div>

          <div className="ld-info-box">
            <div className="ld-row">
              <span className="lbl">Activation Cost</span>
              <span style={{ color: 'var(--orange)' }}>${((LEVEL_PRICES[selected] || 0) * 1.1).toFixed(2)} USDC</span>
            </div>
            <div className="ld-row">
              <span className="lbl">Sponsor Receives</span>
              <span style={{ color: 'var(--green)' }}>${(LEVEL_PRICES[selected] || 0).toLocaleString()}.00</span>
            </div>
            <div className="ld-row">
              <span className="lbl">Protocol Fee (10%)</span>
              <span style={{ color: 'var(--text3)' }}>${((LEVEL_PRICES[selected] || 0) * 0.1).toFixed(2)}</span>
            </div>
            <div className="ld-row">
              <span className="lbl">Filled Slots</span>
              <span>{displayLv.filledSlots}/4</span>
            </div>
            <div className="ld-row">
              <span className="lbl">Cycle Count</span>
              <span>{displayLv.cycleCount}</span>
            </div>
            {displayLv.frozenAmount > 0n && (
              <div className="ld-row">
                <span className="lbl">Frozen Amount</span>
                <span style={{ color: 'var(--frozen)' }}>${Number(ethers.formatUnits(displayLv.frozenAmount, 6)).toFixed(2)}</span>
              </div>
            )}
            {selected === MAX_LEVELS && (
              <div className="ld-row">
                <span className="lbl">Last Level</span>
                <span style={{ color: 'var(--gold)' }}>All slots payout ✓</span>
              </div>
            )}
            {displayLv.frozenAmount > 0n && selected < MAX_LEVELS && (
              <div className="ld-row">
                <span className="lbl">Auto-unlocks</span>
                <span style={{ color: 'var(--frozen)' }}>Level {selected + 1}</span>
              </div>
            )}
          </div>

          {selected < MAX_LEVELS && displayLv.active && (
            <div className="autobuy-toggle">
              <div>
                <div className="ab-label">Auto-buy L{selected + 1}</div>
                <div className="ab-hint">Auto-open next level</div>
              </div>
              <label className="ab-switch">
                <input
                  type="checkbox"
                  checked={autoBuys[selected] || false}
                  onChange={() => !loading && onAutoBuy(selected, !autoBuys[selected])}
                />
                <span className="ab-slider" />
              </label>
            </div>
          )}

          {!displayLv.active && getClass(selected) === 'lc-next' && (
            <button className="buy-btn btn-ready" onClick={() => onBuy(selected)} disabled={loading}>
              {loading ? 'Processing...' : `Buy Level ${selected} — $${((LEVEL_PRICES[selected] || 0) * 1.1).toFixed(2)}`}
            </button>
          )}

          <button className="ghost-btn" onClick={() => setSelected(null)} style={{ width: '100%', marginTop: 8, padding: '8px' }}>
            Close
          </button>
        </div>
      )}

      {/* Level grid */}
      <div className="lvl-grid">
        {Array.from({ length: MAX_LEVELS }, (_, i) => i + 1).map(i => {
          const cls = getClass(i);
          const l = levels[i];
          const slots = l?.filledSlots || 0;
          const frozen = l?.frozenAmount || 0n;

          return (
            <div
              key={i}
              className={`lvl-card ${cls} ${selected === i ? 'lc-sel' : ''} ${i >= 16 ? 'lc-wide' : ''}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="lc-top">
                <span className="lc-label">Level {i}</span>
                {l?.cycleCount > 0 && <span className="lc-cycle">C{l.cycleCount}</span>}
              </div>
              <div className={`lc-price ${cls === 'lc-dim' ? 'dim' : ''}`}>
                ${LEVEL_PRICES[i]?.toLocaleString()}
              </div>
              <div className="lc-pips">
                {[1, 2, 3, 4].map(s => (
                  <div
                    key={s}
                    className={`lc-pip ${s <= slots ? 'p-on' : ''} ${s === 2 && frozen > 0n ? 'p-frz' : ''}`}
                  />
                ))}
              </div>
              {frozen > 0n && (
                <div className="lc-frozen-badge">${Number(ethers.formatUnits(frozen, 6)).toFixed(0)} frozen</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
