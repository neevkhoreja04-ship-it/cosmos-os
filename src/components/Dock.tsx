import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';
import { useAppStore } from '../stores/appStore';
import { useWindowStore } from '../stores/windowStore';
import { AppDefinition } from '../stores/appStore';
import { Folder, Settings, Calculator, FileText, Image as ImageIcon, Music, Globe, Terminal } from 'lucide-react';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'folder': return <Folder size={24} />;
    case 'settings': return <Settings size={24} />;
    case 'calculator': return <Calculator size={24} />;
    case 'file-text': return <FileText size={24} />;
    case 'image': return <ImageIcon size={24} />;
    case 'music': return <Music size={24} />;
    case 'globe': return <Globe size={24} />;
    case 'terminal': return <Terminal size={24} />;
    default: return null;
  }
};

const DockIcon = ({ app, active }: { app: AppDefinition, active: boolean }) => {
  const { openApp } = useWindowStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openApp(app.id)}
      role="button"
      aria-label={`Launch ${app.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openApp(app.id);
        }
      }}
    >
      <motion.div
        whileHover={{ scale: 1.3, y: -10 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md shadow-lg"
      >
        {getIcon(app.icon) || <span className="text-xl font-bold">{app.name[0]}</span>}
      </motion.div>
      
      {/* Tooltip */}
      {hovered && (
        <div className="absolute -top-10 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs rounded-md whitespace-nowrap pointer-events-none">
          {app.name}
        </div>
      )}
      
      {/* Active Indicator */}
      {active && (
        <div className="absolute -bottom-2 w-1 h-1 bg-white/70 rounded-full" />
      )}
    </div>
  );
};

const Dock: React.FC = () => {
  const { installedApps } = useAppStore();
  const { windows } = useWindowStore();

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none z-50">
      <GlassPanel className="flex items-end gap-3 px-4 py-3 pb-4 pointer-events-auto transition-transform">
        {installedApps.map((app) => (
          <DockIcon 
            key={app.id} 
            app={app} 
            active={windows.some(w => w.app === app.id)} 
          />
        ))}
      </GlassPanel>
    </div>
  );
};

export default Dock;
