import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";
import useCustomQuery from "@/hooks/use-cutstom-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";
import Cookies from "js-cookie";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();
  const [loading, setLoading] = useState(true);
  const isDemo = !!sessionStorage.getItem("isDemo");

  const signOut = useSignOut();

  const { isSuccess, isError } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token?isGoogleProvider=${user?.isGoogleUser || ""}`,
    options: {
      enabled: !!user && isAuthenticated,
      retry: false,
    },
    config: {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
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
      signOut();
      setLoading(false);
    }
  }, [isSuccess, isError]);

  if (loading) {
    return <Loader />;
  }

  if (!user || isError || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
