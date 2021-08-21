import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {useState} from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([
      
    {
     id: 1,
     text: 'doctors Appointment',
     date: 'Feb 5th at 230 pm',
     reminder: true   
    },
     {
        id: 2,
        text: 'make lunch',
        dat: 'Feb 5th at 230 pm',
        reminder: true   
       },
    {
        id: 3,
        text: 'do laundry',
        date: 'Feb 5th at 230 pm',
        reminder: false   

    }       
])


const createTask = (task) =>{
   const id = Math.floor(Math.random()*10000)+1
   const newTask = {id, ...task}
   setTask([...tasks,newTask])

}

const deleteTask= (id) =>{
  setTask(tasks.filter((task)=> task.id !== id));

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
