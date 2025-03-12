import React, { useEffect } from 'react';

const MessageHistory = ({ messages, currentUser }) => {

  useEffect(() => {

    console.log("Current user:", currentUser?.username);
  }, [currentUser]);

  return (

    <div className="overflow-y-auto h-64 border p-4 mb-4">
      {messages.map((msg) => {

        const senderUsername = msg.sender?.username || 'Unknown';
        const currentUsername = currentUser?.username || 'NoUser';

        // "isMine" is true if the message was sent by the current user
        const isMine = senderUsername === currentUsername;

        // Debug logging to verify username comparisons
        console.log(
          `Message from "${senderUsername}" vs Current user "${currentUsername}" => isMine: ${isMine}`
        );

        return (

          <div
            key={msg._id}
            className={`flex mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}
          >

            <div
              className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                isMine
                  ? 'bg-gray-200 text-black'  // Outgoing messages (mine) on left with light background
                  : 'bg-blue-500 text-white'   // Incoming messages (others) on right with blue background
              }`}
            >

              <strong>{senderUsername}:</strong> {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageHistory;
