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
        signed: true,
        path: '/'
    }
});


dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

const Login = require('./Routes/logIn');
const SignIn = require('./Routes/signIn');
const LogOut = require('./Routes/logOut');
const Profile = require('./Routes/profile');
const Chats = require('./Routes/chats');

app.use('/signin', SignIn);
app.use('/login', Login);
app.use((req, res, next) => {
    app.set('session', req.session);
    next();
});
app.use('/chats', Chats);
app.use('/profile', Profile);
app.use('/logout', LogOut);

const io = new Server(httpServer);

io.engine.use(sessionMiddleware);
io.engine.use(cookieParser());
io.engine.use(cors());
io.engine.use(morgan('dev'));

io.use((socket, next) => {
    const data = app.get('session');
    if(data) {
        socket.request.session = data;
        socket.request.session.save(err => {
            if(err) return next(err);
        });
        socket.data = data;
        next();
    } else {
        next(new Error('not authenticated'));
    }
});

io.on('conection-error', (err) => {
    console.log(err);
})

io.on('connection', socket => {
    const req = socket.request;
    socket.on('moddify-session', () => {
        console.log(colors.red('----------------------------------------------------'));
        console.log('sessionID: ', colors.green(req.sessionID));
        console.log('session: ', req.session);
        console.log(colors.red('----------------------------------------------------'));
    });
});

module.exports = { app, httpServer, io };