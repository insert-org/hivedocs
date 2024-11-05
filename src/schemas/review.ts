import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.number().min(0.5).max(5),
  content: z.string().max(500),
})