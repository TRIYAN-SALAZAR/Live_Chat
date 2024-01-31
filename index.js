
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const cors = require('cors');
const mongoDB = require('./src/databases/conectToMongoDB');
const postgretSQL = require('./src/databases/conectToPostgretSQL');

const dotenv = require('dotenv');

const app = express();
const server = http.createServer(app);
const webSocket = socketIO(server);

const morgan = require('morgan');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

mongoDB();
postgretSQL();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('listening on port: ' + app.get('port'));
});