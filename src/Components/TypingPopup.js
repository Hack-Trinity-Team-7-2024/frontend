import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
    <form onSubmit={handleSubmit} autoComplete='off' style={{padding: '0.5em 0em'}}>
      <TextField
        id='outlined-textarea'
        label='New Task'
        placeholder='Start Typing!'
        // multiline
        autoFocus
        variant='outlined'
        style={{minWidth:'50vw'}}
        InputProps={{sx: {borderRadius: 20}}}
        value={taskInput}
        onChange={handleTaskChange}
        size='small'
      />
      <IconButton variant="contained" type="submit" >
        <AddCircleIcon/>
      </IconButton>
    </form>
  )
};

export default TypingPopup;