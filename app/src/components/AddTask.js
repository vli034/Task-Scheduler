import { useState } from "react"

const AddTask = ({onCreate}) => {
    //default 
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)


    const onSubmit = (e) =>{
        e.preventDefault();
        // form validation 
        if(!text){
            alert('Task Name cannot be empty!')
            return;
        }
        // pass the task params 
        onCreate({text,date, reminder})
        //clear form
        setText('')
        setDate('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task Name</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/> 
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='text' placeholder='Add Date' value={date} onChange={(e) => setDate(e.target.value)}/>

            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>

            </div>     
            <input className='btn btn-block' type='submit' value='Save Task'/> 

        </form>
        
    )
}

export default AddTask
