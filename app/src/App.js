import {useState, useEffect} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import api from './config/ApiConfig';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])
  
  useEffect(()=>{
    const getTasks = async() => {
      const allTasks = await getAllTasks();
      // if true - setTask state
      if (allTasks) setTask(allTasks);
    }
    getTasks();

  }, []);

  
  //get all task
  const getAllTasks =  async () =>{
    const response = await api.get("/tasks/all")
    return response.data.result;
  }

  // add a new task to the list 
  const createTask = async (task) =>{
    const res = await api.post("/tasks/create", task);
    // check if status is OK 
    if(res.status === 200) {
      setTask([...tasks,task])
    } else {
      alert('Error in adding a task')
    }

}
  // Delete Task
  const deleteTask = async (id) =>{
    let res = await api.delete(`/tasks/delete?id=${id}`)
    //validate status code before removing 
    if(res.status === 200) {
      setTask(tasks.filter((task)=> task.id !== id));
    } else {
      alert('Error in Deleting a task')
    }
  }

  const setReminder = (id) =>{
    setTask(tasks.map((task)=> task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
       <Header onAdd={()=>setShowAddTask(!showAddTask)} showButton={showAddTask}/>
       {showAddTask && <AddTask onCreate={createTask}/>}
       {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} 
       onToggle={setReminder}/> : 'No Tasks Available'}
    
    </div>
     
  )
}

export default App;
