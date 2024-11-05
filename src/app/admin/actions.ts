"use server"
import { prisma } from "@/lib/prisma"

export const getAuthors = async (query: string) => {
  return await prisma.author.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      approved: "asc",
    }
  })
}

export const updateAuthor = async (id: string, approved: boolean) => {
  return await prisma.author.update({
    where: {
      id,
    },
    data: {
      approved,
    },
  })
}

export const getArticles = async (query: string) => {
  return await prisma.article.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      approved: "asc",
    },
    include: {
      author: true
    }
  })
}

export const updateArticle = async (id: string, approved: boolean) => {
  return await prisma.article.update({
    where: {
      id,
    },
    data: {
      approved,
    },
  })
}