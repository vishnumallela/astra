import { StateCreator } from "zustand"

export interface TransientStateSlice {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const createTransientStateSlice: StateCreator<TransientStateSlice> = (set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}) 