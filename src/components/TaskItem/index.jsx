import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  markCompleted,
  deleteTask,
  editTasks,
} from "../../redux/thunks/todosThunks";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    dispatch(editTasks({ id: task.id, title }));
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") return handleSave();
  };

  return (
    <li>
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => dispatch(markCompleted(task.id))}
          />
          {task.title}
          <button onClick={() => setEditing(true)}>Редактировать</button>
          <button onClick={() => dispatch(deleteTask(task.id))}>Удалить</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
