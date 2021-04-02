const express = require('express');
const ejs = require('ejs');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { flash } = require('express-flash-message');

const server = express();

server.use(session({
    secret: 'pouetpouet',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

server.use(flash({ sessionKeyName: 'flashMessage' }))

server.engine('ejs', ejs.renderFile);
server.set('views', './src/views');
server.use(express.static("./src/assets"))

server.use(express.urlencoded({extended: true}));
server.use(cookieParser())
server.use(router);

server.listen(8080, () => {
    console.log("server running at: localhost:8080");
});