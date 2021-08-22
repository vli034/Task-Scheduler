import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.TaskReminder === 1 ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task)}
    >
      <h3>
        {task.TaskName}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.TaskDate}</p>
    </div>
  );
};

export default Task;
