import Task from './Task';

const TaskList = ({ tasks }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {tasks.map(task => (
        <Task key={task.id} title={task.text} />
      ))}
    </div>
  );
};

export default TaskList;
