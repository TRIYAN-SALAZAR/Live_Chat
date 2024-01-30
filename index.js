
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoDB = require('./databases/conectMongoDB');
const postgretSQL = require('./databases/conectPostgretSQL');

const app = express();
const server = http.createServer(app);
const webSocket = socketIO(server);

const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));

app.listen(3000, () => {
    console.log('listening on *:3000');
});