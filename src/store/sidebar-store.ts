import { create } from 'zustand'

interface SidebarState {
  isLeftSidebarOpen: boolean
  isRightSidebarOpen: boolean
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setLeftSidebarOpen: (isOpen: boolean) => void
  setRightSidebarOpen: (isOpen: boolean) => void
}

interface SideDrawerStore {
  isLeftDrawerOpen: boolean
  isRightDrawerOpen: boolean
  toggleLeftDrawer: () => void
  toggleRightDrawer: () => void
  setLeftDrawerOpen: (isOpen: boolean) => void
  setRightDrawerOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
  setLeftSidebarOpen: (isOpen) => set({ isLeftSidebarOpen: isOpen }),
  setRightSidebarOpen: (isOpen) => set({ isRightSidebarOpen: isOpen }),
})) 

export const useSideDrawerStore = create<SideDrawerStore>((set) => ({
  isLeftDrawerOpen: true,
  isRightDrawerOpen: true,
  toggleLeftDrawer: () => set((state) => ({ isLeftDrawerOpen: !state.isLeftDrawerOpen })),
  toggleRightDrawer: () => set((state) => ({ isRightDrawerOpen: !state.isRightDrawerOpen })),
  setLeftDrawerOpen: (isOpen) => set({ isLeftDrawerOpen: isOpen }),
  setRightDrawerOpen: (isOpen) => set({ isRightDrawerOpen: isOpen }),
})) 