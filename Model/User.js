'use strict';

class User {

    login;
    pswd;
    realName;
    pseudo;
    picture;

    constructor(login, pswd, realName, pseudo, picture) {
        this.login = login;
        this.pswd = pswd;
        this.realName = realName;
        this.pseudo = pseudo;
        this.picture = picture;
    }
}

function addUserToBDD (User){

}