import { create } from 'zustand';
import { Hive } from '../types';

export interface SavedState {
  savedItems: Hive[];
  addItem: (item: Hive) => void;
  removeItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;
  clearAll: () => void;
}

export const useSavedStore = create<SavedState>()((set, get) => ({
  savedItems: [],

  addItem: (item: Hive) => {
    const exists = get().savedItems.some((saved) => saved.id === item.id);
    if (!exists) {
      set((state) => ({
        savedItems: [...state.savedItems, item],
      }));
    }
  },

  removeItem: (id: string) => {
    set((state) => ({
      savedItems: state.savedItems.filter((item) => item.id !== id),
    }));
  },

  isItemSaved: (id: string) => {
    return get().savedItems.some((item) => item.id === id);
  },

  clearAll: () => {
    set({ savedItems: [] });
  },
}));