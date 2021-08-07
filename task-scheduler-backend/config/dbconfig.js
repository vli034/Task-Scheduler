const mysql = require('mysql');
const DB_CREDENTIALS = require('./credentials');

// MySQL Connection credentials
const connection = mysql.createConnection({
    host: DB_CREDENTIALS.HOST,
    port: DB_CREDENTIALS.PORT,
    user: DB_CREDENTIALS.USER,
    password: DB_CREDENTIALS.PASSWORD,
    database: DB_CREDENTIALS.DATABASE
});

//Connect to database 
connection.connect((err) =>{
    if (err) throw err;
    console.log("Succesfully connected to the database");
});

module.exports = {connection};
 
