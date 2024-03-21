// import { Navigate } from "react-router-dom";
// import GetToken from "../auth/token";
import Sidebar from "./components/Sidebar";

function Admin() {
  // if (!GetToken()) {
  //   <Navigate to={"home"} />;
  //   return;
  // }

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Admin;
