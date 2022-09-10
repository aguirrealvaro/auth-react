import { createContext, FunctionComponent, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUser, GetCurrentUserReturn } from "@/client";
import { Spinner } from "@/components";
import { AUTH_TOKEN } from "@/constants";

type SessionProviderProps = {
  children: ReactNode;
};

export type SessionContextValue = {
  isAuth: boolean;
  handleLogIn: (token: string) => void;
  handleLogOut: () => void;
  isLoading: boolean;
  user: GetCurrentUserReturn | undefined;
};

type LocationState = {
  from: string;
};

const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authTokenExists = !!localStorage.getItem(AUTH_TOKEN);

  const currentUserQuery = useQuery(["current-user"], getCurrentUser, {
    enabled: authTokenExists,
    onSuccess: () => setIsAuth(true),
  });

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogIn = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setIsAuth(true);
    const previousPath = (location.state as LocationState | undefined)?.from;
    navigate(previousPath || "/");
  };

  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsAuth(false);
    navigate("/login");
  };

  if (currentUserQuery.isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner size="large" />
      </SpinnerWrapper>
    );
  }

  return (
    <SessionContext.Provider
      value={{
        isAuth,
        handleLogIn,
        handleLogOut,
        isLoading: currentUserQuery.isLoading,
        user: currentUserQuery.data,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

const SpinnerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
