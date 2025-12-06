import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserProgress } from "../services/user-progress.service";
import type { ModuleProgress } from "../types";

interface UseRegisterProgressOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRegisterProgress = (options?: UseRegisterProgressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      moduleProgress,
    }: {
      userId: string;
      moduleProgress: Omit<ModuleProgress, "startedAt"> & { startedAt?: Date };
    }) => registerUserProgress(userId, moduleProgress),
    onSuccess: (_, variables) => {
      // Invalidate the user progress query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["userProgress", variables.userId],
      });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
