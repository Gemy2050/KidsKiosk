import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

import Loader from "@/components/Loader";
import { User } from "@/types";
import useCustomQuery from "@/hooks/use-cutstom-query";

const ProtectDashboard = () => {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();

  const { isLoading } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token`,
    options: {
      enabled: !!user && isAuthenticated,
      gcTime: 1000 * 60 * 10,
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectDashboard;
