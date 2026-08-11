import React from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import WindowManager from './WindowManager';
import Dock from './Dock';
import SystemTray from './SystemTray';
import GlobalSearch from './GlobalSearch';
import ContextMenu from './ContextMenu';
import WidgetLayer from './WidgetLayer';

const Desktop: React.FC = () => {
  const { wallpaper } = useSettingsStore();

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Click-outside deselect behaviour
      console.log('Desktop clicked, deselect active elements');
    }
  };

  return (
    <div 
      className="w-full h-full relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={handleDesktopClick}
    >
      <SystemTray />
      <WidgetLayer />
      <WindowManager />
      <Dock />
      <GlobalSearch />
      <ContextMenu />
    </div>
  );
};

export default Desktop;
