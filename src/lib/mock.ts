// Mock data for the "Duka Langu" prototype. UI/UX only — no backend.

export const SHOP = {
  name: "Duka la Amani",
  address: "Mtaa wa Kariakoo, Dar es Salaam",
  owner: "Dr. Godfrey",
  phone: "0754 112 233",
};

export const fmt = (n: number) => `${n.toLocaleString("en-US")} TZS`;

export type Product = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  lowAt: number;
  price: number;
  buyPrice: number;
  registered: string;
  events: { date: string; type: "usajili" | "nyongeza" | "bei"; note: string }[];
};

export const products: Product[] = [
  {
    id: "sukari",
    name: "Sukari 2kg",
    unit: "pakiti",
    stock: 18,
    lowAt: 10,
    price: 6500,
    buyPrice: 5800,
    registered: "12 Jan 2026",
    events: [
      { date: "12 Jan 2026", type: "usajili", note: "Ilisajiliwa · 20 pakiti · 6,200 TZS" },
      { date: "03 Ago 2026", type: "nyongeza", note: "Nyongeza ya hisa · +30 pakiti" },
      { date: "14 Ago 2026", type: "bei", note: "Bei ilibadilika · 6,200 → 6,500 TZS" },
    ],
  },
  {
    id: "mchele",
    name: "Mchele 5kg",
    unit: "mfuko",
    stock: 12,
    lowAt: 6,
    price: 14000,
    buyPrice: 12500,
    registered: "12 Jan 2026",
    events: [
      { date: "12 Jan 2026", type: "usajili", note: "Ilisajiliwa · 15 mifuko · 13,500 TZS" },
      { date: "10 Ago 2026", type: "nyongeza", note: "Nyongeza ya hisa · +20 mifuko" },
      { date: "10 Ago 2026", type: "bei", note: "Bei ilibadilika · 13,500 → 14,000 TZS" },
    ],
  },
  {
    id: "unga",
    name: "Unga wa Ngano 2kg",
    unit: "pakiti",
    stock: 7,
    lowAt: 8,
    price: 4800,
    buyPrice: 4200,
    registered: "20 Feb 2026",
    events: [
      { date: "20 Feb 2026", type: "usajili", note: "Ilisajiliwa · 25 pakiti · 4,500 TZS" },
      { date: "18 Ago 2026", type: "bei", note: "Bei ilibadilika · 4,500 → 4,800 TZS" },
    ],
  },
  {
    id: "mafuta",
    name: "Mafuta ya Kupikia 1L",
    unit: "chupa",
    stock: 22,
    lowAt: 10,
    price: 7200,
    buyPrice: 6400,
    registered: "12 Jan 2026",
    events: [
      { date: "12 Jan 2026", type: "usajili", note: "Ilisajiliwa · 24 chupa · 7,000 TZS" },
      { date: "21 Ago 2026", type: "nyongeza", note: "Nyongeza ya hisa · +24 chupa" },
    ],
  },
  {
    id: "sabuni",
    name: "Sabuni ya Kufua",
    unit: "kipande",
    stock: 40,
    lowAt: 15,
    price: 1500,
    buyPrice: 1150,
    registered: "12 Jan 2026",
    events: [
      { date: "12 Jan 2026", type: "usajili", note: "Ilisajiliwa · 60 vipande · 1,500 TZS" },
    ],
  },
  {
    id: "maharage",
    name: "Maharage 1kg",
    unit: "kilo",
    stock: 16,
    lowAt: 8,
    price: 3500,
    buyPrice: 2900,
    registered: "05 Mar 2026",
    events: [{ date: "05 Mar 2026", type: "usajili", note: "Ilisajiliwa · 30 kilo · 3,400 TZS" }],
  },
  {
    id: "chumvi",
    name: "Chumvi 500g",
    unit: "pakiti",
    stock: 34,
    lowAt: 12,
    price: 800,
    buyPrice: 550,
    registered: "05 Mar 2026",
    events: [{ date: "05 Mar 2026", type: "usajili", note: "Ilisajiliwa · 50 pakiti · 800 TZS" }],
  },
  {
    id: "mkate",
    name: "Mkate",
    unit: "kipande",
    stock: 9,
    lowAt: 10,
    price: 2500,
    buyPrice: 2000,
    registered: "12 Jan 2026",
    events: [{ date: "25 Ago 2026", type: "nyongeza", note: "Nyongeza ya hisa · +20 vipande" }],
  },
  {
    id: "soda",
    name: "Soda 500ml",
    unit: "chupa",
    stock: 28,
    lowAt: 12,
    price: 1200,
    buyPrice: 900,
    registered: "12 Jan 2026",
    events: [{ date: "22 Ago 2026", type: "nyongeza", note: "Nyongeza ya hisa · +48 chupa" }],
  },
  {
    id: "biskuti",
    name: "Biskuti",
    unit: "pakiti",
    stock: 31,
    lowAt: 10,
    price: 1000,
    buyPrice: 700,
    registered: "18 Apr 2026",
    events: [{ date: "18 Apr 2026", type: "usajili", note: "Ilisajiliwa · 40 pakiti · 1,000 TZS" }],
  },
];

