'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({extended:false});
const app = express();
const Sequelize = require('sequelize');
const userClass = require('./Model/User');
const articleClass = require('./Model/Article');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

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
app.put('/login', async function(req, res, next) {
const { login, password } = req.body;
if (login && password) {
    // we get the user with the name and save the resolved promise returned
    let user = await getUser({ login });
    if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
    }
    if (user.password === password) {
        // from now on we’ll identify the user by the id and the id is
        // the only personalized value that goes into our token
        let payload = { id: user.id };
        // the token is the user id and secretKey
        let token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.json({ msg: 'ok', token: token });
        console.log(token)

    } else {
        res.status(401).json({ msg: 'Password is incorrect' });
    }
}
});

// protected route
app.get('/protected', passport.authenticate(`jwt`, { session: false }, function(req, res) {
    var decode = jwt.verify(token, 'yeswecan');
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
}));

const sequelize = new Sequelize({
    database: 'blog',
    username: 'root',
    password: '',
    dialect: 'mysql',
});

let newUser = new userClass('test','test','test','test','/src/test');

let login = newUser.login;
let password = newUser.pswd;
let pseudo = newUser.pseudo;
let realName = newUser.realName;
let picture = newUser.picture;

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

//add the token to user
// const addTokenToUser = async(token, user_id)=>{
//     let userUser.where(id:user_id)
// return await User.update(token, where id: user_id);
// };

//create user on table
const createUser = async ({ login, password, pseudo, realName, picture }) => {
    return await User.create({ login, password, pseudo, realName, picture });
};
const getAllUsers = async () => {
    return await User.findAll();
};
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

app.get('/users', function(req, res) {
getAllUsers().then(user => res.json(user));
});

app.post('/register', function(req, res, next) {
// const { login, password, pseudo, realName, pict } = req.body;
createUser(req.body).then(user =>
    res.json({ user, msg: 'account created successfully' })
    // faire redirection vers /login
)
});

//create model for Article in DB
const Article = sequelize.define('article', {
    title: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.TEXT,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
});

Article.sync()
    .then(() => console.log('Oh yeah! Article table created successfully'))
.catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createArticle = async ({title, content, user_id}) => {
    return Article.create({ title, content, user_id});
};

//Liste tous les articles.
const getAllArticles = async () => {
    return await Article.findAll();
};

//update articles
const updArticle = async (updatedAt,title, content, id) => {
    return Article.update({
        updatedAt : updatedAt, 
        title : title, 
        content: content,
    }, {
        where:{
            user_id:{
                [Op.eq]:id
            }
        }
    });
};
const deleteArticle = async (usr_id, art_id) => {
    return Article.destroy({
        where:{
            user_id:{
                [Op.eq]:usr_id
            },
            article_id:{
                [Op.eq]:art_id
            },
        }
    });
};
//recuperer les articles
app.get('/article', function(req, res,next){
    getAllArticles().then(article => res.json(article));
});
//ajout article
app.post('/article',urlEncodeParser, function(req, res, next) {
    createArticle(req.body).then(article =>
        res.json({ article, msg: 'article created successfully' })
    )
});
//màj article
app.put('/article', urlEncodeParser, function(req, res, next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    console.log(decoded);
    let payload = jwt.decode(tOken)
    let id = payload.id;
    var date = new Date();
    var title = req.body.title;
    var content = req.body.content;
    updArticle(date, title,content, id).then(article =>
        res.json({ article, msg: 'article updated successfully' }))
});
//Supprimer une article
app.put('/deleteArticle', urlEncodeParser, function(req, res, next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    let payload = jwt.decode(tOken)
    let usr_id = payload.id;
    var art_id = req.body.art_id
    deleteArticle(usr_id, art_id).then(res.json({ msg: 'article deleted successfully' }))
});


