const { Router } = require("express");
const connection = require("../config/dbconfig");
const router = Router();

// middleware , next executes the midddleware succeeding the current middleware
router.use((req, res, next) => {
  console.log("Request made to /Tasks");
  next();
});

// get all tasks that have been entered in the db
router.get("/all", async (req, res) => {
  let resultSet = await getAllTasks();
  return res.json({ status: 200, result: resultSet });
});

//get selected task
router.get("/selected", async (req, res) => {
  const { id } = req.query;
  let resultSet = await getSelectedTask(id);
  return res.json({ status: 200, result: resultSet });
});

// insert new tasks
router.post("/create", async (req, res) => {
  let { TaskName, TaskDate, TaskReminder } = req.body;
  if (TaskReminder == true ? (TaskReminder = 1) : (TaskReminder = 0));

  try {
    let resultSet = await createNewTask(TaskName, TaskDate, TaskReminder);
    return res.json({ status: 200, result: resultSet });
  } catch {
    return res.sendStatus(500);
  }
});

//deleted selected task
router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    await deleteTask(id);
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
});

// update Task reminder
router.put("/update", async (req, res) => {
  const { id, TaskReminder } = req.body;

  try {
    let resultSet = await updateTask(id, TaskReminder);
    return res.json({ status: 200, result: resultSet });
  } catch {

    return res.json({ status: 500, result: resultSet });
  }
});

// insert new task into the DB
const createNewTask = (taskName, taskDate, taskReminder) => {
  console.log("query reached");
  const q =
    "INSERT INTO Tasks (TaskName, TaskDate, TaskReminder) VALUES ( ?, ?, ?);";
  return new Promise((resolve, reject) => {
    connection.query(q, [taskName, taskDate, taskReminder], (error, result) => {
      if (error) {
        return reject(error);
      }
      // on succeed
      return resolve(result);
    });
  });
};

// delete selected task
const deleteTask = (taskId) => {
  const q = "DELETE FROM Tasks WHERE id= ?;";
  return new Promise((resolve, reject) => {
    connection.query(q, [taskId], (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
};

// update task reminder
const updateTask = (id, taskReminder) => {
  const q = "UPDATE Tasks SET TaskReminder = ? WHERE id= ?;";

  return new Promise((resolve, reject) => {
    connection.query(q, [taskReminder, id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }

      return resolve(result);
    });
  });
};

const getAllTasks = () => {
  const q = "SELECT * from Tasks;";
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) return reject(error);
      return resolve(result);
    });
  });
};

const getSelectedTask = (id) => {
  const q = "SELECT TaskName, TaskDate, TaskReminder from Tasks where id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(q, [id], (err, result) => {
      if (err) return reject(error);
      return resolve(result);
    });
  });
};

module.exports = router;
