# XionNET — Полная логика смарт-контракта

## v1.0 · Март 2026

Solidity 0.8.24+ · Polygon PoS · USDC · 17 уровней · 4 слота
Автопокупка следующего уровня — всегда включена, отключить невозможно

---

## 1. Основные параметры

| Параметр | Значение |
|----------|----------|
| Название | XionNET |
| Сеть | Polygon PoS (Amoy testnet → Mainnet) |
| Токен оплаты | USDC ERC-20, 6 decimals |
| Количество уровней | 17 |
| Слотов на уровне | 4 |
| Стартовая цена | 3 USDC |
| Прогрессия цен | ×2 каждый уровень |
| Комиссия при покупке | +10% к цене уровня |
| Комиссия при автопокупке | 0% (уже собрано при покупках рефералов) |
| Дополнительные комиссии | Нет ($0.50 buy fee — нет, payout fee — нет) |

---

## 2. Цены уровней

| Уровень | Цена (USDC) | Цена покупки (+10%) | USDC wei (6 dec) |
|---------|-------------|---------------------|------------------|
| L1 | 3 | 3.30 | 3_000_000 |
| L2 | 6 | 6.60 | 6_000_000 |
| L3 | 12 | 13.20 | 12_000_000 |
| L4 | 24 | 26.40 | 24_000_000 |
| L5 | 48 | 52.80 | 48_000_000 |
| L6 | 96 | 105.60 | 96_000_000 |
| L7 | 192 | 211.20 | 192_000_000 |
| L8 | 384 | 422.40 | 384_000_000 |
| L9 | 768 | 844.80 | 768_000_000 |
| L10 | 1,536 | 1,689.60 | 1_536_000_000 |
| L11 | 3,072 | 3,379.20 | 3_072_000_000 |
| L12 | 6,144 | 6,758.40 | 6_144_000_000 |
| L13 | 12,288 | 13,516.80 | 12_288_000_000 |
| L14 | 24,576 | 27,033.60 | 24_576_000_000 |
| L15 | 49,152 | 54,067.20 | 49_152_000_000 |
| L16 | 98,304 | 108,134.40 | 98_304_000_000 |
| L17 | 196,608 | 216,268.80 | 196_608_000_000 |

Формула: `price(N) = 3 × 2^(N-1)` USDC

КРИТИЧНО: USDC на Polygon имеет 6 decimals, НЕ 18. $3.00 = 3_000_000 в Solidity.

---

## 3. Комиссии — единственная модель

| Действие | Юзер платит | Система получает | В слоты идёт |
|----------|-------------|------------------|--------------|
| Ручная покупка | price × 1.10 | price × 0.10 (10%) | price (чистая) |
| Автопокупка (слот 3A) | 0 | 0 | price(N+1) из заморозки |

Других комиссий нет. Нет $0.50 buy fee. Нет payout fee. Нет protocol fee при выплатах.

10% берётся ОДИН РАЗ при ручной покупке уровня. При автопокупке комиссия не берётся — она уже была собрана при покупках рефералов ниже.

---

## 4. Логика слотов — полная таблица

### 4.1 Уровни 1–16 (когда N+1 НЕ куплен)

| Слот | Условие | Действие | Владелец получает |
|------|---------|----------|-------------------|
| 1 | Всегда | Выплата владельцу | price(N) |
| 2 | N+1 не куплен | Заморозка price(N) на контракте | Ничего |
| 3 | frozen > 0, N+1 не куплен | frozen + incoming = price(N+1) → автопокупка N+1, деньги вверх | Новый уровень N+1 (0/4 слотов) |
| 4 | Всегда | Реактивация уровня + spillover вверх | Ничего |

### 4.2 Уровни 1–16 (когда N+1 УЖЕ куплен)

| Слот | Условие | Действие | Владелец получает |
|------|---------|----------|-------------------|
| 1 | Всегда | Выплата владельцу | price(N) |
| 2 | N+1 куплен | Выплата владельцу | price(N) |
| 3 | frozen = 0 | Выплата владельцу | price(N) |
| 4 | Всегда | Реактивация уровня + spillover вверх | Ничего |

