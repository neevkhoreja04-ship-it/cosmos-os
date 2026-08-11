import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  wallpaper: string;
  accentColor: string;
  dockSize: number;
  dockAutohide: boolean;
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  setWallpaper: (url: string) => void;
  setAccentColor: (color: string) => void;
  setDockSize: (size: number) => void;
  setDockAutohide: (autohide: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      accentColor: '#3b82f6',
      dockSize: 64,
      dockAutohide: false,
      theme: 'dark',
      reducedMotion: false,
      setWallpaper: (url) => set({ wallpaper: url }),
      setAccentColor: (color) => set({ accentColor: color }),
      setDockSize: (size) => set({ dockSize: size }),
      setDockAutohide: (autohide) => set({ dockAutohide: autohide }),
      setTheme: (theme) => set({ theme }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
    }),
    {
      name: 'cosmos-settings',
    }
  )
);
