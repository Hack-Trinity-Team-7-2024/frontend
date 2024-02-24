import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const TypingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleTyping = (event) => {
        console.log(event.keyCode);
        console.log(event.key);
        if(event.key === 'Enter' && showPopup){
            event.preventDefault();
        }
        else if (event.key === 'Enter' && !showPopup){
            event.preventDefault();
        }
        else{
            setShowPopup(true);
        }
    };

    document.body.addEventListener('keydown', handleTyping);

    return () => {
      document.body.removeEventListener('keydown', handleTyping);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      {showPopup && (
        <TextField
            id="outlined-textarea"
            label="New Task"
            placeholder="Start Typing!"
            multiline
            autoFocus
            style={{width:'30vw'}}
        />
      )}
    </div>
  );
};

export default TypingPopup;
