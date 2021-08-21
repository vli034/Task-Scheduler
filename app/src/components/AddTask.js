import { useState } from "react"

const AddTask = ({onCreate}) => {
    //default 
    const [TaskName, setText] = useState('')
    const [TaskDate, setDate] = useState('')
    const [TaskReminder, setReminder] = useState(false)


    const onSubmit = (e) =>{
        e.preventDefault();
        // form validation 
        if(!TaskName){
            alert('Task Name cannot be empty!')
            return;
        }
        // pass the task params 
        onCreate({TaskName,TaskDate, TaskReminder})
        //clear form
        setText('')
        setDate('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task Name</label>
                <input type='text' placeholder='Add Task' value={TaskName} onChange={(e) => setText(e.target.value)}/> 
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='text' placeholder='Add Date' value={TaskDate} onChange={(e) => setDate(e.target.value)}/>

            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={TaskReminder} value={TaskReminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>

            </div>     
            <input className='btn btn-block' type='submit' value='Save Task'/> 

        </form>
        
    )
}

export default AddTask
