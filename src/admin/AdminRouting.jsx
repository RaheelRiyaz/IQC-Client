import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Exams from "./pages/exam/Exams";
import AddExam from "./pages/exam/AddExam";
import Admin from "./Admin";
import Faculty from "./pages/Faculty";

export const AdminRouterModule = {
  path: "admin",
  element: <Admin />,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "", element: <Navigate to={"dashboard"} /> },
    { path: "students", element: <Students /> },
    { path: "faculty", element: <Faculty /> },
    { path: "exams", children:[
        {path:'',element:<Exams />},
        {path:'add',element:<AddExam />},
    ]
  },
  ],
};
