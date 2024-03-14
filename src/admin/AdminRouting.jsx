import { Navigate } from "react-router-dom";
import App from "../App";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Exams from "./pages/exam/Exams";
import AddExam from "./pages/exam/AddExam";

export const AdminRouterModule = {
  path: "",
  element: <App />,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "", element: <Navigate to={"dashboard"} /> },
    { path: "students", element: <Students /> },
    { path: "exams", children:[
        {path:'',element:<Exams />},
        {path:'add',element:<AddExam />},
    ]},
  ],
};
