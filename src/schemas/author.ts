import { z } from "zod";

export const UpdateAuthorSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").max(255, "O nome deve ter no máximo 255 caracteres."),
  resume: z.string().max(255, "O resumo deve ter no máximo 255 caracteres."),
})