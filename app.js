var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Array donde se almacenan los mensajes
var messages = [];

// Función para guardar los mensajes de chat
var storeMessages = function (userName, data) {

    messages.push({ userName: userName, data: data });
    if (messages.length > 10) {
        // El array almacena los 10 últimos mensajes
        messages.shift();
    }
};

io.on('connection', function (client) {
    console.log('Cliente conectado...');

    // Emite el evento 'newConnection' en el cliente(navegador)
    client.emit('newConnection', { welcomeMessage: 'Bienvenido al chat.' });

    // Escucha el evento de unirse al chat    
    client.on('join', function (userName) {
        console.log(userName + ' se ha unido al chat.');

        client.userName = userName;

        // Se muestran los últimos mensajes al nuevo usuario de la sala de chat
        messages.forEach(function (message) {
            client.emit('message', message.userName + ': ' + message.data);
        });

    });

    // Escucha el evento 'message'
    client.on('message', function (data) {
        // Se almacena el nuevo mensaje
        storeMessages(client.userName, data);

        // Broadcast del mensaje
        client.broadcast.emit('message', client.userName + ': ' + data);

        // Se envía el mismo mensaje a nuestro cliente
        client.emit('message', client.userName + ': ' + data);
    });
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(8080);