const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http').Server(app);


app.set('view engine', 'ejs'); // Set View Engine
app.use(express.static(__dirname + '/public')); // Set Public Folder

app.get('/', (req, res) => {
    res.render('index');
});

// Socket Setup
const io = socket(http);

io.on('connection', socket => {
    console.log(`A new user connected, Online users: ${socket.conn.server.clientsCount}`);
    
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected, Online users: ${socket.conn.server.clientsCount}`);
    });
});

http.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});