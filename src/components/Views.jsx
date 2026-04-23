import { useState, useEffect } from 'react'
import { X, Check, Smartphone, Banknote, AlertCircle } from 'lucide-react'
import { kes } from '../hooks/index.js'

export function PaymentModal({ amount, customer, isOffline, onClose, onComplete }) {
  const [method, setMethod] = useState('mpesa')
  const [stage, setStage] = useState('form')
  const [cashGiven, setCashGiven] = useState('')
  const [phone, setPhone] = useState(customer || '254712')

  useEffect(() => {
    if (stage === 'sending') {
      const t = setTimeout(() => setStage(isOffline ? 'queued' : 'waiting'), 800)
      return () => clearTimeout(t)
    }
    if (stage === 'waiting') {
      const t = setTimeout(() => setStage('done'), 2200)
      return () => clearTimeout(t)
    }
  }, [stage, isOffline])

  const finish = () => {
    onComplete({ method, amount, phone, queued: stage === 'queued' })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md slide-up overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500">Checkout</div>
            <div className="text-xl font-display font-medium">{kes(amount)}</div>
          </div>
          {stage === 'form' && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
              <X size={18} />
            </button>
          )}
        </div>

        {stage === 'form' && (
          <>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMethod('mpesa')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                    method === 'mpesa'
                      ? 'bg-jade-500 text-white border-jade-500 font-medium'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Smartphone size={16} /> M-Pesa
                </button>
                <button
                  onClick={() => setMethod('cash')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                    method === 'cash'
                      ? 'bg-slate-900 text-white border-slate-900 font-medium'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Banknote size={16} /> Cash
                </button>
              </div>

              {method === 'mpesa' && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-jade-500 focus:bg-white"
                    placeholder="254712345678"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    STK push sent via Safaricom Daraja.
                  </p>
                </div>
              )}

              {method === 'cash' && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500">Cash received</label>
                  <input
                    type="number"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-slate-900"
                    placeholder={String(amount)}
                  />
                  <div className="mt-2 flex gap-1.5 flex-wrap">
                    {[amount, 1000, 2000, 5000].map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setCashGiven(String(v))}
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono"
                      >
                        {kes(v)}
                      </button>
                    ))}
                  </div>
                  {cashGiven && Number(cashGiven) >= amount && (
                    <div className="mt-3 p-3 bg-jade-50 border border-jade-200 rounded-lg">
                      <span className="text-sm text-jade-900">
                        Change:{' '}
                        <span className="font-mono font-semibold">
                          {kes(Number(cashGiven) - amount)}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setStage(method === 'mpesa' ? 'sending' : 'done')}
                className="w-full bg-jade-600 hover:bg-jade-700 text-white font-semibold py-3 rounded-xl transition"
              >
                {method === 'mpesa' ? 'Send STK push' : 'Confirm'}
              </button>
            </div>
          </>
        )}

        {(stage === 'sending' || stage === 'waiting') && (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-jade-100 flex items-center justify-center mx-auto ring-pop">
              <Smartphone size={22} className="text-jade-700" />
            </div>
            <div className="mt-4 font-medium">
              {stage === 'sending' ? 'Sending STK push...' : 'Awaiting customer PIN'}
            </div>
            {stage === 'waiting' && (
              <div className="text-sm text-slate-500 mt-1">Push sent to +{phone}</div>
            )}
          </div>
        )}

        {stage === 'queued' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto">
              <AlertCircle size={22} className="text-amber-700" />
            </div>
            <div>
              <div className="font-medium">Queued for sync</div>
              <p className="text-sm text-slate-500 mt-1">
                Offline — payment request will send when back online.
              </p>
            </div>
            <button
              onClick={finish}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        )}

        {stage === 'done' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-jade-100 flex items-center justify-center mx-auto ring-pop">
              <Check size={22} className="text-jade-700" />
            </div>
            <div>
              <div className="font-medium">Payment received</div>
              <p className="text-sm text-slate-500 mt-1">
                {kes(amount)} ·{' '}
                {method === 'mpesa' ? 'M-Pesa QZC8K4L2' : 'Cash'}
              </p>
            </div>
            <button
              onClick={finish}
              className="px-4 py-2 bg-jade-600 hover:bg-jade-700 text-white rounded-lg text-sm font-medium"
            >
              Print receipt
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function InventoryView({ products }) {
  const [query, setQuery] = useState('')
  const filtered = products.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  )
  const lowStock = products.filter((p) => p.stock <= 10 && p.stock > 0).length
  const outStock = products.filter((p) => p.stock === 0).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-display">Inventory</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-amber-700">{lowStock} low stock</span>
          <span className="text-red-700">{outStock} out of stock</span>
        </div>
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search inventory..."
        className="w-full max-w-md mb-4 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jade-500"
      />
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="text-left px-4 py-3">SKU</th>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Price</th>
              <th className="text-right px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.sku} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 capitalize text-slate-600">{p.category}</td>
                <td className="px-4 py-3 text-right font-mono">{kes(p.price)}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${
                      p.stock === 0
                        ? 'bg-red-100 text-red-700'
                        : p.stock <= 10
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ReportsView({ sales, products }) {
  const total = sales.reduce((s, t) => s + t.amount, 0)
  const mpesa = sales.filter((t) => t.method === 'mpesa').reduce((s, t) => s + t.amount, 0)
  const cash = sales.filter((t) => t.method === 'cash').reduce((s, t) => s + t.amount, 0)
  const queued = sales.filter((t) => t.queued).length

  return (
    <div className="p-6">
      <h2 className="text-2xl font-display mb-5">Today</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Kpi label="Total Sales" value={kes(total)} />
        <Kpi label="M-Pesa" value={kes(mpesa)} accent />
        <Kpi label="Cash" value={kes(cash)} />
        <Kpi label="Transactions" value={sales.length} />
      </div>
      {queued > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
          {queued} transaction{queued !== 1 ? 's' : ''} queued for sync
        </div>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 text-sm font-medium">
          Recent transactions
        </div>
        {sales.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No sales recorded yet today
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {[...sales].reverse().slice(0, 10).map((t, i) => (
              <li key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">
                    {t.method === 'mpesa' ? 'M-Pesa' : 'Cash'}
                    {t.queued && <span className="ml-2 text-xs text-amber-700">queued</span>}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {new Date(t.at).toLocaleTimeString('en-KE')}
                  </div>
                </div>
                <div className="font-mono font-semibold">{kes(t.amount)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Kpi({ label, value, accent }) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        accent ? 'bg-jade-50 border-jade-200' : 'bg-white border-slate-200'
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`mt-1 font-display text-2xl ${accent ? 'text-jade-900' : ''}`}>
        {value}
      </div>
    </div>
  )
}

export function OfflineBanner({ isOffline, queueSize, onToggle, manualOffline }) {
  if (!isOffline && queueSize === 0) return null
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2 text-sm border-b ${
        isOffline
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-jade-50 border-jade-200 text-jade-900'
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertCircle size={14} />
        <span className="font-medium">
          {isOffline ? 'Offline mode' : 'Back online — syncing'}
        </span>
        {queueSize > 0 && (
          <span className="opacity-70 text-xs">· {queueSize} queued</span>
        )}
      </div>
      <button
        onClick={onToggle}
        className="text-xs px-2 py-0.5 rounded border border-current opacity-70 hover:opacity-100"
      >
        {manualOffline ? 'Restore' : 'Simulate offline'}
      </button>
    </div>
  )
}