//create model for DB
const Commentaire = sequelize.define('commentaire', {
    content: {
        type: Sequelize.TEXT,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    article_id: {
        type: Sequelize.INTEGER,
    },
});
//maj commentaire
const updCommentaire = async (updatedAt, content, id, art_id) => {
    return Commentaire.update({
        updatedAt : updatedAt,
        content: content,
    }, {
        where:{
            user_id:{
                [Op.eq]:id
            },
            article_id:{
                [Op.eq]:art_id
            }
        }
    });
};
//suppr commentaire
const deleteCommentaire = async (usr_id, comm_id) => {
    return Commentaire.destroy({
        where:{
            user_id:{
                [Op.eq]:usr_id
            },
            id:{
                [Op.eq]:comm_id
            },
        }
    });
};

//creation commentaire
const createCommentaire = async ({content, user_id, article_id}) => {
    return Commentaire.create({content, user_id, article_id});
};
Commentaire.sync()
    .then(() => console.log('Oh yeah! Commentaire table created successfully'))
.catch(err => console.log('BTW, did you enter wrong database credentials?'));
const getAllCommentaire = async () => {
    return await Commentaire.findAll();
};
//recup tous les commentaires
app.get('/commentaire', function(req, res,next){
    getAllCommentaire().then(commentaire => res.json(commentaire));
});
//ajouter un commentaire
app.post('/commentaire',urlEncodeParser, function(req, res, next) {
    createCommentaire(req.body).then(commentaire =>
        res.json({ commentaire, msg: 'commentaire created successfully' })
    )
});
//maj commentaire
app.put('/commentaire',urlEncodeParser,function(req,res,next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    let payload = jwt.decode(tOken)
    let id = payload.id;
    var date = new Date();
    var content = req.body.content;
    var art_id = req.body.art_id;
    updCommentaire(date,content, id,art_id).then(commentaire =>
        res.json({ commentaire, msg: 'commentaire updated successfully' }))
});
//supprimer commentaire
app.put('/deleteCommentaire', urlEncodeParser, function(req, res, next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    let payload = jwt.decode(tOken)
    let usr_id = payload.id;
    var comm_id = req.body.comm_id
    deleteCommentaire(usr_id, comm_id).then(res.json({ msg: 'Commentaire deleted successfully' }))
});

//create model for DB
const Follow = sequelize.define('follow', {
    user_id_follower: {
        type: Sequelize.INTEGER,
    },
    user_id_followed: {
        type: Sequelize.INTEGER,
    },
});

Follow.sync()
    .then(() => console.log('Oh yeah! Follow table created successfully'))
.catch(err => console.log('BTW, did you enter wrong database credentials?'));
//unfollow
const unfollow = async (user_id_follower, user_id_followed) => {
    return await Follow.destroy({
        where:{
            user_id_follower:{
                [Op.eq]:user_id_follower
            },
            user_id_followed:{
                [Op.eq]:user_id_followed
            }
        }
    })
};
//follow
const follow = async (user_id_follower, user_id_followed) => {
    return await Follow.create({user_id_follower, user_id_followed})
};
//recup tous les follow
const getAllFollow = async () => {
    return await Follow.findAll();
};
app.get('/follow', function(req, res,next){
    getAllFollow().then(follow => res.json(follow));
});
//follow qqun
app.post('/follow', urlEncodeParser, function(req,res, next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    let payload = jwt.decode(tOken)
    let user_id_follower = payload.id;
    var user_id_followed = req.body.user_id_followed;
    follow(user_id_follower,user_id_followed).then(follow =>
        res.json({ follow, msg: 'followed successfully' }))
});
//unfollow
app.put('/unfollow', function(req,res,next){
    let tOken = req.body.jwt;
    var decoded = jwt.verify(tOken,'yeswecan');
    let payload = jwt.decode(tOken)
    let user_id_follower = payload.id;
    var user_id_followed = req.body.user_id_followed;
    unfollow(user_id_follower, user_id_followed).then(res.json({msg: 'unfollowed successfully' }));
});

console.log("Hello world, This is an app to connect to sql server.");

// start the app
app.listen(3000, function() {
    console.log("Express is running on port 3000");
});