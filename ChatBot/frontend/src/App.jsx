import React from 'react';
import Chat from './components/Chat';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">ChatBot</header>
      <main className="app-main">
        <Chat />
      </main>
    </div>
  );
}
