import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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
  user: GetCurrentUserReturn | undefined;
};

const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authTokenExists = !!localStorage.getItem(AUTH_TOKEN);

  const currentUserQuery = useQuery("current", getCurrentUser, {
    enabled: authTokenExists,
  });

  useEffect(() => {
    if (currentUserQuery.isSuccess) {
      setIsAuth(true);
    }
  }, [currentUserQuery.isSuccess]);

  const navigate = useNavigate();

  const handleLogIn = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setIsAuth(true);
    navigate("/");
  };

  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <SessionContext.Provider
      value={{ isAuth, handleLogIn, handleLogOut, user: currentUserQuery.data }}
    >
      {currentUserQuery.isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        children
      )}
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
