import { useSyncExternalStore } from "react";
import { products as initialProducts, type Product } from "./mock";

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
