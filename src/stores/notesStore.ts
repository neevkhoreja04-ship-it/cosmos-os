import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isTemp?: boolean;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  studentId: string | null;
  loading: boolean;
  initialize: () => Promise<void>;
  addNote: () => Promise<void>;
  updateNoteLocal: (id: string, title: string, content: string) => void;
  saveNote: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setActiveNote: (id: string) => void;
}

const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  activeNoteId: null,
  studentId: null,
  loading: true,

  initialize: async () => {
    let sid = localStorage.getItem('cosmos_notes_studentId');
    
    if (!sid) {
      try {
        const res = await fetch(`${API_BASE}/init`);
        const data = await res.json();
        sid = data.studentId;
        if (sid) {
          localStorage.setItem('cosmos_notes_studentId', sid);
        }
      } catch (err) {
        console.error('Failed to init backend', err);
        set({ loading: false });
        return;
      }
    }

    set({ studentId: sid });

    if (sid) {
      try {
        const res = await fetch(`${API_BASE}/${sid}/notes`);
        const data = await res.json();
        // The API returns { documents: [...] } based on docs, but let's map them.
        // The API might return { documents: [ { id, title, content } ] }
        if (data.documents) {
          // ensure date exists
          const mappedNotes = data.documents.map((n: any) => ({
            id: n.id,
            title: n.title || '',
            content: n.content || '',
            date: n.date || new Date().toISOString()
          }));
          set({ notes: mappedNotes, loading: false });
          if (mappedNotes.length > 0) {
            set({ activeNoteId: mappedNotes[0].id });
          }
        }
      } catch (err) {
        console.error('Failed to fetch notes', err);
        set({ loading: false });
      }
    }
  },

  addNote: async () => {
    const { studentId } = get();
    if (!studentId) return;

    const tempId = `temp-${Math.random().toString(36).substring(2, 9)}`;
    const newNote: Note = {
      id: tempId,
      title: 'New Note',
      content: '',
      date: new Date().toISOString(),
      isTemp: true
    };

    set({ notes: [newNote, ...get().notes], activeNoteId: newNote.id });

    try {
      const res = await fetch(`${API_BASE}/${studentId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Note', content: '', date: newNote.date })
      });
      const data = await res.json();

      if (data.documentId) {
        set((state) => ({
          notes: state.notes.map(n => n.id === tempId ? { ...n, id: data.documentId, isTemp: false } : n),
          activeNoteId: state.activeNoteId === tempId ? data.documentId : state.activeNoteId
        }));
      }
    } catch (err) {
      console.error('Failed to create note', err);
    }
  },

  updateNoteLocal: (id, title, content) => {
    set({
      notes: get().notes.map(n => n.id === id ? { ...n, title, content, date: new Date().toISOString() } : n)
    });
  },

  saveNote: async (id) => {
    const { studentId, notes } = get();
    if (!studentId) return;

    const note = notes.find(n => n.id === id);
    if (!note || note.isTemp) return;

    try {
      await fetch(`${API_BASE}/${studentId}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, content: note.content, date: note.date })
      });
    } catch (err) {
      console.error('Failed to save note', err);
    }
  },

  deleteNote: async (id) => {
    const { studentId, notes, activeNoteId } = get();
    
    const newNotes = notes.filter(n => n.id !== id);
    set({
      notes: newNotes,
      activeNoteId: activeNoteId === id ? (newNotes[0]?.id || null) : activeNoteId
    });

    if (!studentId || id.startsWith('temp-')) return;

    try {
      await fetch(`${API_BASE}/${studentId}/notes/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  },

  setActiveNote: (id) => set({ activeNoteId: id })
}));
