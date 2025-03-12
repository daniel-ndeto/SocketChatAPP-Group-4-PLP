import React, { useEffect, useState } from 'react';
import socket from '../socket';
const ConnectionStatus = () => {

  const [status, setStatus] = useState(socket.connected);

  useEffect(() => {

    socket.on('connect', () => setStatus(true));

    socket.on('disconnect', () => setStatus(false));

    return () => {
      socket.off('connect');
      
      socket.off('disconnect');
    };
  }, []);

  return (
    
    <div className="text-center p-2">
      Connection: {status ? <span className="text-green-500">Online</span> : <span className="text-red-500">Offline</span>}
    </div>
  );
};

export default ConnectionStatus;