### 4.3 Уровень 17 (последний, N+1 не существует)

| Слот | Действие | Владелец получает |
|------|----------|-------------------|
| 1 | Выплата | price(L17) = 196,608 |
| 2 | Выплата | price(L17) = 196,608 |
| 3 | Выплата | price(L17) = 196,608 |
| 4 | Spillover вверх по дереву на L17 | Ничего |

На L17 заморозки НЕТ НИКОГДА. Слоты 1, 2, 3 — всегда выплата.
Слот 4 — реактивация + spillover вверх по L17.

### 4.4 MASTER аккаунт (все уровни)

| Слот | Действие |
|------|----------|
| 1 | Выплата MASTER |
| 2 | Выплата MASTER |
| 3 | Выплата MASTER |
| 4 | Реактивация, деньги идут MASTER (нет spillover вверх) |

MASTER — конечная точка системы. Все слоты = выплата. Нет заморозки. Нет spillover вверх. При слоте 4 — реактивация, но деньги остаются у MASTER.

---

## 5. Механизм заморозки и автопокупки — подробно

### 5.1 Почему это работает

Прогрессия ×2 гарантирует: `2 × price(N) = price(N+1)`

Слот 2 даёт price(N) + слот 3 даёт price(N) = price(N+1). Ровно хватает на следующий уровень.

### 5.2 Полный сценарий (пример: уровень 3, price=12)

Спонсор A (L4 активен) → Реферал B (L4 нет)

**Слот 1:** Кто-то покупает L3, заполняет слот 1 у B.
- Покупатель платит: 12 × 1.10 = **13.20 USDC**
- Система получает: **1.20** (10%)
- B получает: **12.00** (чистая выплата)

**Слот 2:** Кто-то покупает L3, заполняет слот 2 у B.
- Покупатель платит: **13.20 USDC**
- Система получает: **1.20** (10%)
- B получает: **ничего** (L4 не куплен → заморозка)
- Контракт хранит: **12.00** (frozen)

**Слот 3:** Кто-то покупает L3, заполняет слот 3 у B.
- Покупатель платит: **13.20 USDC**
- Система получает: **1.20** (10%)
- Frozen 12 + входящие 12 = **24 = price(L4)**
- Автопокупка L4 для B. B получает пустой L4 (0/4)
- **24 USDC** идёт вверх → заполняет слот на L4 у A
- Комиссия при автопокупке: **0** (уже собрано)

**Слот 4:** Кто-то покупает L3, заполняет слот 4 у B.
- Покупатель платит: **13.20 USDC**
- Система получает: **1.20** (10%)
- B получает: **ничего**
- L3 у B реактивируется (cycleCount++, слоты 0/4)
- **12 USDC** spillover вверх по L3 → к A (или выше по дереву)

**Итог цикла для B:** +12 выплата + L4 бесплатно. Цикл повторяется.

### 5.3 Сценарий 3B (N+1 уже куплен, frozen > 0)

Если между слотом 2 и слотом 3 у B уже появился L4 (например, через автопокупку с другого уровня):

- Frozen 12 + входящие 12 = **24 = price(N+1)**
- Автопокупка не нужна (L4 есть)
- **24 USDC** идёт вверх → заполняет слот на L4 у спонсора
- B не получает новый уровень (уже есть), не получает выплату

### 5.4 Сценарий FundsReturned (frozen + ручная покупка N+1)

Если B вручную покупает L4 пока на L3 висит заморозка:
- Контракт возвращает frozen (12 USDC) обратно B **ДО** активации
- B платит за L4: 24 × 1.10 = 26.40 (из своего кошелька)
- Потерял только 10% комиссию (2.40)
- Frozen средства возвращены полностью

---

## 6. Spillover алгоритм

Spillover — маршрутизация денег вверх по дереву. Привязка реферала к спонсору НЕ меняется.

