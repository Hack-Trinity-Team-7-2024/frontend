import React, { useEffect } from 'react';
import { TextField, Card, CardContent, CardActions, Typography, IconButton, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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

const Task = ({ task, taskFuncs: { deleteTask, patchTask, breakdownTask } }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [completed, setCompleted] = React.useState(task.completed);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editedPoints, setEditedPoints] = React.useState(task.points);
  const [checkedPoints, setCheckedPoints] = React.useState(task.points_completed);


  // these can get updated when requesting breakdown, but state won't pick this up so we do it manually
  useEffect(() => {
    setEditedPoints(task.points);
    setCheckedPoints(task.points_completed);
  }, [task]);

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
    deleteTask(task);
  };

  const handleBreakdownClick = () => {
    breakdownTask(task);
  }


  const changeCheckboxTo = (val) => {
    setCompleted(val);
    task.completed = val;
    patchTask(task, {completed: task.completed});
  };

  const handleCheckboxChange = (event) => {
    changeCheckboxTo(event.target.checked);
  };

  const handlePointCheckboxChange = (index, event) => {
    // event.stopPropagation();
    if (checkedPoints.every(c => c === true)) { // they're all true right now, so we're about to turn one off!
      changeCheckboxTo(false);
    }

    const newChecked = checkedPoints.map((val, i) => {
      if (i === index) { return !val }
      else             { return  val }
    });

    setCheckedPoints(newChecked);
    task.points_completed = newChecked;
    patchTask(task, {points_completed: task.points_completed});

    if (newChecked.every(c => c === true)) {
      changeCheckboxTo(true);
    }
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
    const trimmedPoints = editedPoints.map(point => point.trim());
    setEditedPoints(trimmedPoints);
    setEditingIndex(null);
    console.log('Updated points:', editedPoints);
    patchTask(task, {points : editedPoints});
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

        {
          editedPoints ?
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            style={expandButtonStyle}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
          </ExpandMore>
          : <IconButton
              aria-label="expand"
              onClick={handleBreakdownClick}
              style={expandButtonStyle}
              >
              <AddCircleIcon />
            </IconButton>
        }
      </CardActions>

      {
        editedPoints ?
        (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {editedPoints.map((point, index) => (
              <div key={index} style={{display: 'flex', alignItems: 'center', textDecoration: checkedPoints[index] ? 'line-through' : 'none',}}>
                <Checkbox
                  checked={checkedPoints[index]}
                  onChange={(event) => handlePointCheckboxChange(index, event)}
                  />
                {editingIndex === index ? (
                  <TextField
                    fullWidth
                    value={point}
                    onChange={(e) => handlePointChange(index, e.target.value)}
                    onClick={() => handlePointClick(index)}
                    onKeyDown={(e) => handlePointKeyDown(index, e)}
                    onBlur={handlePointBlur}
                    autoFocus
                  />
                  ) : (
                    <Typography variant="body1" onClick={() => handlePointClick(index)}>
                    {point}
                  </Typography>
                )}
              </div>
            ))}
          </CardContent>
        </Collapse>
        )
      : <></>
      }
    </Card>
  );
};

export default Task;