export const sellers = ["Juma", "Neema"];

export type Sale = {
  id: string;
  product: string;
  qty: number;
  price: number;
  seller: string;
  time: string;
};

export const todaySales: Sale[] = [
  { id: "s1", product: "Sukari 2kg", qty: 2, price: 6500, seller: "Juma", time: "07:15" },
  { id: "s2", product: "Mkate", qty: 3, price: 2500, seller: "Neema", time: "07:42" },
  { id: "s3", product: "Mafuta ya Kupikia 1L", qty: 1, price: 7200, seller: "Juma", time: "08:05" },
  { id: "s4", product: "Soda 500ml", qty: 4, price: 1200, seller: "Neema", time: "09:20" },
  { id: "s5", product: "Mchele 5kg", qty: 1, price: 14000, seller: "Juma", time: "10:11" },
  { id: "s6", product: "Sabuni ya Kufua", qty: 5, price: 1500, seller: "Neema", time: "11:03" },
  { id: "s7", product: "Chumvi 500g", qty: 3, price: 800, seller: "Juma", time: "12:30" },
  { id: "s8", product: "Biskuti", qty: 6, price: 1000, seller: "Neema", time: "13:48" },
];

export const saleTotal = (s: Sale) => s.qty * s.price;
export const todayTotal = todaySales.reduce((a, s) => a + saleTotal(s), 0);

export const weekTrend = [
  { day: "Jumatatu", mauzo: 96000 },
  { day: "Jumanne", mauzo: 118000 },
  { day: "Jumatano", mauzo: 87000 },
  { day: "Alhamisi", mauzo: 132000 },
  { day: "Ijumaa", mauzo: 145000 },
  { day: "Jumamosi", mauzo: 168000 },
  { day: "Jumapili", mauzo: todayTotal },
];

export const purchases = [
  {
    id: "p1",
    product: "Mkate",
    supplier: "Bakhresa Wholesale",
    unit: "kipande",
    qty: 20,
    buy: 2000,
    sell: 2500,
    date: "25 Ago 2026",
    isNew: false,
    priceChanged: false,
  },
  {
    id: "p2",
    product: "Soda 500ml",
    supplier: "Duka Kuu la Mwenge",
    unit: "chupa",
    qty: 48,
    buy: 900,
    sell: 1200,
    date: "22 Ago 2026",
    isNew: false,
    priceChanged: true,
  },
  {
    id: "p3",
    product: "Mafuta ya Kupikia 1L",
    supplier: "Kariakoo Traders",
    unit: "chupa",
    qty: 24,
    buy: 6400,
    sell: 7200,
    date: "21 Ago 2026",
    isNew: false,
    priceChanged: false,
  },
  {
    id: "p4",
    product: "Juisi ya Embe 1L",
    supplier: "Msambazaji Rajabu & Wana",
    unit: "chupa",
    qty: 12,
    buy: 2600,
    sell: 3200,
    date: "19 Ago 2026",
    isNew: true,
    priceChanged: false,
  },
  {
    id: "p5",
    product: "Mchele 5kg",
    supplier: "Ushirika wa Wakulima Morogoro",
    unit: "mfuko",
    qty: 20,
    buy: 12500,
    sell: 14000,
    date: "10 Ago 2026",
    isNew: false,
    priceChanged: true,
  },
];

