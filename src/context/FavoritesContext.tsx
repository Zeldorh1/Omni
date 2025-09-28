import React, { createContext, useContext } from 'react';
import { create } from 'zustand';
import type { Product } from '@/data/types';

type FavState = {
  favorites: Record<string, Product>;
  toggle: (p: Product) => void;
  isFav: (id: string) => boolean;
  list: () => Product[];
};

const useFavImpl = create<FavState>((set, get) => ({
  favorites: {},
  toggle: (p) => set((s)=>{
    const f = {...s.favorites};
    if (f[p.id]) delete f[p.id]; else f[p.id] = p;
    return { favorites: f };
  }),
  isFav: (id) => !!get().favorites[id],
  list: () => Object.values(get().favorites)
}));

const FavContext = createContext<ReturnType<typeof useFavImpl> | null>(null);
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useFavImpl();
  return <FavContext.Provider value={store}>{children}</FavContext.Provider>;
};
export const useFavs = () => { const ctx = useContext(FavContext); if (!ctx) throw new Error('useFavs must be used within FavoritesProvider'); return ctx; };
