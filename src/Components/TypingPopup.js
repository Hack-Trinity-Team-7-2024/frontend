import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Task from './Task';
import '../Styles/TypingPopup.css';

const TypingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const handleTyping = (event) => {
      if (event.key === 'Enter' && showPopup) {
        event.preventDefault();
        if (newTask.trim() !== '') {
          addTask(newTask);
          setNewTask('');
          setShowPopup(false);
        }
      } else if (event.key === 'Enter' && !showPopup) {
        event.preventDefault();
      } else {
        setShowPopup(true);
      }
    };

    document.body.addEventListener('keydown', handleTyping);

    return () => {
      document.body.removeEventListener('keydown', handleTyping);
    };
  });

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (taskTitle) => {
    setTasks([...tasks, { title: taskTitle }]);
  };

  return (
    <div className='typing-popup-container'>
      {showPopup && (
        <div style={{ width: '30vw', marginBottom: '20px' }}>
          <TextField
            id="outlined-textarea"
            label="New Task"
            placeholder="Start Typing!"
            multiline
            autoFocus
            value={newTask}
            onChange={handleTaskChange}
            fullWidth
          />
          <Button variant="contained" onClick={() => addTask(newTask)} style={{ marginTop: '10px' }}>
            Add Task
          </Button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {tasks.map((task, index) => (
          <Task key={index} title={task.title} />
        ))}
      </div>
    </div>
  );
};

export default TypingPopup;