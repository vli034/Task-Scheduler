const mysql = require('mysql');
const DB_CREDENTIALS = require('./credentials');

// MySQL Connection credentials
const connection = mysql.createPool({
    host: DB_CREDENTIALS.HOST,
    port: DB_CREDENTIALS.PORT,
    user: DB_CREDENTIALS.USER,
    password: DB_CREDENTIALS.PASSWORD,
    database: DB_CREDENTIALS.DATABASE
});


connection.on('acquire', function(connection){
    console.log('connection %d acquired', connection.threadId);
});

connection.on('release', function(connection){
    console.log('connection %d released', connection.threadId);
});



module.exports = connection;
 
