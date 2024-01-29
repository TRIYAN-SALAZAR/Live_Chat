
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const connectToDB = require('./database-connect');

const app = express();
const server = http.createServer(app);
const webSocket = socketIO(server);

connectToDB();

app.use(cors());

app.listen(3000, () => {
    console.log('listening on *:3000');
});