# TamuPOS — Retail

A Kenya-ready retail / mini-market point-of-sale prototype. Built as part of exploring what a lightweight POS could look like for a Nairobi duka or supermarket — the kind of place where throughput matters and the cashier is scanning a jar of Geisha soap while answering a customer on the phone.

> **Not a production system.** Prototype with in-memory + localStorage state. Payment flows are mocked. No backend.

---

## What it does

| Area | Behavior |
|---|---|
| **Sell view** | Product grid across 6 categories with search (name, SKU, barcode) and a simulated barcode scanner. |
| **Catalog** | 28 authentic Kenyan mini-market SKUs — unga, Pishori rice, Brookside milk, Omo, Tusker, Britania biscuits — with realistic KES prices. |
| **Cart** | Add / remove / adjust quantity. Optional customer phone for M-Pesa + future loyalty. 16% VAT calculated. |
| **Low-stock & out-of-stock** | Badges render on the product tile; items below the threshold are flagged, out-of-stock items are disabled. |
| **M-Pesa & cash** | STK-push flow against customer phone, or cash entry with change calculation and quick-amount buttons. |
| **Inventory view** | Tabular view of all SKUs with stock-level highlighting. Decrements automatically on checkout. |
| **Reports view** | Daily KPIs (total, M-Pesa, cash, transaction count) + recent transaction list. Flags queued transactions. |
| **Offline mode** | Toggle in banner. M-Pesa requests queue until connectivity returns. Uses `navigator.onLine` in production. |
| **Persistence** | Catalog (including stock), sales history, and queue survive reload. |

---

## Design decisions worth flagging

- **Light, clean theme.** Mini-markets are fluorescent-lit daytime businesses. Bright, legible, high-contrast is the right call. Cool emerald accent signals retail (vs the warm amber used in the restaurant variant).
- **Scanner-first.** The Scan button is the biggest thing in the product area. For a duka doing 200 transactions a day, scanner throughput is the product.
- **Cash gets first-class treatment.** Most Nairobi POS software treats cash as an afterthought — no change calculator, no quick-amount buttons. Cash is still ~30% of retail volume in Kenya; the UI reflects that.
- **Instrument Serif on the display.** Most POS systems ship with some variant of system-ui. A serif display face makes the totals feel considered, not generic.

---

## Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. State persists in localStorage — clear site data to reset.

## Stack

- Vite 6 + React 18 (JSX, no TypeScript — intentional)
- Tailwind 3
- `lucide-react` for icons
- Google Fonts: Instrument Serif (display) + Inter (body) + JetBrains Mono (numerics)

---

## Built with Claude Code

This repo was built as a single-session prototype using [Claude Code](https://www.anthropic.com/claude-code) as the primary development workflow. See `CLAUDE.md` for notes on how the work was structured.

## License

MIT
