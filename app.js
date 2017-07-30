var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io  = require('socket.io')(server);

io.on('connection', function(client){
    console.log('Client connected...');

    // Emite el evento 'newConnection' en el cliente(navegador)
    client.emit('newConnection', {welcomeMessage: 'Te has unido al chat.'});
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(8080);