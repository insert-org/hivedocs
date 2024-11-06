"use server"

import { prisma } from "@/lib/prisma"

export const changeName = async (name: string, userId: string) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name
    }
  })
}