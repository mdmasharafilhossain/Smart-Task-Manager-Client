
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../utils/api";
import Loader from "../components/Shared/Loader";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
const token =  localStorage.getItem("token");
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        const exists = !!res.data?.user;
        setAllowed(exists);
        if (!exists) {
          localStorage.clear(); 
        }
      })
      .catch(() => {
        localStorage.clear();   
        setAllowed(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader/>;

  if (!allowed || !token) return <Navigate to="/login" replace />;

  return children;
}
