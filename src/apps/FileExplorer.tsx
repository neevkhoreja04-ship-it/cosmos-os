import { useState } from 'react';
import { Folder, File, ChevronRight, LayoutGrid, List, Search } from 'lucide-react';

type FileNode = { id: string; name: string; type: 'file' | 'folder'; children?: FileNode[]; size?: string; date?: string };

const mockFileSystem: FileNode = {
  id: 'root',
  name: 'Home',
  type: 'folder',
  children: [
    {
      id: 'desktop',
      name: 'Desktop',
      type: 'folder',
      children: [
        { id: 'notes.txt', name: 'Notes.txt', type: 'file', size: '12 KB', date: 'Today, 10:23 AM' },
        { id: 'ideas.md', name: 'Ideas.md', type: 'file', size: '4 KB', date: 'Yesterday' }
      ]
    },
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'resume.pdf', name: 'Resume.pdf', type: 'file', size: '1.2 MB', date: 'Aug 10' },
        { id: 'budget.xlsx', name: 'Budget.xlsx', type: 'file', size: '45 KB', date: 'Aug 05' }
      ]
    },
    {
      id: 'downloads',
      name: 'Downloads',
      type: 'folder',
      children: [
        { id: 'installer.exe', name: 'installer.exe', type: 'file', size: '120 MB', date: 'Aug 11' }
      ]
    }
  ]
};

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState<FileNode[]>([mockFileSystem]);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const currentFolder = currentPath[currentPath.length - 1];

  const navigateTo = (folder: FileNode) => {
    if (folder.type === 'folder') {
      setCurrentPath([...currentPath, folder]);
    }
  };

  const navigateUpTo = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const sidebarLocations = [
    { name: 'Home', node: mockFileSystem, icon: <Folder size={16} /> },
    { name: 'Desktop', node: mockFileSystem.children![0], icon: <Folder size={16} /> },
    { name: 'Documents', node: mockFileSystem.children![1], icon: <Folder size={16} /> },
    { name: 'Downloads', node: mockFileSystem.children![2], icon: <Folder size={16} /> },
  ];

  return (
    <div className="flex h-full text-white bg-black/20 text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-black/40 border-r border-white/10 p-2 space-y-1">
        <div className="text-xs font-semibold text-white/50 px-2 py-1 uppercase tracking-wider mb-2">Favorites</div>
        {sidebarLocations.map((loc, i) => (
          <button 
            key={i}
            onClick={() => {
              // Reconstruct path
              if (loc.node.id === 'root') setCurrentPath([mockFileSystem]);
              else setCurrentPath([mockFileSystem, loc.node]);
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors ${currentFolder.id === loc.node.id ? 'bg-white/15' : ''}`}
          >
            {loc.icon}
            <span>{loc.name}</span>
          </button>
        ))}
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-black/20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 overflow-hidden">
            {currentPath.map((node, i) => (
              <div key={node.id} className="flex items-center gap-1 shrink-0">
                <button 
                  onClick={() => navigateUpTo(i)}
                  className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  {node.name}
                </button>
                {i < currentPath.length - 1 && <ChevronRight size={14} className="text-white/40" />}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex bg-black/40 rounded-md border border-white/10 overflow-hidden">
              <button 
                onClick={() => setView('grid')}
                className={`p-1.5 ${view === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-1.5 ${view === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <List size={14} />
              </button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-2 top-1.5 text-white/40" />
              <input 
                type="text"
                placeholder="Search"
                className="w-48 bg-black/40 border border-white/10 rounded-md py-1 pl-7 pr-3 focus:outline-none focus:border-blue-500 transition-colors text-xs"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {currentFolder.children?.map(child => (
                <button 
                  key={child.id}
                  onDoubleClick={() => navigateTo(child)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group focus:bg-white/20 outline-none"
                >
                  {child.type === 'folder' ? (
                    <Folder size={48} className="text-blue-400 group-hover:scale-105 transition-transform" />
                  ) : (
                    <File size={48} className="text-gray-300 group-hover:scale-105 transition-transform" />
                  )}
                  <span className="text-xs text-center break-words w-full truncate">{child.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex border-b border-white/10 pb-2 mb-2 text-xs font-semibold text-white/50 px-2">
                <div className="flex-1">Name</div>
                <div className="w-32">Date Modified</div>
                <div className="w-24">Size</div>
              </div>
              {currentFolder.children?.map(child => (
                <button 
                  key={child.id}
                  onDoubleClick={() => navigateTo(child)}
                  className="flex items-center px-2 py-1.5 rounded hover:bg-white/10 transition-colors text-left focus:bg-white/20 outline-none"
                >
                  <div className="flex-1 flex items-center gap-2">
                    {child.type === 'folder' ? <Folder size={16} className="text-blue-400" /> : <File size={16} className="text-gray-300" />}
                    <span>{child.name}</span>
                  </div>
                  <div className="w-32 text-white/50 text-xs">{child.date || '--'}</div>
                  <div className="w-24 text-white/50 text-xs">{child.size || '--'}</div>
                </button>
              ))}
            </div>
          )}
          {(!currentFolder.children || currentFolder.children.length === 0) && (
            <div className="h-full flex items-center justify-center text-white/30">
              This folder is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}