```
_spillover(fromUser, levelNum, amount):
    P = users[fromUser].referrer
    hops = 0
    while (true):
        if P == address(0) || P == masterWallet → P = masterWallet; break
        if hops >= MAX_HOPS → emit Bounced; P = masterWallet; break
        if users[P].levels[levelNum].active → break  // нашли получателя
        P = users[P].referrer
        hops++
    emit SpilloverSent(fromUser, P, levelNum, amount, hops)
    _fillSlot(P, levelNum, amount, fromUser, SPILLOVER)
```

Spillover происходит когда:
- Слот 4 заполнен → деньги идут вверх по дереву на том же уровне
- Спонсор реферала не имеет активного уровня → ищем выше
- Сценарий 3B → деньги идут на N+1 к спонсору (или spillover если у спонсора N+1 не активен)

Рефералы **жёстко привязаны** к спонсору в смарт-контракте. Spillover — это только маршрутизация денег, привязка никогда не меняется.

---

## 7. Привязка рефералов

- Реферал привязывается к спонсору **один раз** при регистрации
- Привязка **навсегда** — не может быть изменена
- Если реферал не указан или не зарегистрирован → автоматически masterWallet
- Self-referral запрещён (require msg.sender != referrer)
- Даже когда деньги от реферала попадают выше по spillover, реферал остаётся привязан к своему прямому спонсору

---

## 8. Константы контракта

```solidity
uint8   public constant MAX_LEVELS    = 17;
uint8   public constant MAX_SLOTS     = 4;
uint32  public constant MAX_HOPS      = 100_000;
uint256 public constant PROTOCOL_PCT  = 10;        // 10% комиссия при ручной покупке
uint32  public constant BONUS_WINDOW  = 3 hours;   // 10800 секунд
uint8   public constant BONUS_TRIGGER = 7;          // купил 7 уровней за BONUS_WINDOW
uint8   public constant BONUS_GIFT    = 8;          // получает 8й бесплатно
```

Убраны по сравнению с v5:
- ~~BUY_FEE ($0.50)~~ — нет
- ~~PAYOUT_FEE ($0.50)~~ — нет
- ~~PAYOUT_FEE_THRESHOLD ($3.90)~~ — нет

---

## 8.1 Бонус: 7 уровней за 3 часа → L8 в подарок

### Логика

Таймер 3 часа (180 минут) стартует с момента **регистрации** (`register()`).

Когда юзер активирует L7 и с момента регистрации прошло ≤ 3 часов:
- L8 активируется автоматически, бесплатно
- `_fillSlot` НЕ вызывается — спонсор ничего не получает за L8
- L8 у юзера: `active=true`, 0/4 слотов
- `emit LevelActivated(user, 8, 0, 3, timestamp)` — actType=3 (bonus)

### Edge cases

- Если на L7 была заморозка для L8 → L8 уже открыт бонусом → FundsReturned (вернуть frozen)
- Начальные участники (`_init`) — таймер не действует (уровни уже открыты)
- Если юзер не успел за 3 часа — L8 покупается как обычно (вручную или автопокупка)
- actType=3 — новый тип для бэкенда/UI: показать "🎁 Bonus Level!"

### В хранилище

В `UserData` добавляется:
```solidity
uint32 registeredAt;   // timestamp регистрации — для проверки бонуса
```

### В контракте

```solidity
// В activateLevel(), после успешной активации levelNum:
if (levelNum == BONUS_TRIGGER
    && block.timestamp - users[msg.sender].registeredAt <= BONUS_WINDOW
    && !users[msg.sender].levels[BONUS_GIFT].active)
{
    // Возврат заморозки с L7 если есть
    if (users[msg.sender].levels[BONUS_TRIGGER].frozenAmount > 0) {
        uint256 frozen = users[msg.sender].levels[BONUS_TRIGGER].frozenAmount;
        users[msg.sender].levels[BONUS_TRIGGER].frozenAmount = 0;
        totalFrozen -= frozen;
        usdcToken.transfer(msg.sender, frozen);
        emit FundsReturned(msg.sender, BONUS_TRIGGER, frozen, uint32(block.timestamp));
    }

    // Активация L8 бесплатно
    users[msg.sender].levels[BONUS_GIFT].active = true;
    users[msg.sender].levels[BONUS_GIFT].activatedAt = uint32(block.timestamp);
    emit LevelActivated(msg.sender, BONUS_GIFT, 0, 3, uint32(block.timestamp));
}
```

