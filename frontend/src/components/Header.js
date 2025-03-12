import React from 'react';
const Header = ({ user }) => (
  
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl">Real-Time Chat App</h1>
    { user && <div>Welcome, {user.username}</div> }
  </header>
);

export default Header;
