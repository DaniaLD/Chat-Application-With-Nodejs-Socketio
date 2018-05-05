const socket = io();

// Getting DOM Elements
const $output = document.getElementById('output');
const $username = document.getElementById('username');
const $message = document.getElementById('message');
const $send = document.getElementById('send');
const $feedback = document.getElementById('feedback');

// Sending Messages
$send.addEventListener('click', function() {
    socket.emit('chat', {
        message: $message.value,
        username: $username.value
    });

    $message.value = '';
});

socket.on('chat', function(data) {
    $feedback.innerHTML = '';
    $output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

// Broadcasting isTyping Message
$message.addEventListener('keypress', function() {
    socket.emit('typing', $username.value);
});

socket.on('typing', function(data) {
    $feedback.innerHTML = '<p><strong><em>' + data + '</em></strong> is typing ...</p>';
});