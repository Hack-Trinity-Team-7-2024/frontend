import React, { useEffect, useRef, useState } from 'react';
import TaskList from '../Components/TaskList';
import ClippedDrawer from '../Components/ClippedDrawer';
import { Typography } from '@mui/material';

const drawerWidth = 180;

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const dummyId = useRef(-1);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(j => setTasks(j.reverse())); // tasks are stored in order of creation in the backend
  }, []); // only run once	

  

  const addTask = (taskText) => {
    if (!taskText) { // if no text specified, do nothing
      return;
    }

    let dummyTask = {
      id: dummyId.current,
      dummy: true
    }
    console.log(dummyTask, dummyId.current)
    dummyId.current -= 1; // negative and decrement to not collide with real task ids
    console.log(dummyTask, dummyId.current)
    setTasks([dummyTask, ...tasks]); // add to the head of tasks

    let task = {
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
        setTasks(cur => cur.map(t => {
          if (t === dummyTask) { // should match exactly the current dummy task via reference
            return actualTask;
          }
          return t; // leave others alone
        }));
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
			{
				tasks.length !== 0
            	? <TaskList tasks={tasks} taskFuncs={{addTask, deleteTask, patchTask, breakdownTask}}/>
				: 
				<div>
					<Typography variant='h4' color="text.secondary" style={{ paddingTop: '50px'}}>No tasks left!</Typography>
					<Typography variant='body1' color="text.secondary" style={{ paddingTop: '5px'}}>Type in the text bar above to add a task.</Typography>
				</div>
			}
        </div>
      </div>
    </>
  )
};

export default Home;