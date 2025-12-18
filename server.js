const app = require('./app'); // Import de ton fichier app.js
const http = require('http');
const { Server } = require('socket.io');

// 1. On crée le serveur HTTP en lui passant l'application Express
const server = http.createServer(app);

// 2. On initialise Socket.io sur ce serveur
const io = new Server(server, {
  cors: {
    origin: "*", // Ajuste selon tes besoins
    methods: ["GET", "POST"]
  }
});

// 3. Logique de Socket.io (Le "Reverb" version Node)
io.on('connection', (socket) => {
  console.log('Utilisateur connecté:', socket.id);

  // Exemple : rejoindre une "Room" (équivalent PrivateChannel dans Laravel)
  socket.on('join_chat', (roomId) => {
    socket.join(`room_${roomId}`);
    console.log(`Socket ${socket.id} a rejoint la room ${roomId}`);
  });

  // Écouter un message
  socket.on('send_message', (data) => {
    // Diffuser à tout le monde dans la room
    io.to(`room_${data.roomId}`).emit('new_message', {
      user: data.user,
      message: data.message,
      date: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

// 4. On lance le serveur sur le port de ton choix
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});