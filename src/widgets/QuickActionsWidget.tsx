import React from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';
import { Wifi, Bluetooth, Moon, Sun } from 'lucide-react';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const QuickActionsWidget: React.FC<WidgetProps> = ({ id, position }) => {
  const [active, setActive] = React.useState<Record<string, boolean>>({
    wifi: true,
    bluetooth: false,
    dnd: false,
  });

  const toggle = (key: string) => setActive(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <WidgetContainer id={id} position={position} className="w-64 p-4 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full rounded-2xl border border-white/20 shadow-xl bg-black/40 backdrop-blur-xl p-4 grid grid-cols-2 gap-3">
        <button 
          onClick={() => toggle('wifi')}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-colors ${active.wifi ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          <Wifi size={24} />
          <span className="text-xs font-medium">Wi-Fi</span>
        </button>
        <button 
          onClick={() => toggle('bluetooth')}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-colors ${active.bluetooth ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          <Bluetooth size={24} />
          <span className="text-xs font-medium">Bluetooth</span>
        </button>
        <button 
          onClick={() => toggle('dnd')}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-colors ${active.dnd ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          <Moon size={24} />
          <span className="text-xs font-medium">Do Not Disturb</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
        >
          <Sun size={24} />
          <span className="text-xs font-medium">Display</span>
        </button>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default QuickActionsWidget;
