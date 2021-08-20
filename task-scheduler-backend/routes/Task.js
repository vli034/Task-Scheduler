const {Router} = require('express');
const connection= require('../config/dbconfig');
const router = Router();

// middleware , next executes the midddleware succeeding the current middleware
router.use((req, res, next)=>{
    console.log('Request made to /Tasks');
    next();

});

// get all tasks that have been entered in the db 
router.get('/all', async (req, res)=>{
    let result = await getAllTasks();
    res.status(200).json({status: 200, result: result});  
});

// insert new tasks 
router.post('/insert', async (req, res)=> {
    const {taskName, taskDescription, startDate, endDate, userId} = req.query;
    try {
        await insertNewTask(taskName, taskDescription, endDate, startDate, userId);
        console.log('Successfully inserted new task to db');
        res.sendStatus(200);
    } catch {
        console.log('could not insert new task');
        res.sendStatus(500);
    }
});

//delete task selected by user 
//deleted selected task 
router.delete('/delete', async (req, res) =>{
    const {taskId} = req.query;
    // maybe do a conditional check if task id exist?
    try{
        await deleteTask(taskId);
        console.log('successfully deleted task');
        res.sendStatus(200);
    }catch{
        console.log('failed to delete task');
        res.sendStatus(500);
    }
});

// update Task critera -- TODO: Neeed to re-work updating logic 
router.put('/update',async (req, res) =>{
    const {taskId, taskName, taskDescription} = req.query;
    console.log(req.query);
    try {
        let result = await updateTask(taskId, taskName, taskDescription);
        console.log('successfully updated task');
        res.send(result);
    }catch{
        console.log('failed to update task');
        res.sendStatus(500);

    }
});

// insert new task into the DB 
const insertNewTask = (taskName, taskDescription, userId , startDate, endDate) =>{
    const q = 'INSERT INTO Tasks (TaskName, TaskDescription, EndDate, StartDate, UserID) VALUES ( ?, ? , ?, ?, ?);';
    return new Promise((resolve, reject)=>{
        connection.query(q, [taskName, taskDescription, userId , startDate, endDate], (error, result)=>{
            if (error) {
                console.log(error);
                return reject(error);
            }
            // on succeed
            console.log("Succesfully inserted into Task Table");
            return resolve(result);      
        });
    });
};


// delete selected task -- probably need to delete multiple task
const deleteTask = (taskId) =>{
    const  q = 'DELETE FROM Tasks WHERE TaskID= ?;';
    return new Promise((resolve,reject)=>{
        connection.query(q,[taskId], (error,result)=>{
            if(error) {
                console.log(error);
                return reject(error);
            } else {
                console.log('sql delete task query ran');
                return resolve(result);
            }

        });

    });
};

//TODO: need to fix up the update logic 
// update task params 
const updateTask = (taskId, taskName, taskDescription) =>{

    const q = 'UPDATE Tasks SET TaskName = ?, TaskDescription = ? WHERE TaskID= ?;';
    const  queryTaskName = 'UPDATE Tasks SET TaskName = ? WHERE TaskID= ?';
    const queryTaskDesc = 'UPDATE Tasks SET TaskDescription = ? WHERE TaskID= ?;';
    
    return new Promise((resolve,reject)=>{
        // checks if the user updated both name and description 
        if(taskName && taskDescription){
            connection.query(q,[taskName, taskDescription, taskId], (error, result)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log('Successfully updated task name and description from table');
                return resolve(result);
            });
        // check if only provided name change, update task name 
        } else if (taskDescription == ''){
            connection.query(queryTaskName,[taskName, taskId], (error, result)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log('Successfully updated task name');
                return resolve(result);
            });
        } else if (taskName == '') { // if only provided description , update task name
            connection.query(queryTaskDesc,[taskDescription, taskId], (error, result)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log('Successfully updated description from table');
                return resolve(result);
            });
        }
        else{
            console.log("no queries were executed");
            return reject(result);
        }    
    });

};


const getAllTasks =() =>{
    const q = 'SELECT * from Tasks;';
    return new Promise((resolve, reject)=>{
        connection.query(q, (err, result)=> {
            if(err) return reject(error);
            return resolve(result);

        })
    })
}

module.exports = router;