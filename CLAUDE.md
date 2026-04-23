# CLAUDE.md

Notes for working with Claude Code on this repo.

## Context

This is a retail / mini-market POS prototype for Kenyan context. The goal is prototype fidelity — code that reads like something that could become real. Favor clarity, realistic data, and plausible product decisions over clever abstractions.

## Style conventions Claude should follow here

- **JSX + hooks only.** No class components. No TypeScript in this repo.
- **Components are single-file and self-contained.** Small shared view components co-located in `Views.jsx`.
- **Tailwind-only styling.** Custom animations in `index.css`.
- **KES everywhere.** Money is always `kes(amount)` from `hooks/index.js`.
- **Kenyan catalog, not generic.** SKUs are real products sold in a Nairobi duka — Pembe unga, Brookside milk, Omo, Geisha. Barcodes follow EAN-13 format.
- **Light theme intentional.** Retail is a daytime business; fluorescent-lit environments need bright UIs. If adding a dark mode, don't replace — add as a toggle.

## Things Claude should NOT do

- Don't add a backend, auth, or real API calls. Prototype only.
- Don't add TypeScript.
- Don't replace `lucide-react`.
- Don't merge this with the restaurant repo. They are deliberately separate products sharing a brand.
- Don't add tests.

## Extensions worth doing

- Real barcode scanning via `@zxing/browser` or similar. The current "scan" button is a stub.
- Returns / refunds flow with reason codes.
- Supplier / restock workflow inside the Inventory view.
- Loyalty program tied to the customer phone field — discount on Nth purchase, or birthday offers.
- Till reconciliation at end of shift (expected vs actual cash).
- Wire to Safaricom Daraja sandbox for real STK push.
