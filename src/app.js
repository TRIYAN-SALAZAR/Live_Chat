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
app.use(express.static(path.join(__dirname, '../public')));

app.set('port', process.env.PORT || 3000);

const Login = require('./Routes/logIn');
const SignIn = require('./Routes/signIn');
const LogOut = require('./Routes/logOut');
const Profile = require('./Routes/profile');
const Chats = require('./Routes/chats');

app.get('/login', express.static(path.join('../public/login.html')));
app.get('/signin', express.static(path.join('../public/signin.html')));

app.use('/signin', SignIn);
app.use('/login', Login);
app.use(setAppSession);


app.use('/chats', Chats);
app.use('/profile', Profile);
app.use('/logout', LogOut);

const io = new Server(httpServer);

io.engine.use(sessionMiddleware);
io.engine.use(cookieParser());
io.engine.use(cors());
io.engine.use(morgan('dev'));

io.use((socket, next) => {
    const sessionExist = socket.request.sessionStore.sessions;
    
    if(Object.keys(sessionExist).length === 0) {
        return next(new Error('Sessions not found'));
    }

    next();
})

io.on('connection', socket => {
    
    socket.on('moddify-session', () => {
        const dataStoreString = socket.request.sessionStore.sessions;
        const dataStore = JSON.parse(dataStoreString[app.get('configSessionID')]);
    });

    socket.on('error', (err) => {
        console.log(err);
        socket.disconnect();
    });
});

io.on('error', (err) => {
    console.log(err);
});

module.exports = { app, httpServer, io };

