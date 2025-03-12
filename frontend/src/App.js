import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import ConnectionStatus from './components/ConnectionStatus';
import RoomSelector from './components/RoomSelector';

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('defaultRoom');

  // On initial load, check if a token and user data are saved in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <ConnectionStatus />
      {!user ? (
        <AuthForm setUser={setUser} />
      ) : (
        <div className="flex">
          <RoomSelector currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
          <ChatWindow user={user} roomId={currentRoom} />
        </div>
      )}
    </div>
  );
}

export default App;
