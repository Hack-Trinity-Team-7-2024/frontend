import React, { useEffect } from 'react';
import { TextField, Card, CardContent, CardActions, Typography, IconButton, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Styles/Task.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Task = ({ task }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editedPoints, setEditedPoints] = React.useState([...task.points]);

  useEffect(()=>{
    console.log("Yo");

    return () => {
      console.log("unload")
    }
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardStyle = {
    position: 'relative',
    width: '50vw',
    marginBottom: '10px',
    border: '1px solid #293045',
    textAlign: 'left',
    background: 'linear-gradient(45deg, #311b92 30%, #6200ea 90%)',
    display: hidden ? 'none' : 'block',
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '0.5em',
    right: '0.5em',
  };
  
  const expandButtonStyle = {
    position: 'absolute',
    top: '2em',
    right: '0.5em',
  };

  const handleDeleteClick = () => {
    setHidden(true);
  };

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
	task.completed = event.target.checked

	fetch('/api/tasks/' + task.id,
	{
	  method: 'PATCH',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(task)
	}
  )
  };

  const handlePointClick = (index) => {
    setEditingIndex(index);
  };

  const handlePointKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      handlePointBlur();
    }
  };

  const handlePointChange = (index, newText) => {
    const updatedPoints = [...editedPoints];
    updatedPoints[index] = newText;
    setEditedPoints(updatedPoints);
  };

  const handlePointBlur = () => {
    const trimmedPoints = editedPoints.map(point => point.trim()).filter(Boolean);
    setEditedPoints(trimmedPoints);
    setEditingIndex(null);
    console.log('Updated points:', editedPoints);
    fetch('/api/tasks/' + task.id,
    {
      method: 'PATCH',
	    headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({points : editedPoints})
    });
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle = {
    textDecoration: completed ? 'line-through' : 'none',
    marginLeft: '8px',
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <div style={titleContainerStyle}>
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'completed checkbox' }}
          />
          <Typography variant="h5" component="div" style={titleStyle}>
            {task.title}
          </Typography>
        </div>
        <Typography variant="body1" color="text.secondary" style={{ paddingTop: '5px', paddingLeft: '15px' }}>
          {task.description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end', padding: '8px 16px' }}>
        <IconButton
          aria-label="delete"
          onClick={handleDeleteClick}
          style={deleteButtonStyle}
        >
          <DeleteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          style={expandButtonStyle}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <ol>
          {editedPoints.map((point, index) => (
            <li key={index} onClick={() => handlePointClick(index)}>
              {editingIndex === index ? (
                <TextField
                  fullWidth
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  onKeyDown={(e) => handlePointKeyDown(index, e)}
                  onBlur={handlePointBlur}
                  autoFocus
                />
              ) : (
                <Typography variant="body1">
                  {point}
                </Typography>
              )}
            </li>
          ))}
        </ol>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Task;