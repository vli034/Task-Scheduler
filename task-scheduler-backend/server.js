const express = require('express'); 
const db = require('./config/dbconfig');
const app = express(); 
const port = process.env.PORT || 5000; 

// middleware to help recognize objects as strings and array 
app.use(express.urlencoded({extended:true})); 




// insert 
app.post('/insert', (req, res) => { 
    const q = "INSERT INTO Users (FirstName, LastName) Values ('test', 'ahhh');";
    
    db.query(q, (err, result ,next)=>{
        if(err) throw err;
        
    });
}); 

// get all users 
// app.get('/getAllUsers', (req,res) => {
//     const q = 'SELECT * from Users;';
//     db.getConnection((error, connection)=>{
//         if (error) throw error;
//         connection.query(q, (err,rows)=>{
//             connection.release(); // return connection to pool
//             if (err) throw err;
//             console.log(rows);

//         });

//     });
// });

app.get('/', (req, res)=>{
    res.send('welcome');
});


// This displays message in terminal that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));