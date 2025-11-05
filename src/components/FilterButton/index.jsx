import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/slices/listSlice";

const FilterButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(setFilter("all"))}>Все</button>
      <button onClick={() => dispatch(setFilter("active"))}>Активные</button>
      <button onClick={() => dispatch(setFilter("completed"))}>
        Выполненные
      </button>
    </>
  );
};

export default FilterButton;
