import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
  const dipsatch = useDispatch();

  const handleLogout = () => {
    dipsatch(logout());
  };
  return <button onClick={handleLogout}>Выйти</button>;
};

export default Logout;