export const expenses = [
  { id: "e1", date: "26 Ago 2026", note: "Umeme (LUKU)", amount: 20000, target: 25000 },
  { id: "e2", date: "24 Ago 2026", note: "Usafiri wa mizigo", amount: 15000, target: 18000 },
  { id: "e3", date: "20 Ago 2026", note: "Kodi ya duka", amount: 150000, target: 160000 },
  { id: "e4", date: "15 Ago 2026", note: "Mifuko ya karatasi", amount: 8000, target: 10000 },
  { id: "e5", date: "08 Ago 2026", note: "Maji", amount: 6000, target: 8000 },
];

export const expensesTotal = expenses.reduce((a, e) => a + e.amount, 0);
export const budgetTotal = expenses.reduce((a, e) => a + e.target, 0);
export const budgetRemaining = budgetTotal - expensesTotal;
export const monthIncome = 2860000;
export const monthProfit = 742000;

export type WakalaAgent = {
  id: string;
  name: string;
};

export const wakalaAgents: WakalaAgent[] = [
  { id: "mpesa", name: "M-Pesa" },
  { id: "tigo", name: "Tigo Pesa" },
  { id: "airtel", name: "Airtel Money" },
  { id: "halopesa", name: "Halopesa" },
];

export type WakalaMonth = {
  id: string;
  agentId: string;
  month: string;
  float: number;
  commission: number;
};

export const currentMonth = "Ago 2026";

export const wakalaMonths: WakalaMonth[] = [
  // Mwezi huu (Ago 2026)
  { id: "wm-m1", agentId: "mpesa", month: "Ago 2026", float: 1500000, commission: 84500 },
  { id: "wm-t1", agentId: "tigo", month: "Ago 2026", float: 900000, commission: 52300 },
  { id: "wm-a1", agentId: "airtel", month: "Ago 2026", float: 700000, commission: 38900 },
  { id: "wm-h1", agentId: "halopesa", month: "Ago 2026", float: 400000, commission: 16400 },
  // Julai 2026
  { id: "wm-m2", agentId: "mpesa", month: "Jul 2026", float: 1400000, commission: 78900 },
  { id: "wm-t2", agentId: "tigo", month: "Jul 2026", float: 850000, commission: 46100 },
  { id: "wm-a2", agentId: "airtel", month: "Jul 2026", float: 650000, commission: 35200 },
  { id: "wm-h2", agentId: "halopesa", month: "Jul 2026", float: 350000, commission: 14200 },
  // Juni 2026
  { id: "wm-m3", agentId: "mpesa", month: "Jun 2026", float: 1300000, commission: 71200 },
  { id: "wm-t3", agentId: "tigo", month: "Jun 2026", float: 800000, commission: 42800 },
  { id: "wm-a3", agentId: "airtel", month: "Jun 2026", float: 600000, commission: 31100 },
  { id: "wm-h3", agentId: "halopesa", month: "Jun 2026", float: 300000, commission: 12800 },
];

export const wakalaMonthCommission = wakalaMonths
  .filter((w) => w.month === currentMonth)
  .reduce((a, w) => a + w.commission, 0);

export const corrections = [
  {
    id: "c1",
    seller: "Juma",
    record: "Mauzo · Sukari 2kg · 2 pakiti",
    note: "Niliandika idadi 2 lakini mteja alichukua 1 tu.",
    status: "Inasubiri" as const,
    date: "26 Ago 2026 · 12:40",
    before: "Idadi: 2 · Jumla: 13,000 TZS",
    after: "Idadi: 1 · Jumla: 6,500 TZS",
  },
  {
    id: "c2",
    seller: "Neema",
    record: "Mauzo · Soda 500ml · 4 chupa",
    note: "Bei niliyoandika ilikuwa ya zamani.",
    status: "Imekubaliwa" as const,
    date: "25 Ago 2026 · 16:05",
    before: "Bei: 1,000 TZS",
    after: "Bei: 1,200 TZS",
  },
  {
    id: "c3",
    seller: "Juma",
    record: "Mauzo · Mkate · 3 vipande",
    note: "Sikuwa nimeuza, niliandika kwa makosa.",
    status: "Imekataliwa" as const,
    date: "24 Ago 2026 · 09:12",
    before: "Idadi: 3",
    after: "Imeondolewa",
  },
];

