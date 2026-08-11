import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { useAppStore } from '../stores/appStore';
import { useWindowStore } from '../stores/windowStore';

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { installedApps } = useAppStore();
  const { openApp } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const results = installedApps.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="absolute inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/20 pointer-events-auto backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <GlassPanel className="overflow-hidden flex flex-col bg-white/10">
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <Search className="text-white/50 mr-3" size={20} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search apps, files, settings..."
                  className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-white/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              
              {query && (
                <div className="max-h-[60vh] overflow-auto py-2">
                  {results.length > 0 ? (
                    results.map(app => (
                      <div 
                        key={app.id}
                        className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white flex items-center"
                        onClick={() => {
                          openApp(app.id);
                          setIsOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded bg-white/20 mr-3 flex items-center justify-center font-bold">
                          {app.name[0]}
                        </div>
                        {app.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-white/50">No results found for "{query}"</div>
                  )}
                </div>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
