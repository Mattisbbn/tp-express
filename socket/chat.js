module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('Un utilisateur est connecté au chat');

        socket.on('disconnect', () => {
            console.log('Utilisateur déconnecté');
        });

        socket.on('message:send', (data) => {
    // 1. (Optionnel) Enregistrer en base de données ici
    // 2. Diffuser à tout le monde
    io.emit('message:received', data);
});
        

    });
};