import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas";

import { DOCUMENT_TYPES } from "@/shared/constants";
import { DateInput, SelectInput, TextInput } from "@/shared/components/ui";
import { DEPARTMENTS, getMunicipalitiesByDepartment } from "@/shared/utils/location";
import { useEffect, useMemo } from "react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const selectedDepartment = watch("department");

  const municipalities = useMemo(() => {
    if (!selectedDepartment) {
      return [];
    }
    return getMunicipalitiesByDepartment(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment) {
      setValue("municipality", "");
    }
  }, [selectedDepartment, setValue]);

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
  };

  console.log(watch("birthdate"));

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextInput
          label="First Name"
          {...register("firstname")}
          error={errors.firstname?.message}
          required
        />

        <TextInput
          label="Last Name"
          {...register("lastname")}
          error={errors.lastname?.message}
        />

        <SelectInput
          label="Tipo de documento"
          options={DOCUMENT_TYPES}
          {...register("documentType")}
          placeholder="Selecciona un tipo de documento"
          error={errors.documentType?.message}
          clearable
        />

        <TextInput
          label="Document Number"
          {...register("documentNumber")}
          error={errors.documentNumber?.message}
        />

        <TextInput
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <DateInput
          label="Fecha de Nacimiento"
          {...register("birthdate", {
            setValueAs: (v) => (v ? new Date(v) : null),
          })}
          error={errors.birthdate?.message}
          placeholder="DD/MM/AAAA"
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
          required={true}
        />

        <SelectInput
          label="Departamento"
          options={DEPARTMENTS}
          {...register("department")}
          placeholder="Selecciona un departamento"
          error={errors.department?.message}
          clearable
        />

        <SelectInput
          label="Municipio"
          options={municipalities}
          {...register("municipality")}
          placeholder={
            selectedDepartment
              ? "Selecciona un municipio"
              : "Primero selecciona un departamento"
          }
          error={errors.municipality?.message}
          disabled={!selectedDepartment || municipalities.length === 0}
          clearable
        />

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
