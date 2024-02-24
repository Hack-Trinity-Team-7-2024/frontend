import React from 'react';

const Task = ({ task, toggleTask, deleteTask }) => {
  return (
    <div>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
