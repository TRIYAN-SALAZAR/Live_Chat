const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const express = require('express');
const MongoStore = require('connect-mongo');
const { createServer } = require('http');
const { Server } = require('socket.io');
const session = require('express-session');

dotenv.config();

const app = express();
const httpServer = createServer(app);


const sessionMiddlewareDev = session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/',
        dbName: 'chats-messages',
        collectionName: 'sessions'
    }),
    secret: 'catsarecool',
    resave: true,
    saveUninitialized: false,
    cookie: {
        path: '/',
        signed: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60
    },
});

app.use(express.json());
app.use(cors());
app.use(sessionMiddlewareDev);
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

const Login = require('./Routes/logIn');
const SignIn = require('./Routes/signIn');
const LogOut = require('./Routes/logOut');
const Profile = require('./Routes/profile');
const Chats = require('./Routes/chats');


app.use('/signin', SignIn);
app.use('/login', Login);
app.use('/chats', Chats);
app.use('/profile', Profile);
app.use('/logout', LogOut);

const appWS = new Server(httpServer, {
    cookie: {
        path: '/',
        signed: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60
    }
});

const isValidAuth = require('./middlewares/socket.io/isValidAuth');

appWS.engine.use(morgan('dev'));
appWS.engine.use(sessionMiddlewareDev);
appWS.engine.use(cors());

const modeDev = require('./Socket_Controller/dev');
const chat = require('./Socket_Controller/chats');

const connectModeDev = (socket) => modeDev(socket, appWS, app);
const socketChats = (socket) => chat(socket, appWS);

appWS.of('/dev').use(isValidAuth);
appWS.of('/chat').use(isValidAuth);

appWS.of('/chat').use((socket, next) => {
    const chat = socket.handshake.query.chat;

    if (chat !== undefined) {
        socket.join(chat);
        next();
    }
    else {
        next();
    }
});

appWS.of('/chat').on('connect', socketChats);
appWS.of('/dev').on('connect', connectModeDev);

appWS.emit('message', 'Hello user from Socket.io');

module.exports = { app, httpServer };