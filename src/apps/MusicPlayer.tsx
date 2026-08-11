import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, Upload } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  url: string;
}

export default function MusicPlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    if (isShuffle) {
      let next = Math.floor(Math.random() * playlist.length);
      while (next === currentTrackIndex && playlist.length > 1) {
        next = Math.floor(Math.random() * playlist.length);
      }
      setCurrentTrackIndex(next);
    } else {
      setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
    }
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((currentTrackIndex - 1 + playlist.length) % playlist.length);
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newTracks: Track[] = Array.from(files).map(f => ({
        id: Math.random().toString(),
        name: f.name,
        url: URL.createObjectURL(f)
      }));
      setPlaylist(prev => [...prev, ...newTracks]);
      if (playlist.length === 0) {
        setCurrentTrackIndex(0);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex h-full bg-black/60 text-white backdrop-blur-md">
      {/* Sidebar - Playlist */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black/40">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold">Playlist</h2>
          <button onClick={() => fileInputRef.current?.click()} className="p-1 hover:bg-white/10 rounded transition-colors">
            <Upload size={16} />
          </button>
          <input type="file" accept="audio/*,video/mp4" multiple ref={fileInputRef} onChange={handleUpload} className="hidden" />
        </div>
        <div className="flex-1 overflow-auto p-2">
          {playlist.length === 0 ? (
            <div className="text-center text-white/50 text-sm mt-10 px-4">
              Upload MP3 or MP4 files to start playing music.
            </div>
          ) : (
            playlist.map((track, idx) => (
              <div 
                key={track.id} 
                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                className={`p-2 text-sm rounded cursor-pointer truncate transition-colors ${idx === currentTrackIndex ? 'bg-blue-600' : 'hover:bg-white/10'}`}
              >
                {track.name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <audio 
          ref={audioRef}
          src={currentTrack?.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* Rotating CD */}
        <div className="mb-12 relative w-64 h-64">
          <div className={`w-full h-full rounded-full border-4 border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)] bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
            {/* Inner CD Hole */}
            <div className="w-16 h-16 rounded-full bg-black/80 border-2 border-white/20 shadow-inner" />
          </div>
          {/* Reflection overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay pointer-events-none" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold truncate max-w-md">{currentTrack?.name || 'No Track Selected'}</h1>
          <p className="text-white/50">Local Audio</p>
        </div>

        {/* Controls */}
        <div className="w-full max-w-md space-y-6">
          {/* Progress */}
          <input 
            type="range" 
            min="0" max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <button onClick={() => setIsShuffle(!isShuffle)} className={`p-2 rounded-full transition-colors ${isShuffle ? 'text-blue-400' : 'text-white/50 hover:text-white'}`}>
              <Shuffle size={20} />
            </button>
            <div className="flex items-center gap-4">
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
                <SkipBack size={24} />
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
              </button>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
                <SkipForward size={24} />
              </button>
            </div>
            <button onClick={() => setIsRepeat(!isRepeat)} className={`p-2 rounded-full transition-colors ${isRepeat ? 'text-blue-400' : 'text-white/50 hover:text-white'}`}>
              <Repeat size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 max-w-[200px] mx-auto mt-6 text-white/50 hover:text-white transition-colors">
            <Volume2 size={16} />
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="w-full accent-white h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}