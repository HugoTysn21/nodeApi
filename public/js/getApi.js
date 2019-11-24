document.addEventListener("DOMContentLoaded", function(event) {
    // accede au div du pug (front)
    let article = document.getElementsByClassName('article');
    let users =  document.getElementsByClassName('users');
    let userArticle = document.getElementsByClassName('userArticle');
    let comment = document.getElementsByClassName('comment');
    let myArticle = document.getElementsByClassName('myArticle');
    let follows = document.getElementsByClassName('follows');
    let userInfo = document.getElementsByClassName('userInfo');
    let login = document.getElementById('#login');
    let password = document.getElementById('#password');
    let realname = document.getElementById('#realname');
    let pseudo = document.getElementById('#pseudo');
    let Picture = document.getElementById('#Picture');
    let btninscription = document.getElementById('#btn');

    // faire un append dans la div en question, apres avoir fetch les data de l'api

    // call api request

    // fetch into var

    // article.append(HTML)


const getUsers = async function () {
    try {
        let response = await fetch('http://localhost:3000/users')
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let mail = data.login;
            let picture = data.picture;
            let pseudo = data.pseudo;

            $(users).append("<div><p>login : "+mail+"</p><p>pseudo : "+pseudo+"</p><button type=\"submit\" class=\"btn btn-primary follow\">Follow</button></div>")
            $(userInfo).append("<div><p>login : "+mail+"</p><p>pseudo : "+pseudo+"</p></div>")
        }

    }
    catch (e) {
        console.log(e)
    }
};


const getArticles = async function () {
    try {
        let response = await fetch('http://localhost:3000/articles');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let title = data.title;
            let content = data.content;
            let idCreateur = data.user_id;
            let dateCreation = data.createdAt;
            let dateModification = data.updatedAt;

            $(article).append("<div><p>title : "+title+"</p>" +
                "<div><p>pseudo : "+idCreateur+"</p></div>" +
                "<div><p>Content : "+content+"</p></div>" +
                "<div><p>date de création : "+dateCreation+"</p></div>" +
                "<div><p>date de modification : "+dateModification+"</p></div>" +
                "<div class='comment'></div></div>")

            // show also into user profile
            $(myArticle).append("<div><p>title : "+title+"</p>" +
                "<div><p>pseudo : "+idCreateur+"</p></div>" +
                "<div><p>Content : "+content+"</p></div>" +
                "<div><p>date de création : "+dateCreation+"</p></div>" +
                "<div><p>date de modification : "+dateModification+"</p></div>" +
                "<div class='comment'></div></div>")
        }
    }
    catch (e) {
        console.log(e)
    }
};

const getCommentaires = async function () {
    try {
        let response = await fetch('http://localhost:3000/commentaires');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let content = data.content;
            let auteur = data.user_id;
            let article_id = data.article_id;
            let dateCreation = data.createdAt;
            let dateModification = data.updatedAt;

            // affiche comment dans div d'article
            $(comment).append("<div><p>title : "+title+"</p>" +
                "<div><p>pseudo : "+auteur+"</p><p>  article : "+article_id+"</p></div>" +
                "<div><p>Content : "+content+"</p></div>" +
                "<div><p>date de création : "+dateCreation+"</p></div>" +
                "<div><p>date de modification : "+dateModification+"</p></div>" +
                "</div>")

        }
    }
    catch (e) {
        console.log(e)
    }
};

const getFollows = async function () {
    try {
        let response = await fetch('http://localhost:3000/follows');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let follower = data.user_id_follower;
            let followed = data.user_id_followed;
            let dateCreation = data.createdAt; // no show

            $(follows).append("<div><p>>Id Followed : "+followed+"</p></div>" +
                "<div><p>Id follower : "+follower+"</p></div>" +
                "<div><p>date de follow : "+dateCreation+"</p></div>" +
                "</div>")
        }
    }
    catch (e) {
        console.log(e)
    }
};

const postLogin = async function(){
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                login: login,
                password: password,
                realname:realname,
                pseudo:pseudo,
                Picture:Picture,
            }
        })
    });
}

getUsers();
getArticles();
getCommentaires();
getFollows();
});