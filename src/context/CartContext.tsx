import React, { createContext, useContext } from 'react';
import { create } from 'zustand';
import type { Product, CartItem, Bundle } from '@/data/types';

type CartState = {
  items: CartItem[];
  bundles: Bundle[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  addBundle: (b: Bundle) => void;
  clear: () => void;
  total: () => number;
}

const useCartImpl = create<CartState>((set, get) => ({
  items: [],
  bundles: [],
  add: (p) => set((s) => {
    const existing = s.items.find(i => i.product.id === p.id);
    if (existing) return { items: s.items.map(i => i.product.id === p.id ? {...i, qty: i.qty + 1} : i) };
    return { items: [...s.items, { product: p, qty: 1 }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.product.id !== id) })),
  addBundle: (b) => set((s) => ({ bundles: [...s.bundles, b] })),
  clear: () => set({ items: [], bundles: [] }),
  total: () => {
    const { items, bundles } = get();
    const itemsSum = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const bundlesSum = bundles.reduce((sum, b) => sum + b.price, 0);
    return itemsSum + bundlesSum;
  }
}));

const CartContext = createContext<ReturnType<typeof useCartImpl> | null>(null);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useCartImpl();
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};
export const useCart = () => { const ctx = useContext(CartContext); if (!ctx) throw new Error('useCart must be used within CartProvider'); return ctx; };
