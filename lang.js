// XionNET — Translations
// 14 languages: EN, RU, UA, ES, PT, FR, DE, PL, VI, KO, JA, HI, ZH, TR

const LANGS = {
  en: { name: 'English', flag: '🇬🇧' },
  ru: { name: 'Русский', flag: '🇧🇾' },
  ua: { name: 'Українська', flag: '🇺🇦' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇧🇷' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  pl: { name: 'Polski', flag: '🇵🇱' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
  ja: { name: '日本語', flag: '🇯🇵' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  zh: { name: '中文', flag: '🇨🇳' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  ar: { name: 'العربية', flag: '🇦🇪' },
  th: { name: 'ไทย', flag: '🇹🇭' },
};

const T = {
  // ==================== CONNECT SCREEN ====================
  cs_tagline: {
    en: 'POLYGON · DeFi Protocol', ru: 'POLYGON · DeFi Протокол', ua: 'POLYGON · DeFi Протокол',
    es: 'POLYGON · Protocolo DeFi', pt: 'POLYGON · Protocolo DeFi', fr: 'POLYGON · Protocole DeFi',
    de: 'POLYGON · DeFi-Protokoll', pl: 'POLYGON · Protokół DeFi', vi: 'POLYGON · Giao thức DeFi',
    ko: 'POLYGON · DeFi 프로토콜', ja: 'POLYGON · DeFiプロトコル', hi: 'POLYGON · DeFi प्रोटोकॉल',
    zh: 'POLYGON · DeFi 协议', tr: 'POLYGON · DeFi Protokolü',
  },
  cs_feat1: {
    en: 'Smart contract secured funds', ru: 'Средства защищены смарт-контрактом', ua: 'Кошти захищені смарт-контрактом',
    es: 'Fondos asegurados por contrato inteligente', pt: 'Fundos protegidos por contrato inteligente', fr: 'Fonds sécurisés par contrat intelligent',
    de: 'Durch Smart Contract gesicherte Gelder', pl: 'Środki zabezpieczone smart kontraktem', vi: 'Quỹ được bảo mật bởi hợp đồng thông minh',
    ko: '스마트 컨트랙트로 보호되는 자금', ja: 'スマートコントラクトで保護された資金', hi: 'स्मार्ट कॉन्ट्रैक्ट द्वारा सुरक्षित फंड',
    zh: '智能合约保障资金安全', tr: 'Akıllı sözleşme ile güvence altında',
  },
  cs_feat2: {
    en: 'Instant USDC payouts to wallet', ru: 'Мгновенные выплаты USDC на кошелёк', ua: 'Миттєві виплати USDC на гаманець',
    es: 'Pagos instantáneos en USDC', pt: 'Pagamentos instantâneos em USDC', fr: 'Paiements USDC instantanés',
    de: 'Sofortige USDC-Auszahlungen', pl: 'Natychmiastowe wypłaty USDC', vi: 'Thanh toán USDC tức thì',
    ko: 'USDC 즉시 지급', ja: 'USDC即時支払い', hi: 'तुरंत USDC भुगतान',
    zh: 'USDC即时支付到钱包', tr: 'Anında USDC ödemeleri',
  },
  cs_feat3: {
    en: 'Auto-unlock next level for free', ru: 'Автоматическое открытие следующего уровня бесплатно', ua: 'Автоматичне відкриття наступного рівня безкоштовно',
    es: 'Desbloqueo automático del siguiente nivel gratis', pt: 'Desbloqueio automático do próximo nível grátis', fr: 'Déblocage automatique du niveau suivant gratuitement',
    de: 'Automatische Freischaltung der nächsten Stufe kostenlos', pl: 'Automatyczne odblokowanie kolejnego poziomu za darmo', vi: 'Tự động mở khóa cấp tiếp theo miễn phí',
    ko: '다음 레벨 무료 자동 해제', ja: '次のレベルを無料で自動解除', hi: 'अगला स्तर मुफ्त में ऑटो-अनलॉक',
    zh: '免费自动解锁下一级', tr: 'Sonraki seviyeyi ücretsiz otomatik aç',
  },
  cs_feat4: {
    en: '17 levels · Decentralized network', ru: '17 уровней · Децентрализованная сеть', ua: '17 рівнів · Децентралізована мережа',
    es: '17 niveles · Red descentralizada', pt: '17 níveis · Rede descentralizada', fr: '17 niveaux · Réseau décentralisé',
    de: '17 Stufen · Dezentrales Netzwerk', pl: '17 poziomów · Zdecentralizowana sieć', vi: '17 cấp độ · Mạng phi tập trung',
    ko: '17 레벨 · 탈중앙화 네트워크', ja: '17レベル · 分散型ネットワーク', hi: '17 स्तर · विकेंद्रीकृत नेटवर्क',
    zh: '17个级别 · 去中心化网络', tr: '17 seviye · Merkeziyetsiz ağ',
  },
  cs_connect: {
    en: 'Connect MetaMask', ru: 'Подключить MetaMask', ua: 'Підключити MetaMask',
    es: 'Conectar MetaMask', pt: 'Conectar MetaMask', fr: 'Connecter MetaMask',
    de: 'MetaMask verbinden', pl: 'Połącz MetaMask', vi: 'Kết nối MetaMask',
    ko: 'MetaMask 연결', ja: 'MetaMask接続', hi: 'MetaMask कनेक्ट करें',
    zh: '连接MetaMask', tr: 'MetaMask Bağla',
  },
  cs_network_req: {
    en: 'Polygon Network Required', ru: 'Требуется сеть Polygon', ua: 'Потрібна мережа Polygon',
    es: 'Se requiere la red Polygon', pt: 'Rede Polygon necessária', fr: 'Réseau Polygon requis',
    de: 'Polygon-Netzwerk erforderlich', pl: 'Wymagana sieć Polygon', vi: 'Yêu cầu mạng Polygon',
    ko: 'Polygon 네트워크 필요', ja: 'Polygonネットワークが必要', hi: 'Polygon नेटवर्क आवश्यक',
    zh: '需要Polygon网络', tr: 'Polygon Ağı Gerekli',
  },

  // ==================== NAVIGATION ====================
  nav_home: {
    en: 'Home', ru: 'Главная', ua: 'Головна', es: 'Inicio', pt: 'Início', fr: 'Accueil',
    de: 'Start', pl: 'Start', vi: 'Trang chủ', ko: '홈', ja: 'ホーム', hi: 'होम', zh: '首页', tr: 'Ana Sayfa',
  },
  nav_levels: {
    en: 'Levels', ru: 'Уровни', ua: 'Рівні', es: 'Niveles', pt: 'Níveis', fr: 'Niveaux',
    de: 'Stufen', pl: 'Poziomy', vi: 'Cấp độ', ko: '레벨', ja: 'レベル', hi: 'स्तर', zh: '级别', tr: 'Seviyeler',
  },
  nav_history: {
    en: 'History', ru: 'История', ua: 'Історія', es: 'Historial', pt: 'Histórico', fr: 'Historique',
    de: 'Verlauf', pl: 'Historia', vi: 'Lịch sử', ko: '기록', ja: '履歴', hi: 'इतिहास', zh: '历史', tr: 'Geçmiş',
  },
  nav_network: {
    en: 'Network', ru: 'Сеть', ua: 'Мережа', es: 'Red', pt: 'Rede', fr: 'Réseau',
    de: 'Netzwerk', pl: 'Sieć', vi: 'Mạng lưới', ko: '네트워크', ja: 'ネットワーク', hi: 'नेटवर्क', zh: '网络', tr: 'Ağ',
  },
  nav_stats: {
    en: 'Stats', ru: 'Статистика', ua: 'Статистика', es: 'Estadísticas', pt: 'Estatísticas', fr: 'Statistiques',
    de: 'Statistik', pl: 'Statystyki', vi: 'Thống kê', ko: '통계', ja: '統計', hi: 'आँकड़े', zh: '统计', tr: 'İstatistik',
  },
  nav_faq: {
    en: 'FAQ', ru: 'FAQ', ua: 'FAQ', es: 'FAQ', pt: 'FAQ', fr: 'FAQ',
    de: 'FAQ', pl: 'FAQ', vi: 'FAQ', ko: 'FAQ', ja: 'FAQ', hi: 'FAQ', zh: 'FAQ', tr: 'SSS',
  },

  // ==================== DASHBOARD ====================
  dash_received: {
    en: 'Total Received', ru: 'Всего получено', ua: 'Всього отримано', es: 'Total recibido', pt: 'Total recebido', fr: 'Total reçu',
    de: 'Gesamt erhalten', pl: 'Łącznie otrzymano', vi: 'Tổng nhận', ko: '총 수령', ja: '総受取額', hi: 'कुल प्राप्त', zh: '总收入', tr: 'Toplam Alınan',
  },
  dash_active_levels: {
    en: 'Active Levels', ru: 'Активные уровни', ua: 'Активні рівні', es: 'Niveles activos', pt: 'Níveis ativos', fr: 'Niveaux actifs',
    de: 'Aktive Stufen', pl: 'Aktywne poziomy', vi: 'Cấp đã kích hoạt', ko: '활성 레벨', ja: 'アクティブレベル', hi: 'सक्रिय स्तर', zh: '已激活级别', tr: 'Aktif Seviyeler',
  },
  dash_paid: {
    en: 'Total Paid', ru: 'Всего оплачено', ua: 'Всього сплачено', es: 'Total pagado', pt: 'Total pago', fr: 'Total payé',
    de: 'Gesamt bezahlt', pl: 'Łącznie zapłacono', vi: 'Tổng chi', ko: '총 지불', ja: '総支払額', hi: 'कुल भुगतान', zh: '总支出', tr: 'Toplam Ödenen',
  },
  dash_frozen: {
    en: 'Frozen', ru: 'Заморожено', ua: 'Заморожено', es: 'Congelado', pt: 'Congelado', fr: 'Gelé',
    de: 'Eingefroren', pl: 'Zamrożone', vi: 'Đóng băng', ko: '동결', ja: '凍結中', hi: 'फ्रोज़न', zh: '冻结', tr: 'Dondurulmuş',
  },
  dash_level_overview: {
    en: 'Level Overview', ru: 'Обзор уровней', ua: 'Огляд рівнів', es: 'Resumen de niveles', pt: 'Visão geral dos níveis', fr: 'Aperçu des niveaux',
    de: 'Stufenübersicht', pl: 'Przegląd poziomów', vi: 'Tổng quan cấp độ', ko: '레벨 개요', ja: 'レベル概要', hi: 'स्तर अवलोकन', zh: '级别概览', tr: 'Seviye Özeti',
  },
  dash_network: {
    en: 'Network', ru: 'Сеть', ua: 'Мережа', es: 'Red', pt: 'Rede', fr: 'Réseau',
    de: 'Netzwerk', pl: 'Sieć', vi: 'Mạng', ko: '네트워크', ja: 'ネットワーク', hi: 'नेटवर्क', zh: '网络', tr: 'Ağ',
  },
  dash_recent: {
    en: 'Recent Activity', ru: 'Последняя активность', ua: 'Остання активність', es: 'Actividad reciente', pt: 'Atividade recente', fr: 'Activité récente',
    de: 'Letzte Aktivität', pl: 'Ostatnia aktywność', vi: 'Hoạt động gần đây', ko: '최근 활동', ja: '最近のアクティビティ', hi: 'हालिया गतिविधि', zh: '最近活动', tr: 'Son Aktivite',
  },
  full_view: {
    en: 'Full view', ru: 'Подробнее', ua: 'Детальніше', es: 'Ver todo', pt: 'Ver tudo', fr: 'Voir tout',
    de: 'Alle anzeigen', pl: 'Zobacz wszystko', vi: 'Xem tất cả', ko: '전체 보기', ja: '全て表示', hi: 'पूरा देखें', zh: '查看全部', tr: 'Tümünü Gör',
  },
  view: {
    en: 'View', ru: 'Смотреть', ua: 'Переглянути', es: 'Ver', pt: 'Ver', fr: 'Voir',
    de: 'Ansehen', pl: 'Zobacz', vi: 'Xem', ko: '보기', ja: '表示', hi: 'देखें', zh: '查看', tr: 'Görüntüle',
  },
  all: {
    en: 'All', ru: 'Все', ua: 'Всі', es: 'Todos', pt: 'Todos', fr: 'Tout',
    de: 'Alle', pl: 'Wszystko', vi: 'Tất cả', ko: '전체', ja: '全て', hi: 'सभी', zh: '全部', tr: 'Tümü',
  },

  // ==================== LEVELS ====================
  my_levels: {
    en: 'My Levels', ru: 'Мои уровни', ua: 'Мої рівні', es: 'Mis niveles', pt: 'Meus níveis', fr: 'Mes niveaux',
    de: 'Meine Stufen', pl: 'Moje poziomy', vi: 'Cấp của tôi', ko: '내 레벨', ja: 'マイレベル', hi: 'मेरे स्तर', zh: '我的级别', tr: 'Seviyelerim',
  },
  levels_subtitle: {
    en: '17 levels · auto-purchase always on', ru: '17 уровней · автопокупка', ua: '17 рівнів · автокупівля', es: '17 niveles · compra automática',
    pt: '17 níveis · compra automática', fr: '17 niveaux · achat automatique', de: '17 Stufen · Autokauf',
    pl: '17 poziomów · automatyczny zakup', vi: '17 cấp · tự động mua', ko: '17 레벨 · 자동구매',
    ja: '17レベル · 自動購入', hi: '17 स्तर · ऑटो-खरीद', zh: '17个级别 · 自动购买', tr: '17 seviye · otomatik satın alma',
  },
  buy_level: {
    en: 'Buy Level', ru: 'Купить уровень', ua: 'Купити рівень', es: 'Comprar nivel', pt: 'Comprar nível', fr: 'Acheter le niveau',
    de: 'Stufe kaufen', pl: 'Kup poziom', vi: 'Mua cấp', ko: '레벨 구매', ja: 'レベル購入', hi: 'स्तर खरीदें', zh: '购买级别', tr: 'Seviye Satın Al',
  },
  slots: {
    en: 'slots', ru: 'слотов', ua: 'слотів', es: 'espacios', pt: 'espaços', fr: 'emplacements',
    de: 'Plätze', pl: 'slotów', vi: 'ô', ko: '슬롯', ja: 'スロット', hi: 'स्लॉट', zh: '插槽', tr: 'slot',
  },
  waiting: {
    en: 'Waiting...', ru: 'Ожидание...', ua: 'Очікування...', es: 'Esperando...', pt: 'Aguardando...', fr: 'En attente...',
    de: 'Warten...', pl: 'Oczekiwanie...', vi: 'Đang chờ...', ko: '대기중...', ja: '待機中...', hi: 'प्रतीक्षा...', zh: '等待中...', tr: 'Bekleniyor...',
  },
  active: {
    en: 'Active', ru: 'Активен', ua: 'Активний', es: 'Activo', pt: 'Ativo', fr: 'Actif',
    de: 'Aktiv', pl: 'Aktywny', vi: 'Hoạt động', ko: '활성', ja: 'アクティブ', hi: 'सक्रिय', zh: '活跃', tr: 'Aktif',
  },
  inactive: {
    en: 'Inactive', ru: 'Неактивен', ua: 'Неактивний', es: 'Inactivo', pt: 'Inativo', fr: 'Inactif',
    de: 'Inaktiv', pl: 'Nieaktywny', vi: 'Không hoạt động', ko: '비활성', ja: '非アクティブ', hi: 'निष्क्रिय', zh: '未激活', tr: 'Pasif',
  },

  // ==================== BUY MODAL ====================
  approve_usdc: {
    en: 'Approve USDC', ru: 'Одобрить USDC', ua: 'Схвалити USDC', es: 'Aprobar USDC', pt: 'Aprovar USDC', fr: 'Approuver USDC',
    de: 'USDC genehmigen', pl: 'Zatwierdź USDC', vi: 'Phê duyệt USDC', ko: 'USDC 승인', ja: 'USDC承認', hi: 'USDC अनुमोदित', zh: '批准USDC', tr: 'USDC Onayla',
  },
  activate_level: {
    en: 'Activate Level', ru: 'Активировать уровень', ua: 'Активувати рівень', es: 'Activar nivel', pt: 'Ativar nível', fr: 'Activer le niveau',
    de: 'Stufe aktivieren', pl: 'Aktywuj poziom', vi: 'Kích hoạt cấp', ko: '레벨 활성화', ja: 'レベル有効化', hi: 'स्तर सक्रिय करें', zh: '激活级别', tr: 'Seviye Etkinleştir',
  },
  cancel: {
    en: 'Cancel', ru: 'Отмена', ua: 'Скасувати', es: 'Cancelar', pt: 'Cancelar', fr: 'Annuler',
    de: 'Abbrechen', pl: 'Anuluj', vi: 'Hủy', ko: '취소', ja: 'キャンセル', hi: 'रद्द करें', zh: '取消', tr: 'İptal',
  },
  level_price: {
    en: 'Level price', ru: 'Цена уровня', ua: 'Ціна рівня', es: 'Precio del nivel', pt: 'Preço do nível', fr: 'Prix du niveau',
    de: 'Stufenpreis', pl: 'Cena poziomu', vi: 'Giá cấp', ko: '레벨 가격', ja: 'レベル価格', hi: 'स्तर मूल्य', zh: '级别价格', tr: 'Seviye Fiyatı',
  },
  activation_fee: {
    en: 'Activation fee (10%)', ru: 'Комиссия активации (10%)', ua: 'Комісія активації (10%)', es: 'Tarifa de activación (10%)',
    pt: 'Taxa de ativação (10%)', fr: "Frais d'activation (10%)", de: 'Aktivierungsgebühr (10%)', pl: 'Opłata aktywacji (10%)',
    vi: 'Phí kích hoạt (10%)', ko: '활성화 수수료 (10%)', ja: 'アクティベーション手数料 (10%)', hi: 'सक्रियण शुल्क (10%)', zh: '激活费 (10%)', tr: 'Etkinleştirme ücreti (10%)',
  },
  approve_amount: {
    en: 'Approve amount', ru: 'Сумма одобрения', ua: 'Сума схвалення', es: 'Monto a aprobar', pt: 'Valor a aprovar', fr: 'Montant à approuver',
    de: 'Genehmigungsbetrag', pl: 'Kwota zatwierdzenia', vi: 'Số tiền phê duyệt', ko: '승인 금액', ja: '承認額', hi: 'अनुमोदन राशि', zh: '审批金额', tr: 'Onay tutarı',
  },
  step1_title: {
    en: 'Approve USDC', ru: 'Одобрение USDC', ua: 'Схвалення USDC', es: 'Aprobar USDC', pt: 'Aprovar USDC', fr: 'Approuver USDC',
    de: 'USDC genehmigen', pl: 'Zatwierdzenie USDC', vi: 'Phê duyệt USDC', ko: 'USDC 승인', ja: 'USDC承認', hi: 'USDC अनुमोदन', zh: '批准USDC', tr: 'USDC Onayı',
  },
  step1_sub: {
    en: 'Allow contract to spend USDC', ru: 'Разрешить контракту использовать USDC', ua: 'Дозволити контракту використовувати USDC',
    es: 'Permitir al contrato usar USDC', pt: 'Permitir que o contrato use USDC', fr: 'Autoriser le contrat à utiliser USDC',
    de: 'Dem Vertrag erlauben USDC zu verwenden', pl: 'Zezwól kontraktowi na użycie USDC', vi: 'Cho phép hợp đồng sử dụng USDC',
    ko: '컨트랙트에 USDC 사용 허용', ja: 'コントラクトにUSDC使用を許可', hi: 'कॉन्ट्रैक्ट को USDC उपयोग की अनुमति दें', zh: '允许合约使用USDC', tr: "Sözleşmenin USDC kullanmasına izin ver",
  },
  step2_title: {
    en: 'Activate Level', ru: 'Активация уровня', ua: 'Активація рівня', es: 'Activar nivel', pt: 'Ativar nível', fr: 'Activer le niveau',
    de: 'Stufe aktivieren', pl: 'Aktywacja poziomu', vi: 'Kích hoạt cấp', ko: '레벨 활성화', ja: 'レベル有効化', hi: 'स्तर सक्रिय', zh: '激活级别', tr: 'Seviye Etkinleştirme',
  },
  step2_sub: {
    en: 'Confirm purchase transaction', ru: 'Подтвердите транзакцию покупки', ua: 'Підтвердіть транзакцію купівлі',
    es: 'Confirmar transacción de compra', pt: 'Confirmar transação de compra', fr: "Confirmer la transaction d'achat",
    de: 'Kauftransaktion bestätigen', pl: 'Potwierdź transakcję zakupu', vi: 'Xác nhận giao dịch mua',
    ko: '구매 거래 확인', ja: '購入トランザクション確認', hi: 'खरीद लेनदेन की पुष्टि करें', zh: '确认购买交易', tr: 'Satın alma işlemini onayla',
  },

  // ==================== NETWORK ====================
  total: {
    en: 'Total', ru: 'Всего', ua: 'Всього', es: 'Total', pt: 'Total', fr: 'Total',
    de: 'Gesamt', pl: 'Razem', vi: 'Tổng', ko: '전체', ja: '合計', hi: 'कुल', zh: '总计', tr: 'Toplam',
  },
  pending: {
    en: 'Pending', ru: 'Ожидают', ua: 'Очікують', es: 'Pendiente', pt: 'Pendente', fr: 'En attente',
    de: 'Ausstehend', pl: 'Oczekujący', vi: 'Đang chờ', ko: '대기중', ja: '保留中', hi: 'लंबित', zh: '待定', tr: 'Bekleyen',
  },
  earned: {
    en: 'Earned', ru: 'Заработано', ua: 'Зароблено', es: 'Ganado', pt: 'Ganho', fr: 'Gagné',
    de: 'Verdient', pl: 'Zarobiono', vi: 'Kiếm được', ko: '수익', ja: '獲得', hi: 'अर्जित', zh: '已赚取', tr: 'Kazanılan',
  },
  earned_you: {
    en: 'earned you', ru: 'принёс вам', ua: 'приніс вам', es: 'te ganó', pt: 'ganhou para você', fr: 'vous a rapporté',
    de: 'brachte Ihnen', pl: 'zarobił dla ciebie', vi: 'kiếm cho bạn', ko: '수익 기여', ja: 'あなたの収益', hi: 'आपके लिए कमाया', zh: '为你赚取', tr: 'size kazandırdı',
  },
  no_referrals: {
    en: 'No referrals yet. Share your link!', ru: 'Пока нет рефералов. Поделитесь ссылкой!', ua: 'Ще немає рефералів. Поділіться посиланням!',
    es: '¡Aún no hay referidos! ¡Comparte tu enlace!', pt: 'Ainda sem indicações. Compartilhe seu link!', fr: 'Pas encore de filleuls. Partagez votre lien !',
    de: 'Noch keine Empfehlungen. Teilen Sie Ihren Link!', pl: 'Brak poleceń. Udostępnij swój link!', vi: 'Chưa có giới thiệu. Chia sẻ liên kết!',
    ko: '아직 추천인이 없습니다. 링크를 공유하세요!', ja: 'まだ紹介はありません。リンクを共有してください！', hi: 'अभी तक कोई रेफरल नहीं। अपना लिंक साझा करें!',
    zh: '还没有推荐人。分享你的链接吧！', tr: 'Henüz referans yok. Bağlantınızı paylaşın!',
  },
  view_tree: {
    en: 'View Referral Tree', ru: 'Показать дерево рефералов', ua: 'Показати дерево рефералів', es: 'Ver árbol de referidos',
    pt: 'Ver árvore de indicações', fr: "Voir l'arbre des filleuls", de: 'Empfehlungsbaum anzeigen', pl: 'Pokaż drzewo poleceń',
    vi: 'Xem cây giới thiệu', ko: '추천 트리 보기', ja: '紹介ツリー表示', hi: 'रेफरल ट्री देखें', zh: '查看推荐树', tr: 'Referans Ağacını Gör',
  },
  referral_list: {
    en: 'Referral List', ru: 'Список рефералов', ua: 'Список рефералів', es: 'Lista de referidos', pt: 'Lista de indicações', fr: 'Liste des filleuls',
    de: 'Empfehlungsliste', pl: 'Lista poleceń', vi: 'Danh sách giới thiệu', ko: '추천인 목록', ja: '紹介リスト', hi: 'रेफरल सूची', zh: '推荐列表', tr: 'Referans Listesi',
  },
  active_refs: {
    en: 'Active', ru: 'Активные', ua: 'Активні', es: 'Activos', pt: 'Ativos', fr: 'Actifs',
    de: 'Aktiv', pl: 'Aktywni', vi: 'Hoạt động', ko: '활성', ja: 'アクティブ', hi: 'सक्रिय', zh: '活跃', tr: 'Aktif',
  },
  pending_refs: {
    en: 'Pending — waiting to buy first level', ru: 'Ожидают — ещё не купили первый уровень', ua: 'Очікують — ще не купили перший рівень',
    es: 'Pendiente — esperando comprar el primer nivel', pt: 'Pendente — aguardando comprar o primeiro nível', fr: 'En attente — n\'a pas encore acheté le premier niveau',
    de: 'Ausstehend — wartet auf den Kauf der ersten Stufe', pl: 'Oczekujący — czeka na zakup pierwszego poziomu', vi: 'Đang chờ — chưa mua cấp đầu tiên',
    ko: '대기중 — 첫 레벨 구매 대기', ja: '保留中 — 最初のレベル購入待ち', hi: 'लंबित — पहला स्तर खरीदने की प्रतीक्षा', zh: '待定 — 等待购买第一级', tr: 'Bekliyor — ilk seviyeyi satın almayı bekliyor',
  },

  // ==================== STATS ====================
  my_earnings: {
    en: 'My Earnings', ru: 'Мои заработки', ua: 'Мої заробітки', es: 'Mis ganancias', pt: 'Meus ganhos', fr: 'Mes gains',
    de: 'Meine Verdienste', pl: 'Moje zarobki', vi: 'Thu nhập của tôi', ko: '내 수익', ja: '私の収益', hi: 'मेरी कमाई', zh: '我的收入', tr: 'Kazançlarım',
  },
  total_earned_all: {
    en: 'Total Earned (All Time)', ru: 'Всего заработано (за всё время)', ua: 'Всього зароблено (за весь час)',
    es: 'Total ganado (todo el tiempo)', pt: 'Total ganho (todo o período)', fr: 'Total gagné (depuis le début)',
    de: 'Gesamt verdient (aller Zeiten)', pl: 'Łącznie zarobiono (cały czas)', vi: 'Tổng thu nhập (tất cả)',
    ko: '총 수익 (전체)', ja: '総収益（全期間）', hi: 'कुल कमाई (सभी समय)', zh: '总收入（全部时间）', tr: 'Toplam Kazanç (Tüm Zamanlar)',
  },
  earned_today: {
    en: 'Earned Today', ru: 'Заработано сегодня', ua: 'Зароблено сьогодні', es: 'Ganado hoy', pt: 'Ganho hoje', fr: "Gagné aujourd'hui",
    de: 'Heute verdient', pl: 'Zarobiono dzisiaj', vi: 'Kiếm hôm nay', ko: '오늘 수익', ja: '今日の収益', hi: 'आज की कमाई', zh: '今日收入', tr: 'Bugün Kazanılan',
  },
  earned_week: {
    en: 'Earned This Week', ru: 'Заработано за неделю', ua: 'Зароблено за тиждень', es: 'Ganado esta semana', pt: 'Ganho esta semana', fr: 'Gagné cette semaine',
    de: 'Diese Woche verdient', pl: 'Zarobiono w tym tygodniu', vi: 'Kiếm tuần này', ko: '이번 주 수익', ja: '今週の収益', hi: 'इस सप्ताह की कमाई', zh: '本周收入', tr: 'Bu Hafta Kazanılan',
  },
  earned_month: {
    en: 'Earned This Month', ru: 'Заработано за месяц', ua: 'Зароблено за місяць', es: 'Ganado este mes', pt: 'Ganho este mês', fr: 'Gagné ce mois',
    de: 'Diesen Monat verdient', pl: 'Zarobiono w tym miesiącu', vi: 'Kiếm tháng này', ko: '이번 달 수익', ja: '今月の収益', hi: 'इस महीने की कमाई', zh: '本月收入', tr: 'Bu Ay Kazanılan',
  },
  earned_year: {
    en: 'Earned This Year', ru: 'Заработано за год', ua: 'Зароблено за рік', es: 'Ganado este año', pt: 'Ganho este ano', fr: 'Gagné cette année',
    de: 'Dieses Jahr verdient', pl: 'Zarobiono w tym roku', vi: 'Kiếm năm nay', ko: '올해 수익', ja: '今年の収益', hi: 'इस साल की कमाई', zh: '今年收入', tr: 'Bu Yıl Kazanılan',
  },
  earnings_calc: {
    en: 'Earnings Calculator', ru: 'Калькулятор доходности', ua: 'Калькулятор прибутковості', es: 'Calculadora de ganancias', pt: 'Calculadora de ganhos', fr: 'Calculateur de gains',
    de: 'Verdienstrechner', pl: 'Kalkulator zarobków', vi: 'Máy tính thu nhập', ko: '수익 계산기', ja: '収益計算機', hi: 'कमाई कैलकुलेटर', zh: '收益计算器', tr: 'Kazanç Hesaplayıcı',
  },
  your_direct_refs: {
    en: 'Your direct referrals', ru: 'Ваши прямые рефералы', ua: 'Ваші прямі реферали', es: 'Tus referidos directos', pt: 'Seus indicados diretos', fr: 'Vos filleuls directs',
    de: 'Ihre direkten Empfehlungen', pl: 'Twoje bezpośrednie polecenia', vi: 'Giới thiệu trực tiếp', ko: '직접 추천인', ja: '直接紹介', hi: 'आपके सीधे रेफरल', zh: '你的直接推荐', tr: 'Doğrudan referanslarınız',
  },
  each_ref_brings: {
    en: 'Each referral brings', ru: 'Каждый реферал приводит', ua: 'Кожен реферал приводить', es: 'Cada referido trae', pt: 'Cada indicado traz', fr: 'Chaque filleul amène',
    de: 'Jede Empfehlung bringt', pl: 'Każde polecenie przynosi', vi: 'Mỗi giới thiệu mang', ko: '각 추천인이 데려오는 수', ja: '各紹介が連れてくる人数', hi: 'प्रत्येक रेफरल लाता है', zh: '每个推荐人带来', tr: 'Her referans getirir',
  },
  everyone_buys_to: {
    en: 'Everyone buys up to level', ru: 'Все покупают до уровня', ua: 'Всі купують до рівня', es: 'Todos compran hasta el nivel', pt: 'Todos compram até o nível', fr: "Tout le monde achète jusqu'au niveau",
    de: 'Jeder kauft bis Stufe', pl: 'Wszyscy kupują do poziomu', vi: 'Mọi người mua đến cấp', ko: '모두 구매하는 레벨', ja: '全員が購入するレベル', hi: 'सभी स्तर तक खरीदते हैं', zh: '每个人购买到级别', tr: 'Herkes seviyeye kadar satın alır',
  },
  network_size: {
    en: 'Network size', ru: 'Размер сети', ua: 'Розмір мережі', es: 'Tamaño de la red', pt: 'Tamanho da rede', fr: 'Taille du réseau',
    de: 'Netzwerkgröße', pl: 'Rozmiar sieci', vi: 'Quy mô mạng', ko: '네트워크 규모', ja: 'ネットワーク規模', hi: 'नेटवर्क आकार', zh: '网络规模', tr: 'Ağ büyüklüğü',
  },
  your_investment: {
    en: 'Your investment', ru: 'Ваши инвестиции', ua: 'Ваші інвестиції', es: 'Tu inversión', pt: 'Seu investimento', fr: 'Votre investissement',
    de: 'Ihre Investition', pl: 'Twoja inwestycja', vi: 'Đầu tư của bạn', ko: '투자금', ja: '投資額', hi: 'आपका निवेश', zh: '你的投资', tr: 'Yatırımınız',
  },
  estimated_earnings: {
    en: 'Estimated earnings', ru: 'Ожидаемый доход', ua: 'Очікуваний дохід', es: 'Ganancias estimadas', pt: 'Ganhos estimados', fr: 'Gains estimés',
    de: 'Geschätzte Verdienste', pl: 'Szacunkowe zarobki', vi: 'Thu nhập ước tính', ko: '예상 수익', ja: '予想収益', hi: 'अनुमानित कमाई', zh: '预计收入', tr: 'Tahmini kazanç',
  },
  leaderboard: {
    en: 'Leaderboard', ru: 'Лидерборд', ua: 'Лідерборд', es: 'Clasificación', pt: 'Classificação', fr: 'Classement',
    de: 'Rangliste', pl: 'Ranking', vi: 'Bảng xếp hạng', ko: '리더보드', ja: 'リーダーボード', hi: 'लीडरबोर्ड', zh: '排行榜', tr: 'Sıralama',
  },

  // ==================== SETTINGS ====================
  settings: {
    en: 'Settings', ru: 'Настройки', ua: 'Налаштування', es: 'Ajustes', pt: 'Configurações', fr: 'Paramètres',
    de: 'Einstellungen', pl: 'Ustawienia', vi: 'Cài đặt', ko: '설정', ja: '設定', hi: 'सेटिंग्स', zh: '设置', tr: 'Ayarlar',
  },
  theme: {
    en: 'Theme', ru: 'Тема', ua: 'Тема', es: 'Tema', pt: 'Tema', fr: 'Thème',
    de: 'Design', pl: 'Motyw', vi: 'Giao diện', ko: '테마', ja: 'テーマ', hi: 'थीम', zh: '主题', tr: 'Tema',
  },
  theme_sub: {
    en: 'Switch between Dark and B&W', ru: 'Переключить между тёмной и ч/б', ua: 'Переключити між темною та ч/б',
    es: 'Cambiar entre Oscuro y B&N', pt: 'Alternar entre Escuro e P&B', fr: 'Basculer entre Sombre et N&B',
    de: 'Zwischen Dunkel und S/W wechseln', pl: 'Przełącz między ciemnym a cz/b', vi: 'Chuyển đổi giữa Tối và Đen/Trắng',
    ko: '다크와 흑백 전환', ja: 'ダークとモノクロを切替', hi: 'डार्क और ब्लैक/व्हाइट स्विच करें', zh: '在深色和黑白之间切换', tr: 'Koyu ve S/B arasında geçiş yap',
  },
  sound: {
    en: 'Sound', ru: 'Звук', ua: 'Звук', es: 'Sonido', pt: 'Som', fr: 'Son',
    de: 'Ton', pl: 'Dźwięk', vi: 'Âm thanh', ko: '소리', ja: 'サウンド', hi: 'ध्वनि', zh: '声音', tr: 'Ses',
  },
  sound_sub: {
    en: 'Sounds on actions and notifications', ru: 'Звуки при действиях и уведомлениях', ua: 'Звуки при діях та сповіщеннях',
    es: 'Sonidos en acciones y notificaciones', pt: 'Sons em ações e notificações', fr: 'Sons pour les actions et notifications',
    de: 'Töne bei Aktionen und Benachrichtigungen', pl: 'Dźwięki przy akcjach i powiadomieniach', vi: 'Âm thanh khi thao tác và thông báo',
    ko: '액션 및 알림 소리', ja: 'アクションと通知のサウンド', hi: 'क्रियाओं और सूचनाओं पर ध्वनि', zh: '操作和通知声音', tr: 'Eylem ve bildirimlerde ses',
  },
  vibration: {
    en: 'Vibration', ru: 'Вибрация', ua: 'Вібрація', es: 'Vibración', pt: 'Vibração', fr: 'Vibration',
    de: 'Vibration', pl: 'Wibracja', vi: 'Rung', ko: '진동', ja: 'バイブレーション', hi: 'कंपन', zh: '振动', tr: 'Titreşim',
  },
  vibration_sub: {
    en: 'Haptic feedback on events', ru: 'Тактильный отклик при событиях', ua: 'Тактильний відгук при подіях',
    es: 'Respuesta háptica en eventos', pt: 'Feedback háptico em eventos', fr: 'Retour haptique sur les événements',
    de: 'Haptisches Feedback bei Ereignissen', pl: 'Wibracja przy zdarzeniach', vi: 'Phản hồi rung khi có sự kiện',
    ko: '이벤트 시 햅틱 피드백', ja: 'イベント時の触覚フィードバック', hi: 'इवेंट पर हैप्टिक फीडबैक', zh: '事件触觉反馈', tr: 'Olaylarda dokunsal geri bildirim',
  },
  language: {
    en: 'Language', ru: 'Язык', ua: 'Мова', es: 'Idioma', pt: 'Idioma', fr: 'Langue',
    de: 'Sprache', pl: 'Język', vi: 'Ngôn ngữ', ko: '언어', ja: '言語', hi: 'भाषा', zh: '语言', tr: 'Dil',
  },

  // ==================== SHARE ====================
  share_title: {
    en: 'Share Referral Link', ru: 'Поделиться реферальной ссылкой', ua: 'Поділитися реферальним посиланням',
    es: 'Compartir enlace de referido', pt: 'Compartilhar link de indicação', fr: 'Partager le lien de parrainage',
    de: 'Empfehlungslink teilen', pl: 'Udostępnij link polecający', vi: 'Chia sẻ liên kết giới thiệu',
    ko: '추천 링크 공유', ja: '紹介リンクを共有', hi: 'रेफरल लिंक साझा करें', zh: '分享推荐链接', tr: 'Referans linkini paylaş',
  },
  share_sub: {
    en: 'Invite friends and earn from their activity', ru: 'Приглашайте друзей и зарабатывайте с их активности', ua: 'Запрошуйте друзів та заробляйте з їхньої активності',
    es: 'Invita amigos y gana con su actividad', pt: 'Convide amigos e ganhe com a atividade deles', fr: "Invitez des amis et gagnez grâce à leur activité",
    de: 'Laden Sie Freunde ein und verdienen Sie an deren Aktivität', pl: 'Zaproś znajomych i zarabiaj na ich aktywności', vi: 'Mời bạn bè và kiếm từ hoạt động của họ',
    ko: '친구를 초대하고 활동으로 수익을 얻으세요', ja: '友達を招待して活動から収益を得ましょう', hi: 'दोस्तों को आमंत्रित करें और उनकी गतिविधि से कमाएं', zh: '邀请朋友并从他们的活动中赚取', tr: 'Arkadaşlarınızı davet edin ve aktivitelerinden kazanın',
  },
  share_via: {
    en: 'Share via', ru: 'Поделиться через', ua: 'Поділитися через', es: 'Compartir vía', pt: 'Compartilhar via', fr: 'Partager via',
    de: 'Teilen über', pl: 'Udostępnij przez', vi: 'Chia sẻ qua', ko: '공유 방법', ja: '共有方法', hi: 'के माध्यम से साझा करें', zh: '分享到', tr: 'Şununla paylaş',
  },
  copy: {
    en: 'Copy', ru: 'Копировать', ua: 'Копіювати', es: 'Copiar', pt: 'Copiar', fr: 'Copier',
    de: 'Kopieren', pl: 'Kopiuj', vi: 'Sao chép', ko: '복사', ja: 'コピー', hi: 'कॉपी', zh: '复制', tr: 'Kopyala',
  },
  copied: {
    en: 'Copied!', ru: 'Скопировано!', ua: 'Скопійовано!', es: '¡Copiado!', pt: 'Copiado!', fr: 'Copié !',
    de: 'Kopiert!', pl: 'Skopiowano!', vi: 'Đã sao chép!', ko: '복사됨!', ja: 'コピーしました！', hi: 'कॉपी किया!', zh: '已复制！', tr: 'Kopyalandı!',
  },

  // ==================== MISC ====================
  no_activity: {
    en: 'No activity yet', ru: 'Пока нет активности', ua: 'Ще немає активності', es: 'Sin actividad aún', pt: 'Sem atividade ainda', fr: "Pas encore d'activité",
    de: 'Noch keine Aktivität', pl: 'Brak aktywności', vi: 'Chưa có hoạt động', ko: '아직 활동 없음', ja: 'まだアクティビティはありません', hi: 'अभी तक कोई गतिविधि नहीं', zh: '暂无活动', tr: 'Henüz aktivite yok',
  },
  no_data: {
    en: 'No data yet', ru: 'Пока нет данных', ua: 'Ще немає даних', es: 'Sin datos aún', pt: 'Sem dados ainda', fr: 'Pas encore de données',
    de: 'Noch keine Daten', pl: 'Brak danych', vi: 'Chưa có dữ liệu', ko: '아직 데이터 없음', ja: 'まだデータはありません', hi: 'अभी तक कोई डेटा नहीं', zh: '暂无数据', tr: 'Henüz veri yok',
  },
  no_earnings: {
    en: 'No earnings yet', ru: 'Пока нет заработков', ua: 'Ще немає заробітків', es: 'Sin ganancias aún', pt: 'Sem ganhos ainda', fr: 'Pas encore de gains',
    de: 'Noch keine Verdienste', pl: 'Brak zarobków', vi: 'Chưa có thu nhập', ko: '아직 수익 없음', ja: 'まだ収益はありません', hi: 'अभी तक कोई कमाई नहीं', zh: '暂无收入', tr: 'Henüz kazanç yok',
  },
  connecting: {
    en: 'Connecting...', ru: 'Подключение...', ua: "Під'єднання...", es: 'Conectando...', pt: 'Conectando...', fr: 'Connexion...',
    de: 'Verbinden...', pl: 'Łączenie...', vi: 'Đang kết nối...', ko: '연결 중...', ja: '接続中...', hi: 'कनेक्ट हो रहा है...', zh: '连接中...', tr: 'Bağlanıyor...',
  },
  registering: {
    en: 'Registering...', ru: 'Регистрация...', ua: 'Реєстрація...', es: 'Registrando...', pt: 'Registrando...', fr: 'Inscription...',
    de: 'Registrierung...', pl: 'Rejestracja...', vi: 'Đang đăng ký...', ko: '등록 중...', ja: '登録中...', hi: 'पंजीकरण हो रहा है...', zh: '注册中...', tr: 'Kayıt olunuyor...',
  },
  connected: {
    en: 'Connected!', ru: 'Подключено!', ua: "Під'єднано!", es: '¡Conectado!', pt: 'Conectado!', fr: 'Connecté !',
    de: 'Verbunden!', pl: 'Połączono!', vi: 'Đã kết nối!', ko: '연결됨!', ja: '接続完了！', hi: 'कनेक्ट हो गया!', zh: '已连接！', tr: 'Bağlandı!',
  },
  welcome: {
    en: 'Welcome!', ru: 'Добро пожаловать!', ua: 'Ласкаво просимо!', es: '¡Bienvenido!', pt: 'Bem-vindo!', fr: 'Bienvenue !',
    de: 'Willkommen!', pl: 'Witamy!', vi: 'Chào mừng!', ko: '환영합니다!', ja: 'ようこそ！', hi: 'स्वागत है!', zh: '欢迎！', tr: 'Hoş geldiniz!',
  },
  mint_usdc: {
    en: 'Mint $10,000 Test USDC', ru: 'Получить $10,000 тестовых USDC', ua: 'Отримати $10,000 тестових USDC',
    es: 'Obtener $10,000 USDC de prueba', pt: 'Cunhar $10.000 USDC de teste', fr: 'Créer 10 000 $ USDC de test',
    de: '$10.000 Test-USDC erhalten', pl: 'Uzyskaj $10,000 testowych USDC', vi: 'Nhận $10,000 USDC thử nghiệm',
    ko: '테스트 USDC $10,000 발행', ja: 'テストUSDC$10,000を発行', hi: '$10,000 टेस्ट USDC प्राप्त करें', zh: '铸造$10,000测试USDC', tr: '$10,000 Test USDC Al',
  },
  show_more: {
    en: 'Show more...', ru: 'Показать ещё...', ua: 'Показати ще...', es: 'Mostrar más...', pt: 'Mostrar mais...', fr: 'Afficher plus...',
    de: 'Mehr anzeigen...', pl: 'Pokaż więcej...', vi: 'Xem thêm...', ko: '더 보기...', ja: 'もっと表示...', hi: 'और दिखाएं...', zh: '显示更多...', tr: 'Daha fazla göster...',
  },
  auto_buy: {
    en: 'Auto-buy Level', ru: 'Автопокупка уровня', ua: 'Автокупівля рівня', es: 'Compra automática del nivel', pt: 'Compra automática do nível', fr: 'Achat automatique du niveau',
    de: 'Automatischer Kauf der Stufe', pl: 'Automatyczny zakup poziomu', vi: 'Tự động mua cấp', ko: '레벨 자동 구매', ja: 'レベル自動購入', hi: 'स्तर ऑटो-खरीद', zh: '自动购买级别', tr: 'Seviye Otomatik Satın Al',
  },

  // ==================== FILTER CHIPS ====================
  payouts: {
    en: 'Payouts', ru: 'Выплаты', ua: 'Виплати', es: 'Pagos', pt: 'Pagamentos', fr: 'Paiements',
    de: 'Auszahlungen', pl: 'Wypłaty', vi: 'Thanh toán', ko: '지급', ja: '支払い', hi: 'भुगतान', zh: '支付', tr: 'Ödemeler',
  },
  frozen_filter: {
    en: 'Frozen', ru: 'Заморозка', ua: 'Заморозка', es: 'Congelado', pt: 'Congelado', fr: 'Gelé',
    de: 'Eingefroren', pl: 'Zamrożone', vi: 'Đóng băng', ko: '동결', ja: '凍結', hi: 'फ्रोज़न', zh: '冻结', tr: 'Dondurulmuş',
  },
  spillover_filter: {
    en: 'Spillover', ru: 'Спиловер', ua: 'Спіловер', es: 'Desborde', pt: 'Transbordamento', fr: 'Débordement',
    de: 'Spillover', pl: 'Spillover', vi: 'Tràn', ko: '스필오버', ja: 'スピルオーバー', hi: 'स्पिलओवर', zh: '溢出', tr: 'Taşma',
  },
  reactivation_filter: {
    en: 'Reactivation', ru: 'Реактивация', ua: 'Реактивація', es: 'Reactivación', pt: 'Reativação', fr: 'Réactivation',
    de: 'Reaktivierung', pl: 'Reaktywacja', vi: 'Kích hoạt lại', ko: '재활성화', ja: '再活性化', hi: 'पुनः सक्रियण', zh: '重新激活', tr: 'Yeniden etkinleştirme',
  },
  bonus_filter: {
    en: 'Bonus', ru: 'Бонус', ua: 'Бонус', es: 'Bono', pt: 'Bônus', fr: 'Bonus',
    de: 'Bonus', pl: 'Bonus', vi: 'Thưởng', ko: '보너스', ja: 'ボーナス', hi: 'बोनस', zh: '奖金', tr: 'Bonus',
  },
  auto_open: {
    en: 'Auto-open', ru: 'Автооткрытие', ua: 'Автовідкриття', es: 'Apertura automática', pt: 'Abertura automática', fr: 'Ouverture auto',
    de: 'Auto-Öffnung', pl: 'Autootwarcie', vi: 'Tự mở', ko: '자동열림', ja: '自動開放', hi: 'ऑटो-ओपन', zh: '自动开启', tr: 'Otomatik açma',
  },
  congrats_title: {
    en: 'Level 8 Unlocked FREE!', ru: 'Уровень 8 открыт БЕСПЛАТНО!', ua: 'Рівень 8 відкритий БЕЗКОШТОВНО!',
    es: '¡Nivel 8 desbloqueado GRATIS!', pt: 'Nível 8 desbloqueado GRÁTIS!', fr: 'Niveau 8 débloqué GRATUITEMENT !',
    de: 'Stufe 8 KOSTENLOS freigeschaltet!', pl: 'Poziom 8 odblokowany ZA DARMO!', vi: 'Cấp 8 mở khóa MIỄN PHÍ!',
    ko: '레벨 8 무료 해제!', ja: 'レベル8無料解除！', hi: 'लेवल 8 मुफ्त अनलॉक!', zh: '第8级免费解锁！', tr: 'Seviye 8 ÜCRETSİZ açıldı!',
  },
  you_saved: {
    en: 'You saved', ru: 'Вы сэкономили', ua: 'Ви зекономили', es: 'Ahorraste', pt: 'Você economizou', fr: 'Vous avez économisé',
    de: 'Sie haben gespart', pl: 'Zaoszczędziłeś', vi: 'Bạn tiết kiệm', ko: '절약 금액', ja: '節約額', hi: 'आपने बचाया', zh: '您节省了', tr: 'Tasarruf ettiniz',
  },
  lets_go: {
    en: "LET'S GO!", ru: 'ПОЕХАЛИ!', ua: 'ПОЇХАЛИ!', es: '¡VAMOS!', pt: 'VAMOS!', fr: "C'EST PARTI !",
    de: "LOS GEHT'S!", pl: 'JEDZIEMY!', vi: 'BẮT ĐẦU!', ko: '시작!', ja: 'さあ行こう！', hi: 'चलो शुरू करें!', zh: '开始吧！', tr: 'HADI BAŞLAYALIM!',
  },
  pinch_zoom: {
    en: 'Pinch to zoom', ru: 'Щипок для масштаба', ua: 'Щипок для масштабу', es: 'Pellizca para zoom', pt: 'Aperte para zoom',
    fr: 'Pincez pour zoomer', de: 'Zum Zoomen zusammendrücken', pl: 'Ściśnij aby powiększyć', vi: 'Chụm để thu phóng',
    ko: '핀치로 확대/축소', ja: 'ピンチでズーム', hi: 'ज़ूम के लिए पिंच करें', zh: '捏合缩放', tr: 'Yakınlaştırmak için sıkıştırın',
  },
  reset: {
    en: 'Reset', ru: 'Сброс', ua: 'Скинути', es: 'Restablecer', pt: 'Redefinir', fr: 'Réinitialiser',
    de: 'Zurücksetzen', pl: 'Resetuj', vi: 'Đặt lại', ko: '초기화', ja: 'リセット', hi: 'रीसेट', zh: '重置', tr: 'Sıfırla',
  },
  dark: {
    en: 'Dark', ru: 'Тёмная', ua: 'Темна', es: 'Oscuro', pt: 'Escuro', fr: 'Sombre',
    de: 'Dunkel', pl: 'Ciemny', vi: 'Tối', ko: '다크', ja: 'ダーク', hi: 'डार्क', zh: '深色', tr: 'Koyu',
  },
  bw: {
    en: 'B&W', ru: 'Ч/Б', ua: 'Ч/Б', es: 'B&N', pt: 'P&B', fr: 'N&B',
    de: 'S/W', pl: 'Cz/B', vi: 'Đ/T', ko: '흑백', ja: 'モノクロ', hi: 'ब/व', zh: '黑白', tr: 'S/B',
  },
  today: {
    en: 'Today', ru: 'Сегодня', ua: 'Сьогодні', es: 'Hoy', pt: 'Hoje', fr: "Aujourd'hui",
    de: 'Heute', pl: 'Dzisiaj', vi: 'Hôm nay', ko: '오늘', ja: '今日', hi: 'आज', zh: '今天', tr: 'Bugün',
  },
  week: {
    en: 'Week', ru: 'Неделя', ua: 'Тиждень', es: 'Semana', pt: 'Semana', fr: 'Semaine',
    de: 'Woche', pl: 'Tydzień', vi: 'Tuần', ko: '주간', ja: '週間', hi: 'सप्ताह', zh: '周', tr: 'Hafta',
  },
  month: {
    en: 'Month', ru: 'Месяц', ua: 'Місяць', es: 'Mes', pt: 'Mês', fr: 'Mois',
    de: 'Monat', pl: 'Miesiąc', vi: 'Tháng', ko: '월간', ja: '月間', hi: 'महीना', zh: '月', tr: 'Ay',
  },
  year: {
    en: 'Year', ru: 'Год', ua: 'Рік', es: 'Año', pt: 'Ano', fr: 'Année',
    de: 'Jahr', pl: 'Rok', vi: 'Năm', ko: '연간', ja: '年間', hi: 'वर्ष', zh: '年', tr: 'Yıl',
  },

  // ==================== FAQ ====================
  faq_bonus_title: {
    en: 'How do I get Level 8 for free?', ru: 'Как получить Уровень 8 бесплатно?', ua: 'Як отримати Рівень 8 безкоштовно?',
    es: '¿Cómo obtengo el Nivel 8 gratis?', pt: 'Como obter o Nível 8 de graça?', fr: 'Comment obtenir le Niveau 8 gratuitement ?',
    de: 'Wie bekomme ich Stufe 8 kostenlos?', pl: 'Jak zdobyć Poziom 8 za darmo?', vi: 'Làm sao để nhận Cấp 8 miễn phí?',
    ko: '레벨 8을 무료로 받는 방법은?', ja: 'レベル8を無料で入手するには？', hi: 'लेवल 8 मुफ्त में कैसे पाएं?',
    zh: '如何免费获得第8级？', tr: 'Seviye 8\'i ücretsiz nasıl alırım?',
  },
  faq_bonus_headline: {
    en: 'Buy 7 levels in 180 minutes → Level 8 is FREE', ru: 'Купите 7 уровней за 180 минут → Уровень 8 БЕСПЛАТНО',
    ua: 'Купіть 7 рівнів за 180 хвилин → Рівень 8 БЕЗКОШТОВНО', es: 'Compra 7 niveles en 180 minutos → ¡Nivel 8 GRATIS!',
    pt: 'Compre 7 níveis em 180 minutos → Nível 8 GRÁTIS', fr: 'Achetez 7 niveaux en 180 minutes → Niveau 8 GRATUIT',
    de: 'Kaufen Sie 7 Stufen in 180 Minuten → Stufe 8 KOSTENLOS', pl: 'Kup 7 poziomów w 180 minut → Poziom 8 ZA DARMO',
    vi: 'Mua 7 cấp trong 180 phút → Cấp 8 MIỄN PHÍ', ko: '180분 안에 7레벨 구매 → 레벨 8 무료',
    ja: '180分以内に7レベル購入 → レベル8無料', hi: '180 मिनट में 7 लेवल खरीदें → लेवल 8 मुफ्त',
    zh: '180分钟内购买7个级别 → 第8级免费', tr: '180 dakikada 7 seviye al → Seviye 8 ÜCRETSİZ',
  },
  faq_what_is: {
    en: 'What is XionNET?', ru: 'Что такое XionNET?', ua: 'Що таке XionNET?', es: '¿Qué es XionNET?', pt: 'O que é XionNET?',
    fr: "Qu'est-ce que XionNET ?", de: 'Was ist XionNET?', pl: 'Czym jest XionNET?', vi: 'XionNET là gì?',
    ko: 'XionNET이란?', ja: 'XionNETとは？', hi: 'XionNET क्या है?', zh: '什么是XionNET？', tr: 'XionNET nedir?',
  },
  faq_what_is_a: {
    en: 'Decentralized protocol on Polygon blockchain. All payments in USDC go directly to your wallet through a smart contract — no middlemen, no central authority. The contract handles all distributions automatically and transparently.',
    ru: 'Децентрализованный протокол на блокчейне Polygon. Все платежи в USDC идут напрямую на ваш кошелёк через смарт-контракт — без посредников и центрального управления. Контракт автоматически и прозрачно распределяет все средства.',
    ua: 'Децентралізований протокол на блокчейні Polygon. Всі платежі в USDC йдуть прямо на ваш гаманець через смарт-контракт — без посередників та центрального управління.',
    es: 'Protocolo descentralizado en la blockchain Polygon. Todos los pagos en USDC van directamente a tu wallet a través de un contrato inteligente — sin intermediarios.',
    pt: 'Protocolo descentralizado na blockchain Polygon. Todos os pagamentos em USDC vão diretamente para sua carteira através de um contrato inteligente.',
    fr: 'Protocole décentralisé sur la blockchain Polygon. Tous les paiements en USDC vont directement dans votre portefeuille via un contrat intelligent.',
    de: 'Dezentrales Protokoll auf der Polygon-Blockchain. Alle USDC-Zahlungen gehen direkt über einen Smart Contract an Ihr Wallet.',
    pl: 'Zdecentralizowany protokół na blockchainie Polygon. Wszystkie płatności USDC trafiają bezpośrednio na twój portfel przez smart kontrakt.',
    vi: 'Giao thức phi tập trung trên blockchain Polygon. Tất cả thanh toán USDC đi thẳng đến ví của bạn qua hợp đồng thông minh.',
    ko: 'Polygon 블록체인의 탈중앙화 프로토콜. 모든 USDC 결제가 스마트 컨트랙트를 통해 직접 지갑으로 전송됩니다.',
    ja: 'Polygonブロックチェーン上の分散型プロトコル。すべてのUSDC支払いがスマートコントラクトを通じて直接ウォレットに送られます。',
    hi: 'Polygon ब्लॉकचेन पर विकेंद्रीकृत प्रोटोकॉल। सभी USDC भुगतान स्मार्ट कॉन्ट्रैक्ट के माध्यम से सीधे आपके वॉलेट में जाते हैं।',
    zh: 'Polygon区块链上的去中心化协议。所有USDC支付通过智能合约直接到达您的钱包。',
    tr: 'Polygon blok zincirinde merkeziyetsiz protokol. Tüm USDC ödemeleri akıllı sözleşme aracılığıyla doğrudan cüzdanınıza gider.',
  },
  faq_slots: {
    en: 'How do the 4 slots work?', ru: 'Как работают 4 слота?', ua: 'Як працюють 4 слоти?', es: '¿Cómo funcionan los 4 espacios?',
    pt: 'Como funcionam os 4 espaços?', fr: 'Comment fonctionnent les 4 emplacements ?', de: 'Wie funktionieren die 4 Plätze?',
    pl: 'Jak działają 4 sloty?', vi: '4 ô hoạt động như thế nào?', ko: '4개 슬롯은 어떻게 작동하나요?',
    ja: '4つのスロットはどう機能しますか？', hi: '4 स्लॉट कैसे काम करते हैं?', zh: '4个插槽如何工作？', tr: '4 slot nasıl çalışır?',
  },
  faq_slot1: {
    en: 'Slot 1 — Direct payout to your wallet', ru: 'Слот 1 — Прямая выплата на ваш кошелёк', ua: 'Слот 1 — Пряма виплата на ваш гаманець',
    es: 'Espacio 1 — Pago directo a tu wallet', pt: 'Espaço 1 — Pagamento direto para sua carteira', fr: 'Emplacement 1 — Paiement direct dans votre portefeuille',
    de: 'Platz 1 — Direktauszahlung an Ihr Wallet', pl: 'Slot 1 — Bezpośrednia wypłata na portfel', vi: 'Ô 1 — Thanh toán trực tiếp vào ví',
    ko: '슬롯 1 — 지갑으로 직접 지급', ja: 'スロット1 — ウォレットへの直接支払い', hi: 'स्लॉट 1 — वॉलेट में सीधा भुगतान',
    zh: '插槽1 — 直接支付到钱包', tr: 'Slot 1 — Cüzdana doğrudan ödeme',
  },
  faq_slot2: {
    en: 'Slot 2 — If next level owned: payout. If not: funds held temporarily for auto-buy', ru: 'Слот 2 — Если следующий уровень куплен: выплата. Если нет: средства временно заморожены для автопокупки',
    ua: 'Слот 2 — Якщо наступний рівень куплений: виплата. Якщо ні: кошти тимчасово заморожені', es: 'Espacio 2 — Si tienes el siguiente nivel: pago. Si no: fondos retenidos para compra automática',
    pt: 'Espaço 2 — Se o próximo nível comprado: pagamento. Se não: fundos retidos para compra automática', fr: 'Emplacement 2 — Si niveau suivant acheté: paiement. Sinon: fonds retenus pour achat automatique',
    de: 'Platz 2 — Wenn nächste Stufe vorhanden: Auszahlung. Wenn nicht: Gelder für Autokauf einbehalten', pl: 'Slot 2 — Jeśli masz kolejny poziom: wypłata. Jeśli nie: środki zamrożone do autokupna',
    vi: 'Ô 2 — Nếu có cấp tiếp: thanh toán. Nếu không: giữ để tự động mua', ko: '슬롯 2 — 다음 레벨 보유시: 지급. 아닐시: 자동구매용 보류',
    ja: 'スロット2 — 次レベル所有時: 支払い。未所有時: 自動購入用に保留', hi: 'स्लॉट 2 — अगला स्तर है: भुगतान। नहीं: ऑटो-खरीद के लिए रोक',
    zh: '插槽2 — 有下一级：支付。没有：暂扣用于自动购买', tr: 'Slot 2 — Sonraki seviye varsa: ödeme. Yoksa: otomatik satın alma için bekletme',
  },
  faq_slot3: {
    en: 'Slot 3 — If funds were held: next level opens automatically (no fee!). Otherwise: direct payment',
    ru: 'Слот 3 — Если средства были заморожены: следующий уровень открывается автоматически (без комиссии!). Иначе: прямая выплата',
    ua: 'Слот 3 — Якщо кошти були заморожені: наступний рівень відкривається автоматично (без комісії!). Інакше: пряма виплата',
    es: 'Espacio 3 — Si los fondos fueron retenidos: el siguiente nivel se abre automáticamente (¡sin cargo!). Si no: pago directo',
    pt: 'Espaço 3 — Se fundos retidos: próximo nível abre automaticamente (sem taxa!). Senão: pagamento direto',
    fr: 'Emplacement 3 — Si fonds retenus: niveau suivant ouvert automatiquement (sans frais!). Sinon: paiement direct',
    de: 'Platz 3 — Wenn Gelder einbehalten: nächste Stufe öffnet automatisch (ohne Gebühr!). Sonst: Direktauszahlung',
    pl: 'Slot 3 — Jeśli środki zamrożone: kolejny poziom otwiera się automatycznie (bez opłat!). Inaczej: bezpośrednia wypłata',
    vi: 'Ô 3 — Nếu đã giữ tiền: cấp tiếp mở tự động (miễn phí!). Nếu không: thanh toán trực tiếp',
    ko: '슬롯 3 — 보류된 자금이 있으면: 다음 레벨 자동 해제(수수료 없음!). 없으면: 직접 지급',
    ja: 'スロット3 — 資金保留中: 次レベル自動解除（手数料なし！）。それ以外: 直接支払い',
    hi: 'स्लॉट 3 — रोकी गई धनराशि: अगला स्तर स्वतः खुलता है (शुल्क नहीं!)। अन्यथा: सीधा भुगतान',
    zh: '插槽3 — 如有冻结资金：下一级自动开启（免手续费！）。否则：直接支付',
    tr: 'Slot 3 — Bekletilen fonlar varsa: sonraki seviye otomatik açılır (ücretsiz!). Yoksa: doğrudan ödeme',
  },
  faq_slot4: {
    en: 'Slot 4 — Level resets for new cycle. Payment moves up the chain (spillover)',
    ru: 'Слот 4 — Уровень перезапускается для нового цикла. Платёж уходит вверх по цепочке (spillover)',
    ua: 'Слот 4 — Рівень перезапускається для нового циклу. Платіж йде вгору по ланцюжку (spillover)',
    es: 'Espacio 4 — El nivel se reinicia para un nuevo ciclo. El pago sube por la cadena (spillover)',
    pt: 'Espaço 4 — O nível reinicia para novo ciclo. O pagamento sobe pela cadeia (spillover)',
    fr: 'Emplacement 4 — Le niveau se réinitialise pour un nouveau cycle. Le paiement remonte la chaîne (spillover)',
    de: 'Platz 4 — Stufe wird für neuen Zyklus zurückgesetzt. Zahlung geht in der Kette nach oben (Spillover)',
    pl: 'Slot 4 — Poziom resetuje się na nowy cykl. Płatność idzie w górę łańcucha (spillover)',
    vi: 'Ô 4 — Cấp độ đặt lại cho chu kỳ mới. Thanh toán đi lên chuỗi (spillover)',
    ko: '슬롯 4 — 레벨이 새 사이클로 리셋. 결제가 체인 위로 이동 (스필오버)',
    ja: 'スロット4 — レベルが新サイクルにリセット。支払いがチェーン上位へ（スピルオーバー）',
    hi: 'स्लॉट 4 — नए चक्र के लिए स्तर रीसेट। भुगतान चेन में ऊपर जाता है (spillover)',
    zh: '插槽4 — 级别重置进入新周期。付款向上流动（溢出）',
    tr: 'Slot 4 — Seviye yeni döngü için sıfırlanır. Ödeme zincirde yukarı gider (spillover)',
  },
  faq_autounlock: {
    en: 'What is the auto-unlock feature?', ru: 'Что такое автоматическое открытие?', ua: 'Що таке автоматичне відкриття?',
    es: '¿Qué es el desbloqueo automático?', pt: 'O que é o desbloqueio automático?', fr: "Qu'est-ce que le déverrouillage automatique ?",
    de: 'Was ist die automatische Freischaltung?', pl: 'Czym jest automatyczne odblokowanie?', vi: 'Tính năng tự động mở khóa là gì?',
    ko: '자동 해제 기능이란?', ja: '自動解除機能とは？', hi: 'ऑटो-अनलॉक फीचर क्या है?', zh: '什么是自动解锁功能？', tr: 'Otomatik kilitleme nedir?',
  },
  faq_slot4_q: {
    en: 'What happens when level is full (slot 4)?', ru: 'Что происходит когда уровень заполнен (слот 4)?', ua: 'Що відбувається коли рівень заповнений (слот 4)?',
    es: '¿Qué pasa cuando el nivel está lleno (espacio 4)?', pt: 'O que acontece quando o nível está cheio (espaço 4)?', fr: 'Que se passe-t-il quand le niveau est plein (emplacement 4) ?',
    de: 'Was passiert wenn die Stufe voll ist (Platz 4)?', pl: 'Co się dzieje gdy poziom jest pełny (slot 4)?', vi: 'Điều gì xảy ra khi cấp đầy (ô 4)?',
    ko: '레벨이 가득 차면 어떻게 되나요 (슬롯 4)?', ja: 'レベルが満杯になったら（スロット4）？', hi: 'जब स्तर भर जाता है (स्लॉट 4)?',
    zh: '当级别满了会怎样（插槽4）？', tr: 'Seviye dolduğunda ne olur (slot 4)?',
  },
  faq_fees_q: {
    en: 'What are the fees?', ru: 'Какие комиссии?', ua: 'Які комісії?', es: '¿Cuáles son las tarifas?', pt: 'Quais são as taxas?',
    fr: 'Quels sont les frais ?', de: 'Welche Gebühren gibt es?', pl: 'Jakie są opłaty?', vi: 'Phí là bao nhiêu?',
    ko: '수수료는 얼마인가요?', ja: '手数料は？', hi: 'शुल्क क्या हैं?', zh: '费用是多少？', tr: 'Ücretler nelerdir?',
  },
  faq_safe_q: {
    en: 'Is my money safe?', ru: 'Мои деньги в безопасности?', ua: 'Мої гроші в безпеці?', es: '¿Es seguro mi dinero?', pt: 'Meu dinheiro está seguro?',
    fr: 'Mon argent est-il en sécurité ?', de: 'Ist mein Geld sicher?', pl: 'Czy moje pieniądze są bezpieczne?', vi: 'Tiền của tôi có an toàn không?',
    ko: '내 돈은 안전한가요?', ja: '私のお金は安全ですか？', hi: 'क्या मेरा पैसा सुरक्षित है?', zh: '我的钱安全吗？', tr: 'Param güvende mi?',
  },
  faq_usdc_q: {
    en: 'What is USDC? Do I need POL?', ru: 'Что такое USDC? Нужен ли мне POL?', ua: 'Що таке USDC? Чи потрібен мені POL?',
    es: '¿Qué es USDC? ¿Necesito POL?', pt: 'O que é USDC? Preciso de POL?', fr: "Qu'est-ce que USDC ? Ai-je besoin de POL ?",
    de: 'Was ist USDC? Brauche ich POL?', pl: 'Czym jest USDC? Czy potrzebuję POL?', vi: 'USDC là gì? Tôi có cần POL không?',
    ko: 'USDC란? POL이 필요한가요?', ja: 'USDCとは？POLは必要？', hi: 'USDC क्या है? POL चाहिए?', zh: '什么是USDC？需要POL吗？', tr: 'USDC nedir? POL gerekli mi?',
  },
  faq_alllevels_q: {
    en: 'Do I need to buy all 17 levels?', ru: 'Нужно ли покупать все 17 уровней?', ua: 'Чи потрібно купувати всі 17 рівнів?',
    es: '¿Necesito comprar los 17 niveles?', pt: 'Preciso comprar todos os 17 níveis?', fr: 'Dois-je acheter les 17 niveaux ?',
    de: 'Muss ich alle 17 Stufen kaufen?', pl: 'Czy muszę kupić wszystkie 17 poziomów?', vi: 'Tôi có cần mua cả 17 cấp không?',
    ko: '17레벨 모두 구매해야 하나요?', ja: '17レベル全部買う必要がありますか？', hi: 'क्या मुझे सभी 17 स्तर खरीदने होंगे?', zh: '我需要购买全部17个级别吗？', tr: 'Tüm 17 seviyeyi almam gerekir mi?',
  },
  faq_trouble_q: {
    en: 'Something not working?', ru: 'Что-то не работает?', ua: 'Щось не працює?', es: '¿Algo no funciona?', pt: 'Algo não está funcionando?',
    fr: 'Quelque chose ne fonctionne pas ?', de: 'Etwas funktioniert nicht?', pl: 'Coś nie działa?', vi: 'Có vấn đề gì?',
    ko: '문제가 있나요?', ja: '何か問題がありますか？', hi: 'कुछ काम नहीं कर रहा?', zh: '有问题吗？', tr: 'Bir şey çalışmıyor mu?',
  },
  faq_earnings: {
    en: 'Potential Earnings', ru: 'Потенциальный доход', ua: 'Потенційний дохід', es: 'Ganancias potenciales', pt: 'Ganhos potenciais',
    fr: 'Gains potentiels', de: 'Potenzielle Verdienste', pl: 'Potencjalne zarobki', vi: 'Thu nhập tiềm năng',
    ko: '예상 수익', ja: '潜在的な収益', hi: 'संभावित कमाई', zh: '潜在收入', tr: 'Potansiyel Kazanç',
  },
  faq_how_works: {
    en: 'How it works', ru: 'Как это работает', ua: 'Як це працює', es: 'Cómo funciona', pt: 'Como funciona',
    fr: 'Comment ça marche', de: 'So funktioniert es', pl: 'Jak to działa', vi: 'Cách hoạt động',
    ko: '작동 방식', ja: '仕組み', hi: 'कैसे काम करता है', zh: '如何运作', tr: 'Nasıl çalışır',
  },
  indirect: {
    en: 'indirect', ru: 'непрямых', ua: 'непрямих', es: 'indirectos', pt: 'indiretos', fr: 'indirects',
    de: 'indirekt', pl: 'pośrednich', vi: 'gián tiếp', ko: '간접', ja: '間接', hi: 'अप्रत्यक्ष', zh: '间接', tr: 'dolaylı',
  },
  direct_slash_indirect: {
    en: 'direct / indirect', ru: 'прямых / непрямых', ua: 'прямих / непрямих', es: 'directos / indirectos',
    pt: 'diretos / indiretos', fr: 'directs / indirects', de: 'direkt / indirekt', pl: 'bezpośrednich / pośrednich',
    vi: 'trực tiếp / gián tiếp', ko: '직접 / 간접', ja: '直接 / 間接', hi: 'प्रत्यक्ष / अप्रत्यक्ष', zh: '直接 / 间接', tr: 'doğrudan / dolaylı',
  },

  // ==================== PUSH NOTIFICATIONS ====================
  notif_payout: {
    en: 'Payout received · L', ru: 'Выплата получена · L', ua: 'Виплата отримана · L', es: 'Pago recibido · L', pt: 'Pagamento recebido · L',
    fr: 'Paiement reçu · L', de: 'Auszahlung erhalten · L', pl: 'Wypłata otrzymana · L', vi: 'Nhận thanh toán · L',
    ko: '지급 수령 · L', ja: '支払い受領 · L', hi: 'भुगतान प्राप्त · L', zh: '收到支付 · L', tr: 'Ödeme alındı · L', ar: 'تم استلام الدفع · L',
  },
  notif_slot: {
    en: 'filled · L', ru: 'заполнен · L', ua: 'заповнений · L', es: 'lleno · L', pt: 'preenchido · L',
    fr: 'rempli · L', de: 'gefüllt · L', pl: 'wypełniony · L', vi: 'đã lấp · L',
    ko: '채워짐 · L', ja: '充填 · L', hi: 'भरा · L', zh: '已填 · L', tr: 'dolu · L', ar: 'ممتلئ · L',
  },
  notif_joined: {
    en: 'joined', ru: 'присоединился', ua: 'приєднався', es: 'se unió', pt: 'entrou',
    fr: 'a rejoint', de: 'beigetreten', pl: 'dołączył', vi: 'đã tham gia',
    ko: '참여', ja: '参加', hi: 'जुड़ गया', zh: '加入了', tr: 'katıldı', ar: 'انضم',
  },
  notif_new_ref: {
    en: 'New referral!', ru: 'Новый реферал!', ua: 'Новий реферал!', es: '¡Nuevo referido!', pt: 'Nova indicação!',
    fr: 'Nouveau filleul !', de: 'Neue Empfehlung!', pl: 'Nowe polecenie!', vi: 'Giới thiệu mới!',
    ko: '새 추천인!', ja: '新しい紹介!', hi: 'नया रेफरल!', zh: '新推荐！', tr: 'Yeni referans!', ar: 'إحالة جديدة!',
  },
  notif_joined_network: {
    en: 'joined your network', ru: 'присоединился к вашей сети', ua: 'приєднався до вашої мережі',
    es: 'se unió a tu red', pt: 'entrou na sua rede', fr: 'a rejoint votre réseau',
    de: 'ist Ihrem Netzwerk beigetreten', pl: 'dołączył do twojej sieci', vi: 'đã tham gia mạng của bạn',
    ko: '네트워크에 참여', ja: 'ネットワークに参加', hi: 'आपके नेटवर्क में शामिल हुआ', zh: '加入了您的网络', tr: 'ağınıza katıldı', ar: 'انضم إلى شبكتك',
  },
  notif_hops: {
    en: 'hops from', ru: 'хопов от', ua: 'хопів від', es: 'saltos desde', pt: 'saltos de',
    fr: 'sauts depuis', de: 'Hops von', pl: 'skoków od', vi: 'bước từ',
    ko: '홉', ja: 'ホップ', hi: 'हॉप्स', zh: '跳', tr: 'atlama', ar: 'قفزة من',
  },

  // ==================== LEVEL DETAIL DYNAMIC ====================
  slot: {
    en: 'Slot', ru: 'Слот', ua: 'Слот', es: 'Espacio', pt: 'Espaço', fr: 'Emplacement',
    de: 'Platz', pl: 'Slot', vi: 'Ô', ko: '슬롯', ja: 'スロット', hi: 'स्लॉट', zh: '插槽', tr: 'Slot',
  },
  payout_to_sponsor: {
    en: 'Payout to your sponsor', ru: 'Выплата вашему спонсору', ua: 'Виплата вашому спонсору',
    es: 'Pago a tu patrocinador', pt: 'Pagamento ao seu patrocinador', fr: 'Paiement à votre parrain',
    de: 'Auszahlung an Ihren Sponsor', pl: 'Wypłata dla twojego sponsora', vi: 'Thanh toán cho người bảo trợ',
    ko: '스폰서에게 지급', ja: 'スポンサーへの支払い', hi: 'आपके स्पॉन्सर को भुगतान', zh: '支付给赞助人', tr: 'Sponsorunuza ödeme',
  },
  funds_held: {
    en: 'Your funds held temporarily', ru: 'Ваши средства временно заморожены', ua: 'Ваші кошти тимчасово заморожені',
    es: 'Tus fondos retenidos temporalmente', pt: 'Seus fundos retidos temporariamente', fr: 'Vos fonds temporairement retenus',
    de: 'Ihre Gelder vorübergehend einbehalten', pl: 'Twoje środki tymczasowo zamrożone', vi: 'Tiền tạm giữ',
    ko: '자금 일시 보류', ja: '資金一時保留', hi: 'आपकी धनराशि अस्थायी रूप से रोकी गई', zh: '资金暂时冻结', tr: 'Fonlarınız geçici olarak tutuluyor',
  },
  payout_next_owned: {
    en: 'Payout (next level owned)', ru: 'Выплата (следующий уровень куплен)', ua: 'Виплата (наступний рівень куплений)',
    es: 'Pago (siguiente nivel adquirido)', pt: 'Pagamento (próximo nível adquirido)', fr: 'Paiement (niveau suivant acquis)',
    de: 'Auszahlung (nächste Stufe vorhanden)', pl: 'Wypłata (kolejny poziom kupiony)', vi: 'Thanh toán (có cấp tiếp)',
    ko: '지급 (다음 레벨 보유)', ja: '支払い (次レベル所有)', hi: 'भुगतान (अगला स्तर खरीदा)', zh: '支付（已有下一级）', tr: 'Ödeme (sonraki seviye var)',
  },
  auto_unlock_or_payout: {
    en: 'Auto-unlock or payout', ru: 'Автооткрытие или выплата', ua: 'Автовідкриття або виплата',
    es: 'Desbloqueo auto o pago', pt: 'Desbloqueio auto ou pagamento', fr: 'Déblocage auto ou paiement',
    de: 'Auto-Freischaltung oder Auszahlung', pl: 'Autoodblokowanie lub wypłata', vi: 'Tự mở khóa hoặc thanh toán',
    ko: '자동해제 또는 지급', ja: '自動解除または支払い', hi: 'ऑटो-अनलॉक या भुगतान', zh: '自动解锁或支付', tr: 'Otomatik açma veya ödeme',
  },
  level_resets: {
    en: 'Level resets — new cycle', ru: 'Уровень перезапускается — новый цикл', ua: 'Рівень перезапускається — новий цикл',
    es: 'Nivel se reinicia — nuevo ciclo', pt: 'Nível reinicia — novo ciclo', fr: 'Niveau réinitialisé — nouveau cycle',
    de: 'Stufe zurückgesetzt — neuer Zyklus', pl: 'Poziom resetuje się — nowy cykl', vi: 'Cấp đặt lại — chu kỳ mới',
    ko: '레벨 리셋 — 새 사이클', ja: 'レベルリセット — 新サイクル', hi: 'स्तर रीसेट — नया चक्र', zh: '级别重置 — 新周期', tr: 'Seviye sıfırlandı — yeni döngü',
  },
  slot_filled: {
    en: 'filled', ru: 'заполнен', ua: 'заповнений', es: 'lleno', pt: 'preenchido', fr: 'rempli',
    de: 'gefüllt', pl: 'wypełniony', vi: 'đã lấp', ko: '채워짐', ja: '充填済', hi: 'भरा', zh: '已填', tr: 'dolu',
  },
  last: {
    en: 'LAST', ru: 'ПОСЛЕДНИЙ', ua: 'ОСТАННІЙ', es: 'ÚLTIMO', pt: 'ÚLTIMO', fr: 'DERNIER',
    de: 'LETZTER', pl: 'OSTATNI', vi: 'CUỐI', ko: '마지막', ja: '最後', hi: 'अंतिम', zh: '最后', tr: 'SON',
  },
  all_slots_payout: {
    en: 'All slots pay out', ru: 'Все слоты = выплата', ua: 'Всі слоти = виплата', es: 'Todos los espacios pagan',
    pt: 'Todos os espaços pagam', fr: 'Tous les emplacements paient', de: 'Alle Plätze zahlen aus',
    pl: 'Wszystkie sloty = wypłata', vi: 'Tất cả ô đều thanh toán', ko: '모든 슬롯 지급',
    ja: '全スロット支払い', hi: 'सभी स्लॉट भुगतान', zh: '所有插槽都支付', tr: 'Tüm slotlar öder',
  },
  will_auto_buy: {
    en: 'Waiting slot 3 → will auto-buy Level', ru: 'Ожидание слота 3 → автопокупка Уровня', ua: 'Очікування слоту 3 → автокупівля Рівня',
    es: 'Esperando espacio 3 → comprará automáticamente Nivel', pt: 'Aguardando espaço 3 → comprará automaticamente Nível',
    fr: 'En attente emplacement 3 → achat auto Niveau', de: 'Warte auf Platz 3 → kauft automatisch Stufe',
    pl: 'Oczekiwanie slot 3 → autokupno Poziomu', vi: 'Đợi ô 3 → tự động mua Cấp',
    ko: '슬롯 3 대기 → 자동구매 레벨', ja: 'スロット3待機 → 自動購入レベル', hi: 'स्लॉट 3 की प्रतीक्षा → ऑटो-खरीद स्तर',
    zh: '等待插槽3 → 自动购买级别', tr: 'Slot 3 bekleniyor → otomatik Seviye al',
  },
  activation_cost: {
    en: 'Activation cost', ru: 'Стоимость активации', ua: 'Вартість активації', es: 'Costo de activación', pt: 'Custo de ativação',
    fr: "Coût d'activation", de: 'Aktivierungskosten', pl: 'Koszt aktywacji', vi: 'Chi phí kích hoạt',
    ko: '활성화 비용', ja: '有効化コスト', hi: 'सक्रियण लागत', zh: '激活成本', tr: 'Etkinleştirme maliyeti',
  },
  last_level: {
    en: 'Last level', ru: 'Последний уровень', ua: 'Останній рівень', es: 'Último nivel', pt: 'Último nível',
    fr: 'Dernier niveau', de: 'Letzte Stufe', pl: 'Ostatni poziom', vi: 'Cấp cuối',
    ko: '마지막 레벨', ja: '最終レベル', hi: 'अंतिम स्तर', zh: '最后级别', tr: 'Son seviye',
  },
  auto_unlocks: {
    en: 'Auto-unlocks next level', ru: 'Автооткрытие следующего уровня', ua: 'Автовідкриття наступного рівня',
    es: 'Desbloqueo automático del siguiente nivel', pt: 'Desbloqueio automático do próximo nível',
    fr: 'Déblocage automatique du niveau suivant', de: 'Automatische Freischaltung der nächsten Stufe',
    pl: 'Automatyczne odblokowanie kolejnego poziomu', vi: 'Tự động mở khóa cấp tiếp',
    ko: '다음 레벨 자동 해제', ja: '次のレベルを自動解除', hi: 'अगला स्तर ऑटो-अनलॉक', zh: '自动解锁下一级', tr: 'Sonraki seviyeyi otomatik aç',
  },

  // ==================== REMAINING UI ====================
  ref: {
    en: 'Ref', ru: 'Реф', ua: 'Реф', es: 'Ref', pt: 'Ref', fr: 'Réf',
    de: 'Ref', pl: 'Ref', vi: 'Ref', ko: '추천', ja: '紹介', hi: 'रेफ', zh: '推荐', tr: 'Ref',
  },
  bonus_timer_text: {
    en: 'Buy 7 levels in', ru: 'Купи 7 уровней за', ua: 'Купи 7 рівнів за', es: 'Compra 7 niveles en',
    pt: 'Compre 7 níveis em', fr: 'Achetez 7 niveaux en', de: 'Kaufe 7 Stufen in', pl: 'Kup 7 poziomów w',
    vi: 'Mua 7 cấp trong', ko: '7레벨을 구매', ja: '7レベルを購入', hi: '7 लेवल खरीदें', zh: '购买7个级别', tr: '7 seviye al',
  },
  l8_free: {
    en: '→ L8 FREE', ru: '→ L8 БЕСПЛАТНО', ua: '→ L8 БЕЗКОШТОВНО', es: '→ L8 GRATIS', pt: '→ L8 GRÁTIS',
    fr: '→ L8 GRATUIT', de: '→ L8 KOSTENLOS', pl: '→ L8 ZA DARMO', vi: '→ L8 MIỄN PHÍ',
    ko: '→ L8 무료', ja: '→ L8 無料', hi: '→ L8 मुफ्त', zh: '→ L8 免费', tr: '→ L8 ÜCRETSİZ',
  },
  no_referrals_dash: {
    en: 'No referrals yet', ru: 'Пока нет рефералов', ua: 'Ще немає рефералів', es: 'Sin referidos aún',
    pt: 'Sem indicações', fr: 'Pas de filleuls', de: 'Keine Empfehlungen', pl: 'Brak poleceń',
    vi: 'Chưa có giới thiệu', ko: '추천인 없음', ja: '紹介なし', hi: 'कोई रेफरल नहीं', zh: '暂无推荐', tr: 'Referans yok',
  },
  participants: {
    en: 'Participants', ru: 'Участники', ua: 'Учасники', es: 'Participantes', pt: 'Participantes', fr: 'Participants',
    de: 'Teilnehmer', pl: 'Uczestnicy', vi: 'Người tham gia', ko: '참가자', ja: '参加者', hi: 'प्रतिभागी', zh: '参与者', tr: 'Katılımcılar',
  },
  frozen_now: {
    en: 'Frozen Now', ru: 'Заморожено сейчас', ua: 'Заморожено зараз', es: 'Congelado ahora', pt: 'Congelado agora',
    fr: 'Gelé actuellement', de: 'Aktuell eingefroren', pl: 'Zamrożone teraz', vi: 'Đang đóng băng',
    ko: '현재 동결', ja: '現在凍結中', hi: 'अभी फ्रोज़न', zh: '当前冻结', tr: 'Şu an dondurulmuş',
  },
  system_fees: {
    en: 'System Fees', ru: 'Системные сборы', ua: 'Системні збори', es: 'Tarifas del sistema', pt: 'Taxas do sistema',
    fr: 'Frais système', de: 'Systemgebühren', pl: 'Opłaty systemowe', vi: 'Phí hệ thống',
    ko: '시스템 수수료', ja: 'システム手数料', hi: 'सिस्टम शुल्क', zh: '系统费用', tr: 'Sistem ücretleri',
  },
  paid_all: {
    en: 'Paid out to all participants', ru: 'Выплачено всем участникам', ua: 'Виплачено всім учасникам',
    es: 'Pagado a todos los participantes', pt: 'Pago a todos os participantes', fr: 'Payé à tous les participants',
    de: 'An alle Teilnehmer ausgezahlt', pl: 'Wypłacono wszystkim uczestnikom', vi: 'Đã thanh toán cho tất cả',
    ko: '모든 참가자에게 지급', ja: '全参加者に支払済み', hi: 'सभी प्रतिभागियों को भुगतान', zh: '已支付给所有参与者', tr: 'Tüm katılımcılara ödendi',
  },
  community_earned: {
    en: 'Total USDC earned by the community', ru: 'Всего USDC заработано сообществом', ua: 'Всього USDC зароблено спільнотою',
    es: 'Total USDC ganado por la comunidad', pt: 'Total USDC ganho pela comunidade', fr: 'Total USDC gagné par la communauté',
    de: 'Gesamt von der Community verdiente USDC', pl: 'Łącznie USDC zarobione przez społeczność', vi: 'Tổng USDC cộng đồng kiếm được',
    ko: '커뮤니티 총 USDC 수익', ja: 'コミュニティ総USDC収益', hi: 'समुदाय द्वारा कमाया गया कुल USDC', zh: '社区总USDC收入', tr: 'Topluluk tarafından kazanılan toplam USDC',
  },
  level_locked: {
    en: 'Level locked', ru: 'Уровень заблокирован', ua: 'Рівень заблокований', es: 'Nivel bloqueado', pt: 'Nível bloqueado',
    fr: 'Niveau verrouillé', de: 'Stufe gesperrt', pl: 'Poziom zablokowany', vi: 'Cấp bị khóa',
    ko: '레벨 잠김', ja: 'レベルロック', hi: 'स्तर लॉक', zh: '级别已锁定', tr: 'Seviye kilitli',
  },
  level_requires: {
    en: 'requires Level', ru: 'требуется Уровень', ua: 'потрібен Рівень', es: 'requiere Nivel', pt: 'requer Nível',
    fr: 'nécessite Niveau', de: 'erfordert Stufe', pl: 'wymaga Poziomu', vi: 'yêu cầu Cấp',
    ko: '필요 레벨', ja: '必要レベル', hi: 'स्तर आवश्यक', zh: '需要级别', tr: 'gerekli Seviye',
  },
  buy_first: {
    en: 'Buy first:', ru: 'Сначала купите:', ua: 'Спочатку купіть:', es: 'Compra primero:', pt: 'Compre primeiro:',
    fr: "Achetez d'abord:", de: 'Zuerst kaufen:', pl: 'Najpierw kup:', vi: 'Mua trước:',
    ko: '먼저 구매:', ja: 'まず購入:', hi: 'पहले खरीदें:', zh: '先购买:', tr: 'Önce satın al:',
  },
  go_to_level: {
    en: 'Go to Level', ru: 'Перейти к уровню', ua: 'Перейти до рівня', es: 'Ir al Nivel', pt: 'Ir para o Nível',
    fr: 'Aller au Niveau', de: 'Gehe zu Stufe', pl: 'Przejdź do Poziomu', vi: 'Đi đến Cấp',
    ko: '레벨로 이동', ja: 'レベルへ移動', hi: 'स्तर पर जाएं', zh: '前往级别', tr: 'Seviyeye git',
  },
  telegram: {
    en: 'Telegram', ru: 'Telegram', ua: 'Telegram', es: 'Telegram', pt: 'Telegram', fr: 'Telegram',
    de: 'Telegram', pl: 'Telegram', vi: 'Telegram', ko: '텔레그램', ja: 'テレグラム', hi: 'टेलीग्राम', zh: 'Telegram', tr: 'Telegram',
  },
  whatsapp: {
    en: 'WhatsApp', ru: 'WhatsApp', ua: 'WhatsApp', es: 'WhatsApp', pt: 'WhatsApp', fr: 'WhatsApp',
    de: 'WhatsApp', pl: 'WhatsApp', vi: 'WhatsApp', ko: '왓츠앱', ja: 'WhatsApp', hi: 'वॉट्सऐप', zh: 'WhatsApp', tr: 'WhatsApp',
  },
  email: {
    en: 'Email', ru: 'Почта', ua: 'Пошта', es: 'Correo', pt: 'Email', fr: 'Email',
    de: 'E-Mail', pl: 'Email', vi: 'Email', ko: '이메일', ja: 'メール', hi: 'ईमेल', zh: '邮件', tr: 'E-posta',
  },
  sms: {
    en: 'SMS', ru: 'SMS', ua: 'SMS', es: 'SMS', pt: 'SMS', fr: 'SMS',
    de: 'SMS', pl: 'SMS', vi: 'SMS', ko: 'SMS', ja: 'SMS', hi: 'SMS', zh: '短信', tr: 'SMS',
  },
  bonus_program: {
    en: 'Bonus Program', ru: 'Бонусная программа', ua: 'Бонусна програма', es: 'Programa de bonificación', pt: 'Programa de bônus',
    fr: 'Programme bonus', de: 'Bonusprogramm', pl: 'Program bonusowy', vi: 'Chương trình thưởng',
    ko: '보너스 프로그램', ja: 'ボーナスプログラム', hi: 'बोनस प्रोग्राम', zh: '奖励计划', tr: 'Bonus programı',
  },
  faq_languages_q: {
    en: 'What languages are supported?', ru: 'Какие языки поддерживаются?', ua: 'Які мови підтримуються?',
    es: '¿Qué idiomas se admiten?', pt: 'Quais idiomas são suportados?', fr: 'Quelles langues sont prises en charge ?',
    de: 'Welche Sprachen werden unterstützt?', pl: 'Jakie języki są obsługiwane?', vi: 'Hỗ trợ ngôn ngữ nào?',
    ko: '어떤 언어가 지원되나요?', ja: 'どの言語がサポートされていますか？', hi: 'कौन सी भाषाएं समर्थित हैं?', zh: '支持哪些语言？', tr: 'Hangi diller destekleniyor?',
  },
  faq_languages_a: {
    en: 'XionNET supports 14 languages: English, Russian, Ukrainian, Spanish, Portuguese, French, German, Polish, Vietnamese, Korean, Japanese, Hindi, Chinese, and Turkish. The app auto-detects your browser language. You can also change it manually in Settings.',
    ru: 'XionNET поддерживает 14 языков: английский, русский, украинский, испанский, португальский, французский, немецкий, польский, вьетнамский, корейский, японский, хинди, китайский и турецкий. Приложение автоматически определяет язык браузера. Также можно сменить вручную в Настройках.',
    ua: 'XionNET підтримує 14 мов: англійська, російська, українська, іспанська, португальська, французька, німецька, польська, в\'єтнамська, корейська, японська, хінді, китайська та турецька. Додаток автоматично визначає мову браузера. Також можна змінити вручну в Налаштуваннях.',
    es: 'XionNET soporta 14 idiomas: inglés, ruso, ucraniano, español, portugués, francés, alemán, polaco, vietnamita, coreano, japonés, hindi, chino y turco. La app detecta automáticamente el idioma del navegador. También puedes cambiarlo en Ajustes.',
    pt: 'XionNET suporta 14 idiomas: inglês, russo, ucraniano, espanhol, português, francês, alemão, polonês, vietnamita, coreano, japonês, hindi, chinês e turco. O app detecta automaticamente o idioma do navegador. Você também pode alterá-lo em Configurações.',
    fr: 'XionNET prend en charge 14 langues : anglais, russe, ukrainien, espagnol, portugais, français, allemand, polonais, vietnamien, coréen, japonais, hindi, chinois et turc. L\'app détecte automatiquement la langue du navigateur. Vous pouvez aussi la changer dans les Paramètres.',
    de: 'XionNET unterstützt 14 Sprachen: Englisch, Russisch, Ukrainisch, Spanisch, Portugiesisch, Französisch, Deutsch, Polnisch, Vietnamesisch, Koreanisch, Japanisch, Hindi, Chinesisch und Türkisch. Die App erkennt automatisch die Browsersprache. Sie können sie auch in den Einstellungen ändern.',
    pl: 'XionNET obsługuje 14 języków: angielski, rosyjski, ukraiński, hiszpański, portugalski, francuski, niemiecki, polski, wietnamski, koreański, japoński, hindi, chiński i turecki. Aplikacja automatycznie wykrywa język przeglądarki. Można też zmienić ręcznie w Ustawieniach.',
    vi: 'XionNET hỗ trợ 14 ngôn ngữ: Anh, Nga, Ukraine, Tây Ban Nha, Bồ Đào Nha, Pháp, Đức, Ba Lan, Việt, Hàn, Nhật, Hindi, Trung, và Thổ Nhĩ Kỳ. Ứng dụng tự phát hiện ngôn ngữ trình duyệt. Bạn cũng có thể thay đổi trong Cài đặt.',
    ko: 'XionNET은 14개 언어를 지원합니다: 영어, 러시아어, 우크라이나어, 스페인어, 포르투갈어, 프랑스어, 독일어, 폴란드어, 베트남어, 한국어, 일본어, 힌디어, 중국어, 터키어. 브라우저 언어를 자동 감지합니다. 설정에서 수동으로 변경할 수도 있습니다.',
    ja: 'XionNETは14言語をサポート：英語、ロシア語、ウクライナ語、スペイン語、ポルトガル語、フランス語、ドイツ語、ポーランド語、ベトナム語、韓国語、日本語、ヒンディー語、中国語、トルコ語。ブラウザ言語を自動検出します。設定で手動変更も可能です。',
    hi: 'XionNET 14 भाषाओं का समर्थन करता है: अंग्रेजी, रूसी, यूक्रेनी, स्पेनिश, पुर्तगाली, फ्रेंच, जर्मन, पोलिश, वियतनामी, कोरियाई, जापानी, हिंदी, चीनी, और तुर्की। ऐप ब्राउज़र भाषा का स्वतः पता लगाता है। सेटिंग्स में मैन्युअल भी बदल सकते हैं।',
    zh: 'XionNET支持14种语言：英语、俄语、乌克兰语、西班牙语、葡萄牙语、法语、德语、波兰语、越南语、韩语、日语、印地语、中文和土耳其语。应用会自动检测浏览器语言。您也可以在设置中手动更改。',
    tr: 'XionNET 14 dili destekler: İngilizce, Rusça, Ukraynaca, İspanyolca, Portekizce, Fransızca, Almanca, Lehçe, Vietnamca, Korece, Japonca, Hintçe, Çince ve Türkçe. Uygulama tarayıcı dilini otomatik algılar. Ayarlardan da değiştirebilirsiniz.',
  },

  // ==================== FAQ HTML ANSWERS ====================
  faq_bonus_a: {
    en: '<b>Buy 7 levels in 180 minutes → Level 8 is FREE!</b><br><br>1. Register — timer starts (180 min)<br>2. Buy L1 through L7<br>3. L8 opens automatically — you save <b style="color:var(--green)">$422</b><br><br>• Bonus is automatic<br>• Your sponsor gets nothing for L8<br>• If you miss the timer, buy L8 normally',
    ru: '<b>Купи 7 уровней за 180 минут → Уровень 8 БЕСПЛАТНО!</b><br><br>1. Зарегистрируйся — таймер запускается (180 мин)<br>2. Купи L1–L7<br>3. L8 откроется автоматически — экономия <b style="color:var(--green)">$422</b><br><br>• Бонус автоматический<br>• Спонсор ничего не получает за L8<br>• Не успел — покупай L8 обычным способом',
    ua: '<b>Купи 7 рівнів за 180 хвилин → Рівень 8 БЕЗКОШТОВНО!</b><br><br>1. Зареєструйся — таймер стартує (180 хв)<br>2. Купи L1–L7<br>3. L8 відкриється автоматично — економія <b style="color:var(--green)">$422</b><br><br>• Бонус автоматичний<br>• Спонсор нічого не отримує за L8<br>• Не встиг — купуй L8 звичайно',
    es: '<b>Compra 7 niveles en 180 minutos → ¡Nivel 8 GRATIS!</b><br><br>1. Regístrate — el temporizador comienza (180 min)<br>2. Compra L1 a L7<br>3. L8 se abre automáticamente — ahorras <b style="color:var(--green)">$422</b>',
    pt: '<b>Compre 7 níveis em 180 minutos → Nível 8 GRÁTIS!</b><br><br>1. Registre-se — o timer começa (180 min)<br>2. Compre L1 a L7<br>3. L8 abre automaticamente — você economiza <b style="color:var(--green)">$422</b>',
    fr: '<b>Achetez 7 niveaux en 180 minutes → Niveau 8 GRATUIT !</b><br><br>1. Inscrivez-vous — le chrono démarre (180 min)<br>2. Achetez L1 à L7<br>3. L8 s\'ouvre automatiquement — économie de <b style="color:var(--green)">422$</b>',
    de: '<b>Kaufe 7 Stufen in 180 Minuten → Stufe 8 KOSTENLOS!</b><br><br>1. Registriere dich — Timer startet (180 Min)<br>2. Kaufe L1 bis L7<br>3. L8 öffnet automatisch — Ersparnis <b style="color:var(--green)">$422</b>',
    pl: '<b>Kup 7 poziomów w 180 minut → Poziom 8 ZA DARMO!</b><br><br>1. Zarejestruj się — timer startuje (180 min)<br>2. Kup L1 do L7<br>3. L8 otwiera się automatycznie — oszczędzasz <b style="color:var(--green)">$422</b>',
    vi: '<b>Mua 7 cấp trong 180 phút → Cấp 8 MIỄN PHÍ!</b><br><br>1. Đăng ký — bộ đếm bắt đầu (180 phút)<br>2. Mua L1 đến L7<br>3. L8 mở tự động — tiết kiệm <b style="color:var(--green)">$422</b>',
    ko: '<b>180분 안에 7레벨 구매 → 레벨 8 무료!</b><br><br>1. 등록 — 타이머 시작 (180분)<br>2. L1~L7 구매<br>3. L8 자동 활성화 — <b style="color:var(--green)">$422</b> 절약',
    ja: '<b>180分以内に7レベル購入 → レベル8無料！</b><br><br>1. 登録 — タイマー開始（180分）<br>2. L1〜L7を購入<br>3. L8が自動で開放 — <b style="color:var(--green)">$422</b>節約',
    hi: '<b>180 मिनट में 7 लेवल खरीदें → लेवल 8 मुफ्त!</b><br><br>1. रजिस्टर करें — टाइमर शुरू (180 मिनट)<br>2. L1 से L7 खरीदें<br>3. L8 अपने आप खुलता है — <b style="color:var(--green)">$422</b> बचत',
    zh: '<b>180分钟内购买7个级别 → 第8级免费！</b><br><br>1. 注册 — 计时器开始（180分钟）<br>2. 购买L1到L7<br>3. L8自动开启 — 节省<b style="color:var(--green)">$422</b>',
    tr: '<b>180 dakikada 7 seviye al → Seviye 8 ÜCRETSİZ!</b><br><br>1. Kayıt ol — zamanlayıcı başlar (180 dk)<br>2. L1\'den L7\'ye satın al<br>3. L8 otomatik açılır — <b style="color:var(--green)">$422</b> tasarruf',
  },
  faq_slots_a: {
    en: 'Each level has 4 slots that fill one by one:<br><br><b style="color:var(--green)">Slot 1</b> — You get paid directly<br><b style="color:var(--frozen)">Slot 2</b> — If you have the next level: you get paid. If not: money is saved to auto-buy it<br><b style="color:var(--green)">Slot 3</b> — If money was saved: next level opens for free! If not: you get paid<br><b style="color:var(--poly2)">Slot 4</b> — Level resets and starts over. Payment goes up to your sponsor',
    ru: 'Каждый уровень имеет 4 слота, которые заполняются по очереди:<br><br><b style="color:var(--green)">Слот 1</b> — Вам выплачиваются деньги<br><b style="color:var(--frozen)">Слот 2</b> — Если есть следующий уровень: выплата. Если нет: деньги копятся на автопокупку<br><b style="color:var(--green)">Слот 3</b> — Если деньги копились: следующий уровень открывается бесплатно! Если нет: выплата<br><b style="color:var(--poly2)">Слот 4</b> — Уровень перезапускается. Платёж уходит вверх к спонсору',
    ua: 'Кожен рівень має 4 слоти, які заповнюються по черзі:<br><br><b style="color:var(--green)">Слот 1</b> — Вам виплачуються гроші<br><b style="color:var(--frozen)">Слот 2</b> — Якщо є наступний рівень: виплата. Якщо ні: гроші накопичуються на автокупівлю<br><b style="color:var(--green)">Слот 3</b> — Якщо гроші накопичувались: наступний рівень відкривається безкоштовно! Якщо ні: виплата<br><b style="color:var(--poly2)">Слот 4</b> — Рівень перезапускається. Платіж йде вгору до спонсора',
    es: 'Cada nivel tiene 4 espacios que se llenan uno a uno:<br><br><b style="color:var(--green)">Espacio 1</b> — Recibes pago directo<br><b style="color:var(--frozen)">Espacio 2</b> — Si tienes el siguiente nivel: pago. Si no: el dinero se guarda para compra automática<br><b style="color:var(--green)">Espacio 3</b> — Si se guardó dinero: ¡el siguiente nivel se abre gratis! Si no: pago<br><b style="color:var(--poly2)">Espacio 4</b> — El nivel se reinicia. El pago sube a tu patrocinador',
    pt: 'Cada nível tem 4 espaços que se preenchem um a um:<br><br><b style="color:var(--green)">Espaço 1</b> — Você recebe pagamento direto<br><b style="color:var(--frozen)">Espaço 2</b> — Se tem o próximo nível: pagamento. Se não: dinheiro guardado para compra automática<br><b style="color:var(--green)">Espaço 3</b> — Se dinheiro foi guardado: próximo nível abre grátis! Se não: pagamento<br><b style="color:var(--poly2)">Espaço 4</b> — Nível reinicia. Pagamento sobe para seu patrocinador',
    fr: 'Chaque niveau a 4 emplacements qui se remplissent un par un :<br><br><b style="color:var(--green)">Emplacement 1</b> — Paiement direct<br><b style="color:var(--frozen)">Emplacement 2</b> — Si niveau suivant acheté : paiement. Sinon : argent réservé pour achat automatique<br><b style="color:var(--green)">Emplacement 3</b> — Si argent réservé : niveau suivant gratuit ! Sinon : paiement<br><b style="color:var(--poly2)">Emplacement 4</b> — Niveau se réinitialise. Paiement remonte au parrain',
    de: 'Jede Stufe hat 4 Plätze die nacheinander gefüllt werden:<br><br><b style="color:var(--green)">Platz 1</b> — Direktauszahlung<br><b style="color:var(--frozen)">Platz 2</b> — Wenn nächste Stufe vorhanden: Auszahlung. Wenn nicht: Geld wird für Autokauf gespart<br><b style="color:var(--green)">Platz 3</b> — Wenn gespart: nächste Stufe kostenlos! Wenn nicht: Auszahlung<br><b style="color:var(--poly2)">Platz 4</b> — Stufe startet neu. Zahlung geht an Sponsor',
    pl: 'Każdy poziom ma 4 sloty wypełniane po kolei:<br><br><b style="color:var(--green)">Slot 1</b> — Bezpośrednia wypłata<br><b style="color:var(--frozen)">Slot 2</b> — Jeśli masz kolejny poziom: wypłata. Jeśli nie: pieniądze oszczędzone na autokupno<br><b style="color:var(--green)">Slot 3</b> — Jeśli oszczędzone: kolejny poziom za darmo! Jeśli nie: wypłata<br><b style="color:var(--poly2)">Slot 4</b> — Poziom się resetuje. Płatność idzie do sponsora',
    vi: 'Mỗi cấp có 4 ô được lấp đầy lần lượt:<br><br><b style="color:var(--green)">Ô 1</b> — Thanh toán trực tiếp<br><b style="color:var(--frozen)">Ô 2</b> — Nếu có cấp tiếp: thanh toán. Nếu không: tiền được giữ để tự động mua<br><b style="color:var(--green)">Ô 3</b> — Nếu đã giữ tiền: cấp tiếp mở miễn phí! Nếu không: thanh toán<br><b style="color:var(--poly2)">Ô 4</b> — Cấp đặt lại. Thanh toán đi lên người bảo trợ',
    ko: '각 레벨에는 순서대로 채워지는 4개 슬롯이 있습니다:<br><br><b style="color:var(--green)">슬롯 1</b> — 직접 지급<br><b style="color:var(--frozen)">슬롯 2</b> — 다음 레벨이 있으면: 지급. 없으면: 자동구매용으로 저축<br><b style="color:var(--green)">슬롯 3</b> — 저축되었으면: 다음 레벨 무료 개방! 아니면: 지급<br><b style="color:var(--poly2)">슬롯 4</b> — 레벨 리셋. 결제가 스폰서에게 전달',
    ja: '各レベルには順番に埋まる4つのスロットがあります:<br><br><b style="color:var(--green)">スロット1</b> — 直接支払い<br><b style="color:var(--frozen)">スロット2</b> — 次レベルがあれば: 支払い。なければ: 自動購入用に保存<br><b style="color:var(--green)">スロット3</b> — 保存されていれば: 次レベル無料！なければ: 支払い<br><b style="color:var(--poly2)">スロット4</b> — レベルリセット。支払いがスポンサーへ',
    hi: 'हर स्तर में 4 स्लॉट होते हैं जो एक-एक करके भरते हैं:<br><br><b style="color:var(--green)">स्लॉट 1</b> — सीधा भुगतान<br><b style="color:var(--frozen)">स्लॉट 2</b> — अगला स्तर है तो: भुगतान। नहीं तो: ऑटो-खरीद के लिए पैसे रखे जाते हैं<br><b style="color:var(--green)">स्लॉट 3</b> — पैसे रखे थे तो: अगला स्तर मुफ्त! नहीं तो: भुगतान<br><b style="color:var(--poly2)">स्लॉट 4</b> — स्तर रीसेट। भुगतान स्पॉन्सर को जाता है',
    zh: '每个级别有4个插槽，按顺序填充:<br><br><b style="color:var(--green)">插槽1</b> — 直接支付<br><b style="color:var(--frozen)">插槽2</b> — 有下一级：支付。没有：资金保存用于自动购买<br><b style="color:var(--green)">插槽3</b> — 有保存的资金：下一级免费开启！没有：支付<br><b style="color:var(--poly2)">插槽4</b> — 级别重置。付款转给赞助人',
    tr: 'Her seviyede sırayla dolan 4 slot var:<br><br><b style="color:var(--green)">Slot 1</b> — Doğrudan ödeme<br><b style="color:var(--frozen)">Slot 2</b> — Sonraki seviye varsa: ödeme. Yoksa: otomatik satın alma için biriktirme<br><b style="color:var(--green)">Slot 3</b> — Biriktirilmişse: sonraki seviye ücretsiz! Yoksa: ödeme<br><b style="color:var(--poly2)">Slot 4</b> — Seviye sıfırlanır. Ödeme sponsora gider',
  },
  faq_fees_a: {
    en: '<b>Activation fee:</b> +10% to level price (only when you buy manually)<br><b>Auto-unlock fee:</b> $0 — FREE!<br><b>Payout fee:</b> $0 — None<br><b>Gas fee:</b> ~$0.0001 per transaction<br><br>Just one fee: 10% when you buy a level. Auto-purchases are free because the fee was already paid by those below you.',
    ru: '<b>Комиссия активации:</b> +10% к цене уровня (только при ручной покупке)<br><b>Автопокупка:</b> $0 — БЕСПЛАТНО!<br><b>Комиссия выплат:</b> $0 — Нет<br><b>Газ:</b> ~$0.0001 за транзакцию<br><br>Всего одна комиссия: 10% при покупке уровня. Автопокупки бесплатны — комиссия уже была оплачена теми кто ниже.',
    ua: '<b>Комісія активації:</b> +10% до ціни рівня (тільки при ручній купівлі)<br><b>Автокупівля:</b> $0 — БЕЗКОШТОВНО!<br><b>Комісія виплат:</b> $0 — Немає<br><b>Газ:</b> ~$0.0001 за транзакцію<br><br>Лише одна комісія: 10% при купівлі рівня. Автокупівлі безкоштовні.',
    es: '<b>Tarifa de activación:</b> +10% del precio (solo compra manual)<br><b>Desbloqueo automático:</b> $0 — ¡GRATIS!<br><b>Tarifa de pago:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>Solo una tarifa: 10% al comprar. Las compras automáticas son gratis.',
    pt: '<b>Taxa de ativação:</b> +10% do preço (só compra manual)<br><b>Desbloqueio automático:</b> $0 — GRÁTIS!<br><b>Taxa de pagamento:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>Só uma taxa: 10% ao comprar. Compras automáticas são grátis.',
    fr: '<b>Frais d\'activation :</b> +10% du prix (achat manuel uniquement)<br><b>Déblocage auto :</b> 0$ — GRATUIT !<br><b>Frais de paiement :</b> 0$<br><b>Gas :</b> ~0,0001$<br><br>Un seul frais : 10% à l\'achat. Les achats automatiques sont gratuits.',
    de: '<b>Aktivierungsgebühr:</b> +10% zum Preis (nur manueller Kauf)<br><b>Auto-Freischaltung:</b> $0 — KOSTENLOS!<br><b>Auszahlungsgebühr:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>Nur eine Gebühr: 10% beim Kauf. Autokäufe sind kostenlos.',
    pl: '<b>Opłata aktywacji:</b> +10% do ceny (tylko ręczny zakup)<br><b>Autoodblokowanie:</b> $0 — ZA DARMO!<br><b>Opłata za wypłatę:</b> $0<br><b>Gaz:</b> ~$0.0001<br><br>Jedna opłata: 10% przy zakupie. Automatyczne zakupy są za darmo.',
    vi: '<b>Phí kích hoạt:</b> +10% giá cấp (chỉ mua thủ công)<br><b>Tự mở khóa:</b> $0 — MIỄN PHÍ!<br><b>Phí thanh toán:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>Chỉ một phí: 10% khi mua. Mua tự động miễn phí.',
    ko: '<b>활성화 수수료:</b> 레벨 가격의 +10% (수동 구매만)<br><b>자동 해제:</b> $0 — 무료!<br><b>지급 수수료:</b> $0<br><b>가스:</b> ~$0.0001<br><br>수수료는 하나: 구매시 10%. 자동구매는 무료.',
    ja: '<b>有効化手数料:</b> 価格の+10%（手動購入のみ）<br><b>自動解除:</b> $0 — 無料！<br><b>支払い手数料:</b> $0<br><b>ガス:</b> ~$0.0001<br><br>手数料は1つだけ: 購入時10%。自動購入は無料。',
    hi: '<b>सक्रियण शुल्क:</b> कीमत का +10% (केवल मैन्युअल खरीद)<br><b>ऑटो-अनलॉक:</b> $0 — मुफ्त!<br><b>भुगतान शुल्क:</b> $0<br><b>गैस:</b> ~$0.0001<br><br>बस एक शुल्क: खरीदते समय 10%। ऑटो-खरीद मुफ्त।',
    zh: '<b>激活费:</b> 价格的+10%（仅手动购买）<br><b>自动解锁:</b> $0 — 免费！<br><b>支付费:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>只有一个费用：购买时10%。自动购买免费。',
    tr: '<b>Etkinleştirme ücreti:</b> Fiyatın +%10\'u (sadece manuel satın alma)<br><b>Otomatik kilitleme:</b> $0 — ÜCRETSİZ!<br><b>Ödeme ücreti:</b> $0<br><b>Gas:</b> ~$0.0001<br><br>Tek ücret: satın alırken %10. Otomatik satın almalar ücretsiz.',
  },
  faq_trouble_a: {
    en: '1. <b>Refresh the page</b> — pull down or tap refresh<br>2. <b>Check your network</b> — must be Polygon<br>3. <b>Check USDC balance</b> — need enough for level + 10% fee<br>4. <b>Wait a moment</b> — transactions take a few seconds<br>5. <b>Reconnect wallet</b> — disconnect and reconnect MetaMask<br><br>If level shows "Buy" but it\'s already purchased — just refresh the page.',
    ru: '1. <b>Обновите страницу</b> — потяните вниз или нажмите обновить<br>2. <b>Проверьте сеть</b> — должна быть Polygon<br>3. <b>Проверьте баланс USDC</b> — нужно достаточно для уровня + 10%<br>4. <b>Подождите</b> — транзакции занимают несколько секунд<br>5. <b>Переподключите кошелёк</b> — отключите и подключите MetaMask заново<br><br>Если уровень показывает "Купить" но уже куплен — просто обновите страницу.',
    ua: '1. <b>Оновіть сторінку</b> — потягніть вниз<br>2. <b>Перевірте мережу</b> — має бути Polygon<br>3. <b>Перевірте баланс USDC</b><br>4. <b>Зачекайте</b> — транзакції займають кілька секунд<br>5. <b>Перепідключіть гаманець</b><br><br>Якщо рівень показує "Купити" але вже куплений — оновіть сторінку.',
    es: '1. <b>Actualiza la página</b><br>2. <b>Verifica la red</b> — debe ser Polygon<br>3. <b>Verifica tu saldo USDC</b><br>4. <b>Espera un momento</b><br>5. <b>Reconecta la wallet</b><br><br>Si el nivel dice "Comprar" pero ya está comprado — actualiza la página.',
    pt: '1. <b>Atualize a página</b><br>2. <b>Verifique a rede</b> — deve ser Polygon<br>3. <b>Verifique o saldo USDC</b><br>4. <b>Aguarde um momento</b><br>5. <b>Reconecte a carteira</b><br><br>Se o nível mostra "Comprar" mas já foi comprado — atualize a página.',
    fr: '1. <b>Rafraîchissez la page</b><br>2. <b>Vérifiez le réseau</b> — doit être Polygon<br>3. <b>Vérifiez votre solde USDC</b><br>4. <b>Patientez</b><br>5. <b>Reconnectez le portefeuille</b><br><br>Si le niveau affiche "Acheter" mais est déjà acheté — rafraîchissez.',
    de: '1. <b>Seite aktualisieren</b><br>2. <b>Netzwerk prüfen</b> — muss Polygon sein<br>3. <b>USDC-Guthaben prüfen</b><br>4. <b>Kurz warten</b><br>5. <b>Wallet neu verbinden</b><br><br>Wenn "Kaufen" angezeigt wird aber bereits gekauft — Seite aktualisieren.',
    pl: '1. <b>Odśwież stronę</b><br>2. <b>Sprawdź sieć</b> — musi być Polygon<br>3. <b>Sprawdź saldo USDC</b><br>4. <b>Poczekaj chwilę</b><br>5. <b>Podłącz portfel ponownie</b><br><br>Jeśli poziom pokazuje "Kup" ale jest kupiony — odśwież stronę.',
    vi: '1. <b>Làm mới trang</b><br>2. <b>Kiểm tra mạng</b> — phải là Polygon<br>3. <b>Kiểm tra số dư USDC</b><br>4. <b>Đợi một chút</b><br>5. <b>Kết nối lại ví</b><br><br>Nếu cấp hiện "Mua" nhưng đã mua — làm mới trang.',
    ko: '1. <b>페이지 새로고침</b><br>2. <b>네트워크 확인</b> — Polygon이어야 합니다<br>3. <b>USDC 잔액 확인</b><br>4. <b>잠시 대기</b><br>5. <b>지갑 재연결</b><br><br>"구매" 표시되지만 이미 구매됨 — 페이지 새로고침.',
    ja: '1. <b>ページ更新</b><br>2. <b>ネットワーク確認</b> — Polygonが必要<br>3. <b>USDC残高確認</b><br>4. <b>少し待つ</b><br>5. <b>ウォレット再接続</b><br><br>「購入」と表示されるが既に購入済み — ページ更新。',
    hi: '1. <b>पेज रिफ्रेश करें</b><br>2. <b>नेटवर्क चेक करें</b> — Polygon होना चाहिए<br>3. <b>USDC बैलेंस चेक करें</b><br>4. <b>थोड़ा इंतज़ार करें</b><br>5. <b>वॉलेट रीकनेक्ट करें</b><br><br>"खरीदें" दिखे लेकिन पहले से खरीदा है — पेज रिफ्रेश करें।',
    zh: '1. <b>刷新页面</b><br>2. <b>检查网络</b> — 必须是Polygon<br>3. <b>检查USDC余额</b><br>4. <b>等一下</b><br>5. <b>重新连接钱包</b><br><br>如果显示"购买"但已购买 — 刷新页面。',
    tr: '1. <b>Sayfayı yenile</b><br>2. <b>Ağı kontrol et</b> — Polygon olmalı<br>3. <b>USDC bakiyeni kontrol et</b><br>4. <b>Biraz bekle</b><br>5. <b>Cüzdanı yeniden bağla</b><br><br>"Satın Al" görünüyor ama zaten alınmışsa — sayfayı yenile.',
  },

  // ==================== FAQ SIMPLE ANSWERS ====================
  faq_autounlock_a: {
    en: 'When slot 2 fills and you don\'t own the next level, your funds are temporarily held. When slot 3 fills, both payments combine to auto-purchase the next level — completely free, no activation fee charged. Two payments at level N = one next level.',
    ru: 'Когда слот 2 заполняется и у вас нет следующего уровня, средства временно замораживаются. Когда заполняется слот 3, оба платежа объединяются для автопокупки следующего уровня — полностью бесплатно. Два платежа на уровне N = один следующий уровень.',
    ua: 'Коли слот 2 заповнюється і у вас немає наступного рівня, кошти тимчасово заморожуються. Коли заповнюється слот 3, обидва платежі об\'єднуються для автокупівлі наступного рівня — повністю безкоштовно.',
    es: 'Cuando el espacio 2 se llena y no tienes el siguiente nivel, tus fondos se retienen temporalmente. Cuando se llena el espacio 3, ambos pagos se combinan para comprar automáticamente el siguiente nivel — completamente gratis.',
    pt: 'Quando o espaço 2 é preenchido e você não tem o próximo nível, seus fundos são retidos temporariamente. Quando o espaço 3 é preenchido, ambos os pagamentos se combinam para comprar automaticamente o próximo nível — totalmente grátis.',
    fr: 'Quand l\'emplacement 2 se remplit et que vous ne possédez pas le niveau suivant, vos fonds sont temporairement retenus. Quand l\'emplacement 3 se remplit, les deux paiements se combinent pour acheter automatiquement le niveau suivant — totalement gratuit.',
    de: 'Wenn Platz 2 gefüllt wird und Sie die nächste Stufe nicht besitzen, werden Ihre Mittel vorübergehend einbehalten. Wenn Platz 3 gefüllt wird, kombinieren sich beide Zahlungen zum automatischen Kauf der nächsten Stufe — völlig kostenlos.',
    pl: 'Gdy slot 2 się zapełnia i nie masz następnego poziomu, środki są tymczasowo zamrożone. Gdy slot 3 się zapełnia, oba płatności łączą się w automatyczny zakup następnego poziomu — całkowicie za darmo.',
    vi: 'Khi ô 2 được lấp đầy và bạn không có cấp tiếp theo, tiền tạm giữ. Khi ô 3 được lấp đầy, hai khoản thanh toán kết hợp để tự động mua cấp tiếp — hoàn toàn miễn phí.',
    ko: '슬롯 2가 채워지고 다음 레벨이 없으면 자금이 일시 보류됩니다. 슬롯 3이 채워지면 두 결제가 합쳐져 다음 레벨을 자동 구매합니다 — 완전 무료.',
    ja: 'スロット2が埋まり次のレベルを所有していない場合、資金が一時保留されます。スロット3が埋まると、両方の支払いが合算されて次のレベルが自動購入されます — 完全無料。',
    hi: 'जब स्लॉट 2 भरता है और अगला स्तर नहीं है, तो धनराशि अस्थायी रूप से रोकी जाती है। स्लॉट 3 भरने पर दोनों भुगतान मिलकर अगला स्तर ऑटो-खरीद करते हैं — बिल्कुल मुफ्त।',
    zh: '当插槽2被填满而您没有下一级时，资金会被暂时冻结。当插槽3被填满时，两笔付款合并自动购买下一级——完全免费。',
    tr: 'Slot 2 dolduğunda ve bir sonraki seviyeniz yoksa, fonlarınız geçici olarak tutulur. Slot 3 dolduğunda, iki ödeme birleşerek sonraki seviyeyi otomatik satın alır — tamamen ücretsiz.',
  },
  faq_slot4_a: {
    en: 'The level resets (cycle count increases, all slots cleared). The slot 4 payment moves up the referral chain (spillover) to the nearest person above you who has that level active. Your level is then ready to accept new members again.',
    ru: 'Уровень перезапускается (счётчик циклов увеличивается, все слоты очищаются). Платёж из слота 4 уходит вверх по цепочке рефералов (spillover) к ближайшему человеку с активным этим уровнем. Ваш уровень снова готов принимать новых участников.',
    ua: 'Рівень перезапускається (лічильник циклів збільшується, всі слоти очищаються). Платіж зі слоту 4 йде вгору по ланцюжку рефералів (spillover). Ваш рівень знову готовий приймати нових учасників.',
    es: 'El nivel se reinicia (el conteo de ciclos aumenta, todos los espacios se limpian). El pago del espacio 4 sube por la cadena de referidos (spillover). Tu nivel está listo para aceptar nuevos miembros.',
    pt: 'O nível reinicia (contagem de ciclos aumenta, todos os espaços limpos). O pagamento do espaço 4 sobe pela cadeia de indicações (spillover). Seu nível está pronto para aceitar novos membros.',
    fr: 'Le niveau se réinitialise (compteur de cycles augmenté, emplacements vidés). Le paiement de l\'emplacement 4 remonte la chaîne de parrainage (spillover). Votre niveau est prêt à accepter de nouveaux membres.',
    de: 'Die Stufe wird zurückgesetzt (Zykluszähler erhöht, alle Plätze geleert). Die Zahlung von Platz 4 geht in der Empfehlungskette nach oben (Spillover). Ihre Stufe ist bereit, neue Mitglieder aufzunehmen.',
    pl: 'Poziom się resetuje (licznik cykli rośnie, sloty wyczyszczone). Płatność ze slotu 4 idzie w górę łańcucha poleceń (spillover). Twój poziom jest gotowy na nowych członków.',
    vi: 'Cấp độ đặt lại (số chu kỳ tăng, tất cả ô được xóa). Thanh toán từ ô 4 đi lên chuỗi giới thiệu (spillover). Cấp của bạn sẵn sàng nhận thành viên mới.',
    ko: '레벨이 리셋됩니다 (사이클 수 증가, 모든 슬롯 초기화). 슬롯 4 결제는 추천 체인 위로 이동합니다 (스필오버). 레벨이 새 멤버를 받을 준비가 됩니다.',
    ja: 'レベルがリセットされます（サイクル数増加、全スロットクリア）。スロット4の支払いが紹介チェーンの上位に移動します（スピルオーバー）。レベルは新メンバーを受け入れる準備ができます。',
    hi: 'स्तर रीसेट होता है (चक्र गणना बढ़ती है, सभी स्लॉट साफ)। स्लॉट 4 का भुगतान रेफरल चेन में ऊपर जाता है (spillover)। आपका स्तर नए सदस्यों के लिए तैयार है।',
    zh: '级别重置（周期计数增加，所有插槽清空）。插槽4的付款沿推荐链向上移动（溢出）。您的级别准备好接受新成员。',
    tr: 'Seviye sıfırlanır (döngü sayısı artar, tüm slotlar temizlenir). Slot 4 ödemesi referans zincirinde yukarı gider (spillover). Seviyeniz yeni üyeleri kabul etmeye hazır.',
  },
  faq_safe_a: {
    en: 'All funds are managed by a smart contract on Polygon. No person controls them. What goes in through MetaMask comes out through MetaMask. Temporarily held funds (slot 2) are protected — the admin cannot withdraw frozen user funds.',
    ru: 'Все средства управляются смарт-контрактом на Polygon. Ни один человек их не контролирует. Что вошло через MetaMask, выходит через MetaMask. Временно замороженные средства (слот 2) защищены — администратор не может вывести замороженные средства пользователей.',
    ua: 'Всі кошти управляються смарт-контрактом на Polygon. Жодна людина їх не контролює. Що зайшло через MetaMask, виходить через MetaMask. Тимчасово заморожені кошти (слот 2) захищені.',
    es: 'Todos los fondos son gestionados por un contrato inteligente en Polygon. Nadie los controla. Lo que entra por MetaMask sale por MetaMask. Los fondos retenidos temporalmente (espacio 2) están protegidos.',
    pt: 'Todos os fundos são gerenciados por um contrato inteligente na Polygon. Ninguém os controla. O que entra pelo MetaMask sai pelo MetaMask. Fundos retidos temporariamente (espaço 2) são protegidos.',
    fr: 'Tous les fonds sont gérés par un contrat intelligent sur Polygon. Personne ne les contrôle. Ce qui entre par MetaMask sort par MetaMask. Les fonds temporairement retenus (emplacement 2) sont protégés.',
    de: 'Alle Gelder werden von einem Smart Contract auf Polygon verwaltet. Keine Person kontrolliert sie. Was über MetaMask hereinkommt, geht über MetaMask heraus. Vorübergehend eingefrorene Gelder (Platz 2) sind geschützt.',
    pl: 'Wszystkie środki zarządzane są przez smart kontrakt na Polygon. Nikt ich nie kontroluje. Co weszło przez MetaMask, wychodzi przez MetaMask. Tymczasowo zamrożone środki (slot 2) są chronione.',
    vi: 'Tất cả quỹ được quản lý bởi hợp đồng thông minh trên Polygon. Không ai kiểm soát chúng. Gì vào qua MetaMask thì ra qua MetaMask. Quỹ tạm giữ (ô 2) được bảo vệ.',
    ko: '모든 자금은 Polygon의 스마트 컨트랙트로 관리됩니다. 아무도 통제하지 않습니다. MetaMask로 들어온 것은 MetaMask로 나갑니다. 일시 보류 자금(슬롯 2)은 보호됩니다.',
    ja: '全資金はPolygon上のスマートコントラクトで管理されます。誰も制御できません。MetaMaskから入ったものはMetaMaskから出ます。一時保留資金（スロット2）は保護されています。',
    hi: 'सभी फंड Polygon पर स्मार्ट कॉन्ट्रैक्ट द्वारा प्रबंधित होते हैं। कोई व्यक्ति इन्हें नियंत्रित नहीं करता। MetaMask से जो आता है MetaMask से जाता है। अस्थायी रोकी गई धनराशि (स्लॉट 2) सुरक्षित है।',
    zh: '所有资金由Polygon上的智能合约管理。没有人控制它们。通过MetaMask进入的通过MetaMask退出。临时冻结的资金（插槽2）受到保护。',
    tr: 'Tüm fonlar Polygon üzerindeki akıllı sözleşme tarafından yönetilir. Hiç kimse kontrol etmez. MetaMask\'tan giren MetaMask\'tan çıkar. Geçici olarak tutulan fonlar (slot 2) korunmaktadır.',
  },
  faq_usdc_a: {
    en: 'USDC is a stablecoin pegged to $1. All level prices are in USDC. You also need a tiny amount of POL (Polygon\'s native token) for gas fees — about $0.0001 per transaction.',
    ru: 'USDC — стейблкоин привязанный к $1. Все цены уровней в USDC. Также нужна небольшая сумма POL (нативный токен Polygon) для оплаты газа — около $0.0001 за транзакцию.',
    ua: 'USDC — стейблкоїн прив\'язаний до $1. Всі ціни рівнів в USDC. Також потрібна невелика сума POL (нативний токен Polygon) для газу — близько $0.0001 за транзакцію.',
    es: 'USDC es una stablecoin vinculada a $1. Todos los precios de niveles están en USDC. También necesitas una pequeña cantidad de POL para gas — aproximadamente $0.0001 por transacción.',
    pt: 'USDC é uma stablecoin atrelada a $1. Todos os preços dos níveis são em USDC. Você também precisa de uma pequena quantidade de POL para gás — cerca de $0.0001 por transação.',
    fr: 'USDC est un stablecoin indexé sur 1$. Tous les prix des niveaux sont en USDC. Vous avez également besoin d\'une petite quantité de POL pour les frais de gas — environ 0,0001$ par transaction.',
    de: 'USDC ist ein an $1 gekoppelter Stablecoin. Alle Stufenpreise sind in USDC. Sie benötigen auch eine kleine Menge POL für Gasgebühren — etwa $0,0001 pro Transaktion.',
    pl: 'USDC to stablecoin powiązany z $1. Wszystkie ceny poziomów są w USDC. Potrzebujesz też niewielkiej ilości POL na opłaty gazowe — około $0.0001 za transakcję.',
    vi: 'USDC là stablecoin gắn với $1. Tất cả giá cấp đều bằng USDC. Bạn cũng cần một lượng nhỏ POL cho phí gas — khoảng $0.0001 mỗi giao dịch.',
    ko: 'USDC는 $1에 고정된 스테이블코인입니다. 모든 레벨 가격은 USDC입니다. 가스비를 위해 소량의 POL도 필요합니다 — 거래당 약 $0.0001.',
    ja: 'USDCは$1に連動したステーブルコインです。全レベル価格はUSDCです。ガス代として少量のPOLも必要です — 取引あたり約$0.0001。',
    hi: 'USDC $1 से जुड़ा स्टेबलकॉइन है। सभी स्तर मूल्य USDC में हैं। गैस शुल्क के लिए थोड़ा POL भी चाहिए — प्रति लेनदेन लगभग $0.0001।',
    zh: 'USDC是与$1挂钩的稳定币。所有级别价格都是USDC。您还需要少量POL支付gas费——每笔交易约$0.0001。',
    tr: 'USDC, $1\'e sabitlenmiş bir stablecoin\'dir. Tüm seviye fiyatları USDC cinsindendir. Gas ücretleri için az miktarda POL\'a da ihtiyacınız var — işlem başına yaklaşık $0.0001.',
  },
  faq_alllevels_a: {
    en: 'No! Buy levels in order, starting from L1 ($3). Many levels will open automatically through the auto-unlock feature. Sweet spot is L4–L7 for moderate investment. Higher levels are for builders with larger networks.',
    ru: 'Нет! Покупайте уровни по порядку, начиная с L1 ($3). Многие уровни откроются автоматически через функцию автопокупки. Оптимальный диапазон — L4–L7 для умеренных инвестиций. Высокие уровни — для строителей с большими сетями.',
    ua: 'Ні! Купуйте рівні по порядку, починаючи з L1 ($3). Багато рівнів відкриються автоматично через функцію автокупівлі. Оптимальний діапазон — L4–L7. Високі рівні — для будівників з великими мережами.',
    es: '¡No! Compra niveles en orden, empezando por L1 ($3). Muchos niveles se abrirán automáticamente. El rango óptimo es L4–L7 para inversión moderada.',
    pt: 'Não! Compre níveis em ordem, começando por L1 ($3). Muitos níveis abrirão automaticamente. O ponto ideal é L4–L7 para investimento moderado.',
    fr: 'Non ! Achetez les niveaux dans l\'ordre, en commençant par L1 (3$). Beaucoup de niveaux s\'ouvriront automatiquement. La zone idéale est L4–L7 pour un investissement modéré.',
    de: 'Nein! Kaufen Sie Stufen der Reihe nach, beginnend mit L1 ($3). Viele Stufen werden automatisch freigeschaltet. Der Sweet Spot ist L4–L7 für moderate Investitionen.',
    pl: 'Nie! Kupuj poziomy po kolei, zaczynając od L1 ($3). Wiele poziomów otworzy się automatycznie. Optymalny zakres to L4–L7 dla umiarkowanej inwestycji.',
    vi: 'Không! Mua các cấp theo thứ tự, bắt đầu từ L1 ($3). Nhiều cấp sẽ tự động mở. Phạm vi tối ưu là L4–L7 cho đầu tư vừa phải.',
    ko: '아니요! L1($3)부터 순서대로 구매하세요. 많은 레벨이 자동으로 열립니다. 적절한 투자 범위는 L4–L7입니다.',
    ja: 'いいえ！L1($3)から順番に購入してください。多くのレベルが自動解除されます。適度な投資ならL4–L7がおすすめです。',
    hi: 'नहीं! L1 ($3) से शुरू करके क्रम में खरीदें। कई स्तर ऑटो-अनलॉक से खुलेंगे। मध्यम निवेश के लिए L4–L7 उचित है।',
    zh: '不需要！从L1($3)开始按顺序购买。许多级别会通过自动解锁功能自动开启。适中投资推荐L4-L7。',
    tr: 'Hayır! L1\'den ($3) başlayarak sırayla satın alın. Birçok seviye otomatik olarak açılacaktır. Orta yatırım için L4–L7 idealdir.',
  },

  // ==================== DYNAMIC JS TEXTS ====================
  received_level: {
    en: 'Received · L', ru: 'Получено · L', ua: 'Отримано · L', es: 'Recibido · L', pt: 'Recebido · L', fr: 'Reçu · L',
    de: 'Erhalten · L', pl: 'Otrzymano · L', vi: 'Nhận · L', ko: '수령 · L', ja: '受取 · L', hi: 'प्राप्त · L', zh: '收到 · L', tr: 'Alındı · L',
  },
  frozen_level: {
    en: 'Frozen · L', ru: 'Заморожено · L', ua: 'Заморожено · L', es: 'Congelado · L', pt: 'Congelado · L', fr: 'Gelé · L',
    de: 'Eingefroren · L', pl: 'Zamrożone · L', vi: 'Đóng băng · L', ko: '동결 · L', ja: '凍結 · L', hi: 'फ्रोज़न · L', zh: '冻结 · L', tr: 'Dondurulmuş · L',
  },
  spillover_level: {
    en: 'Spillover · L', ru: 'Спиловер · L', ua: 'Спіловер · L', es: 'Desborde · L', pt: 'Transbordamento · L', fr: 'Débordement · L',
    de: 'Spillover · L', pl: 'Spillover · L', vi: 'Tràn · L', ko: '스필오버 · L', ja: 'スピルオーバー · L', hi: 'स्पिलओवर · L', zh: '溢出 · L', tr: 'Taşma · L',
  },
  reset_level: {
    en: 'Reset · L', ru: 'Сброс · L', ua: 'Скидання · L', es: 'Reinicio · L', pt: 'Reinício · L', fr: 'Réinitialisation · L',
    de: 'Zurückgesetzt · L', pl: 'Reset · L', vi: 'Đặt lại · L', ko: '리셋 · L', ja: 'リセット · L', hi: 'रीसेट · L', zh: '重置 · L', tr: 'Sıfırla · L',
  },
  auto_open_level: {
    en: 'Auto-open L', ru: 'Автооткрытие L', ua: 'Автовідкриття L', es: 'Apertura auto L', pt: 'Abertura auto L', fr: 'Ouverture auto L',
    de: 'Auto-Öffnung L', pl: 'Autootwarcie L', vi: 'Tự mở L', ko: '자동열림 L', ja: '自動開放 L', hi: 'ऑटो-ओपन L', zh: '自动开启 L', tr: 'Otomatik açma L',
  },
  bonus_level: {
    en: 'Bonus L', ru: 'Бонус L', ua: 'Бонус L', es: 'Bono L', pt: 'Bônus L', fr: 'Bonus L',
    de: 'Bonus L', pl: 'Bonus L', vi: 'Thưởng L', ko: '보너스 L', ja: 'ボーナス L', hi: 'बोनस L', zh: '奖金 L', tr: 'Bonus L',
  },
  level_activated: {
    en: 'Level', ru: 'Уровень', ua: 'Рівень', es: 'Nivel', pt: 'Nível', fr: 'Niveau',
    de: 'Stufe', pl: 'Poziom', vi: 'Cấp', ko: '레벨', ja: 'レベル', hi: 'स्तर', zh: '级别', tr: 'Seviye',
  },
  from: {
    en: 'from', ru: 'от', ua: 'від', es: 'de', pt: 'de', fr: 'de',
    de: 'von', pl: 'od', vi: 'từ', ko: '보낸이', ja: 'から', hi: 'से', zh: '来自', tr: 'gönderen',
  },
  cost_to_activate: {
    en: 'Cost to activate', ru: 'Стоимость активации', ua: 'Вартість активації', es: 'Costo de activación', pt: 'Custo de ativação', fr: "Coût d'activation",
    de: 'Aktivierungskosten', pl: 'Koszt aktywacji', vi: 'Chi phí kích hoạt', ko: '활성화 비용', ja: '有効化コスト', hi: 'सक्रियण लागत', zh: '激活成本', tr: 'Etkinleştirme maliyeti',
  },
  sponsor_receives: {
    en: 'Your sponsor receives', ru: 'Ваш спонсор получит', ua: 'Ваш спонсор отримає', es: 'Tu patrocinador recibe', pt: 'Seu patrocinador recebe',
    fr: 'Votre parrain reçoit', de: 'Ihr Sponsor erhält', pl: 'Twój sponsor otrzyma', vi: 'Người bảo trợ nhận',
    ko: '스폰서가 받는 금액', ja: 'スポンサーの受取額', hi: 'आपके स्पॉन्सर को मिलेगा', zh: '您的赞助人收到', tr: 'Sponsorunuz alır',
  },
  share_ref_link: {
    en: 'Share ref link', ru: 'Поделиться ссылкой', ua: 'Поділитися посиланням', es: 'Compartir enlace', pt: 'Compartilhar link', fr: 'Partager le lien',
    de: 'Link teilen', pl: 'Udostępnij link', vi: 'Chia sẻ liên kết', ko: '링크 공유', ja: 'リンク共有', hi: 'लिंक साझा करें', zh: '分享链接', tr: 'Link paylaş',
  },
  level_already_active: {
    en: 'already active', ru: 'уже активен', ua: 'вже активний', es: 'ya activo', pt: 'já ativo', fr: 'déjà actif',
    de: 'bereits aktiv', pl: 'już aktywny', vi: 'đã kích hoạt', ko: '이미 활성', ja: 'すでにアクティブ', hi: 'पहले से सक्रिय', zh: '已激活', tr: 'zaten aktif',
  },
  purchase_complete: {
    en: 'Purchase complete', ru: 'Покупка завершена', ua: 'Купівля завершена', es: 'Compra completada', pt: 'Compra concluída', fr: 'Achat terminé',
    de: 'Kauf abgeschlossen', pl: 'Zakup zakończony', vi: 'Mua hoàn tất', ko: '구매 완료', ja: '購入完了', hi: 'खरीद पूर्ण', zh: '购买完成', tr: 'Satın alma tamamlandı',
  },
  confirm_metamask: {
    en: 'Confirm in MetaMask', ru: 'Подтвердите в MetaMask', ua: 'Підтвердіть у MetaMask', es: 'Confirma en MetaMask', pt: 'Confirme no MetaMask',
    fr: 'Confirmez dans MetaMask', de: 'In MetaMask bestätigen', pl: 'Potwierdź w MetaMask', vi: 'Xác nhận trong MetaMask',
    ko: 'MetaMask에서 확인', ja: 'MetaMaskで確認', hi: 'MetaMask में पुष्टि करें', zh: '在MetaMask中确认', tr: "MetaMask'ta onayla",
  },
  approving: {
    en: 'Approving...', ru: 'Одобрение...', ua: 'Схвалення...', es: 'Aprobando...', pt: 'Aprovando...', fr: 'Approbation...',
    de: 'Genehmigung...', pl: 'Zatwierdzanie...', vi: 'Đang phê duyệt...', ko: '승인 중...', ja: '承認中...', hi: 'अनुमोदन...', zh: '审批中...', tr: 'Onaylanıyor...',
  },
  activating: {
    en: 'Activating...', ru: 'Активация...', ua: 'Активація...', es: 'Activando...', pt: 'Ativando...', fr: 'Activation...',
    de: 'Aktivierung...', pl: 'Aktywacja...', vi: 'Đang kích hoạt...', ko: '활성화 중...', ja: '有効化中...', hi: 'सक्रिय हो रहा...', zh: '激活中...', tr: 'Etkinleştiriliyor...',
  },
  tx_sent: {
    en: 'Transaction sent', ru: 'Транзакция отправлена', ua: 'Транзакція відправлена', es: 'Transacción enviada', pt: 'Transação enviada', fr: 'Transaction envoyée',
    de: 'Transaktion gesendet', pl: 'Transakcja wysłana', vi: 'Giao dịch đã gửi', ko: '트랜잭션 전송됨', ja: 'トランザクション送信済み', hi: 'लेनदेन भेजा गया', zh: '交易已发送', tr: 'İşlem gönderildi',
  },
  ready_activate: {
    en: 'Ready to activate', ru: 'Готово к активации', ua: 'Готово до активації', es: 'Listo para activar', pt: 'Pronto para ativar', fr: 'Prêt à activer',
    de: 'Bereit zur Aktivierung', pl: 'Gotowy do aktywacji', vi: 'Sẵn sàng kích hoạt', ko: '활성화 준비 완료', ja: '有効化準備完了', hi: 'सक्रिय करने के लिए तैयार', zh: '准备激活', tr: 'Etkinleştirmeye hazır',
  },
  data_refreshed: {
    en: 'Data refreshed', ru: 'Данные обновлены', ua: 'Дані оновлені', es: 'Datos actualizados', pt: 'Dados atualizados', fr: 'Données actualisées',
    de: 'Daten aktualisiert', pl: 'Dane odświeżone', vi: 'Dữ liệu đã cập nhật', ko: '데이터 새로고침', ja: 'データ更新済み', hi: 'डेटा रिफ्रेश', zh: '数据已刷新', tr: 'Veriler güncellendi',
  },
};

// Get translation for current language
// Auto-detect language from browser/system
function detectLang() {
  const saved = localStorage.getItem('xn_lang');
  if (saved && LANGS[saved]) return saved;
  // Try browser language
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const short = browserLang.split('-')[0];
  // Map browser codes to our codes
  const map = { en:'en', ru:'ru', uk:'ua', ua:'ua', es:'es', pt:'pt', fr:'fr', de:'de', pl:'pl', vi:'vi', ko:'ko', ja:'ja', hi:'hi', zh:'zh', tr:'tr', ar:'ar', th:'th' };
  return map[short] || 'en';
}
let currentLang = detectLang();

function t(key) {
  const entry = T[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('xn_lang', lang);
  applyTranslations();
  // Re-render dynamic sections with new language
  if (typeof renderLevels === 'function') {
    renderLevels('dash-lvls');
    renderLevels('main-lvls');
  }
  if (typeof buildChart === 'function') buildChart();
  if (typeof loadReferrals === 'function') loadReferrals();
  if (typeof loadRecentActivity === 'function') loadRecentActivity();
  if (typeof loadLeaderboard === 'function') loadLeaderboard();
  if (typeof runCalc === 'function') runCalc();
}

function applyTranslations() {
  // Update all elements with data-t attribute (textContent)
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    el.textContent = t(key);
  });
  // Update all elements with data-th attribute (innerHTML — for HTML content)
  document.querySelectorAll('[data-th]').forEach(el => {
    const key = el.getAttribute('data-th');
    const val = t(key);
    if (val !== key) el.innerHTML = val;
  });
  // Update all elements with data-tp attribute (placeholder)
  document.querySelectorAll('[data-tp]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-tp'));
  });
}
