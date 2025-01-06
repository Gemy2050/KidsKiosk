import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, Outlet } from "react-router-dom";
import useCustomQuery from "@/hooks/use-cutstom-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const user: User = useAuthUser();
  const [loading, setLoading] = useState(true);
  const isDemo = !!sessionStorage.getItem("isDemo");

  console.log({ user });

  const { isSuccess, isError } = useCustomQuery({
    key: ["verify-token"],
    url: `/account/verify-token?isGoogleProvider=${user?.isGoogleUser || ""}`,
    options: {
      enabled: isAuthenticated,
    },
  });

  console.log({ isSuccess, isError });

  useEffect(() => {
    if (isSuccess) setLoading(false);
    if (isError) setLoading(false);
    if (isDemo || !isAuthenticated) setLoading(false);
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
