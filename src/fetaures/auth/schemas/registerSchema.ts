import { z } from "zod";
import { validationMessages } from "@/shared/constants/validationMessages";
import { DOCUMENT_TYPES_VALUES } from "@/shared/constants";

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50)),

  lastname: z
    .string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50)),

  documentType: z.enum(DOCUMENT_TYPES_VALUES, validationMessages.selectOption),

  documentNumber: z
    .string()
    .min(1, validationMessages.required)
    .min(5, validationMessages.minLength(5))
    .max(20, validationMessages.maxLength(20))
    .regex(/^[0-9]+$/, validationMessages.numbersOnly),

  email: z.email(validationMessages.invalidEmail),
  birthdate: z.date(validationMessages.invalidDate),
});

export type RegisterInput = z.infer<typeof registerSchema>;
