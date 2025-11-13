import { getUserByDocumentNumber } from "@/fetaures/users/services/user.service";
import type { User } from "@/fetaures/users/types";
import { useMutation } from "@tanstack/react-query";
import type { LoginInput } from "../schemas";

interface UseLoginOptions {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  return useMutation({
    mutationFn: async (loginData: LoginInput): Promise<User> => {
      const user = await getUserByDocumentNumber(loginData.documentNumber);

      if (!user) {
        throw new Error(
          "Usuario no encontrado. Verifica tu número de documento."
        );
      }

      return user;
    },
    onSuccess: (user) => {
      options?.onSuccess?.(user);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
