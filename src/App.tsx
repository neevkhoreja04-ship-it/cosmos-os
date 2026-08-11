import React from 'react';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Desktop />
    </div>
  );
};

export default App;
