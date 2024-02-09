const express = require('express');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoDB = require('./src/databases/conectToMongoDB');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const morgan = require('morgan');
const colors = require('colors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const Login = require('./src/Routes/logIn');
const Signin = require('./src/Routes/signIn');

const Profile = require('./src/Routes/profile');
const Chats = require('./src/Routes/chats');
const LogOut = require('./src/Routes/logOut');

dotenv.config();
mongoDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(session({
    secret: 'keyboard cat123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000,
        httpOnly: true
    }
}));

app.set('port', process.env.PORT || 3000);

// gestion de pruebas locales modo donramon osea toda chafa
app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/public/signin.html');
});

app.use('/login', Login);
app.use('/signin', Signin);
app.use('/profile', Profile);
app.use('/chats', Chats);
app.use('/logOut', LogOut);

app.get('/test-experiments', (req, res) => {
    console.log(req.cookies);
    res.json({ cookies: req.cookies });
})

app.listen(app.get('port'), () => {
    console.log(colors.cyan('listening on port: ' + app.get('port')));
});