import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, TextField } from '@mui/material';

const TypingPopup = ({ addTask }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('test', inputValue);
    addTask(inputValue);
    setInputValue('');
    setShowPopup(false);
  }

  return <>
    {showPopup && (
      <div className='typingPopup'>
        <form onSubmit={handleSubmit}>
          <TextField
              id='outlined-textarea'
              label='New Task'
              placeholder='Start Typing!'
              // multiline
              autoFocus
              variant='filled'
              style={{width:'30vw'}}
              value={inputValue}
              onChange={handleChange}
              />
          <IconButton type='submit' style={{height: '100%'}}>
            <AddIcon/>
          </IconButton>
        </form>
        </div>
    )}
  </>
};

export default TypingPopup;
