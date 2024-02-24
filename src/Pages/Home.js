import React, { useEffect, useState } from 'react';
import TypingPopup from '../Components/TypingPopup';
import TaskList from '../Components/TaskList';
import ClippedDrawer from '../Components/ClippedDrawer';

const drawerWidth = 180;

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(j => setTasks(j));
  }, []); // only run once

  const addTask = (taskText) => {
    if (!taskText) { // if no text specified, do nothing
      return;
    }

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

  const patchTask = (taskToPatch, newTask) => {
    fetch(`/api/tasks/${taskToPatch.id}`,
      {
        method: 'PATCH',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      }
    ).then(
      (r) => {
        console.log('patched', newTask, r);
      }
    )
  }

  const deleteTask = (taskToDelete) => {
    fetch(`/api/tasks/${taskToDelete.id}`, {method: 'DELETE'})
      .then((r) => {
        console.log('deleted', r);
        setTasks((cur) => cur.filter(t => t !== taskToDelete));
      }
    );
  }
  
  const breakdownTask = (taskToBreakdown) => {
    fetch(`/api/tasks/breakdown/${taskToBreakdown.id}`)
      .then((r) => r.json()).then(j => {
        console.log('taskbreakdown', j);
        setTasks((cur) => cur.map(t => {
          if (t !== taskToBreakdown) { return t; } // if not this task, don't modify
          return {
            ...t, // task before breakdown
            ...j // results of the breakdown
          }
        }));
      });
  }
  
  return (
    <> 
      <ClippedDrawer drawerWidth={drawerWidth} addTask={addTask} />
      <div  style={{marginLeft: drawerWidth}}>
        <div className='typing-popup-container flex-col-centered'>
            <TaskList tasks={tasks} taskFuncs={{addTask, deleteTask, patchTask, breakdownTask}}/>
        </div>
      </div>
    </>
  )
};

export default Home;