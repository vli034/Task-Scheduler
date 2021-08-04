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
});

// creating new user 
router.post('/insert', (req,res)=>{
    const {FirstName, LastName} = req.query
    const q = `INSERT INTO Users (FirstName, LastName) VALUES ('${FirstName}', '${LastName}');`;

    if(FirstName && LastName) {        
        db.connection.query(q, (err, result)=>{
            if (err) throw err;
            console.log('success');   
                  
        });
       res.sendStatus(201);
        //console.log(res.status());
    } else {
        console.log('failed');
        res.sendStatus(500);
    }

});

module.exports = router;