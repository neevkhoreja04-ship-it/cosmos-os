import React from 'react';
import { motion } from 'framer-motion';
import { useWidgetStore } from '../stores/widgetStore';

interface WidgetContainerProps {
  id: string;
  position: { x: number; y: number };
  children: React.ReactNode;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ id, position, children, className = '' }) => {
  const { updatePosition } = useWidgetStore();

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      onDragEnd={(_, info) => {
        updatePosition(id, { x: position.x + info.offset.x, y: position.y + info.offset.y });
      }}
      className={`absolute pointer-events-auto ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default WidgetContainer;
