import React, { useEffect, useState } from 'react';
import GlassPanel from './GlassPanel';
import { Settings, Folder, File, RefreshCw } from 'lucide-react';
import { useWindowStore } from '../stores/windowStore';

const ContextMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { openApp } = useWindowStore();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);
      // Ensure menu stays within viewport bounds
      const x = Math.min(e.clientX, window.innerWidth - 250);
      const y = Math.min(e.clientY, window.innerHeight - 250);
      setPosition({ x, y });
    };

    const handleClick = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'New Folder', icon: Folder, action: () => console.log('New Folder') },
    { label: 'New File', icon: File, action: () => console.log('New File') },
    { divider: true },
    { label: 'Change Wallpaper', icon: Settings, action: () => openApp('settings') },
    { label: 'Refresh', icon: RefreshCw, action: () => window.location.reload() },
  ];

  return (
    <div 
      style={{ left: position.x, top: position.y }}
      className="fixed z-[110] pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <GlassPanel className="w-56 py-1 bg-black/60 shadow-2xl border-white/10 flex flex-col rounded-lg">
        {menuItems.map((item, i) => 
          item.divider ? (
            <div key={i} className="h-px bg-white/10 my-1 mx-2" />
          ) : (
            <button 
              key={i}
              onClick={() => {
                item.action?.();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors text-left"
            >
              {item.icon && <item.icon size={16} className="mr-3 text-white/50" />}
              {item.label}
            </button>
          )
        )}
      </GlassPanel>
    </div>
  );
};

export default ContextMenu;
