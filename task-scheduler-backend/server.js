const express = require('express'); 
const db = require('./config/dbconfig');
const userRoute = require('./services/Users');
const app = express(); 
const port = process.env.PORT || 5000; 

// middleware to help recognize objects as strings and array 
app.use(express.urlencoded({extended:true})); 
app.use(express.json());


app.use('/users', userRoute);

// insert 
// app.post('/insert', (req, res) => { 
//    const q = 'INSERT INTO task_sched_db.Users (FirstName, LastName) Values ("ron", "weasely");';
//     //const q = 'SELECT * from Users;';
//     db.connection.query(q, (err,result) =>{
//         if (err) throw err;
//         console.log(result);
//     });

    
// }); 

// app.get('/get', (req,res)=>{
//     db.connection.query("SELECT * from Users;", (err, result)=>{
//         if (err) throw err;
       
//        res.status(200).send(result);
//         //console.log(req);

//     });

// });

// app.get('/', (req, res)=>{
//     res.send('welcome');
// });


// This displays message in terminal that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));