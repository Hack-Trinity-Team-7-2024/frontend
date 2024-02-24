import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

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
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
      transition: 'box-shadow 0.3s ease',
    },
    display: hidden ? 'none' : 'block',
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '16px',
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

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle = {
    textDecoration: completed ? 'line-through' : 'none',
    marginLeft: '8px', // Add some spacing between checkbox and title
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
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ol>
            {task.points.map(point =>
              <li>{point}</li>
            )}
          </ol>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Task;