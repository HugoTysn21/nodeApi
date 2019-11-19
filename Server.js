'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize');
const userClass = require('/Model/User');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require("jsonwebtoken");

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// add a basic route
app.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'yeswecan';

// strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);
app.use(passport.initialize());

 //login route
app.post('/login', async function(req, res, next) {
const { name, password } = req.body;
if (name && password) {
    // we get the user with the name and save the resolved promise returned
    let user = await getUser({ name });
    if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
    }
    if (user.password === password) {
        // from now on we’ll identify the user by the id and the id is
        // the only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
    } else {
        res.status(401).json({ msg: 'Password is incorrect' });
    }
}
});

// protected route
app.get('/protected', passport.authenticate(`jwt`, { session: false }, function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
}));

const sequelize = new Sequelize({
    database: 'blog',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
});

let newUser = new userClass('test','test','test','test','/src/test');

let login = newUser.login;
let password = newUser.pswd;
let pseudo = newUser.pseudo;
let realName = newUser.realName;
let pict = newUser.picture;

sequelize.authenticate()
    .then(() => console.log("Connection has been established successfully."))
.catch(err => console.error("Unable to connect to the database:", err));

//create model for DB
const User = sequelize.define('user', {
    login: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    pseudo: {
        type: Sequelize.STRING,
    },
    realName: {
        type: Sequelize.STRING,
    },
    picture: {
        type: Sequelize.STRING,
    },
});

// create table with user model
User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
.catch(err => console.log('BTW, did you enter wrong database credentials?'));

//create user on table
const createUser = async ({ login, password, pseudo, realName, pict }) => {
    return await User.create({ login, password, pseudo, realName, pict });

};const getAllUsers = async () => {
    return await User.findAll();

};const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

app.get('/users', function(req, res) {
getAllUsers().then(user => res.json(user));
});


app.post('/register', function(req, res, next) {
const { login, password, pseudo, realName, pict } = req.body;
createUser({ login, password, pseudo, realName, pict }).then(user =>
    res.json({ user, msg: 'account created successfully' })
)
});

console.log("Hello world, This is an app to connect to sql server.");

// start the app
app.listen(3000, function() {
    console.log("Express is running on port 3000");
});