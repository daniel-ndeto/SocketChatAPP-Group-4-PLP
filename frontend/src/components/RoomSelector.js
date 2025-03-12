import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const RoomSelector = ({ currentRoom, setCurrentRoom }) => {

  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    // Fetching available chat rooms
    axios.get('http://localhost:5000/api/rooms')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));

    // Listening for a newly created room broadcast
    socket.on('newRoom', (room) => {
      setRooms((prevRooms) => [room, ...prevRooms]);
    });

    return () => {
      socket.off('newRoom');
    };
  }, []);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {

      // Emitting an event to create a new room
      socket.emit('createRoom', { name: newRoomName });
      setNewRoomName('');
    }
  };

  return (
    <div className="w-64 bg-white shadow p-4">

      <h2 className="text-lg mb-4">Chat Rooms</h2>

      <ul>
        {rooms.map((room) => (

          <li
            key={room._id}
            className={`p-2 cursor-pointer ${currentRoom === room._id ? 'bg-blue-100' : ''}`}
            onClick={() => setCurrentRoom(room._id)}
          >
            {room.name}
          </li>
        ))}

      </ul>
      <div className="mt-4">

        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name"
          className="p-2 border rounded w-full"
        />
        
        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-500 text-white p-2 rounded mt-2"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default RoomSelector;
