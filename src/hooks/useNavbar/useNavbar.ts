import { useSession } from "@/contexts";

type NavbarItem = {
  label: string;
  url?: string;
  onClick?: () => void;
  enable?: boolean;
};

type UseNavbarReturn = {
  items: NavbarItem[];
};

export const useNavbar = (): UseNavbarReturn => {
  const { isAuth, handleLogOut } = useSession();

  const items: NavbarItem[] = [
    { label: "Home", url: "/" },
    { label: "Register", url: "/register", enable: !isAuth },
    { label: "Login", url: "/login", enable: !isAuth },
    { label: "Log out", onClick: handleLogOut, enable: isAuth },
  ];

  return { items };
};
