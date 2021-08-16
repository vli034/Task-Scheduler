const {Router} = require('express');
const db = require('../config/dbconfig');
const router = Router();


// middleware 
router.use((req, res, next)=>{
    console.log("Request made to /Users");
    next();

});

// getting all users
router.get('/all', (req,res)=>{

    db.connection.query('SELECT * FROM Users;', (err, result)=> {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200);
    });
    
});

// inserting new user into db
router.post('/signup', async (req, res)=>{
    const {firstName, lastName, userName, password} = req.query;
    const q = 'INSERT INTO Users (FirstName, LastName, UserName, Password) VALUES (?, ?, ?, ?);';

    try {
        const newUser = await checkUsername(userName);
        // if result is empty then insert into database
        if(newUser.length == 0){
            db.connection.query(q,[firstName, lastName, userName, password],(err, result)=>{
                if(err) throw err;
                console.log('successfully inserted new user into DB');
            });
        } else {
            console.log('UserName is already taken cannot enter into DB');
        }
        res.sendStatus(200);     
        //console.log(newUser[0].UserId);
        //res.status(200).json({result: newUser});    
    } catch (e){
        console.log('failure' + e);
        res.sendStatus(500);
    }

});


// authorize exsisting user 
router.post('/login', async(req, res)=>{
    const {userName, password} = req.query;

    try{
        const authUser = await authorizeUser(userName, password);
        if (authUser.length > 0){
            console.log('correct username and pass - user exist in DB - sign them in');
        } else {
            console.log('incorrect username and passs');
            
        }
        res.sendStatus(200);
    } catch {
        console.log('query failed');
        res.sendStatus(500);
    }
});



// Upon user signing up, check if username already exist 
const checkUsername = (userName) =>{
    //console.log(userName);
    const q = `SELECT UserName FROM Users WHERE UserName = ?;`;
    return new Promise((resolve, reject) =>{
        db.connection.query(q, [userName], (error,result) =>{
            if(error) {
                console.log(error);
                return reject(error);
            } 
            // on success
            console.log('Sql query successfully ran');
            return resolve(result);                 
        });
    });  
};

// validating user credentials upon loggin in
const authorizeUser = (userName, password) =>{
    const q = 'SELECT * from Users where UserName = ?  AND Password = ?';
    return new Promise((resolve, reject) =>{
        db.connection.query(q,[userName, password], (error, result)=>{
            if(error) {
                console.log(error);
                return reject(error);
            }else {
                console.log('SQL Query ran success');
                return resolve(result);
            }
         });
    });
};



module.exports = router;