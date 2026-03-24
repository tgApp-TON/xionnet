# XionNET — Полная спецификация проекта

## v1.1 · Март 2026

Solidity 0.8.24+ · Polygon PoS · USDC · 17 уровней · 4 слота
Автопокупка — toggle по уровням, по умолчанию ВЫКЛЮЧЕНА

---

## 1. Основные параметры

| Параметр | Значение |
|----------|----------|
| Название | XionNET |
| Сеть | Polygon PoS (Sepolia testnet → Mainnet) |
| Токен оплаты | USDC ERC-20, 6 decimals |
| Количество уровней | 17 |
| Слотов на уровне | 4 |
| Стартовая цена | 3 USDC |
| Прогрессия цен | ×2 каждый уровень |
| Комиссия при покупке | +10% к цене уровня |
| Комиссия при автопокупке | 0% (уже собрано при покупках рефералов) |
| Дополнительные комиссии | Нет |

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

---

## 3. Кошельки

| Кошелёк | Адрес | Роль |
|---------|-------|------|
| Owner | 0xE4c41b544acafF7d6a6f8441690841935Ccc8038 | Холодный. Управляет контрактом, pause, setWallets |
| System | 0x48baFBeb829a6D5ea42f5BC80433bCC72E076021 | Получает 10% комиссий |
| Master | 0x07D7D2F65e01ec2B3ce97F58ED557830d46439BC | isMaster=true, все уровни, ловит spillover |
| Wallet M | 0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF | Менеджер, все уровни, под master |
| Wallet A | 0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65 | Менеджер, все уровни, под master |

Owner ≠ Master ≠ System — три разных кошелька для безопасности.

---

## 4. Логика слотов

### 4.0 AutoBuy toggle

Каждый юзер управляет автопокупкой для каждого уровня отдельно.
По умолчанию **ВЫКЛЮЧЕНА**. `setAutoBuy(level, enabled)`.

### 4.1 autoBuy ВЫКЛЮЧЕНА (default)

| Слот | Действие | Владелец получает |
|------|----------|-------------------|
| 1 | Выплата | price(N) |
| 2 | Выплата | price(N) |
| 3 | Выплата | price(N) |
| 4 | Реактивация + spillover | Ничего |

### 4.2 autoBuy ВКЛЮЧЕНА, N+1 НЕ куплен

| Слот | Действие | Владелец получает |
|------|----------|-------------------|
| 1 | Выплата | price(N) |
| 2 | Заморозка price(N) | Ничего |
| 3 | frozen + incoming = price(N+1) → автопокупка | Новый уровень N+1 |
| 4 | Реактивация + spillover | Ничего |

### 4.3 autoBuy ВКЛЮЧЕНА, N+1 УЖЕ куплен

| Слот | Действие | Владелец получает |
|------|----------|-------------------|
| 1 | Выплата | price(N) |
| 2 | Выплата | price(N) |
| 3 | Выплата | price(N) |
| 4 | Реактивация + spillover | Ничего |

### 4.4 Уровень 17 (последний)

Слоты 1-3 = выплата. Слот 4 = spillover. Нет заморозки. autoBuy не влияет.

### 4.5 MASTER

Все 4 слота = выплата. Нет заморозки, нет spillover вверх от слота 4.

### 4.6 Spillover мимо спонсора

Если у спонсора нет активного уровня N — деньги минуют его и идут выше по дереву.

---

## 5. Бонус: 7 уровней за 180 минут → L8 бесплатно

Таймер стартует с момента регистрации. Покупка L7 в пределах 3 часов → L8 активируется без оплаты, без _fillSlot. actType=3.

---

## 6. Безопасность контракта

| Защита | Реализация |
|--------|-----------|
| SafeERC20 | safeTransfer/safeTransferFrom |
| ReentrancyGuard | nonReentrant на activateLevel |
| MAX_DEPTH=20 | Защита от рекурсии _fillSlot |
| MAX_HOPS=200 | Защита spillover от газ-бомбы |
| tx.origin check | Блокирует контракты как юзеров |
| receive() revert | Нативные токены не застрянут |
| filledSlots < 4 | Защита от переполнения слотов |
| totalFrozen accounting | Freeze/unfreeze/reactivate — всё учтено |
| Pausable | Owner может остановить всё |
| setMasterWallet | Снимает isMaster со старого мастера |

