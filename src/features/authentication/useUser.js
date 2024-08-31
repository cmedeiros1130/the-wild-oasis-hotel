import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 5000,
  });
  return {
    isLoading,
    user,
    isAuthenticated: !!user, // Change to check if user exists
    role: user?.role || null, // Add this if you are storing roles
  };
}
