import Task from './Task';

const TaskList = ({ tasks }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {tasks.map(task => (
        <Task key={task.id} title="Title" description={task.text} subTasks={<code>1. Complete Task<br/>2. Profit</code>}/>
      ))}
    </div>
  );
};

export default TaskList;
