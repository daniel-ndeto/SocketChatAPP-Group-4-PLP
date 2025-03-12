import React, { useEffect, useState } from 'react';
import socket from '../socket';

const TypingIndicator = ({ currentRoom }) => {
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    // Listen to "typing" events from the server
    socket.on('typing', (data) => {
      // Only display if data includes a valid username
      if (data.username && data.username.length > 0) {
        setTypingUser(data.username);

        // Clear the indicator after 2 seconds
        setTimeout(() => {
          setTypingUser(null);
        }, 2000);
      }
    });

    return () => {
      socket.off('typing');
    };
  }, [currentRoom]);

  if (!typingUser) return null;

  return (
    <div className="text-gray-600 mb-2">
      {typingUser} is typing...
    </div>
  );
};

export default TypingIndicator;
