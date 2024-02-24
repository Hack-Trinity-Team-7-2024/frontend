import Task from './Task';

const TaskList = ({ tasks, taskFuncs }) => {
  const reversedTasks = [...tasks].reverse();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {reversedTasks.map(task => (
        <Task
          key={task.id}
          task={task}
          taskFuncs={taskFuncs}
        />
      ))}
    </div>
  );
};

export default TaskList;