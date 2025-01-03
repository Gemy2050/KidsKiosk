import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(true);
  const isDemo = !!sessionStorage.getItem("isDemo");

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated && !isDemo) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
