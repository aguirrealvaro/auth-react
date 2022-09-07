import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "@/contexts";

type PrivateRouteProps = {
  component: FunctionComponent;
};

// not working
export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuth } = useSession();

  return isAuth ? <Component /> : <Navigate to="/login" />;
};
