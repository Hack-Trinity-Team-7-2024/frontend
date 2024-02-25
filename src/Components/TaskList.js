import Task, { SkeletonTask, TaskCard } from './Task';

const TaskList = ({ tasks, taskFuncs }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {tasks.map(task => (
        <TaskCard>
        {
          task.dummy
          ? <SkeletonTask />
          : <Task
              key={task.id}
              task={task}
              taskFuncs={taskFuncs}
              />
        }
        </TaskCard>
      ))}
    </div>
  );
};

export default TaskList;