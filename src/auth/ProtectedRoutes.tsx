import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useCustomQuery from "@/hooks/use-cutstom-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();
  const [loading, setLoading] = useState(true);
  const isDemo = !!sessionStorage.getItem("isDemo");

  const navigate = useNavigate();

  const { isSuccess, isError } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token?isGoogleProvider=${user?.isGoogleUser || ""}`,
    options: {
      enabled: isAuthenticated,
    },
  });

  useEffect(() => {
    if (isSuccess || isDemo) {
      setLoading(false);
      return;
    }
    if (isError || !isAuthenticated) {
      Cookies.remove("auth");
      Cookies.remove("auth_state");
      setLoading(false);
      navigate("/login", { replace: true });
    }
  }, [isSuccess, isError]);

  if (loading) {
    return <Loader />;
  }

  if (!isSuccess && !isDemo) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
