import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "@/constants";
import { useSession } from "@/contexts";

interface PrivateRouteProps {
  component: FunctionComponent;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuth } = useSession();

  const authTokenExists = !!localStorage.getItem(AUTH_TOKEN);

  return authTokenExists ? <Component /> : <Navigate to="/login" />;
};
