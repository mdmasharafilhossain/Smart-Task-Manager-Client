import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./AuthContext";


export default function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

 
  const storedToken = JSON.parse(localStorage.getItem("token"));


  const isAuthenticated =
    user &&
    storedToken &&
    user.token &&
    storedToken === user.token;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
