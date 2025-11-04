import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas";
import { Select } from "@/shared/components/ui/Select";
import { DOCUMENT_TYPES } from "@/shared/constants";
import { DatePicker } from "@/shared/components/ui/DatePicker";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
  };

  console.log(watch("birthdate"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium">
            First Name
          </label>
          <input
            id="firstname"
            {...register("firstname")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.firstname && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastname"
            {...register("lastname")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.lastname && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastname.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="documentType" className="block text-sm font-medium">
            Document Type
          </label>
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <Select
                options={DOCUMENT_TYPES}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecciona un tipo de documento"
                error={errors.documentType?.message}
                clearable
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="documentNumber" className="block text-sm font-medium">
            Document Number
          </label>
          <input
            id="documentNumber"
            {...register("documentNumber")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.documentNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.documentNumber.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 ">
            Fecha de Nacimiento
          </label>

          <Controller
            control={control}
            name="birthdate"
            render={({ field, fieldState }) => (
              <div>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="DD/MM/AAAA"
                  error={fieldState.error?.message}
                  clearable
                  disabled={isSubmitting}
                  minDate={
                    new Date(
                      new Date().getFullYear() - 100,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  maxDate={new Date()}
                />
              </div>
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
