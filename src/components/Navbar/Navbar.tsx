import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/contexts";

export const Navbar: FunctionComponent = () => {
  const navivate = useNavigate();

  const { setIsAuth } = useSession();

  const handleLogOut = () => {
    localStorage.removeItem(process.env.AUTH_TOKEN || "auth-token");
    setIsAuth(false);
    navivate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <button onClick={handleLogOut}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};
