const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const MongoStore = require("connect-mongo");
const { createServer } = require("http");
const { Server } = require("socket.io");
const session = require("express-session");

dotenv.config();

const app = express();
const httpServer = createServer(app);

const sessionMiddlewareDev = session({
  store: MongoStore.create({
    mongoUrl: process.env.URL_MONGODB,
    dbName: process.env.NAME_MONGODB,
    collectionName: "sessions",
  }),
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: "/",
    signed: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60,
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(sessionMiddlewareDev);

app.set("port", process.env.PORT || 3000);

const SignIn = require("./Routes/signIn");
const Login = require("./Routes/logIn");
const LogOut = require("./Routes/logOut");
const Chats = require("./Routes/chats");

app.use("/signin", SignIn);
app.use("/login", Login);
app.use("/chats", Chats);
app.use("/logout", LogOut);

const appWS = new Server(httpServer);

appWS.engine.use(morgan("dev"));

const modeDev = require("./Socket_Controller/dev");
const chat = require("./Socket_Controller/chats");

const connectModeDev = (socket) => modeDev(socket);
const socketChats = (socket) => chat(socket, appWS);

appWS.of("/chat").on("connect", socketChats);
appWS.of("/dev").on("connect", connectModeDev);

appWS.emit("message", "Hello user from Socket.io");

module.exports = { app, httpServer };