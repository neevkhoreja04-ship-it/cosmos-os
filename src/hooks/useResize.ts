import { useState, useCallback } from 'react';
import { useWindowStore } from '../stores/windowStore';

export function useResize(windowId: string, initialSize: { width: number, height: number }, initialPosition: { x: number, y: number }) {
  const { updateSize, updatePosition } = useWindowStore();
  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback((e: React.PointerEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = initialSize.width;
    const startHeight = initialSize.height;
    const startPosX = initialPosition.x;
    const startPosY = initialPosition.y;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (handle.includes('e')) newWidth = startWidth + deltaX;
      if (handle.includes('s')) newHeight = startHeight + deltaY;
      if (handle.includes('w')) {
        newWidth = startWidth - deltaX;
        newX = startPosX + deltaX;
      }
      if (handle.includes('n')) {
        newHeight = startHeight - deltaY;
        newY = startPosY + deltaY;
      }

      // Min size constraints
      if (newWidth < 320) {
        if (handle.includes('w')) newX -= (320 - newWidth);
        newWidth = 320;
      }
      if (newHeight < 240) {
        if (handle.includes('n')) newY -= (240 - newHeight);
        newHeight = 240;
      }

      updateSize(windowId, { width: newWidth, height: newHeight });
      if (handle.includes('n') || handle.includes('w')) {
        updatePosition(windowId, { x: newX, y: newY });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      setIsResizing(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [windowId, initialSize, initialPosition, updateSize, updatePosition]);

  return { startResize, isResizing };
}
