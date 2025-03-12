import React from 'react';
const RoomSwitcher = ({ rooms, currentRoom, setCurrentRoom }) => {
  return (
    
    <div className="flex space-x-4 p-4">
      {rooms.map((room) => (
        <button key={room.id}
                className={`p-2 ${currentRoom === room.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setCurrentRoom(room.id)}>
          {room.name}
        </button>
      ))}
    </div>
  );
};

export default RoomSwitcher;
