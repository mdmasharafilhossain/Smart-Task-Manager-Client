import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../auth/Login";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "../auth/PrivateRoute";
import Register from "../auth/Register";
import Teams from "../pages/Teams";

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
            element:<Register/>,
            path:"/register"
        },
        {
             
            element:<PrivateRoute> <Dashboard/></PrivateRoute>,
            path:"/dashboard"
        },
        {
             
            element:<PrivateRoute><Teams/></PrivateRoute>,
            path:"/teams"
        }
    ],
  },
]);

