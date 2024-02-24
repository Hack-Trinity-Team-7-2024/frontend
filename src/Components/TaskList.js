import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div>
        <h1>Task List</h1>
        <AddTask addTask={addTask} />
        {tasks.map((task) => (
          <Task
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          />
          ))}
      </div>
    </>
  );
};

export default TaskList;
