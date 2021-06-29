const app = require('express')();
require('dotenv').config();
const http = require('http');
const io = require('socket.io')(http);

const server = http.createServer(app);

app.get('/', (req, res)=> {
    res.send('<h1>Welcome to Realtime dashboard server</h1>');
});

server.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${port.env.PORT}`);
});

io.on('connection', (socket) =>{
    console.log(`Client(${socket.id}) connected`);
    dashboardUpdate(socket);
});

function dashboardUpdate(socket) {
    socket.emit('dashboardupdate', Array.from({length: 8}, ()=> Math.floor(Math.random() * 90)));

    setTimeout(() =>{
        dashboardUpdate(socket);
    }, process.env.SOCKET_PORT);
}