import React, { useEffect, useState } from 'react';
import socket from '../socket';

const NotificationsSystem = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    // Handler for incoming notifications
    const handleNotification = (notification) => {

      setNotifications((prev) => [...prev, notification]);
      
      // Remove the notification after 3 seconds
      setTimeout(() => {

        setNotifications((prev) => prev.filter((n) => n !== notification));
      }, 3000);
    };

    socket.on('notification', handleNotification);

    return () => {

      socket.off('notification', handleNotification);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((note, idx) => (

        <div key={idx} className="bg-green-500 text-white p-2 rounded shadow">
          {note}
        </div>
      ))}
      
    </div>
  );
};

export default NotificationsSystem;