---

## 9. Хранилище контракта

```solidity
IERC20  public usdcToken;
address public systemWallet;       // получает 10% комиссии
address public masterWallet;       // конечная точка spillover
uint256[18] public levelPrices;    // индекс 0 не используется, 1-17
uint256 public totalFrozen;        // защита замороженных средств

struct LevelData {
    bool     active;
    uint8    filledSlots;          // 0-4
    uint32   cycleCount;
    uint32   activatedAt;
    uint256  frozenAmount;         // = price(N), сбрасывается при разморозке
    address  slot1;
    address  slot2;
    address  slot3;
    address  slot4;
}

struct UserData {
    bool     registered;
    address  referrer;             // навсегда, не меняется
    bool     isMaster;
    uint256  totalReceived;
    uint256  totalPaid;
    mapping(uint8 => LevelData) levels;
}

mapping(address => UserData) public users;
```

---

## 10. Конструктор и начальные участники

### 10.1 Инициализация

```solidity
constructor(
    address _usdc,
    address _systemWallet,
    address _masterWallet,
    address[] memory _init          // начальные участники — все уровни открыты
) {
    usdcToken    = IERC20(_usdc);
    systemWallet = _systemWallet;
    masterWallet = _masterWallet;

    levelPrices[1]  = 3_000_000;         // $3
    levelPrices[2]  = 6_000_000;         // $6
    levelPrices[3]  = 12_000_000;        // $12
    levelPrices[4]  = 24_000_000;        // $24
    levelPrices[5]  = 48_000_000;        // $48
    levelPrices[6]  = 96_000_000;        // $96
    levelPrices[7]  = 192_000_000;       // $192
    levelPrices[8]  = 384_000_000;       // $384
    levelPrices[9]  = 768_000_000;       // $768
    levelPrices[10] = 1_536_000_000;     // $1,536
    levelPrices[11] = 3_072_000_000;     // $3,072
    levelPrices[12] = 6_144_000_000;     // $6,144
    levelPrices[13] = 12_288_000_000;    // $12,288
    levelPrices[14] = 24_576_000_000;    // $24,576
    levelPrices[15] = 49_152_000_000;    // $49,152
    levelPrices[16] = 98_304_000_000;    // $98,304
    levelPrices[17] = 196_608_000_000;   // $196,608

    // Master — регистрация + все уровни + isMaster
    users[_masterWallet].registered = true;
    users[_masterWallet].isMaster = true;
    for (uint8 i = 1; i <= MAX_LEVELS; i++) {
        users[_masterWallet].levels[i].active = true;
        users[_masterWallet].levels[i].activatedAt = uint32(block.timestamp);
    }

    // Начальные участники — регистрация под мастером + все уровни
    for (uint256 j = 0; j < _init.length; j++) {
        address u = _init[j];
        users[u].registered = true;
        users[u].referrer = _masterWallet;
        for (uint8 i = 1; i <= MAX_LEVELS; i++) {
            users[u].levels[i].active = true;
            users[u].levels[i].activatedAt = uint32(block.timestamp);
        }
    }
}
```

### 10.2 Кошельки при деплое

| Параметр | Описание |
|----------|----------|
| `_usdc` | Адрес USDC контракта на Polygon |
| `_systemWallet` | Принимает 10% комиссий. Не участвует в системе уровней |
| `_masterWallet` | Конечная точка spillover. isMaster=true. Все уровни открыты |
| `_init` | Массив адресов начальных участников. Рефералы мастера. Все уровни открыты |

В контракте нет слов "manager", "admin", "gift". Начальные участники выглядят как обычные юзеры с открытыми уровнями. Добавить новых после деплоя нельзя.

