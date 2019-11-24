

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
        let response = await fetch('http://localhost:3000/article');
        let dataJson = await response.json();
        for (let index = 0; index < dataJson.length; index++) {
            const data = dataJson[index];
            console.log(data.login);
            console.log(data.password);
        }
    }
    catch (e) {
        console.log(e)
    }
};

const getComment = async function () {
    try {
        let response = await fetch('http://localhost:3000/users');
        let data = await response.json().then(response => response.json);
        console.log(data)
    }
    catch (e) {
        console.log(e)
    }
};

getUsers();