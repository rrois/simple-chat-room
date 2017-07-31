var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
    console.log('Client connected...');

    // Emite el evento 'newConnection' en el cliente(navegador)
    client.emit('newConnection', { welcomeMessage: 'Bienvenido al chat.' });

    // Escucha el evento de unirse al chat    
    client.on('join', function (userName) {
        client.userName = userName;
    });

    // Escucha el evento 'message'
    client.on('message', function (data) {
        // Broadcast del mensaje
        client.broadcast.emit('message', client.userName + ': ' + data);

        // Se envía el mismo mensaje a nuestro cliente
        client.emit('message', client.userName + ': ' + data);

        console.log(client.userName + ': ' + data);
    });
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(8080);