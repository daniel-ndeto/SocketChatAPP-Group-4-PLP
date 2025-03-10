const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');

// Connecting to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', require('./routes/messageHistory'));
app.use('/api/rooms', require('./routes/rooms'));

//HTTP server and initializing Socket.io
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

//Authenticating socket connections
io.use(require('./socket/authSocket').authenticateSocket);

//Setting up socket events
io.on('connection', (socket) => {

  console.log('New client connected', socket.id);

  //socket functionalities
  require('./socket/messagingSocket')(io, socket);
  require('./socket/roomSocket')(io, socket);
  require('./socket/typingSocket')(io, socket);
  require('./socket/notificationSocket')(io, socket);
  require('./socket/statusSocket')(io, socket);
  require('./socket/readReceiptSocket')(io, socket);

  socket.on('disconnect', () => {

    console.log('Client disconnected', socket.id);
  });
});

//Error handling
app.use(errorHandler);

//Starting server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
