import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "../redux/thunks/todosThunks";
import Header from "../components/Header";
import Input from "../components/Input";
import ListOfTasks from "../components/ListOfTasks";
import FilterButton from "../components/FilterButton";
import CounterTasks from "../components/CounterTasks";
import Logout from "../components/Logout";

const TodoPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  return (
    <>
      <Header />
      <Input />
      <ListOfTasks />
      <FilterButton />
      <CounterTasks />
      <Logout />
    </>
  );
};

export default TodoPage;
