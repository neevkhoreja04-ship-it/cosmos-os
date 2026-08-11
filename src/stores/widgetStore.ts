import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WidgetState {
  id: string;
  type: string;
  position: { x: number; y: number };
}

interface WidgetStoreState {
  widgets: WidgetState[];
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
}

export const useWidgetStore = create<WidgetStoreState>()(
  persist(
    (set) => ({
      widgets: [
        { id: 'clock-1', type: 'clock', position: { x: 50, y: 50 } },
        { id: 'weather-1', type: 'weather', position: { x: 50, y: 200 } },
        { id: 'calendar-1', type: 'calendar', position: { x: 50, y: 350 } },
        { id: 'quick-actions-1', type: 'quick-actions', position: { x: window.innerWidth - 300, y: 50 } },
      ],
      updatePosition: (id, pos) => set((state) => ({
        widgets: state.widgets.map(w => w.id === id ? { ...w, position: pos } : w)
      })),
    }),
    {
      name: 'cosmos-widgets',
    }
  )
);
