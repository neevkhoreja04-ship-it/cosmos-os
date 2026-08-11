import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
