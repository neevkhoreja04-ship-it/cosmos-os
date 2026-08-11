import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationStoreState {
  notifications: Notification[];
  push: (n: Notification) => void;
  dismiss: (id: string) => void;
}

export const useNotificationStore = create<NotificationStoreState>(() => ({
  notifications: [],
  push: () => {},
  dismiss: () => {},
}));
