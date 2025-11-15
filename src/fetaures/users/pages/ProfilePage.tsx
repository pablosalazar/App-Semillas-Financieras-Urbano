import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserForm } from "../components/UserForm";
import { useUpdate } from "../hooks/useUpdate";
import type { UserInput } from "../types";

export default function ProfilePage() {
  const user = useAuthenticatedUser();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: updateUser, isPending } = useUpdate({
    onSuccess: (updatedUser) => {
      // Update user in context with the latest data from the server
      setUser(updatedUser);
      toast.success("Perfil actualizado exitosamente");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error.message || "Algo salió mal, por favor intenta nuevamente"
      );
    },
  });

  const handleCancel = () => {
    navigate("/");
  };

  const onSubmit = (data: UserInput) => {
    // Merge UserInput with existing user data (id, createdAt, updatedAt)
    const userToUpdate = {
      ...data,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    updateUser(userToUpdate);
  };

  return (
    <div className="container mx-auto p-6">
      {isPending && <Loader />}
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <UserForm
          onSubmit={onSubmit}
          formId="update-profile-form"
          defaultValues={user}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="update-profile-form"
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Actualizando..." : "Actualizar perfil"}
          </button>
        </div>
      </div>
    </div>
  );
}
