
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var port = normalizePort(process.env.PORT || '3000');

app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log(`Client(${socket.id}) connected`);
    dashboardUpdate(socket);
  });
  

server.listen(port, () => {
    console.log(`Server started at port:${process.env.PORT}`);
});

function dashboardUpdate(socket) {
    socket.emit('dashboardupdate', Array.from({length: 5}, ()=> Math.floor(Math.random() * 90)));

    setTimeout(() =>{
        dashboardUpdate(socket);
    }, 10000);
}

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }