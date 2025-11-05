import { Routes, Route } from "react-router";

import Login from "../components/Login";
import TodoPage from "./TodoPage";
import PrivateRoute from "../utils/PrivateRoute";

import "./App.css";
import Registration from "../components/Registration";

function MainPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<PrivateRoute />}>
          <Route path="/toDoList" element={<TodoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainPage;
