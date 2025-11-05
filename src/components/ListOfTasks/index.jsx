import { useSelector } from "react-redux";
import TaskItem from "../TaskItem";

const ListOfTasks = () => {
  const store = useSelector((store) => store.todos.todo);
  const filter = useSelector((store) => store.todos.filter);

  const filteredTasks = store.filter((item) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default ListOfTasks;
