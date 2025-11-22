import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Login from "../auth/Login.jsx";

import PrivateRoute from "../auth/PrivateRoute.jsx";
import Register from "../auth/Register.jsx";
import Teams from "../pages/Teams.jsx";
import Projects from "../pages/Projects.jsx";
import Tasks from "../pages/Tasks.jsx";
import HomePage from "../pages/HomePage.jsx";
import Dashboard from "../pages/dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {
            element:<HomePage/>,
            path:"/",
            index:true
        },
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
        },
        {
             
            element:<PrivateRoute><Projects/></PrivateRoute>,
            path:"/projects"
        },
        {
             
            element:<PrivateRoute><Tasks/></PrivateRoute>,
            path:"/tasks"
        }
    ],
  },
]);

