let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let users = [];
let connections = [];

io.on('connection', (socket) => {
    console.log('Успешное соединение!')
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Отключились');
    });

    socket.on('send mess', (data) => {
        io.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});