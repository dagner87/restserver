



const socketsController =  (socket) => {
    
    console.log('Cliente conectado',socket.id);

    socket.on('disconnect', () => {
       console.log('Cliente Desconectado',socket.id);
    });

 }

module.exports = {
    socketsController
}