const {Router} = require('express');
const db = require('../config/dbconfig');

const router = Router();


// middleware 
router.use((req, res, next)=>{
    console.log("Request made to /Users");
    next();

});

router.get('/', (req, res)=> {
    res.sendStatus(200);
    
});

// getting all users
router.get('/all', (req,res)=>{

    db.connection.query('SELECT * FROM Users;', (err, result)=> {
        if (err) throw err;
        console.log(result);
        
    });

    res.sendStatus(200);
});

// creating new user 
router.post('/insert', (req,res)=>{
    const {firstName, lastName} = req.query
    const q = `INSERT INTO Users (FirstName, LastName) VALUES ('${firstName}', '${lastName}');`;

    if(firstName && lastName) {        
        db.connection.query(q, (err, result)=>{
            if (err) throw err;
            console.log('success'); 
            res.sendStatus(201);  
                  
        });
       
        //console.log(res.status());
    } else {
        console.log('failed');
        res.sendStatus(404);
    }

});

module.exports = router;