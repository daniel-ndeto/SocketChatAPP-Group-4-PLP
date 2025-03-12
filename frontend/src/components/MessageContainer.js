import React from 'react';

const MessageContainer = ({ messages, currentUser }) => {
  return (
    <div className="message-container overflow-y-auto h-full p-4">
      {messages.map((msg) => {
        const isMine = msg.sender?.username === currentUser?.username;
        return (
          <div
            key={msg._id}
            className={`flex my-2 ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md p-2 rounded ${
                isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              <div className="font-bold mb-1">
                {msg.sender?.username || 'Unknown'}:
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;
