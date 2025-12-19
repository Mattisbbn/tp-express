module.exports = function (io) {

  const messagesHistory = []

 
  io.on("connection", (socket) => {
    socket.emit("message:history", messagesHistory);

    socket.on("disconnect", () => {
      console.log("Utilisateur déconnecté");
    });

    socket.on("message:send", (data) => {
        data.timestamp = Date.now()
        messagesHistory.push(data);
      io.emit("message:received", data);
    });
  });
};
