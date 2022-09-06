import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useNavbar } from "@/hooks";

export const Navbar: FunctionComponent = () => {
  const { items } = useNavbar();

  return (
    <nav>
      <ul>
        {items.map(({ label, url, onClick, enable }) => {
          if (!enable) return;

          return (
            <li key={label}>
              {url ? (
                <Link to={url}>{label}</Link>
              ) : (
                <button onClick={onClick}>Log out</button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
