import React from 'react';
import WidgetContainer from '../components/WidgetContainer';
import GlassPanel from '../components/GlassPanel';
import { useNotesStore } from '../stores/notesStore';
import { FileText } from 'lucide-react';

interface WidgetProps {
  id: string;
  position: { x: number; y: number };
}

const NotesWidget: React.FC<WidgetProps> = ({ id, position }) => {
  const { notes } = useNotesStore();
  const recentNotes = notes.slice(0, 3);

  return (
    <WidgetContainer id={id} position={position} className="w-64 cursor-grab active:cursor-grabbing">
      <GlassPanel className="w-full rounded-2xl border border-white/20 shadow-xl bg-yellow-900/30 backdrop-blur-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-3 text-yellow-300 font-semibold">
          <FileText size={16} />
          <span>Recent Notes</span>
        </div>
        <div className="space-y-2">
          {recentNotes.length > 0 ? recentNotes.map(note => (
            <div key={note.id} className="bg-white/10 rounded-lg p-2 text-xs truncate">
              <span className="font-medium">{note.title || 'Untitled'}</span>
              <span className="text-white/60 ml-2">{note.content}</span>
            </div>
          )) : (
            <div className="text-white/50 text-xs italic">No notes available.</div>
          )}
        </div>
      </GlassPanel>
    </WidgetContainer>
  );
};

export default NotesWidget;
