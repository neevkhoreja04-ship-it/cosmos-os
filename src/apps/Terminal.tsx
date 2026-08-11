import { useState, useRef, useEffect } from 'react';

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = 'Available commands: help, clear, about, whoami, version, projects, skills, neofetch, quest it tech, quest it content, quest it design, quest it events';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'about':
        output = 'Cosmos OS is a web-based operating system simulation built with React and TailwindCSS.';
        break;
      case 'whoami':
        output = 'guest_user';
        break;
      case 'version':
        output = 'Cosmos OS v1.0.0';
        break;
      case 'projects':
        output = 'Projects: 1. Web Desktop OS, 2. AI Chatbot, 3. Custom Physics Engine';
        break;
      case 'skills':
        output = 'Skills: React, TypeScript, Node.js, WebGL, UI/UX Design';
        break;
      case 'neofetch':
        output = (
          <div className="flex gap-4">
            <div className="text-blue-500 font-mono whitespace-pre">
              {`
   .---.
  /     \\
  \\     /
   '---'
            `}
            </div>
            <div>
              <div className="text-blue-400 font-bold">guest@cosmos-os</div>
              <div>-----------------</div>
              <div><span className="text-blue-400">OS</span>: Cosmos OS 1.0</div>
              <div><span className="text-blue-400">Host</span>: Web Browser</div>
              <div><span className="text-blue-400">Kernel</span>: React 18</div>
              <div><span className="text-blue-400">Uptime</span>: Just booted</div>
              <div><span className="text-blue-400">Packages</span>: npm (90)</div>
              <div><span className="text-blue-400">Shell</span>: cosmos-sh</div>
              <div><span className="text-blue-400">Resolution</span>: {window.innerWidth}x{window.innerHeight}</div>
            </div>
          </div>
        );
        break;
      case 'quest it tech':
        output = 'Quest IT Tech: Next-gen software engineering and infrastructure solutions.';
        break;
      case 'quest it content':
        output = 'Quest IT Content: Masterclasses on digital marketing and content creation.';
        break;
      case 'quest it design':
        output = 'Quest IT Design: UI/UX principles for crafting stunning visual experiences.';
        break;
      case 'quest it events':
        output = 'Quest IT Events: Upcoming hackathons, workshops, and tech conferences.';
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...history, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="h-full bg-black/90 font-mono text-sm p-4 overflow-auto flex flex-col text-green-500">
      <div className="mb-4">
        <div>Welcome to Cosmos OS Terminal.</div>
        <div>Type 'help' to see a list of available commands.</div>
      </div>
      
      <div className="flex-1 space-y-2">
        {history.map((entry, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">guest@cosmos-os</span>
              <span className="text-white">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-white">{entry.command}</span>
            </div>
            <div className="mt-1 text-green-300">{entry.output}</div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-blue-400 shrink-0">guest@cosmos-os</span>
          <span className="text-white shrink-0">~</span>
          <span className="text-gray-400 shrink-0">$</span>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 m-0"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}