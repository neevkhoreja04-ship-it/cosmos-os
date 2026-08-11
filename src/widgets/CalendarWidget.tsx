import React from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const CalendarWidget: React.FC<WidgetProps> = ({ id, position }) => {
  const date = new Date();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <WidgetContainer id={id} position={position} className="w-64 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full rounded-2xl border border-white/20 shadow-xl bg-black/40 backdrop-blur-xl p-4 text-white">
        <div className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wider">
          {date.toLocaleDateString([], { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} className="text-[10px] font-semibold text-white/50 text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(i => <div key={`blank-${i}`} />)}
          {days.map(d => (
            <div 
              key={d} 
              className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${d === date.getDate() ? 'bg-red-500 text-white font-bold' : 'text-white hover:bg-white/20'}`}
            >
              {d}
            </div>
          ))}
        </div>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default CalendarWidget;
