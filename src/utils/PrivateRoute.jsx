import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector((store) => store.auth.token);
  return token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
