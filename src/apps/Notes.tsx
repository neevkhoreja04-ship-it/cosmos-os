import { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { useNotesStore } from '../stores/notesStore';

export default function Notes() {
  const { notes, activeNoteId, addNote, updateNoteLocal, deleteNote, setActiveNote, initialize, saveNote, loading } = useNotesStore();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleSave = async () => {
    if (!activeNote || activeNote.isTemp) return;
    setIsSaving(true);
    await saveNote(activeNote.id);
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-white bg-black/20">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading notes...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full text-white bg-black/20">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black/40">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold flex items-center gap-2">
            <FileText size={16} />
            Notes
          </div>
          <button 
            onClick={addNote}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {notes.length === 0 && (
            <div className="text-white/50 text-xs italic text-center mt-4">No notes found</div>
          )}
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors group relative ${activeNoteId === note.id ? 'bg-blue-600' : 'hover:bg-white/10'}`}
            >
              <div className="font-medium truncate pr-6">
                {note.title || 'Untitled'}
                {note.isTemp && <span className="ml-2 text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/70">Syncing...</span>}
              </div>
              <div className={`text-xs truncate ${activeNoteId === note.id ? 'text-white/80' : 'text-white/50'}`}>
                {note.content || 'No additional text'}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                className="absolute right-2 top-3 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all text-white/80"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {activeNote ? (
          <>
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={handleSave}
                disabled={activeNote.isTemp || isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 px-3 py-1.5 rounded-md text-sm transition-colors shadow-lg"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
            
            <div className="p-6 pb-2 pr-24">
              <input 
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNoteLocal(activeNote.id, e.target.value, activeNote.content)}
                placeholder="Title"
                className="w-full bg-transparent text-3xl font-bold focus:outline-none placeholder-white/30"
              />
              <div className="text-xs text-white/40 mt-2">
                {new Date(activeNote.date).toLocaleString()}
              </div>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNoteLocal(activeNote.id, activeNote.title, e.target.value)}
              placeholder="Start writing..."
              className="flex-1 w-full bg-transparent p-6 pt-2 resize-none focus:outline-none placeholder-white/30"
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/30">
            <FileText size={48} className="mb-4 opacity-50" />
            <p>Select or create a note</p>
          </div>
        )}
      </div>
    </div>
  );
}