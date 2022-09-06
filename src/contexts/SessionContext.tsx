import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCurrentUser, GetCurrentUserReturn } from "@/client";
import { Spinner } from "@/components";
import { AUTH_TOKEN } from "@/constants";

type SessionProviderProps = {
  children: ReactNode;
};

export type ToastContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  user: GetCurrentUserReturn | undefined;
};

const SessionContext = createContext<ToastContextType>({} as ToastContextType);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authTokenExists = !!localStorage.getItem(AUTH_TOKEN);

  const currentUserQuery = useQuery(["users", "current"], getCurrentUser, {
    enabled: authTokenExists,
  });

  useEffect(() => {
    if (currentUserQuery.isSuccess) {
      setIsAuth(true);
    }
  }, [currentUserQuery.isSuccess]);

  return (
    <SessionContext.Provider value={{ isAuth, setIsAuth, user: currentUserQuery.data }}>
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
