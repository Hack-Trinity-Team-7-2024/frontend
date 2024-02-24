import React, { useState } from 'react';
import TypingPopup from '../Components/TypingPopup';
import TaskList from '../Components/TaskList';


const Home = () => {
  const [tasks, setTasks] = useState([]);


  const addTask = (taskText) => {
    let task = {
      id: tasks.length + 1,
      text: taskText,
      completed: false
    }
    console.log(task);
    setTasks([...tasks, task]);
  };

  // const toggleTask = (id) => {
  //   const updatedTasks = tasks.map((task) =>
  //     task.id === id ? { ...task, completed: !task.completed } : task
  //   );
  //   setTasks(updatedTasks);
  // };

  // const deleteTask = (id) => {
  //   const updatedTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(updatedTasks);
  // };


  return (
    <div className='typing-popup-container'>
        <TypingPopup addTask={addTask} />
        <TaskList tasks={tasks}/>
    </div>
  )
};

export default Home;