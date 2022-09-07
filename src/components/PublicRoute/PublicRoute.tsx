import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/contexts";

export const PublicRoute: FunctionComponent = () => {
  const { isAuth, isLoading } = useSession();

  if (isLoading) return null;

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};
