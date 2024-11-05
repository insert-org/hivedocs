"use server"

import { prisma } from "@/lib/prisma"

export const getAuthors = async () => {
  const authors = await prisma.author.findMany({
    where: {
      approved: true
    }
  })

  return authors
}

export const createArticle = async (data: { title: string, authorName: string, year: number, resume: string }) => {
  const article = await prisma.article.create({
    data: {
      title: data.title,
      year: data.year,
      resume: data.resume,
      author: {
        connectOrCreate: {
          where: {
            name: data.authorName
          },
          create: {
            name: data.authorName
          }
        }
      }
    },
    include: {
      author: true
    }
  })

  return article
}