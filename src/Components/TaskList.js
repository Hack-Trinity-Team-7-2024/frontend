import { Grid } from '@mui/material';
import Task from './Task';

const TaskList = ({ tasks }) => {
  const reversedTasks = [...tasks].reverse();

  const style = {
    display: 'flex',
    // flexDirection: 'column',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  // <Grid container spacing={1}>
  // <Grid item>
  // </Grid>
// </Grid>
  return (
    <div style={style}>

      {reversedTasks.map(task => (
        <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskList;