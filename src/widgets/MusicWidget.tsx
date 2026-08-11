import React from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';
import { Play, SkipBack, SkipForward } from 'lucide-react';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const MusicWidget: React.FC<WidgetProps> = ({ id, position }) => {
  return (
    <WidgetContainer id={id} position={position} className="w-64 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full rounded-2xl border border-white/20 shadow-xl bg-purple-900/40 backdrop-blur-xl p-4 text-white flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shrink-0" />
        <div className="flex-1 overflow-hidden">
          <div className="text-sm font-bold truncate">Cosmos Theme</div>
          <div className="text-xs text-white/60 truncate">Unknown Artist</div>
          <div className="flex items-center justify-between mt-2">
            <button className="text-white/70 hover:text-white transition-colors"><SkipBack size={16} /></button>
            <button className="text-white hover:scale-110 transition-transform"><Play size={20} className="fill-current" /></button>
            <button className="text-white/70 hover:text-white transition-colors"><SkipForward size={16} /></button>
          </div>
        </div>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default MusicWidget;
