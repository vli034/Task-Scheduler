import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import api from "./config/ApiConfig";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);

  // useEffect to display all the tasks on page once user adds a task
  useEffect(() => {
    const getTasks = async () => {
      const allTasks = await getAllTasks();
      // if true - setTask state
      if (allTasks) setTask(allTasks);
    };
    getTasks();
  }, []);

  //get all task
  const getAllTasks = async () => {
    const response = await api.get("/tasks/all");
    return response.data.result;
  };

  // add a new task to the list
  const createTask = async (task) => {
    if (
      task.TaskReminder === true
        ? (task.TaskReminder = 1)
        : (task.TaskReminder = 0)
    );

    const res = await api.post("/tasks/create", task);
    // check if status is OK
    if (res.status === 200) {
      setTask([...tasks, task]);
    } else {
      alert("Error in adding a task");
    }
  };
  // Delete Task
  const deleteTask = async (id) => {
    let res = await api.delete(`/tasks/delete?id=${id}`);
    //validate status code before removing
    if (res.status === 200) {
      setTask(tasks.filter((task) => task.id !== id));
    } else {
      alert("Error in Deleting a task");
    }
  };

  //updating Task reminder
  const setReminder = async (task) => {
    let selectedTask = task;
    // updating the selected task reminder option
    if (
      selectedTask.TaskReminder === 1
        ? (selectedTask = { ...selectedTask, TaskReminder: 0 })
        : (selectedTask = { ...selectedTask, TaskReminder: 1 })
    );
    // calling update end point and passing the selected data
    let res = await api.put("/tasks/update", selectedTask);
    if (res.data.status === 200) {
      setTask(
        tasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, TaskReminder: selectedTask.TaskReminder }
            : task
        )
      ); //update state
    }
  };

  //get a singular task
  const getTask = async (id) => {
    const response = await api.get(`/tasks/selected?id=${id}`);
    return response.data.result;
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showButton={showAddTask}
      />
      {showAddTask && <AddTask onCreate={createTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={setReminder} />
      ) : (
        "No Tasks Available"
      )}
    </div>
  );
}

export default App;
