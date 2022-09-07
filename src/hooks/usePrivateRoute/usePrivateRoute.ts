import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/contexts";

export const usePrivateRoute = () => {
  const { isAuth } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) return;
    navigate("/login");
  }, [isAuth, navigate]);
};
