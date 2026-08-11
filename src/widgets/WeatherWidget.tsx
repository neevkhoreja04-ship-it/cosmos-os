import React from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';
import { CloudRain } from 'lucide-react';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const WeatherWidget: React.FC<WidgetProps> = ({ id, position }) => {
  return (
    <WidgetContainer id={id} position={position} className="w-64 h-32 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full h-full flex items-center justify-between p-6 text-white rounded-2xl border border-white/20 shadow-xl bg-blue-900/30 backdrop-blur-xl">
        <div className="flex flex-col">
          <span className="text-sm text-white/70 font-medium">New York</span>
          <span className="text-4xl font-light">68°</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CloudRain size={36} className="text-blue-300" />
          <span className="text-xs font-medium text-blue-200">Rainy</span>
        </div>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default WeatherWidget;
