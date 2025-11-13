import { useAuth } from "@/context";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";
import type { LoginInput } from "../schemas";

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: (user) => {
      setUser(user);
      toast.success(`Bienvenido, ${user.firstname} ${user.lastname}`);
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error.message || "Algo salió mal, por favor intenta nuevamente"
      );
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginUser(data);
  };

  return (
    <div className="container mx-auto py-10">
      {isPending && <Loader />}
      <LoginForm onSubmit={onSubmit} formId="login-form" />

      <button
        type="submit"
        form="login-form"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </div>
  );
}
export default LoginPage;
