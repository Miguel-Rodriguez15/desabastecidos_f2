import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const isTokenPresent = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [tokenPresent, setTokenPresent] = useState(false);

  useEffect(() => {
    setTokenPresent(isTokenPresent());
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return tokenPresent ? <Outlet /> : <Navigate to="/SignIn" replace />;
};

export default PrivateRoute;
