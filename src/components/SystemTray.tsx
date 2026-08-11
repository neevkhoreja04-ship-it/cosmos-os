import React, { useState, useEffect } from 'react';
import { Wifi, Battery, ChevronUp } from 'lucide-react';
import GlassPanel from './GlassPanel';

const SystemTray: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 right-0 p-2 pointer-events-none z-50">
      <GlassPanel className="flex items-center gap-4 px-4 py-1.5 pointer-events-auto rounded-full bg-black/30 text-white/90 text-sm">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <ChevronUp size={14} />
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <Wifi size={14} />
          <Battery size={14} />
        </div>
        <div className="cursor-pointer hover:text-white transition-colors font-medium">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </GlassPanel>
    </div>
  );
};

export default SystemTray;
