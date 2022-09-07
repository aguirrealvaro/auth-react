import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "@/contexts";

type PrivateRouteProps = {
  component: FunctionComponent;
};

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuth, isLoading } = useSession();

  if (isLoading) return null;

  return isAuth ? <Component /> : <Navigate to="/login" />;
};
