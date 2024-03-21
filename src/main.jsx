import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminRouterModule } from "./admin/AdminRouting";
import { Provider } from "react-redux";
import { store } from "./store/Store";

const routes = createBrowserRouter([AdminRouterModule]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
