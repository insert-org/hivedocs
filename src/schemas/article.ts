import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  authorName: z.string().min(1, "O autor é obrigatório"),
  year: z.number(),
  resume: z.string().min(1, "O resumo é obrigatório"),
})