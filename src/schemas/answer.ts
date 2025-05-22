import { z } from "zod";

export const AnswerSchema = z.object({
  content: z.string().min(1, "O conteúdo é obrigatório"),
});
