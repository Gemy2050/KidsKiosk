import Loader from "@/components/Loader";
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
  const signout = useSignOut();

  const { isLoading, isError } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token?isGoogleProvider=${user?.isGoogleUser || ""}`,
    options: {
      enabled: !!user && isAuthenticated,
      retry: false,
      gcTime: 1000 * 60 * 10,
    },
    config: {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!user || isError) {
    signout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
