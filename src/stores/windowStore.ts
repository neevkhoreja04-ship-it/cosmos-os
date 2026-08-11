import { create } from 'zustand';

export interface WindowState {
  id: string;
  app: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  state: 'open' | 'minimized' | 'maximized';
}

interface WindowStoreState {
  windows: WindowState[];
  bringToFront: (id: string) => void;
  openApp: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStoreState>((set) => ({
  windows: [],
  bringToFront: (id) => set((state) => {
    const window = state.windows.find(w => w.id === id);
    if (!window) return state;
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
    return {
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, state: w.state === 'minimized' ? 'open' : w.state } : w)
    };
  }),
  openApp: (appId) => set((state) => {
    const existing = state.windows.find(w => w.app === appId);
    if (existing) {
      const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
      return { windows: state.windows.map(w => w.id === existing.id ? { ...w, zIndex: maxZ + 1, state: 'open' } : w) };
    }
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      app: appId,
      position: { x: 100 + Math.random() * 50, y: 100 + Math.random() * 50 },
      size: { width: 800, height: 600 },
      zIndex: maxZ + 1,
      state: 'open'
    };
    return { windows: [...state.windows, newWindow] };
  }),
  closeWindow: (id) => set((state) => ({ windows: state.windows.filter(w => w.id !== id) })),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, state: 'minimized' } : w)
  })),
  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, state: w.state === 'maximized' ? 'open' : 'maximized', size: w.state === 'maximized' ? {width: 800, height: 600} : {width: window.innerWidth, height: window.innerHeight}, position: w.state === 'maximized' ? {x: 100, y: 100} : {x:0, y:0} } : w)
  })),
  updatePosition: (id, pos) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, position: pos } : w)
  })),
  updateSize: (id, size) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, size } : w)
  })),
}));
