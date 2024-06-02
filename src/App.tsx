// src/App.tsx
import React from 'react';
import './App.css';

const App: React.FC = () => {
  const handleLogin = () => {
    chrome.runtime.sendMessage({ type: 'LOGIN_WITH_GOOGLE' });
  };

  return (
    <div>
      <h1>My Chrome Extension</h1>
      <button onClick={handleLogin}>Sign In with Google</button>
    </div>
  );
};

export default App;