import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import '../Styles/TypingPopup.css';
import Task from './Task';

const TypingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // only register the handler etc if the popup isn't shown
    if (!showPopup) {
      const handleTyping = (event) => {
        // Check if nothing is currently focused
        if (document.activeElement === document.body) {
          // Check if the pressed key corresponds to a printable character
          const charCode = event.key;
          if (charCode.length === 1 && charCode !== ' ') {
              setShowPopup(true);
          }
        }
      };
  
      document.body.addEventListener('keydown', handleTyping);
  
      return () => {
        document.body.removeEventListener('keydown', handleTyping);
      };
    }
  }, [showPopup]);


  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (taskTitle) => {
    setTasks([...tasks, { title: taskTitle }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(newTask);
    setNewTask('');
    setShowPopup(false);
  }

  return (
    <div className='typing-popup-container'>
      {showPopup && (
          <form onSubmit={handleSubmit}>
            <TextField
              id='outlined-textarea'
              label='New Task'
              placeholder='Start Typing!'
              // multiline
              autoFocus
              variant='filled'
              style={{width:'30vw'}}
              value={newTask}
              onChange={handleTaskChange}
            />
            <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>
              Add Task
            </Button>
          </form>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {tasks.map((task, index) => (
          <Task key={index} title={task.title} />
        ))}
      </div>
    </div>
  )
};

export default TypingPopup;