import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotificationBar from "./components/NotificationBar";

function User() {
  return (
    <div>
      <Navbar />
      <NotificationBar />
      <Outlet />
    </div>
  );
}

export default User;
