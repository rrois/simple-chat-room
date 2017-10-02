$(function () {
    var socket = io.connect('http://localhost:8080');

    // Se escucha el evento de conexión
    socket.on('newConnection', function (data) {
        // Se muestra el mensaje de bienvenida al chat
        $("#welcomeMessage").text(data.welcomeMessage);

        // Se solicita un nombre de usuario
        var userName = prompt("Introduce tu nombre de usuario:");

        // Se emite el evento de unirse a la sala de chat
        socket.emit('join', userName);
    });

    // Se escucha un nuevo mensaje
    socket.on('message', function (data) {
        $("#messageChat").append('<li>' + data + '</li>');
    });

    // Se escucha la unión del nuevo usuario
    socket.on('userJoin', function (userName) {
        var chatUser = $("<li data-name='" + userName + "'>" + userName + '</li>');
        $("#chatUsers").append(chatUser);
    });

    // Se escucha la desconexión del usuario
    socket.on('disconnectedUser', function (userName) {
        $("#chatUsers li[data-name=" + userName + "]").remove();
    });

    $("#sendMessage").submit(function (event) {
        // Previene el comportamiento del formulario
        event.preventDefault();

        // Se recupera el mensaje y se emite el evento
        var message = $("#message").val();
        socket.emit('message', message);
        $("#message").val('');
    });
});
