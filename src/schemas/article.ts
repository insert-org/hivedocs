import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  authorName: z.string().min(1, "O autor é obrigatório"),
  year: z.number(),
  resume: z.string().min(1, "O resumo é obrigatório"),
  url: z.string().url("URL inválida"),
});

export const UpdateArticleSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(255, "O título deve ter no máximo 255 caracteres."),
  resume: z.string().max(255, "O resumo deve ter no máximo 255 caracteres."),
  url: z.string().url("URL inválida"),
});
