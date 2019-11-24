    // accede au div du pug (front)
    let articles = document.getElementById('#article');

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
            let mail = data.login
            //afficher le login dans la view

            let picture = data.picture
            // affiche la photo dans la view

            let pseudo = data.pseudo
            //affiche le peudo dans la view

        }

    }
    catch (e) {
        console.log(e)
    }
};


const getArticle = async function () {
    try {
        let response = await fetch('http://localhost:3000/articles');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let title = data.title;
            // affiche le titre dans la view

            let content = data.content;
            // affiche le contenu dans la view

            let idCreateur = data.user_id;
            //affiche l'id du créateur dans la view

            let dateCreation = data.createdAt;
            //affiche la date de création dans la view

            let dateModification = data.updatedAt;
            //affiche la date de modification dans la view

        }
    }
    catch (e) {
        console.log(e)
    }
};

const getComment = async function () {
    try {
        let response = await fetch('http://localhost:3000/commentaires');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let content = data.content;
            // affiche le contenu dans la view

            let auteur = data.user_id;
            //affiche l'id du créateur dans la view

            let article_id = data.article_id;
            //affiche l'id de l'article dans la view

            let dateCreation = data.createdAt;
            //affiche la date de création dans la view

            let dateModification = data.updatedAt;
            //affiche la date de modification dans la view

        }
    }
    catch (e) {
        console.log(e)
    }
};

const getFollow = async function () {
    try {
        let response = await fetch('http://localhost:3000/follows');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            let follower = data.content;
            // affiche l'id de la personne qui suit dans la view

            let followed = data.user_id;
            //affiche l'id de la personne suivie dans la view

            let dateCreation = data.createdAt;
            //affiche la date du follow dans la view

        }
    }
    catch (e) {
        console.log(e)
    }
};

getUsers();
getArticle();
getComment();
getFollow();