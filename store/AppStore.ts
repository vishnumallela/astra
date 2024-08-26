import { StateCreator } from "zustand"

export interface AppStateSlice {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void

  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

export const createAppStateSlice: StateCreator<AppStateSlice> = (set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  hasHydrated: false,
  setHasHydrated: (hasHydrated: boolean): void => {
    set(() => ({ hasHydrated }))
  }
})