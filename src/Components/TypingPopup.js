import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../Styles/TypingPopup.css';

const TypingPopup = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState('');

  const handleTaskChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(taskInput);
    setTaskInput('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <TextField
          id='outlined-textarea'
          label='New Task'
          placeholder='Start Typing!'
          // multiline
          autoFocus
          variant='filled'
          style={{width:'30vw'}}
          value={taskInput}
          onChange={handleTaskChange}
        />
        <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>
          Add Task
        </Button>
      </form>
      
    </div>
  )
};

export default TypingPopup;