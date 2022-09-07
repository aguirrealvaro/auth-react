import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/client";
import { AUTH_TOKEN } from "@/constants";

type PrivateRouteProps = {
  component: FunctionComponent;
};

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
}) => {
  const authTokenExists = !!localStorage.getItem(AUTH_TOKEN);

  const { isLoading, isSuccess } = useQuery("router", getCurrentUser, {
    enabled: authTokenExists,
  });

  if (isLoading) return null;

  return isSuccess ? <Component /> : <Navigate to="/login" />;
};
