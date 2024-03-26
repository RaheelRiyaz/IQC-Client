import User from "./User";
import Hero from "./components/Hero";
import Login from "./pages/Login";

export const UserRouterModule = {
  path: "",
  element: <User />,
  children: [
    { path: "", element: <Hero /> },
    { path: "login", element: <Login /> },
  ],
};
