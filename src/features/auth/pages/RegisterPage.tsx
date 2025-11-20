import type { UserInput } from "@/features/users/types";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserForm } from "../../users/components/UserForm";
import { useRegister } from "../hooks/useRegister";
import { CloseButton } from "@/shared/components/CloseButton";

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
    <div className="card-withe-transparent w-full md:max-w-[60%] mx-auto p-4 sm:p-6 md:p-10 space-y-6">
      <CloseButton redirectTo="/login" className="absolute -top-5 -right-5" />

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
        className="btn btn-orange"
      >
        {isPending ? "Registrando..." : "Registrar"}
      </button>
    </div>
  );
}
export default RegisterPage;
