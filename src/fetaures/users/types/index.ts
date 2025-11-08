import type { z } from "zod";
import type { userSchema } from "../schemas/userSchema";

export type UserInput = z.infer<typeof userSchema>;
export type User = UserInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
