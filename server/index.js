// Express package.
var express = require('express');
// Express call.
var app = express();
// Http Server with app.
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

var messages = [{
    text: 'Welcome to the chatroom.',
    nickname: 'System'
}]

// Abrir conexión al socket
io.on('connection', (socket)=>{
    console.log("Client " + socket.handshake.address + " has connected.")
    // Emitimos desde el servidor a todos los clientes el message.
    socket.emit('messages', messages)
    
    // Recojo add-message para recibir mensajes.
    socket.on('add-message', function(data){
        messages.push(data);
        // Vuelvo a emitir todos los messages actualizados.
        io.sockets.emit('messages', messages)
    })
})

// Creamos server de Express
server.listen(6677, function(){
    console.log("The server is running at http://localhost:6677")
});