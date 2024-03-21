import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Exams from "./pages/exam/Exams";
import AddExam from "./pages/exam/AddExam";
import Admin from "./Admin";
import Faculty from "./pages/Faculty";
import AddNotification from "./pages/notification/AddNotification";
import NotificationComponent from "./pages/notification/NotificationComponent";
import Groups from "./pages/group/Groups";
import AddGroup from "./pages/group/AddGroup";
import Subjects from "./pages/subject/Subjects";
import AddSubject from "./pages/subject/AddSubject";

export const AdminRouterModule = {
  path: "admin",
  element: <Admin />,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "", element: <Navigate to={"dashboard"} /> },
    { path: "students", element: <Students /> },
    { path: "faculty", element: <Faculty /> },

    // Groups
    {
      path: "groups",
      children: [
        { path: "", element: <Groups /> },
        { path: "add", element: <AddGroup /> },
      ],
    },
    // Groups

    //Notifications
    {
      path: "notifications",
      children: [
        { path: "", element: <NotificationComponent /> },
        { path: "add", element: <AddNotification /> },
      ],
    },
    //Notifications

    //Exams
    {
      path: "exams",
      children: [
        { path: "", element: <Exams /> },
        { path: "add", element: <AddExam /> },
      ],
    },
    //Exams

    //Subjects
    {
      path:'subjects',
      children:[
        {
          path:'',
          element:<Subjects />
        },
        {
          path:'add',
          element:<AddSubject />
        },
      ]
    }
    //Subjects
  ],
};
