const sql = require('mssql')

console.log("Hello world, This is an app to connect to sql server.");
var config = {
        "user": "HugoCarre", //default is sa
        "password": "#Azerty@2020",
        "server": "ynovblog.database.windows.net", // for local machine
        "database": "Blog", // name of database
        "options": {
            "encrypt": true
        }
      }

sql.connect(config, err => { 
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");

    new sql.Request().query('SELECT * FROM users', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
        
});

sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error " ,err);
})