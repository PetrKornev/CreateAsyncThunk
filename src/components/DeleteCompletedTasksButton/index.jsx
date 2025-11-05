import { useDispatch } from "react-redux";
import { deleteCompletedTask } from "../../redux/thunks/todosThunks";

const DeleteCompletedTasksButton = () => {
  const dispatch = useDispatch();

  const handleDeleteAllTasks = () => {
    dispatch(deleteCompletedTask());
  };
  return (
    <button onClick={() => handleDeleteAllTasks()}>Очистить выполненные</button>
  );
};

export default DeleteCompletedTasksButton;
