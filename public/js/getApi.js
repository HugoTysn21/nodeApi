

    // accede au div du pug (front)
    let articles = document.getElementById('#article');
    let article = $("#article");
    let message = $("#message");

    // faire un append dans la div en question, apres avoir fetch les data de l'api

    // call api request

    // fetch into var

    // article.append(HTML)
    articles.append();


const getUsers = async function () {
    try {
        let response = await fetch('http://localhost/users')
        let data = await response.json().then(response => response.json);
        console.log(data);
        for (let i = 0; i < data.length; i++){
            articles.append();
        }
    }
    catch (e) {
        console.log(e)
    }
};


const getArticle = async function () {
    try {
        let response = await fetch('http://localhost/users');
        let data = await response.json().then(response => response.json);
        console.log(data)
    }
    catch (e) {
        console.log(e)
    }
};

const getComment = async function () {
    try {
        let response = await fetch('http://localhost/users');
        let data = await response.json().then(response => response.json);
        console.log(data)
    }
    catch (e) {
        console.log(e)
    }
};