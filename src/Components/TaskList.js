import Task from './Task';

const TaskList = ({ tasks }) => {
  const reversedTasks = [...tasks].reverse();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {reversedTasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;