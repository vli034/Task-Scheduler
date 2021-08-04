const mysql = require('mysql');

// MySQL Connection credentials
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'admin123',
    database: 'task_sched_db',
    connectionLimit: 20
});

// pool.getConnection((err, connection)=>{
//     if(err) throw err;
//     console.log("Successfully connected to database");

// });

//Connect to database 
connection.connect((err) =>{
    if (err) throw err;
    console.log("Succesfully connected to the database");
});

module.exports = {connection};
 
