// XionNET — Translations
// 14 languages: EN, RU, UA, ES, PT, FR, DE, PL, VI, KO, JA, HI, ZH, TR

const LANGS = {
  en: { name: 'English', flag: '🇬🇧' },
  ru: { name: 'Русский', flag: '🇷🇺' },
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
};

// Get translation for current language
let currentLang = localStorage.getItem('xn_lang') || 'en';

function t(key) {
  const entry = T[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('xn_lang', lang);
  applyTranslations();
}

function applyTranslations() {
  // Update all elements with data-t attribute
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    el.textContent = t(key);
  });
  // Update all elements with data-tp attribute (placeholder)
  document.querySelectorAll('[data-tp]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-tp'));
  });
}
