
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../utils/api";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

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

  if (loading) return <div>checking.....</div>;

  if (!allowed) return <Navigate to="/login" replace />;

  return children;
}
