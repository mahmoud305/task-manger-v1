const express = require('express');
const app = express();
const port = 5000 || port;
const dataBaseeConnection = require('./db/database.config');
const bodyParser = require('body-parser');

const localStorage = require('./common/localStorage');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

dataBaseeConnection();
app.use(session({
    secret:process.env.SECRET_SESSION_KEY,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session())
const userRouter = require('./src/User/user.Routes');
const ListRouter = require('./src/ToDoLists/lists.Routes');
app.use (userRouter);
app.use (ListRouter);


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
