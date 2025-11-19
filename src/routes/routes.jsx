import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {
            element:<Login/>,
            path:"/login"
        },
        {
            element:<Login/>,
            path:"/login"
        }
    ],
  },
]);