export const handovers = [
  {
    id: "h1",
    from: "Juma",
    to: "Neema",
    date: "25 Ago 2026 · 14:00",
    expected: 186000,
    counted: 186000,
  },
  {
    id: "h2",
    from: "Neema",
    to: "Juma",
    date: "24 Ago 2026 · 14:00",
    expected: 152000,
    counted: 149000,
  },
  {
    id: "h3",
    from: "Juma",
    to: "Neema",
    date: "23 Ago 2026 · 14:00",
    expected: 174500,
    counted: 174500,
  },
];

export type User = {
  id: string;
  name: string;
  phone: string;
  role: "Admin" | "Muuzaji";
  status?: "Ametumwa" | "Amekubali" | undefined;
};

export const users: User[] = [
  { id: "u1", name: "Dr. Godfrey", phone: "0754 112 233", role: "Admin" },
  { id: "u2", name: "Juma", phone: "0765 445 128", role: "Muuzaji" },
  { id: "u3", name: "Neema", phone: "0712 908 340", role: "Muuzaji" },
];

export const stockValue = products.reduce((a, p) => a + p.stock * p.buyPrice, 0);
export const stockCount = products.reduce((a, p) => a + p.stock, 0);
export const openingBalance = 1240000;
export const closingEstimate = openingBalance + todayTotal - 41000;

export type StocktakingItem = {
  id: string;
  date: string;
  product: string;
  qty: number;
  unit: string;
};

const isoDay = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const stocktaking: StocktakingItem[] = [
  { id: "st1", date: isoDay(0), product: "Sukari TPC 5kg", qty: 150, unit: "pakiti" },
  { id: "st2", date: isoDay(0), product: "Mchele Mbeya", qty: 200, unit: "kg" },
  { id: "st3", date: isoDay(-1), product: "Sukari TPC 5kg", qty: 120, unit: "pakiti" },
  { id: "st4", date: isoDay(-1), product: "Mchele Mbeya", qty: 180, unit: "kg" },
  { id: "st5", date: isoDay(-1), product: "Unga wa Ngano 2kg", qty: 75, unit: "pakiti" },
  { id: "st6", date: isoDay(-2), product: "Sukari TPC 5kg", qty: 100, unit: "pakiti" },
  { id: "st7", date: isoDay(-3), product: "Mchele Mbeya", qty: 160, unit: "kg" },
  { id: "st8", date: isoDay(-4), product: "Mafuta ya Kupikia 1L", qty: 48, unit: "chupa" },
  { id: "st9", date: isoDay(-5), product: "Sukari TPC 5kg", qty: 90, unit: "pakiti" },
];

export type StoreHistoryRecord = {
  id: string;
  openDate: string;
  closeDate: string;
  openTime: string;
  closeTime: string;
  openBalance: number;
  closeBalance: number;
};

export const storeHistory: StoreHistoryRecord[] = [
  {
    id: "sh1",
    openDate: isoDay(-3),
    closeDate: isoDay(-2),
    openTime: "08:00",
    closeTime: "18:00",
    openBalance: 1210000,
    closeBalance: 1186000,
  },
  {
    id: "sh2",
    openDate: isoDay(-2),
    closeDate: isoDay(-1),
    openTime: "08:00",
    closeTime: "18:00",
    openBalance: 1186000,
    closeBalance: 1240000,
  },
  {
    id: "sh3",
    openDate: isoDay(-1),
    closeDate: isoDay(0),
    openTime: "08:00",
    closeTime: "18:00",
    openBalance: 1240000,
    closeBalance: 1289000,
  },
];
