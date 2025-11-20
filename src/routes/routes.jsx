import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../auth/Login";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "../auth/PrivateRoute";

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
        },
        {
             
            element:<PrivateRoute> <Dashboard/></PrivateRoute>,
            path:"/dashboard"
        }
    ],
  },
]);

