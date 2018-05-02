const socket = io();

// Getting DOM Elements
const $output = $('#output');
const $username = $('#username');
const $message = $('#message');
const $send = $('#send');

$send.on('click', function() {
    socket.emit('chat', {
        message: $message.val(),
        username: $username.val()
    });
});

socket.on('chat', function(data) {
    document.getElementById('output').innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});