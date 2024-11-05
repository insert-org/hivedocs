import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string(),
  year: z.number(),
  resume: z.string()
})