'use strict';

const User = require('/Model/User');
const sql = require('mssql');


function addUserToBdd(User) {

    let login = User.login;
    let pswd = User.pswd;
    let pseudo = User.pseudo;
    let realName = User.realName;
    let picture = User.picture;

    new sql.Request().query('INSERT INTO users(login,pswd,pseudo,realName,picture)', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
}