const {Router} = require('express');
const db = require('../config/dbconfig');
const router = Router();

// middleware , next executes the midddleware succeeding the current middleware
router.use((req, res, next)=>{
    console.log('Request made to /Tasks');
    next();

});

// get all tasks that have been entered in the db 
router.get('/all',(req, res)=>{
    db.connection.query('SELECT * from Tasks;', (err, res)=>{
        if (err) throw err;
        console.log(res);
    });

    res.sendStatus(200);

});
// insert tasks 
router.post('/insert',(req, res)=> {
    const {taskName, taskDescription, endDate, startDate, userId} = req.query;
    const q = `INSERT INTO Tasks (TaskName, TaskDescription, EndDate, StartDate, UserID)
    values ('${taskName}', '${taskDescription}', '${startDate}', '${endDate}', ${userId});`;

    if(taskName || taskDescription || endDate || startDate || userId) {
        db.connection.query(q, (error, result)=>{
            if (error) throw err;
            console.log("Succesfully inserted into Task Table");
            res.sendStatus(200);
        });
        
    } else {
        console.log("Failed to insert data into the Task Table");
        res.sendStatus(404);
    }

});

//delete task selected by user 
//deleted selected task 
router.delete('/delete', (req, res) =>{
    const {taskId} = req.query;
    const  q = `DELETE FROM Tasks WHERE TaskID='${taskId};'`;

    if(taskId){
        db.connection.query(q, (error, result)=>{
            if(error) throw error;
            console.log('Successfully deleted task from table');
            res.sendStatus(200);
        });
        
    }else{
        console.log("Failed to delete task from table");
        res.sendStatus(404);
    }    
});

// update Task critera
router.put('/update', (req, res) =>{
    const {taskId, taskName, taskDescription} = req.query;
    const q = `UPDATE Tasks SET TaskName = '${taskName}', TaskDescription = '${taskDescription}' WHERE TaskID= ${taskId};`;
    const  queryTaskName = `UPDATE Tasks SET TaskName = '${taskName}' WHERE TaskID= ${taskId};`;
    const queryTaskDesc = `UPDATE Tasks SET TaskDescription = '${taskDescription}' WHERE TaskID= ${taskId};`;
    
    // checks if the user updated both name and description 
    if(taskName && taskDescription){
        db.connection.query(q, (error, result)=>{
            if(error) throw error;
            console.log('Successfully updated task BOTH from table');
            res.sendStatus(200);
        });
    // check if only provided name change, update task name 
    } else if (taskDescription == ""){
        db.connection.query(queryTaskName, (error, result)=>{
            if(error) throw error;
            console.log('Successfully updated task NAME from table');
            res.sendStatus(200);
        });
    } else if (taskName == "") { // if only provided description , update task name
        db.connection.query(queryTaskDesc, (error, result)=>{
            if(error) throw error;
            console.log('Successfully updated task description from table');
            res.sendStatus(200);
            
        });
    }
    else{
        console.log("Failed to update task from table");
        res.sendStatus(404);
    }    
});




module.exports = router;