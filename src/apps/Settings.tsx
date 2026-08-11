import { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

export default function Settings() {
  const { 
    wallpaper, setWallpaper, 
    theme, setTheme, 
    accentColor, setAccentColor,
    dockSize, setDockSize,
    dockAutohide, setDockAutohide
  } = useSettingsStore();
  const [newUrl, setNewUrl] = useState('');

  const wallpapers = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2564&auto=format&fit=crop'
  ];

  const accentColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="p-6 text-white h-full overflow-auto space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <section>
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-32">Theme</span>
          <div className="flex bg-white/10 rounded-lg p-1">
            <button 
              className={`px-4 py-1 rounded-md text-sm transition-colors ${theme === 'light' ? 'bg-white text-black' : 'hover:bg-white/10'}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button 
              className={`px-4 py-1 rounded-md text-sm transition-colors ${theme === 'dark' ? 'bg-black text-white' : 'hover:bg-white/10'}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="w-32">Accent Color</span>
          <div className="flex gap-2">
            {accentColors.map(color => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${accentColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: color }}
                onClick={() => setAccentColor(color)}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Dock</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-32">Size</span>
          <input 
            type="range" 
            min="40" 
            max="80" 
            value={dockSize}
            onChange={(e) => setDockSize(Number(e.target.value))}
            className="flex-1 accent-blue-500"
          />
          <span className="text-sm text-white/50 w-8">{dockSize}px</span>
        </div>
        
        <label className="flex items-center gap-4 cursor-pointer">
          <span className="w-32">Auto-hide</span>
          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${dockAutohide ? 'bg-blue-500' : 'bg-white/20'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${dockAutohide ? 'translate-x-6' : ''}`} />
          </div>
          <input 
            type="checkbox" 
            checked={dockAutohide}
            onChange={(e) => setDockAutohide(e.target.checked)}
            className="hidden"
          />
        </label>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Wallpaper</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {wallpapers.map((url, i) => (
            <button 
              key={i} 
              onClick={() => setWallpaper(url)}
              className={`h-24 rounded-lg bg-cover bg-center border-2 transition-all ${wallpaper === url ? 'border-blue-500 scale-105' : 'border-transparent hover:scale-105'}`}
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Custom Image URL..." 
            className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button 
            onClick={() => { if (newUrl) setWallpaper(newUrl); }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </section>
    </div>
  );
}