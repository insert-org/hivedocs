import { z } from "zod";

export const NotificationSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  content: z.string().min(1, "O resumo é obrigatório"),
});