---

## 7. Деплой

### Testnet (Sepolia)
```
MockUSDC: 0xba7e3dF16aA202ab0A0d0DE982b8D240E1d3e54E
XionNET:  0x14160fC843204507E224552D0141B34B975f0850
Chain:    Sepolia (11155111)
```

### Mainnet (Polygon)
```
USDC:     0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
XionNET:  TBD
Chain:    Polygon (137)
```

---

## 8. Технологический стек

| Компонент | Технология |
|-----------|------------|
| Контракт | Solidity 0.8.24, Hardhat, OpenZeppelin 5.x |
| UI | Single HTML, Vanilla JS, ethers.js v6, Vercel |
| Бэкенд | Supabase PostgreSQL + Event Listener (Node.js) |
| Realtime | Supabase Realtime WebSocket |
| Тесты | 267 тестов (Hardhat + Chai) |

---

## 9. Supabase — таблицы

| Таблица | Описание |
|---------|----------|
| users | Участники: wallet, referrer, totals, active_levels |
| user_levels | 17 уровней × юзер: active, slots, frozen, cycle, autoBuy |
| referrals | Связи спонсор → реферал |
| payouts | История выплат |
| slot_events | История заполнения слотов |
| frozen_log | История заморозок (frozen → auto_used/to_sponsor/returned) |
| spillovers | История spillover с hops |
| reactivations | История реактиваций |
| commissions | 10% комиссии |
| bounced | Ошибки MAX_HOPS |
| system_stats | Глобальная статистика (1 строка) |
| daily_stats | Ежедневная агрегация для графиков |
| monitor_state | Последний обработанный блок |
| autobuy_events | История toggle autoBuy |

---

## 10. Event Listener → Supabase

Контракт эмитит 12 типов events. Listener слушает через WebSocket и записывает в Supabase:

| Event | → Supabase |
|-------|-----------|
| UserRegistered | INSERT users + user_levels×17 + referrals |
| LevelActivated | UPDATE user_levels.active=true |
| SlotFilled | UPDATE slot_wallet, INSERT slot_events |
| PayoutSent | INSERT payouts, UPDATE users.totalReceived |
| FundsFrozen | UPDATE frozen_amount, INSERT frozen_log |
| FundsUnfrozen | UPDATE frozen=0, UPDATE frozen_log.status |
| FundsReturned | UPDATE frozen=0, UPDATE frozen_log.status=returned |
| SpilloverSent | INSERT spillovers |
| LevelReactivated | RESET slots, INSERT reactivations |
| CommissionTaken | INSERT commissions |
| Bounced | INSERT bounced |
| AutoBuyToggled | UPDATE user_levels.auto_buy_enabled |

---

## 11. UI Features

| Экран | Данные |
|-------|--------|
| Dashboard | Stats grid, Level Overview, Network card, Recent Activity |
| Levels | 17 карточек (green/gold/red), detail panel, autoBuy toggle |
| History | Фильтры по типу, данные из payouts/frozen/spillovers |
| Network | Рефералы с раскрывающимся деревом (direct + deep), пагинация |
| Stats | Participants, Payouts, Frozen, Leaderboard, Chart |
| FAQ | Bonus timer, How it works, Earnings scenarios |

### Дополнительные фичи
- MetaMask подключение с автосвитчем сети
- Mint Test USDC (testnet only)
- QR код + Share (Telegram, WhatsApp, Email, SMS)
- Bonus timer 180 мин с поздравительным экраном
- Supabase data refresh на каждое действие
- Overscroll disabled (без "желе")
- L16-L17 на всю ширину

---

## 12. Репозитории и деплой

| Что | Где |
|-----|-----|
| GitHub (Vercel) | drozarchuks-metamask/xionnet (private) |
| GitHub (public) | tgApp-TON/xionnet |
| Vercel UI | https://xionnet.vercel.app |
| Push → deploy | `git push vercel-gh main` |

---

*XionNET · v1.1 · Март 2026*
