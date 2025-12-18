module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté au chat");

    socket.on("disconnect", () => {
      console.log("Utilisateur déconnecté");
    });

    socket.on("message:send", (data) => {
        data.timestamp = Date.now()
      io.emit("message:received", data);
    });
  });
};
