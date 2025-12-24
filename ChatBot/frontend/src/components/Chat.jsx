import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export default function Chat() {
  const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text}
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect socket
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('ai-message-response', ({ response, error }) => {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: error ? `Error: ${error}` : response },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }]);
    socketRef.current.emit('ai-message', { prompt: input });
    setInput('');
  }

  return (
    <div className="chat-container">
      <div className="chat-top">
        <div className="status">Status: {connected ? 'Connected' : 'Disconnected'}</div>
      </div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="composer" onSubmit={handleSend}>
        <input
          className="composer-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="composer-send" type="submit">Send</button>
      </form>
    </div>
  );
}
