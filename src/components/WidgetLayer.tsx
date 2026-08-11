import React from 'react';
import { useWidgetStore } from '../stores/widgetStore';
import ClockWidget from '../widgets/ClockWidget';
import WeatherWidget from '../widgets/WeatherWidget';
import CalendarWidget from '../widgets/CalendarWidget';
import QuickActionsWidget from '../widgets/QuickActionsWidget';
import NotesWidget from '../widgets/NotesWidget';
import MusicWidget from '../widgets/MusicWidget';

const WidgetMap: Record<string, React.FC<{ id: string, position: {x: number, y: number} }>> = {
  'clock': ClockWidget,
  'weather': WeatherWidget,
  'calendar': CalendarWidget,
  'quick-actions': QuickActionsWidget,
  'notes': NotesWidget,
  'music': MusicWidget,
};

const WidgetLayer: React.FC = () => {
  const { widgets } = useWidgetStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {widgets.map((widget) => {
        const WidgetComponent = WidgetMap[widget.type];
        if (!WidgetComponent) return null;
        
        return (
          <WidgetComponent 
            key={widget.id} 
            id={widget.id} 
            position={widget.position} 
          />
        );
      })}
    </div>
  );
};

export default WidgetLayer;
