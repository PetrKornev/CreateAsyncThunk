import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  markCompleted,
  deleteTask,
  editTasks,
} from "../../redux/thunks/todosThunks";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: "grab",
  };

  const handleSave = () => {
    dispatch(editTasks({ id: task.id, title }));
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") return handleSave();
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`task-item${task.isCompleted ? " completed" : ""}`}
    >
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="task-actions">
            <button onClick={handleSave}>Сохранить</button>
          </div>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => dispatch(markCompleted(task.id))}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <span className="title" {...listeners}>
            {task.title}
          </span>
          <div className="task-actions">
            <button
              onClick={() => setEditing(true)}
              onMouseDown={(e) => e.stopPropagation}
            >
              Редактировать
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              onMouseDown={(e) => e.stopPropagation}
            >
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
