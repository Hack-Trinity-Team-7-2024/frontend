import React, { useEffect, useState } from 'react';
import TypingPopup from '../Components/TypingPopup';
import TaskList from '../Components/TaskList';
import ClippedDrawer from '../Components/ClippedDrawer';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(j => setTasks(j));
  }, []); // only run once

  const addTask = (taskText) => {
    let task = {
      // id: tasks.length + 1,
      content: taskText,
      completed: false
    };

    fetch('/api/tasks',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    ).then(
      res => res.json()
    ).then(
      j => {
        let actualTask = {
          ...task,
          ...j
        };
        console.log(actualTask);
        setTasks([...tasks, actualTask]);
      }
    );


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
    <> 
      <ClippedDrawer />
      <div className='typing-popup-container'>   
          <TypingPopup addTask={addTask} />
          <TaskList tasks={tasks}/>
      </div>
    </>
  )
};

export default Home;