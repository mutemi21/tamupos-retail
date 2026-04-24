import { useState, useMemo } from 'react'
import { Search, ScanLine, AlertCircle } from 'lucide-react'
import { categories, LOW_STOCK_THRESHOLD } from '../data/products.js'
import { kes } from '../hooks/index.js'

export default function ProductGrid({ products, onAdd, onScan }) {
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const [scanning, setScanning] = useState(false)

  const filtered = useMemo(() => {
    let r = products
    if (cat !== 'all') r = r.filter((p) => p.category === cat)
    if (query) {
      const q = query.toLowerCase()
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.includes(q)
      )
    }
    return r
  }, [products, cat, query])

  const fakeScan = () => {
    setScanning(true)
    setTimeout(() => {
      const random = products[Math.floor(Math.random() * products.length)]
      onScan(random)
      setScanning(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-white">
      {/* Search + Scan */}
      <div className="p-4 border-b border-slate-200 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, SKU, or barcode..."
              className="w-full bg-slate-50 rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder:text-slate-400 border border-slate-200 focus:border-jade-500 focus:bg-white focus:outline-none transition"
            />
          </div>
          <button
            onClick={fakeScan}
            disabled={scanning}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
              scanning
                ? 'bg-jade-100 text-jade-700'
                : 'bg-jade-500 hover:bg-jade-600 text-white'
            }`}
          >
            <ScanLine size={16} /> {scanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>

        {/* Scanner preview */}
        {scanning && (
          <div className="relative h-16 bg-slate-900 rounded-lg overflow-hidden scan-line">
            <div className="absolute inset-0 flex items-center justify-center text-jade-200 text-xs font-mono">
              Point camera at barcode...
            </div>
          </div>
        )}

        <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                cat === c.id
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 content-start">
          {filtered.map((p) => {
            const low = p.stock <= LOW_STOCK_THRESHOLD
            const out = p.stock === 0
            return (
              <button
                key={p.sku}
                onClick={() => !out && onAdd(p)}
                disabled={out}
                className={`group text-left bg-white border rounded-xl p-3 transition-all ${
                  out
                    ? 'border-slate-200 opacity-50 cursor-not-allowed'
                    : 'border-slate-200 hover:border-jade-500 hover:shadow-md'
                }`}
              >
                <ProductImage product={p} />
                <div className="text-xs text-slate-500 font-mono">{p.sku}</div>
                <div className="text-sm font-medium leading-tight mt-1 line-clamp-2">
                  {p.name}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-jade-700 font-semibold font-mono text-sm">
                    {kes(p.price)}
                  </span>
                  {low && !out && (
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      <AlertCircle size={10} /> {p.stock}
                    </span>
                  )}
                  {out && (
                    <span className="text-[10px] text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                      Out
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-slate-400 py-12 text-sm">
            No products match "{query}"
          </div>
        )}
      </div>
    </div>
  )
}

function emojiFor(cat) {
  return {
    staples: '🌾',
    beverages: '🥤',
    dairy: '🥛',
    household: '🧴',
    personal: '🧼',
    snacks: '🍪',
  }[cat] || '📦'
}

// Loads the product image; falls back to a category emoji if the image
// errors (offline, CDN rate-limited, stale URL). Keeps the UI intact
// on the spotty networks this POS is built for.
function ProductImage({ product }) {
  const [errored, setErrored] = useState(false)
  const showImage = product.image && !errored

  return (
    <div className="aspect-square bg-slate-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center text-2xl">
      {showImage ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{emojiFor(product.category)}</span>
      )}
    </div>
  )
}
