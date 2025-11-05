import { useSelector } from "react-redux";
import DeleteCompletedTasksButton from "../DeleteCompletedTasksButton";

const CounterTasks = () => {
  const store = useSelector((state) => state.todos.todo);

  const lengthActiveTasks = store.filter((item) => !item.isCompleted).length;

  return (
    <div>
      Осталось задач: {lengthActiveTasks} <DeleteCompletedTasksButton />
    </div>
  );
};

export default CounterTasks;
