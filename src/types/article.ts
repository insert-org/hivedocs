import { Prisma } from "@prisma/client";

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
  include: {
    author: true;
    reviews: true;
  }
}>