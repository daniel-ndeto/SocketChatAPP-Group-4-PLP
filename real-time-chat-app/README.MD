# Real-Time Chat App

A full-stack real-time chat application that allows users to register, log in, join chat rooms (including group chats), and communicate instantly with others. The app features real-time messaging, typing indicators, and notifications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

Real-Time Chat App is a MERN (MongoDB, Express, React, Node.js) stack application enhanced with Socket.io for real-time functionality. Users can create accounts, log in, and chat with other users in real time. They can also create or join different chat rooms (group chats), view real-time notifications, and see when others are typing.

## Features

- **User Authentication:** Register and log in using a username and password.
- **Real-Time Messaging:** Send and receive messages instantly with Socket.io.
- **Chat Rooms:** Join or create chat rooms for group conversations.
- **Typing Indicators:** See when other users are typing.
- **Notifications:** Receive toast notifications for events like users joining/leaving.
- **Responsive UI:** Modern interface built with React and styled with Tailwind CSS and SCSS.
- **Login Persistence:** Remembers logged-in users via localStorage.

## Directory Structure

real-time-chat-app/ ├── backend/ │ ├── .env │ ├── package.json │ ├── server.js │ ├── config/ │ │ └── db.js │ ├── models/ │ │ ├── User.js │ │ ├── Message.js │ │ └── ChatRoom.js │ ├── routes/ │ │ ├── auth.js │ │ ├── messageHistory.js │ │ └── rooms.js │ ├── socket/ │ │ ├── authSocket.js │ │ ├── messagingSocket.js │ │ ├── roomSocket.js │ │ ├── typingSocket.js │ │ ├── notificationSocket.js │ │ ├── statusSocket.js │ │ └── readReceiptSocket.js │ └── middleware/ │ └── errorHandler.js └── frontend/ ├── package.json ├── tailwind.config.js ├── postcss.config.js ├── public/ │ └── index.html └── src/ ├── index.js ├── index.css ├── App.js ├── socket.js ├── components/ │ ├── AuthForm.js │ ├── ChatWindow.js │ ├── ConnectionStatus.js │ ├── Header.js │ ├── MessageHistory.js │ ├── MessageContainer.js │ ├── RoomSelector.js │ ├── TypingIndicator.js │ ├── Notifications.js │ └── NotificationsSystem.js └── styles/ └── Responsive.scss

## user 1

![user1](image-1.png)

## user2

![user2](image.png)

## real time messaging

![real-time message delivery](image-2.png)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (local or remote)

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd real-time-chat-app/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory with the following (update values as needed):

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Backend Server:**

   For development (using nodemon):

   ```bash
   npm run dev
   ```

   Or in production:

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd real-time-chat-app/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Initialize Tailwind CSS (if not already done):**

   ```bash
   npx tailwindcss init -p
   ```

4. **Start the Frontend Server:**

   ```bash
   npm start
   ```

## Usage

1. **Open your browser and navigate to:**  
   [http://localhost:3000](http://localhost:3000)

2. **Authentication:**  
   - Register or log in using the **AuthForm**.
   - Upon successful authentication, the token and user data are saved to localStorage for persistent login.

3. **Chatting:**  
   - Once logged in, select or create a chat room using the **RoomSelector**.
   - Use the **ChatWindow** to send messages in real time.
   - Messages display with your own messages aligned on one side and incoming messages on the other.
   - See typing indicators and notifications as events occur.

## Technologies Used

- **Backend:**
  - Node.js
  - Express
  - Socket.io
  - Mongoose (MongoDB)
  - JSON Web Tokens (JWT) for authentication
- **Frontend:**
  - React
  - Tailwind CSS & SCSS
  - Axios
  - Socket.io-client

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- This project was inspired by various online tutorials on real-time chat applications.
- Thanks to the open-source community for providing robust libraries and tools that make this project possible.
```