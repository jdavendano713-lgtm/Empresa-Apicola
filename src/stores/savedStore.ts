import { create } from 'zustand';
import { Hive } from '../types';

interface SavedState {
  savedItems: Hive[];
  addItem: (item: Hive) => void;
  removeItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;
  clearAll: () => void;
}

export const useSavedStore = create<SavedState>()((set, get) => ({
  savedItems: [],

  addItem: (item) =>
    set((state) =>
      state.savedItems.some((saved) => saved.id === item.id)
        ? state
        : { savedItems: [...state.savedItems, item] },
    ),

  removeItem: (id) =>
    set((state) => ({
      savedItems: state.savedItems.filter((saved) => saved.id !== id),
    })),

  isItemSaved: (id) => get().savedItems.some((saved) => saved.id === id),

  clearAll: () => set({ savedItems: [] }),
}));