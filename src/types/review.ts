import { Prisma } from "@prisma/client";

export type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: {
    user: true
  }
}>