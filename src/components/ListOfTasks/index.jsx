import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskItem from "../TaskItem";
import { reorderTasks } from "../../redux/slices/listSlice";

const ListOfTasks = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.todos.todo);
  const filter = useSelector((store) => store.todos.filter);

  const filteredTasks = store.filter((item) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
    const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

    const newOrder = arrayMove(filteredTasks, oldIndex, newIndex);
    dispatch(reorderTasks(newOrder));
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks}
        strategy={verticalListSortingStrategy}
      >
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default ListOfTasks;
