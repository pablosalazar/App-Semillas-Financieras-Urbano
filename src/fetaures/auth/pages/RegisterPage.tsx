import { UserForm } from "../components/UserForm";
import type { UserInput } from "../schemas";

export function RegisterPage() {
  const onSubmit = (data: UserInput) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto py-10">
      <UserForm onSubmit={onSubmit} formId="register-form" />

      <button
        type="submit"
        form="register-form"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Registrar
      </button>
    </div>
  );
}
export default RegisterPage;
