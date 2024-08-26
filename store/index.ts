import { del, get, set } from "idb-keyval";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

import { createAppStateSlice, AppStateSlice } from "./AppStore";
import { createTransientStateSlice, TransientStateSlice } from "./TransientStore";

export type StoreType = AppStateSlice;
type TransientStoreState = TransientStateSlice;

// -------------------------------------------------------------------------------------------------
// IndexDB storage
// -------------------------------------------------------------------------------------------------
const indexDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

// -------------------------------------------------------------------------------------------------
// App state store (persisted)
// -------------------------------------------------------------------------------------------------
export const useStore = create<StoreType>()(
  persist(
    (set, get, api) => ({
      ...createAppStateSlice(set, get, api),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => indexDBStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);




// -------------------------------------------------------------------------------------------------
// Transient store (not persisted)
// -------------------------------------------------------------------------------------------------
export const useTransientStore = create<TransientStoreState>((set, get, api) => ({
  ...createTransientStateSlice(set, get, api),
}));