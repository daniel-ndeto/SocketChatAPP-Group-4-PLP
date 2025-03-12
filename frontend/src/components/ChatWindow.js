import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';
import MessageHistory from './MessageHistory';
import TypingIndicator from './TypingIndicator';
import Notifications from './Notifications';

const ChatWindow = ({ user, roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Only proceed if roomId is defined
    if (!roomId) return;

    // Join the selected room
    socket.emit('joinRoom', roomId);
    // Notify others that this user has joined the room
    socket.emit('joinedRoom', { roomId, username: user.username });

    // Fetch existing messages for the room
    axios.get(`http://localhost:5000/api/messages/${roomId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Define a handler for new messages
    const handleNewMessage = (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    // Listen for new messages from the server
    socket.on('newMessage', handleNewMessage);

    // Clean up the listener and notify room that user left on unmount or room change
    return () => {
      socket.emit('leftRoom', { roomId, username: user.username });
      socket.off('newMessage', handleNewMessage);
    };
  }, [roomId, user.username]);

  // Function to send a new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', {
        chatRoom: roomId,
        content: message
      });
      setMessage('');
    }
  };

  // Handle typing event using onKeyDown for modern compatibility
  const handleTyping = () => {
    socket.emit('typing', {
      roomId,
      username: user.username
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      {/* Notification toasts */}
      <Notifications />

      {/* Chat messages display */}
      <MessageHistory messages={messages} currentUser={user} />

      {/* Typing indicator */}
      <TypingIndicator currentRoom={roomId} />

      {/* Message input form */}
      <form onSubmit={sendMessage} className="mt-4 flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
