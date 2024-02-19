const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const session = require('express-session');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


const sessionMiddleware = session({
    secret: 'catsarecool',
    resave: true,
    saveUninitialized: true,
    cookie: {
        name: 'io',
        path: '/',
        signed: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
});

function setAppSession (req, res, next) {
    app.set('configSession', req.session);
    app.set('configSessionID', req.sessionID);
    
    next();
}

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(morgan('dev'));

io.engine.use(sessionMiddleware);
io.engine.use(cookieParser());
io.engine.use(cors());
io.engine.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);
app.set('io', io);

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

io.use((socket, next) => {
    const sessionExist = app.get('configSession');
    if(sessionExist === undefined) {
        return next(new Error('Session not found'));
    }
    next();
})

io.on('connect', (socket) => {
    console.log(colors.cyan('User connected'));

    socket.use((___, next) => {
        socket.data = app.get('configSession').data;
        next();
    })

    socket.on('show-data', () => {
        console.log(socket.data);
        socket.emit('show-data', socket.data);
    })

    socket.on('disconnect', () => {
        console.log(colors.cyan('User disconnected'));
    })
})

module.exports = { app, httpServer, io };