---

## 11. Публичные функции

```solidity
// Регистрация — один раз на адрес
// Если referrer не зарегистрирован или address(0) → masterWallet
function register(address referrer) external

// Покупка уровня — 2 транзакции MetaMask
// Списывает levelPrices[level] * 110 / 100 с msg.sender
// 10% → systemWallet, price → _fillSlot
function activateLevel(uint8 level) external nonReentrant whenNotPaused
```

### View функции (для фронтенда)
```solidity
function getUserLevel(address user, uint8 level) external view returns (LevelData memory)
function getUserInfo(address user) external view returns (bool, address, bool, uint256, uint256)
function getLevelPrice(uint8 level) external view returns (uint256)
function getRequiredApprove(uint8 level) external view returns (uint256)  // price * 110 / 100
function checkAllowance(address user, uint8 level) external view returns (bool, uint256, uint256)
function getTotalFrozen() external view returns (uint256)
```

### Административные функции (onlyOwner)
```solidity
function setSystemWallet(address) external onlyOwner
function setMasterWallet(address) external onlyOwner
function pause() external onlyOwner
function unpause() external onlyOwner
function withdrawSystemFees(uint256 amount) external onlyOwner
// require(amount <= balance - totalFrozen)
```

---

## 12. Внутренние функции

```
_activateLevelInternal(user, levelNum, amount, actType)
    — Ядро активации. actType: 1=manual, 2=auto
    — При manual: 10% уже удержано снаружи
    — При auto: комиссия не берётся

_fillSlot(owner, levelNum, amount, from, srcType)
    — Главный диспетчер. Определяет номер слота (filledSlots + 1)
    — Вызывает нужный обработчик (_slot1, _slot2, _slot3, _slot4)

_slot1(owner, levelNum, amount)
    — Выплата владельцу. Всегда.

_slot2(owner, levelNum, amount)
    — Если L17: выплата (нет N+1)
    — Если N+1 куплен (2A): выплата
    — Если N+1 не куплен (2B): заморозка. frozenAmount = amount. totalFrozen += amount

_slot3(owner, levelNum, amount)
    — Если L17: выплата (нет N+1)
    — Если frozen > 0 и N+1 не куплен (3A): frozen + amount = price(N+1) → автопокупка
    — Если frozen > 0 и N+1 куплен (3B): frozen + amount = price(N+1) → слот на N+1 вверх
    — Если frozen = 0 (3C): выплата

_slot4(owner, levelNum, amount)
    — Реактивация: cycleCount++, slots = empty, frozenAmount = 0
    — Spillover amount вверх по дереву на levelNum
    — MASTER: реактивация + деньги MASTER (нет spillover вверх)

_autoActivate(user, nextLevel, totalAmount)
    — Активация без комиссии. actType = 2
    — totalAmount = price(N+1) = frozen + incoming

_spillover(fromUser, levelNum, amount)
    — Поиск вверх по referrer у кого levelNum активен
    — MAX_HOPS защита → MASTER
    — _fillSlot на найденном получателе

_reactivate(owner, levelNum)
    — cycleCount++, slots = [0,0,0,0], frozenAmount = 0

_payout(receiver, amount)
    — USDC transfer на кошелёк получателя
    — Без дополнительных комиссий (10% уже удержано при покупке)
```

---

## 13. События (Events)

