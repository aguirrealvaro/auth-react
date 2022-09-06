import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "@/contexts";

interface PrivateRouteProps {
  component: FunctionComponent;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuth } = useSession();

  if (isAuth) return <Component />;

  return <Navigate to="/login" />;
};
