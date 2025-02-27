import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { API } from "./MainStore.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <ApiProvider api={API}>
      <App />
    </ApiProvider>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <p>Contact Us</p>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
