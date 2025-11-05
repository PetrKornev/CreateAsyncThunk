import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTasks } from "../../redux/thunks/todosThunks";

const Input = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTasks({ title: text.trim() }));
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <>
      <input
        placeholder="Введите задачу"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Добавить</button>
    </>
  );
};

export default Input;
