import { FunctionComponent } from "react";
import { useSession } from "@/hooks";

export const Home: FunctionComponent = () => {
  useSession();
  return <div>Home</div>;
};
