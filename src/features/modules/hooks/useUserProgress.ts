import { useQuery } from "@tanstack/react-query";
import { getUserProgress } from "../services/user-progress.service";

interface UseUserProgressOptions {
  enabled?: boolean;
}

export const useUserProgress = (
  userId: string,
  options?: UseUserProgressOptions
) => {
  return useQuery({
    queryKey: ["userProgress", userId],
    queryFn: () => getUserProgress(userId),
    enabled: options?.enabled ?? !!userId,
  });
};
