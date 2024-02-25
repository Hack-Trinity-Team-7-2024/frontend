import { TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Editable = ({ typographyProps, initialText, saveText }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(initialText);


  const handleClick = () => {
    setEditing(true);
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleBlur = () => {
    setEditedText(initialText);
    setEditing(false);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveText(editedText); /* patch to backend etc */
      setEditing(false);
    } else if (event.key === 'Escape') {
      setEditedText(initialText);
      setEditing(false);
    }
  };

  return editing
    ? <TextField
        fullWidth
        value={editedText}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    : <Typography onClick={handleClick} {...typographyProps}>
        {editedText}
      </Typography>
};
