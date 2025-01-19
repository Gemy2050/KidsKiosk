import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

import Loader from "@/components/Loader";
import { User } from "@/types";
import useCustomQuery from "@/hooks/use-cutstom-query";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const ProtectDashboard = () => {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();
  const signout = useSignOut();

  const { isLoading, isError } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token`,
    options: {
      enabled: !!user && isAuthenticated,
      retry: false,
      gcTime: 1000 * 60 * 10,
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!user || isError || user.role !== "admin") {
    signout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectDashboard;
