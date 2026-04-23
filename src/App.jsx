import { useState } from 'react'
import { Store, Package, BarChart3 } from 'lucide-react'
import { initialProducts } from './data/products.js'
import { useOffline, useLocalStorage, nowTime, today } from './hooks/index.js'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'
import {
  PaymentModal,
  InventoryView,
  ReportsView,
  OfflineBanner,
} from './components/Views.jsx'

export default function App() {
  const [view, setView] = useState('sell')
  const [products, setProducts] = useLocalStorage('tamupos-ret-products', initialProducts)
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState('')
  const [sales, setSales] = useLocalStorage('tamupos-ret-sales', [])
  const [checkoutAmount, setCheckoutAmount] = useState(null)
  const { isOffline, toggleManual, manualOffline } = useOffline()

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.sku === product.sku)
      if (idx >= 0) {
        return prev.map((i, j) => (j === idx ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (idx, qty) => {
    setCart((prev) => {
      if (qty < 1) return prev.filter((_, j) => j !== idx)
      return prev.map((i, j) => (j === idx ? { ...i, qty } : i))
    })
  }

  const removeItem = (idx) => setCart((prev) => prev.filter((_, j) => j !== idx))

  const completePayment = (tx) => {
    setSales((prev) => [...prev, { ...tx, at: Date.now(), items: cart.length }])
    // decrement stock
    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((c) => c.sku === p.sku)
        return inCart ? { ...p, stock: Math.max(0, p.stock - inCart.qty) } : p
      })
    )
    setCart([])
    setCustomer('')
    setCheckoutAmount(null)
  }

  const queueSize = sales.filter((s) => s.queued).length

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-jade-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">t.</span>
            </div>
            <div>
              <div className="font-display text-lg leading-tight">TamuPOS</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 leading-tight">
                Retail · Mama Njeri Stores
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <TabBtn active={view === 'sell'} onClick={() => setView('sell')} icon={<Store size={14} />} label="Sell" />
            <TabBtn active={view === 'inventory'} onClick={() => setView('inventory')} icon={<Package size={14} />} label="Inventory" />
            <TabBtn active={view === 'reports'} onClick={() => setView('reports')} icon={<BarChart3 size={14} />} label="Reports" />
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Shift</div>
            <div className="font-mono text-xs">{today()} · {nowTime()}</div>
          </div>
          <div className="pl-4 border-l border-slate-200">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Cashier</div>
            <div className="font-medium text-slate-900">Peter K.</div>
          </div>
        </div>
      </header>

      <OfflineBanner
        isOffline={isOffline}
        queueSize={queueSize}
        onToggle={toggleManual}
        manualOffline={manualOffline}
      />

      {view === 'sell' && (
        <div className="flex-1 grid grid-cols-[1fr_380px] min-h-0">
          <ProductGrid products={products} onAdd={addToCart} onScan={addToCart} />
          <Cart
            items={cart}
            onQty={updateQty}
            onRemove={removeItem}
            onCheckout={setCheckoutAmount}
            customer={customer}
            onCustomer={setCustomer}
          />
        </div>
      )}
      {view === 'inventory' && (
        <div className="flex-1 overflow-y-auto">
          <InventoryView products={products} />
        </div>
      )}
      {view === 'reports' && (
        <div className="flex-1 overflow-y-auto">
          <ReportsView sales={sales} products={products} />
        </div>
      )}

      {checkoutAmount && (
        <PaymentModal
          amount={checkoutAmount}
          customer={customer}
          isOffline={isOffline}
          onClose={() => setCheckoutAmount(null)}
          onComplete={completePayment}
        />
      )}
    </div>
  )
}

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition ${
        active ? 'bg-white text-jade-700 font-medium shadow-sm' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {icon} {label}
    </button>
  )
}
