import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Checkbox, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../Styles/Task.css'
import { SkeletonTaskPoints, TaskPoints } from './TaskPoints';
import { Editable } from './Editable';

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

const titleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const titleStyle = {
  marginLeft: '8px',
};

// this approach needed so that the skeleton and real task share the same card
// so that when they're swapped out, the card stays the same and just updates, instead of being recreated
export const TaskCard = ({ children }) => {
  return (
    <Card style={cardStyle}>
      {children}
    </Card>
  );
}

export const SkeletonTask = () => {
  return (
    <CardContent>
      <div style={titleContainerStyle}>
        <Typography variant="h5" component="div" style={{...titleStyle, width: '100%'}}>
          <Skeleton />
        </Typography>
      </div>
      <Typography variant="body1" color="text.secondary" style={{ paddingTop: '5px', paddingLeft: '15px' }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Typography>
    </CardContent>
  );
};

const Task = ({ task, taskFuncs }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [completed, setCompleted] = React.useState(task.completed);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    taskFuncs.deleteTask(task);
  };

  const handleBreakdownClick = () => {
    taskFuncs.breakdownTask(task);
    setExpanded(true)
  }

  const changeCheckboxTo = (val) => {
    setCompleted(val);
    task.completed = val;
    taskFuncs.patchTask(task, {completed: task.completed});
  };

  const handleCheckboxChange = (event) => {
    changeCheckboxTo(event.target.checked);
  };

  const formattedTime = new Date(task.time/1000000).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const editableUpdateTask = (prop, val) => {
    taskFuncs.patchTask(task, {[prop]: val})
  }

  return (
    <>
      <CardContent>
        <div style={titleContainerStyle}>
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'completed checkbox' }}
          />
          <Editable initialText={task.title} saveText={(t) => editableUpdateTask('title', t)} typographyProps={{
            variant: "h5",
            component: "div",
            style:{...titleStyle, textDecoration: completed ? 'line-through' : 'none'}
            }} />
          <Typography variant="caption" color="text.secondary" flexGrow="1" textAlign="right" whiteSpace="noWrap" marginRight="2px">
            {formattedTime}
          </Typography>
        </div>
        <Editable initialText={task.description} saveText={(t) => editableUpdateTask('description', t)} typographyProps={{
          variant: "body1",
          color: "text.secondary",
          style: { paddingTop: '5px', paddingLeft: '15px' }
          }} />
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
          task.points
          ? <ExpandMore
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {
          task.points
          ? <TaskPoints task={task} taskFuncs={taskFuncs} setTaskCompleted={changeCheckboxTo}/>
          : <SkeletonTaskPoints/>
        }
        </CardContent>
      </Collapse>
    </>
  );
};

export default Task;