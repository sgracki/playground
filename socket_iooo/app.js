const express = require('express');
var app = express();
var http = require('http').Server(app);
const port = process.env.PORT || 3000;

var io = require('socket.io')(http, {
    cookie: false,
    pingTimeout: 5000
})

io.sockets.on('connection', (socket) => {
    socket.on('myEventName', (data) => {
        io.sockets.emit('myEventName-super', data);
    })
})

app.use('/', express.static('./'));

http.listen(port, () => console.log(`Express server listening on port ${port}`));