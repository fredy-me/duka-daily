import { useSyncExternalStore } from "react";
import {
  products as initialProducts,
  stocktaking as initialStocktaking,
  expenses as initialBudget,
  type Product,
  type StocktakingItem,
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
