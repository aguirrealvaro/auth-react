import { FunctionComponent } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/contexts";

export const PrivateRoute: FunctionComponent = () => {
  const { isAuth, isLoading } = useSession();

  const location = useLocation();

  if (isLoading) return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />;
};
