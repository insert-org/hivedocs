import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Digite uma senha" }),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(4, { message: "Senha deve ter no mínimo 4 caracteres" }),
})