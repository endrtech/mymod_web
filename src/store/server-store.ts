import { create } from 'zustand'

interface ServerStore {
  currentServerId: string | null
  setServerId: (id: string) => void
}

export const useServerStore = create<ServerStore>((set) => ({
    currentServerId: null,
    setServerId: (id) => set({ currentServerId: id }),
  })) 