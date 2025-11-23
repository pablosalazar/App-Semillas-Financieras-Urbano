import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { userSchema } from "@/features/users/schemas/userSchema";
import { DateInput, SelectInput, TextInput } from "@/shared/components/ui";
import { DOCUMENT_TYPES, GENDER_TYPES } from "@/shared/constants";
import {
  DEPARTMENTS,
  getMunicipalitiesByDepartment,
} from "@/shared/utils/location";
import { useEffect, useMemo, useRef } from "react";
import type { UserInput } from "../types";
import { Avatar } from "@/shared/components/guards/Avatar";

interface UserFormProps {
  onSubmit: SubmitHandler<UserInput>;
  defaultValues?: Partial<UserInput>;
  formId?: string;
}

export function UserForm({ onSubmit, defaultValues, formId }: UserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const selectedDepartment = watch("department");
  const previousDepartmentRef = useRef<string | undefined>(selectedDepartment);

  const municipalities = useMemo(() => {
    if (!selectedDepartment) {
      return [];
    }
    return getMunicipalitiesByDepartment(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(() => {
    // Only clear municipality if department actually changed (not on initial mount)
    if (
      selectedDepartment &&
      previousDepartmentRef.current !== undefined &&
      previousDepartmentRef.current !== selectedDepartment
    ) {
      setValue("municipality", "");
    }
    previousDepartmentRef.current = selectedDepartment;
  }, [selectedDepartment, setValue]);

  const gender = watch("gender");

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="pt-8"
    >
      <Avatar
        gender={gender}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Nombre(s)"
          {...register("firstname")}
          error={errors.firstname?.message}
          required
        />

        <TextInput
          label="Apellido(s)"
          {...register("lastname")}
          error={errors.lastname?.message}
          required
        />

        <SelectInput
          label="Tipo de documento"
          options={DOCUMENT_TYPES}
          {...register("documentType")}
          placeholder="Selecciona un tipo de documento"
          error={errors.documentType?.message}
          clearable
          required
        />

        <TextInput
          label="Número de documento"
          {...register("documentNumber")}
          error={errors.documentNumber?.message}
          required
        />

        <SelectInput
          label="Género"
          options={GENDER_TYPES}
          {...register("gender")}
          placeholder="Selecciona un género"
          error={errors.gender?.message}
          clearable
          required
        />

        <Controller
          control={control}
          name="birthdate"
          render={({ field, fieldState }) => (
            <div>
              <DateInput
                label="Fecha de nacimiento"
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
                required
              />
            </div>
          )}
        />

        <SelectInput
          label="Departamento"
          options={DEPARTMENTS}
          {...register("department")}
          placeholder="Selecciona un departamento"
          error={errors.department?.message}
          clearable
          required
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
          required
        />

        <TextInput
          label="Teléfono"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="Teléfono"
        />

        <TextInput
          label="Correo electrónico"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
    </form>
  );
}