```solidity
event UserRegistered(address indexed user, address indexed referrer, uint32 timestamp);

event LevelActivated(address indexed user, uint8 level, uint256 price,
    uint8 actType,   // 1=manual 2=auto
    uint32 timestamp);

event SlotFilled(address indexed owner, address indexed source,
    uint8 level, uint8 slot, uint256 amount,
    uint8 srcType,   // 1=direct 2=spillover 3=unfreeze_3b
    uint32 timestamp);

event PayoutSent(address indexed receiver, address indexed sender,
    uint8 level, uint8 slot, uint256 amount,
    uint32 timestamp);

event FundsFrozen(address indexed user, uint8 level,
    uint256 amount,  // = price(N)
    uint32 timestamp);

event FundsUnfrozen(address indexed user, uint8 level,
    uint256 amount, bool autoActivated,
    uint32 timestamp);

event FundsReturned(address indexed user, uint8 level,
    uint256 amount, uint32 timestamp);

event SpilloverSent(address indexed from, address indexed to,
    uint8 level, uint256 amount, uint32 hops, uint32 timestamp);

event LevelReactivated(address indexed user, uint8 level,
    uint32 cycleCount, uint32 timestamp);

event CommissionTaken(address indexed user, uint8 level,
    uint256 amount, uint32 timestamp);

event Bounced(address indexed user, uint8 level,
    uint8 reason,    // 1=not_found 2=MAX_HOPS
    uint32 timestamp);
```

Упрощено по сравнению с v5:
- CommissionTaken: убран feeType (только один тип — 10% при покупке)
- PayoutSent: убран payoutType (выплата всегда чистая, без доп. комиссий)

---

## 14. Edge Cases

### 14.1 Frozen + ручная покупка N+1
Заморозка висит на N. Юзер вручную покупает N+1.
→ Контракт возвращает frozen юзеру через transfer ДО активации
→ emit FundsReturned
→ frozenAmount = 0, totalFrozen -= frozen

### 14.2 Регистрация без реферала
```
if (referrer == address(0) || !users[referrer].registered) {
    referrer = masterWallet;
}
```

### 14.3 address(0) в spillover
```
if (P == address(0) || P == masterWallet) { P = masterWallet; break; }
```

### 14.4 MAX_HOPS в spillover
```
if (hops >= MAX_HOPS) { emit Bounced(..., reason=2); P = masterWallet; break; }
```

### 14.5 Self-referral
```
require(msg.sender != referrer, "Cannot self-refer");
```

### 14.6 Последовательность уровней
```
require(level == 1 || users[msg.sender].levels[level-1].active, "Previous level required");
```

### 14.7 Защита средств (totalFrozen)
```
function withdrawSystemFees(uint256 amount) external onlyOwner {
    require(amount <= usdcToken.balanceOf(address(this)) - totalFrozen);
    usdcToken.transfer(systemWallet, amount);
}
```

---

## 15. Безопасность

- `nonReentrant` на activateLevel — ОБЯЗАТЕЛЬНО
- `onlyOwner` на все admin функции
- `whenNotPaused` на activateLevel
- Проверять allowance перед transferFrom
- Проверять что уровень не активен перед активацией
- Нет adminGiftLevel — владелец не обходит правила
- Никакие адреса не захардкожены — всё через конструктор

---

## 16. Технологический стек (без изменений от v5)

| Компонент | Технология |
|-----------|------------|
| Контракт | Solidity 0.8.24+, Hardhat + TypeScript |
| Сеть | Polygon PoS / Amoy testnet |
| Токен | USDC ERC-20 (6 decimals) |
| Безопасность | OpenZeppelin: ReentrancyGuard, Ownable, Pausable |
| Бэкенд | Next.js + Supabase PostgreSQL + ethers.js |
| Фронтенд | Тот же визуал что и XionTon, адаптирован под 17 уровней |
| Аутентификация | SIWE (Sign-In with Ethereum) |

---

## 17. Отличия от XionTon v5

| Параметр | XionTon v5 | XionNET v1 |
|----------|-----------|------------|
| Уровней | 18 | 17 |
| Стартовая цена | $0.10 | $3.00 |
| Buy fee ($0.50) | Да | Нет |
| Protocol fee (10% при выплате) | Да | Нет (10% при покупке) |
| Payout fee ($0.50 для L7+) | Да | Нет |
| Комиссия при автопокупке | 10% | 0% |
| Момент взятия 10% | При выплате спонсору | При покупке уровня |
| Последний уровень | L18 | L17 |
| Логика последнего уровня | Слоты 1-3 выплата, слот 4 spillover | Слоты 1-3 выплата, слот 4 spillover |

---

*XionNET · Smart Contract Logic v1.0 · Март 2026*
