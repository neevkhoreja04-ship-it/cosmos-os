import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../stores/windowStore';
import Window from './Window';

const WindowManager: React.FC = () => {
  const { windows } = useWindowStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {windows.map((w) => (
          <Window key={w.id} windowState={w} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
