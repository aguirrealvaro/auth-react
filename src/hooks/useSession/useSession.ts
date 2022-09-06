import { useQuery } from "react-query";
import { getCurrentUser } from "@/client";

export const useSession = () => {
  const currentUserQuery = useQuery("current", getCurrentUser);
};
