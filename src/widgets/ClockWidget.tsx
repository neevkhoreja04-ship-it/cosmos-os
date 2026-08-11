import React, { useEffect, useState } from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const ClockWidget: React.FC<WidgetProps> = ({ id, position }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <WidgetContainer id={id} position={position} className="w-64 h-32 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full h-full flex flex-col items-center justify-center text-white rounded-2xl border border-white/20 shadow-xl bg-black/40 backdrop-blur-xl">
        <div className="text-5xl font-light tracking-tight">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm text-white/70 mt-1 font-medium tracking-wide uppercase">
          {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default ClockWidget;
