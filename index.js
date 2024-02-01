
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoDB = require('./src/databases/conectToMongoDB');
const { connectToDatabase } = require('./src/databases/conectToPostgretSQL');
const dotenv = require('dotenv');

const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const Login = require('./src/Routes/login');
const Signin = require('./src/Routes/signin');
const Profile = require('./src/Routes/profile');
const Chats = require('./src/Routes/chats');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

mongoDB();
connectToDatabase();

app.set('port', process.env.PORT || 3000);

app.use('/login', Login);
app.use('/signin', Signin);
app.use('/profile', Profile);
app.use('/chats', Chats);

app.listen(app.get('port'), () => {
    console.log('listening on port: ' + app.get('port'));
});