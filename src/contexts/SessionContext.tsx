import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { getCurrentUser, GetCurrentUserReturn } from "@/client";

type SessionProviderProps = {
  children: ReactNode;
};

export type ToastContextType = {
  isAuth: boolean;
  user: GetCurrentUserReturn | undefined;
};

const SessionContext = createContext<ToastContextType>({} as ToastContextType);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const currentUserQuery = useQuery("current", getCurrentUser);

  useEffect(() => {
    if (currentUserQuery.isSuccess) {
      setIsAuth(true);
    }
  }, [currentUserQuery.isSuccess]);

  return (
    <SessionContext.Provider value={{ isAuth, user: currentUserQuery.data }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
