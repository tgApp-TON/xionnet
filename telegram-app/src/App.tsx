import { useState, useEffect, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { useXionContract, UserInfo, LevelInfo } from './hooks/useXionContract';
import { useReferral } from './hooks/useReferral';
import { useUserData } from './hooks/useUserData';
import ConnectScreen from './components/ConnectScreen';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Levels from './components/Levels';
import History from './components/History';
import Network from './components/Network';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import BuyModal from './components/BuyModal';
import ExportKey from './components/ExportKey';
import Settings from './components/Settings';
import Toast from './components/Toast';
import { LEVEL_PRICES, MAX_LEVELS } from './config/constants';

export type Tab = 'home' | 'levels' | 'history' | 'network' | 'stats' | 'faq';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function App() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const { webApp } = useTelegramWebApp();
  const contract = useXionContract();
  const { referrer, getShareLink } = useReferral();
  const userData = useUserData();

  const [tab, setTab] = useState<Tab>('home');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [levels, setLevels] = useState<Record<number, LevelInfo>>({});
  const [autoBuys, setAutoBuys] = useState<Record<number, boolean>>({});
  const [buyLevel, setBuyLevel] = useState<number | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    const tg = window.Telegram?.WebApp;
    const code = tg?.initDataUnsafe?.user?.language_code || 'en';
    return localStorage.getItem('lang') || code;
  });
  const [toast, setToast] = useState<ToastData | null>(null);
  const [registering, setRegistering] = useState(false);
  const [ready, setReady] = useState(false);

  const showToast = useCallback((message: string, type: ToastData['type'] = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const loadContractData = useCallback(async () => {
    if (!contract.address) return;
    const info = await contract.getUserInfo();
    setUserInfo(info);
    const lvls: Record<number, LevelInfo> = {};
    const abs: Record<number, boolean> = {};
    for (let i = 1; i <= MAX_LEVELS; i++) {
      const lv = await contract.getUserLevel(i);
      if (lv) lvls[i] = lv;
      const ab = await contract.getAutoBuy(i);
      abs[i] = ab;
    }
    setLevels(lvls);
    setAutoBuys(abs);
    setReady(true);
  }, [contract.address]);

  // Auto-register
  useEffect(() => {
    async function autoRegister() {
      if (!contract.address || registering) return;
      const info = await contract.getUserInfo();
      setUserInfo(info);

      if (info && !info.registered) {
        setRegistering(true);
        try {
          const ref = referrer || '0x0000000000000000000000000000000000000000';
          await contract.register(ref);
          showToast('Registered!', 'success');
          webApp?.HapticFeedback?.notificationOccurred('success');
          await loadContractData();
        } catch (e: any) {
          showToast(e.reason || 'Registration failed — need Sepolia ETH for gas', 'error');
          setReady(true);
        } finally {
          setRegistering(false);
        }
      } else if (info?.registered) {
        await loadContractData();
      } else {
        setReady(true);
      }
    }

    if (authenticated && contract.address) autoRegister();
  }, [authenticated, contract.address]);

  // Load Supabase data
  useEffect(() => {
    if (contract.address && userInfo?.registered) {
      userData.loadAll(contract.address);
    }
  }, [contract.address, userInfo?.registered]);

  // Bonus timer
  const now = Math.floor(Date.now() / 1000);
  const bonusEnd = userInfo ? userInfo.registeredAt + 10800 : 0;
  const bonusRemaining = Math.max(0, bonusEnd - now);
  const activeLevels = Object.values(levels).filter(l => l.active).length;
  const showBonus = bonusRemaining > 0 && activeLevels < 7;

  const handleBuy = async (level: number) => {
    try {
      webApp?.HapticFeedback?.impactOccurred('medium');
      await contract.activateLevel(level);
      showToast(`Level ${level} activated!`, 'success');
      webApp?.HapticFeedback?.notificationOccurred('success');
      setBuyLevel(null);
      await loadContractData();
      if (contract.address) userData.loadHistory(contract.address);
    } catch (e: any) {
      showToast(e.reason || 'Activation failed', 'error');
      webApp?.HapticFeedback?.notificationOccurred('error');
    }
  };

  const handleAutoBuy = async (level: number, enabled: boolean) => {
    try {
      webApp?.HapticFeedback?.impactOccurred('light');
      await contract.setAutoBuy(level, enabled);
      setAutoBuys(prev => ({ ...prev, [level]: enabled }));
      showToast(`AutoBuy L${level} ${enabled ? 'ON' : 'OFF'}`, 'success');
    } catch (e: any) {
      showToast(e.reason || 'AutoBuy failed', 'error');
    }
  };

  if (!authenticated) return <ConnectScreen />;

  if (!ready) {
    return (
      <div className="connect-screen">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--poly2)" strokeWidth="2" style={{ animation: 'spinSlow 1s linear infinite' }}>
            <path d="M12 2v4m0 12v4m-7.07-14.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          </svg>
          <div style={{ color: 'var(--text2)', fontSize: 13 }}>
            {registering ? 'Registering on blockchain...' : 'Loading...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        address={contract.address || ''}
        usdcBalance={contract.usdcBalance}
        tab={tab}
        onTab={setTab}
        bonusRemaining={showBonus ? bonusRemaining : undefined}
        onExportKey={() => setShowSettings(true)}
      />

      <div className="screen">
        {tab === 'home' && (
          <Dashboard
            userInfo={userInfo || { registered: false, referrer: '', isMaster: false, registeredAt: 0, totalReceived: 0n, totalPaid: 0n }}
            levels={levels}
            history={userData.history}
            referrals={userData.referrals}
            onMintUsdc={contract.mintTestUsdc}
            loading={contract.loading}
            onGoLevels={() => setTab('levels')}
            onGoNetwork={() => setTab('network')}
            address={contract.address || ''}
          />
        )}
        {tab === 'levels' && (
          <Levels
            levels={levels}
            autoBuys={autoBuys}
            onBuy={(level) => setBuyLevel(level)}
            onAutoBuy={handleAutoBuy}
            loading={contract.loading}
          />
        )}
        {tab === 'history' && <History events={userData.history} />}
        {tab === 'network' && (
          <Network
            referrals={userData.referrals}
            shareLink={getShareLink(contract.address || '')}
            webApp={webApp}
            address={contract.address || ''}
          />
        )}
        {tab === 'stats' && (
          <Stats
            leaderboard={userData.leaderboard}
            systemStats={userData.systemStats}
            address={contract.address || ''}
          />
        )}
        {tab === 'faq' && <FAQ />}
      </div>

      {buyLevel && (
        <BuyModal
          level={buyLevel}
          price={LEVEL_PRICES[buyLevel]}
          usdcBalance={contract.usdcBalance}
          loading={contract.loading}
          onBuy={() => handleBuy(buyLevel)}
          onClose={() => setBuyLevel(null)}
        />
      )}

      {showExport && <ExportKey onClose={() => setShowExport(false)} />}

      {showSettings && (
        <Settings
          currentLang={currentLang}
          onChangeLang={(lang) => {
            setCurrentLang(lang);
            localStorage.setItem('lang', lang);
          }}
          onExportKey={() => { setShowSettings(false); setShowExport(true); }}
          onClose={() => setShowSettings(false)}
          address={contract.address || ''}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
