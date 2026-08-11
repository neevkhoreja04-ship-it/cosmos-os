import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { WindowState, useWindowStore } from '../stores/windowStore';
import { useAppStore } from '../stores/appStore';
import { useResize } from '../hooks/useResize';

interface WindowProps {
  windowState: WindowState;
}

const Window: React.FC<WindowProps> = ({ windowState }) => {
  const { id, app, position, size, zIndex, state } = windowState;
  const { bringToFront, closeWindow, minimizeWindow, maximizeWindow, updatePosition } = useWindowStore();
  const { installedApps } = useAppStore();
  const windowRef = useRef<HTMLDivElement>(null);
  
  const dragControls = useDragControls();
  const { startResize } = useResize(id, size, position);

  const appDef = installedApps.find(a => a.id === app);
  const AppComponent = appDef?.component;

  if (state === 'minimized') return null;

  return (
    <motion.div
      ref={windowRef}
      drag={state !== 'maximized'}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
      exit={{ scale: 0.8, opacity: 0 }}
      onDragEnd={(_, info) => {
        updatePosition(id, { x: position.x + info.offset.x, y: position.y + info.offset.y });
      }}
      style={{
        width: size.width,
        height: size.height,
        zIndex,
        position: 'absolute'
      }}
      onMouseDown={() => bringToFront(id)}
      className="absolute top-0 left-0 overflow-hidden rounded-xl shadow-2xl flex flex-col pointer-events-auto"
    >
      <GlassPanel className="w-full h-full flex flex-col rounded-xl overflow-hidden border-white/20 border">
        {/* Title Bar */}
        <div 
          className="h-10 border-b border-white/10 bg-white/5 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            if (state !== 'maximized') dragControls.start(e);
          }}
        >
          <div className="text-sm font-medium text-white/80" id={`window-title-${id}`}>{appDef?.name || app}</div>
          <div className="flex items-center space-x-2">
            <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors">
              <Minus size={14} />
            </button>
            <button aria-label="Maximize" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors">
              <Square size={12} />
            </button>
            <button aria-label="Close" onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center text-white/70 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-black/40 relative overflow-hidden backdrop-blur-md" role="region" aria-labelledby={`window-title-${id}`}>
          <React.Suspense fallback={<div className="p-4 text-white/50 flex items-center justify-center h-full">Loading...</div>}>
            {AppComponent ? <AppComponent /> : <div className="p-4 text-white/50">{app} Content</div>}
          </React.Suspense>
        </div>
      </GlassPanel>

      {/* Resize Handles */}
      {state !== 'maximized' && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize z-50" onPointerDown={(e) => startResize(e, 'nw')} />
          <div className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize z-50" onPointerDown={(e) => startResize(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize z-50" onPointerDown={(e) => startResize(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize z-50" onPointerDown={(e) => startResize(e, 'se')} />
          <div className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize z-50" onPointerDown={(e) => startResize(e, 'n')} />
          <div className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize z-50" onPointerDown={(e) => startResize(e, 's')} />
          <div className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize z-50" onPointerDown={(e) => startResize(e, 'w')} />
          <div className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize z-50" onPointerDown={(e) => startResize(e, 'e')} />
        </>
      )}
    </motion.div>
  );
};

export default Window;
