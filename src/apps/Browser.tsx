import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Search } from 'lucide-react';

export default function Browser() {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org');
  const [loading, setLoading] = useState(false);

  const navigate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputUrl) return;
    
    let target = inputUrl;
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }
    
    setLoading(true);
    setUrl(target);
    setInputUrl(target);
    
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  };

  const handleHome = () => {
    setInputUrl('https://www.wikipedia.org');
    navigate();
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Browser Toolbar */}
      <div className="h-14 bg-[#1e1e1e] border-b border-white/10 flex items-center px-4 gap-4">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-white/10 text-white/50 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-white/10 text-white/30 cursor-not-allowed transition-colors">
            <ChevronRight size={18} />
          </button>
          <button onClick={handleRefresh} className="p-1.5 rounded-md hover:bg-white/10 text-white/70 transition-colors">
            <RotateCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleHome} className="p-1.5 rounded-md hover:bg-white/10 text-white/70 transition-colors">
            <Home size={16} />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={navigate} className="flex-1 flex justify-center max-w-2xl relative">
          <div className="absolute left-3 top-2 text-white/40">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:bg-black transition-all"
            placeholder="Search or enter website name"
          />
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white">
        {loading && (
          <div className="absolute top-0 left-0 h-1 bg-blue-500 animate-pulse w-1/3 z-10" />
        )}
        {/* We use an iframe to mock the browser, fallback to a placeholder if it refuses to connect (like many sites do due to X-Frame-Options) */}
        <iframe
          src={url}
          className="w-full h-full border-none"
          title="Browser Content"
          onLoad={() => setLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
        
        {/* Mock overlay if iframe fails, but typically we just let it show the sad face or a generic Wikipedia works ok */}
      </div>
    </div>
  );
}