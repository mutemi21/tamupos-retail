import { Minus, Plus, Trash2, ShoppingCart, User } from 'lucide-react'
import { kes } from '../hooks/index.js'

export default function Cart({ items, onQty, onRemove, onCheckout, customer, onCustomer }) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const vat = Math.round(subtotal * 0.16)
  const total = subtotal + vat

  return (
    <div className="flex flex-col h-full min-h-0 bg-white border-l border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-slate-600" />
            <span className="font-semibold">Current Sale</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {items.reduce((s, i) => s + i.qty, 0)} items
          </span>
        </div>
      </div>

      {/* Customer */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
        <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
          Customer (optional)
        </label>
        <div className="mt-1 flex items-center gap-2">
          <User size={14} className="text-slate-400" />
          <input
            value={customer}
            onChange={(e) => onCustomer(e.target.value)}
            placeholder="Phone for M-Pesa / loyalty"
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">
            Scan or tap a product to start
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {items.map((i, idx) => (
              <li key={idx} className="px-4 py-3 slide-up">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium leading-tight">{i.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {kes(i.price)} × {i.qty}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onQty(idx, i.qty - 1)}
                      className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm">{i.qty}</span>
                    <button
                      onClick={() => onQty(idx, i.qty + 1)}
                      className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-mono text-sm font-semibold text-jade-700">
                    {kes(i.qty * i.price)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals + Checkout */}
      {items.length > 0 && (
        <div className="border-t border-slate-200 p-4 space-y-3 bg-slate-50">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono">{kes(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT (16%)</span>
              <span className="font-mono">{kes(vat)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-slate-200">
              <span>Total</span>
              <span className="font-mono">{kes(total)}</span>
            </div>
          </div>
          <button
            onClick={() => onCheckout(total)}
            className="w-full bg-jade-600 hover:bg-jade-700 text-white font-semibold py-3 rounded-xl transition shadow-sm"
          >
            Checkout · {kes(total)}
          </button>
        </div>
      )}
    </div>
  )
}
