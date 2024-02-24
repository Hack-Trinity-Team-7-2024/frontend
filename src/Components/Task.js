import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
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

const Task = ({ title, description, subTasks }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardStyle = {
    position: 'relative', // Ensure proper positioning for absolute element
    width: '30vw',
    marginBottom: '10px',
    border: '1px solid #293045',
    textAlign: 'left',
    background: 'linear-gradient(45deg, #311b92 30%, #6200ea 90%)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
      transition: 'box-shadow 0.3s ease',
    },
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
  };

  const handleDeleteClick = () => {
    // Implement your delete logic here
    console.log('Delete clicked for task:', title);
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <IconButton
          aria-label="delete"
          onClick={handleDeleteClick}
          style={deleteButtonStyle}
        >
          <DeleteIcon />
        </IconButton>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" style={{ paddingTop: '5px', paddingLeft: '15px'}}>
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end', padding: '8px 16px' }}>
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
          {subTasks}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Task;