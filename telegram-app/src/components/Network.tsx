import { useState } from 'react';
import type { ReferralInfo } from '../hooks/useUserData';

interface Props {
  referrals: ReferralInfo[];
  indirectReferrals: ReferralInfo[];
  shareLink: string;
  webApp: any;
  address: string;
}

export default function Network({ referrals, indirectReferrals, shareLink, webApp, address }: Props) {
  const [showTree, setShowTree] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    webApp?.HapticFeedback?.notificationOccurred('success');
  };

  const shareViaTelegram = () => {
    const text = encodeURIComponent('Join XionNET - Decentralized earning system!');
    const url = encodeURIComponent(shareLink);
    webApp?.openTelegramLink(`https://t.me/share/url?url=${url}&text=${text}`);
  };

  const shortAddr = (a: string) => `${a.slice(0, 8)}...${a.slice(-4)}`;

  return (
    <>
      <div className="ref-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="ref-stat">
          <div className="val" style={{ color: 'var(--poly2)' }}>{referrals.length}</div>
          <div className="lbl">Direct</div>
        </div>
        <div className="ref-stat">
          <div className="val" style={{ color: 'var(--blue, #60a5fa)' }}>{indirectReferrals.length}</div>
          <div className="lbl">Indirect</div>
        </div>
        <div className="ref-stat">
          <div className="val" style={{ color: 'var(--green)' }}>
            {[...referrals, ...indirectReferrals].filter(r => r.active_levels > 0).length}
          </div>
          <div className="lbl">Active</div>
        </div>
        <div className="ref-stat">
          <div className="val" style={{ color: 'var(--green)' }}>
            ${([...referrals, ...indirectReferrals].reduce((sum, r) => sum + (r.total_received || 0), 0) / 1e6).toFixed(0)}
          </div>
          <div className="lbl">Earned</div>
        </div>
      </div>

      {/* Tree button */}
      {referrals.length > 0 && (
        <button
          className="ghost-btn"
          onClick={() => setShowTree(!showTree)}
          style={{ width: '100%', padding: 10, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="6" y1="14" x2="18" y2="14"/><line x1="6" y1="14" x2="6" y2="18"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="18" y1="14" x2="18" y2="18"/><circle cx="6" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
          </svg>
          {showTree ? 'Hide' : 'View'} Referral Tree
        </button>
      )}

      {/* Tree */}
      {showTree && referrals.length > 0 && (
        <div className="card" style={{ padding: 14, marginBottom: 12, overflowX: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 'fit-content' }}>
            {/* Me */}
            <div style={{
              background: 'var(--bg4)', border: '2px solid var(--poly)', borderRadius: 10,
              padding: '8px 14px', textAlign: 'center', marginBottom: 4,
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--poly2)' }}>ME</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--text2)' }}>{shortAddr(address)}</div>
            </div>

            {/* Connector */}
            <div style={{ width: 2, height: 16, background: 'var(--border2)' }} />

            {/* Referrals row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', justifyContent: 'center' }}>
              {referrals.map((r, i) => {
                const children = indirectReferrals.filter(ir => ir.referrer_wallet === r.wallet);
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 2, height: 12, background: 'var(--border2)' }} />
                    <div style={{
                      background: 'var(--bg4)',
                      border: `1px solid ${r.active_levels > 0 ? 'rgba(6,214,160,.35)' : 'var(--border)'}`,
                      borderRadius: 8, padding: '6px 10px', textAlign: 'center', minWidth: 65,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', margin: '0 auto 4px',
                        background: r.active_levels > 0 ? 'rgba(6,214,160,.15)' : 'rgba(124,58,237,.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 700,
                        color: r.active_levels > 0 ? 'var(--green)' : 'var(--poly2)',
                      }}>
                        {r.wallet.slice(2, 4).toUpperCase()}
                      </div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: 'var(--text2)' }}>
                        {r.wallet.slice(0, 6)}...
                      </div>
                      <div style={{ fontSize: 8, color: 'var(--text3)', marginTop: 2 }}>
                        L{r.active_levels}
                      </div>
                    </div>
                    {/* Sub-referrals (indirect) */}
                    {children.length > 0 && (
                      <>
                        <div style={{ width: 2, height: 10, background: 'var(--border2)' }} />
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          {children.map((c, ci) => (
                            <div key={ci} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: 2, height: 8, background: 'var(--border2)' }} />
                              <div style={{
                                background: 'var(--bg4)',
                                border: `1px solid ${c.active_levels > 0 ? 'rgba(96,165,250,.35)' : 'var(--border)'}`,
                                borderRadius: 6, padding: '4px 8px', textAlign: 'center', minWidth: 55,
                              }}>
                                <div style={{
                                  width: 20, height: 20, borderRadius: '50%', margin: '0 auto 3px',
                                  background: 'rgba(96,165,250,.15)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: 8, fontWeight: 700, color: 'var(--blue, #60a5fa)',
                                }}>
                                  {c.wallet.slice(2, 4).toUpperCase()}
                                </div>
                                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 7, color: 'var(--text2)' }}>
                                  {c.wallet.slice(0, 6)}...
                                </div>
                                <div style={{ fontSize: 7, color: 'var(--text3)', marginTop: 1 }}>
                                  L{c.active_levels}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Share card */}
      <div className="card">
        <div className="card-hdr">
          <div className="card-title">Share Referral Link</div>
        </div>

        <div className="ref-url-box">
          <div className="ref-url-text">{shareLink}</div>
          <button className="ref-copy-btn" onClick={copyLink}>Copy</button>
        </div>

        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Share via</div>
        <div className="ref-share-grid">
          <div className="ref-share-btn" onClick={shareViaTelegram}>
            <div className="rs-icon" style={{ background: 'rgba(0,136,204,.15)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.492-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </div>
            <div className="rs-label">Telegram</div>
          </div>
          <a className="ref-share-btn" href={`https://wa.me/?text=${encodeURIComponent('Join XionNET! ' + shareLink)}`} target="_blank" rel="noopener">
            <div className="rs-icon" style={{ background: 'rgba(37,211,102,.15)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </div>
            <div className="rs-label">WhatsApp</div>
          </a>
          <a className="ref-share-btn" href={`mailto:?subject=XionNET&body=${encodeURIComponent('Join XionNET! ' + shareLink)}`}>
            <div className="rs-icon" style={{ background: 'rgba(96,165,250,.15)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div className="rs-label">Email</div>
          </a>
          <a className="ref-share-btn" href={`sms:?body=${encodeURIComponent('Join XionNET! ' + shareLink)}`}>
            <div className="rs-icon" style={{ background: 'rgba(245,158,11,.15)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="rs-label">SMS</div>
          </a>
        </div>
      </div>

      {/* Referral list */}
      <div className="section-title" style={{ marginTop: 4 }}>Referrals</div>
      {referrals.length === 0 ? (
        <div style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', padding: '30px 0' }}>
          No referrals yet. Share your link!
        </div>
      ) : (
        referrals.map((r, i) => (
          <div key={i} className="ref-item">
            <div className="ref-avatar">{r.wallet.slice(2, 4).toUpperCase()}</div>
            <div className="ref-info">
              <div className="ref-name">{shortAddr(r.wallet)}</div>
              <div className="ref-meta">{r.active_levels} levels active</div>
            </div>
            <div className="ref-earned">
              <div className="val">+${((r.total_received || 0) / 1e6).toFixed(2)}</div>
              <div className="lbl">earned</div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
