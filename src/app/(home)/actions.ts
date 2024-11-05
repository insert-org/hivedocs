"use server"
import { prisma } from "@/lib/prisma"

export const getArticles = async () => {
  const articles = await prisma.article.findMany({
    where: {
      approved: true,
      author: {
        approved: true
      }
    },
    include: {
      author: true
    },
    orderBy: {
      views: "desc"
    },
    take: 15
  })

  return articles
}