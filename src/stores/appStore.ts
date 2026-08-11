import { create } from 'zustand';
import React, { lazy } from 'react';

const FileExplorer = lazy(() => import('../apps/FileExplorer'));
const Settings = lazy(() => import('../apps/Settings'));
const Calculator = lazy(() => import('../apps/Calculator'));
const Notes = lazy(() => import('../apps/Notes'));
const Gallery = lazy(() => import('../apps/Gallery'));
const MusicPlayer = lazy(() => import('../apps/MusicPlayer'));
const Browser = lazy(() => import('../apps/Browser'));
const Terminal = lazy(() => import('../apps/Terminal'));

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
}

interface AppStoreState {
  installedApps: AppDefinition[];
}

export const useAppStore = create<AppStoreState>(() => ({
  installedApps: [
    { id: 'file-explorer', name: 'File Explorer', icon: 'folder', component: FileExplorer },
    { id: 'settings', name: 'Settings', icon: 'settings', component: Settings },
    { id: 'calculator', name: 'Calculator', icon: 'calculator', component: Calculator },
    { id: 'notes', name: 'Notes', icon: 'file-text', component: Notes },
    { id: 'gallery', name: 'Gallery', icon: 'image', component: Gallery },
    { id: 'music-player', name: 'Music', icon: 'music', component: MusicPlayer },
    { id: 'browser', name: 'Browser', icon: 'globe', component: Browser },
    { id: 'terminal', name: 'Terminal', icon: 'terminal', component: Terminal },
  ],
}));
