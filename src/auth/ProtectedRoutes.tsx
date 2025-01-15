import Loader from "@/components/Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";
import useCustomQuery from "@/hooks/use-cutstom-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();

  const { isLoading } = useCustomQuery({
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

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
