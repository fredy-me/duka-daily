import { useSyncExternalStore } from "react";
import {
  products as initialProducts,
  stocktaking as initialStocktaking,
  expenses as initialBudget,
  wakalaMonths as initialWakalaMonths,
  type Product,
  type StocktakingItem,
  type WakalaMonth,
} from "./mock";

let products: Product[] = [...initialProducts];

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Product[] {
  return products;
}

export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function updateProduct(id: string, patch: Partial<Product>) {
  products = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
  emit();
}

export function restockProduct(id: string, qty: number, buyPrice: number, date: string) {
  products = products.map((p) => {
    if (p.id !== id) return p;
    const note = `Nyongeza ya hisa · +${qty} ${p.unit} · ${buyPrice} TZS`;
    return {
      ...p,
      stock: p.stock + qty,
      buyPrice,
      events: [...p.events, { date, type: "nyongeza" as const, note }],
    };
  });
  emit();
}

export function deleteProduct(id: string) {
  products = products.filter((p) => p.id !== id);
  emit();
}

export function addProduct(p: Product) {
  products = [...products, p];
  emit();
}

let stocktakingItems: StocktakingItem[] = [...initialStocktaking];

function getStocktakingSnapshot(): StocktakingItem[] {
  return stocktakingItems;
}

export function useStocktaking(): StocktakingItem[] {
  return useSyncExternalStore(subscribe, getStocktakingSnapshot, getStocktakingSnapshot);
}

export function updateStocktaking(id: string, patch: Partial<StocktakingItem>) {
  stocktakingItems = stocktakingItems.map((s) => (s.id === id ? { ...s, ...patch } : s));
  emit();
}

export function adjustStocktaking(id: string, delta: number) {
  stocktakingItems = stocktakingItems.map((s) =>
    s.id === id ? { ...s, qty: Math.max(0, s.qty + delta) } : s,
  );
  emit();
}

export function deleteStocktaking(id: string) {
  stocktakingItems = stocktakingItems.filter((s) => s.id !== id);
  emit();
}

export function addStocktaking(s: StocktakingItem) {
  stocktakingItems = [...stocktakingItems, s];
  emit();
}

export type BudgetCategory = {
  id: string;
  date: string;
  note: string;
  amount: number;
  target: number;
};

let budgetCategories: BudgetCategory[] = [...initialBudget];

function getBudgetSnapshot(): BudgetCategory[] {
  return budgetCategories;
}

export function useBudget(): BudgetCategory[] {
  return useSyncExternalStore(subscribe, getBudgetSnapshot, getBudgetSnapshot);
}

export function updateBudgetCategory(id: string, patch: Partial<BudgetCategory>) {
  budgetCategories = budgetCategories.map((b) => (b.id === id ? { ...b, ...patch } : b));
  emit();
}

export function deleteBudgetCategory(id: string) {
  budgetCategories = budgetCategories.filter((b) => b.id !== id);
  emit();
}

export function useExpenses(): BudgetCategory[] {
  return useSyncExternalStore(subscribe, getBudgetSnapshot, getBudgetSnapshot);
}

export function addExpense(input: { date: string; note: string; amount: number; target: number }) {
  const id = `e${Date.now()}`;
  budgetCategories = [...budgetCategories, { id, ...input }];
  emit();
}

export function updateExpense(id: string, patch: Partial<Omit<BudgetCategory, "id">>) {
  budgetCategories = budgetCategories.map((e) => (e.id === id ? { ...e, ...patch } : e));
  emit();
}

export function deleteExpense(id: string) {
  budgetCategories = budgetCategories.filter((e) => e.id !== id);
  emit();
}

let wakalaMonths: WakalaMonth[] = [...initialWakalaMonths];

function getWakalaSnapshot(): WakalaMonth[] {
  return wakalaMonths;
}

export function useWakala(): WakalaMonth[] {
  return useSyncExternalStore(subscribe, getWakalaSnapshot, getWakalaSnapshot);
}

export function setWakalaFloat(agentId: string, month: string, float: number) {
  const existing = wakalaMonths.find((w) => w.agentId === agentId && w.month === month);
  if (existing) {
    wakalaMonths = wakalaMonths.map((w) => (w.id === existing.id ? { ...w, float } : w));
  } else {
    wakalaMonths = [
      ...wakalaMonths,
      { id: `${agentId}-${month}`, agentId, month, float, commission: 0 },
    ];
  }
  emit();
}

export function setWakalaCommission(agentId: string, month: string, commission: number) {
  const existing = wakalaMonths.find((w) => w.agentId === agentId && w.month === month);
  if (existing) {
    wakalaMonths = wakalaMonths.map((w) => (w.id === existing.id ? { ...w, commission } : w));
  } else {
    wakalaMonths = [
      ...wakalaMonths,
      { id: `${agentId}-${month}`, agentId, month, float: 0, commission },
    ];
  }
  emit();
}
