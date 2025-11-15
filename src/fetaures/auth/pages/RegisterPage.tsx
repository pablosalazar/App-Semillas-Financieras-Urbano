import type { UserInput } from "@/fetaures/users/types";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserForm } from "../../users/components/UserForm";
import { useRegister } from "../hooks/useRegister";

export function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useRegister({
    onSuccess: () => {
      toast.success("Usuario registrado exitosamente");
      navigate("/login");
    },
    onError: () => {
      toast.error("Algo salió mal, por favor intenta nuevamente");
    },
  });

  const onSubmit = (data: UserInput) => {
    registerUser(data);
  };

  return (
    <div className="container mx-auto py-10">
      {isPending && <Loader />}
      <UserForm
        onSubmit={onSubmit}
        formId="register-form"
        defaultValues={{
          firstname: "Juan Pablo",
          lastname: "Salazar Restrepo",
          documentType: "CC",
          documentNumber: "1061701570",
          gender: "Masculino",
          birthdate: new Date(1987, 8, 15),
          department: "Cauca",
          municipality: "Popayán",
          phone: "3178901234",
          email: "pablo.salazar@gmail.com",
        }}
      />

      <button
        type="submit"
        form="register-form"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Registrando..." : "Registrar"}
      </button>
    </div>
  );
}
export default RegisterPage;
