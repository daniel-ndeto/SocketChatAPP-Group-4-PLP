import React, { useEffect, useState } from 'react';
import socket from '../socket';

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    socket.on('notification', (notificationMsg) => {

      // Add the new notification 
      setNotifications((prev) => [...prev, notificationMsg]);

      // Removing it 
      setTimeout(() => {
        setNotifications((prev) => prev.filter((msg) => msg !== notificationMsg));
      }, 3000);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((note, index) => (
        
        <div
          key={index}
          className="bg-green-500 text-white p-2 rounded shadow"
        >
          {note}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
