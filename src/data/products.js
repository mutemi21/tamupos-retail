// Product catalog for a Nairobi-style mini-market / duka.
// Prices in KES reflect typical supermarket pricing.
// SKU prefix: brand-size-code. Barcodes are illustrative (EAN-13 format).

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'staples', label: 'Staples' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'household', label: 'Household' },
  { id: 'personal', label: 'Personal Care' },
  { id: 'snacks', label: 'Snacks' },
]

export const initialProducts = [
  // Staples
  { sku: 'UNG-2KG-001', barcode: '6161106720011', name: 'Unga wa Ngano (Pembe) 2kg', category: 'staples', price: 215, stock: 48 },
  { sku: 'RIC-2KG-002', barcode: '6161106720028', name: 'Pishori Rice 2kg', category: 'staples', price: 420, stock: 32 },
  { sku: 'SUG-1KG-003', barcode: '6161106720035', name: 'Kabras Sugar 1kg', category: 'staples', price: 180, stock: 64 },
  { sku: 'SAL-1KG-004', barcode: '6161106720042', name: 'Kensalt Iodized 1kg', category: 'staples', price: 60, stock: 120 },
  { sku: 'OIL-1L-005', barcode: '6161106720059', name: 'Fresh Fri Oil 1L', category: 'staples', price: 340, stock: 28 },
  { sku: 'MAI-2KG-006', barcode: '6161106720066', name: 'Maize Flour Jogoo 2kg', category: 'staples', price: 180, stock: 4 },

  // Beverages
  { sku: 'COK-500-101', barcode: '6161106721011', name: 'Coca-Cola 500ml', category: 'beverages', price: 80, stock: 92 },
  { sku: 'STO-500-102', barcode: '6161106721028', name: 'Stoney Tangawizi 500ml', category: 'beverages', price: 90, stock: 48 },
  { sku: 'FAN-500-103', barcode: '6161106721035', name: 'Fanta Orange 500ml', category: 'beverages', price: 80, stock: 56 },
  { sku: 'DAS-500-104', barcode: '6161106721042', name: 'Dasani Water 500ml', category: 'beverages', price: 50, stock: 120 },
  { sku: 'KER-500-105', barcode: '6161106721059', name: 'Keringet Water 500ml', category: 'beverages', price: 55, stock: 96 },
  { sku: 'TUS-500-106', barcode: '6161106721066', name: 'Tusker Lager 500ml', category: 'beverages', price: 280, stock: 24 },
  { sku: 'MIN-200-107', barcode: '6161106721073', name: 'Minute Maid Mango 200ml', category: 'beverages', price: 60, stock: 72 },

  // Dairy
  { sku: 'MIL-500-201', barcode: '6161106722011', name: 'Brookside Milk 500ml', category: 'dairy', price: 65, stock: 46 },
  { sku: 'YOG-250-202', barcode: '6161106722028', name: 'Ilara Yoghurt 250ml', category: 'dairy', price: 90, stock: 28 },
  { sku: 'BTR-250-203', barcode: '6161106722035', name: 'Prestige Butter 250g', category: 'dairy', price: 320, stock: 14 },
  { sku: 'CHE-200-204', barcode: '6161106722042', name: 'Browns Cheese 200g', category: 'dairy', price: 480, stock: 2 },

  // Household
  { sku: 'OMO-1KG-301', barcode: '6161106723011', name: 'Omo Detergent 1kg', category: 'household', price: 280, stock: 38 },
  { sku: 'TIS-10P-302', barcode: '6161106723028', name: 'Rosy Tissue 10-pack', category: 'household', price: 420, stock: 26 },
  { sku: 'JIK-1L-303', barcode: '6161106723035', name: 'Jik Bleach 1L', category: 'household', price: 180, stock: 34 },
  { sku: 'KAS-1L-304', barcode: '6161106723042', name: 'Kasuku Cooking Fat 1L', category: 'household', price: 360, stock: 18 },

  // Personal
  { sku: 'GEI-250-401', barcode: '6161106724011', name: 'Geisha Soap 250g', category: 'personal', price: 90, stock: 60 },
  { sku: 'TOO-100-402', barcode: '6161106724028', name: 'Colgate Toothpaste 100g', category: 'personal', price: 220, stock: 36 },
  { sku: 'SHA-400-403', barcode: '6161106724035', name: 'Suave Shampoo 400ml', category: 'personal', price: 450, stock: 12 },
  { sku: 'PAD-403', barcode: '6161106724042', name: 'Always Pads (10 pads)', category: 'personal', price: 160, stock: 44 },

  // Snacks
  { sku: 'CRI-100-501', barcode: '6161106725011', name: 'Tropical Heat Crisps 100g', category: 'snacks', price: 80, stock: 52 },
  { sku: 'BIS-200-502', barcode: '6161106725028', name: 'Britania Nice Biscuits 200g', category: 'snacks', price: 95, stock: 68 },
  { sku: 'CAN-20G-503', barcode: '6161106725035', name: 'Cadbury Dairy Milk 20g', category: 'snacks', price: 80, stock: 84 },
  { sku: 'PEA-500-504', barcode: '6161106725042', name: 'Nzuri Peanuts 500g', category: 'snacks', price: 240, stock: 16 },
]

export const LOW_STOCK_THRESHOLD = 10
