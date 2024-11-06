"use server"
import { imageKit } from "@/lib/imageKit"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

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

export const updateAuthor = async (id: string, data: Prisma.AuthorUpdateInput) => {
  const author = await prisma.author.findUnique({
    where: {
      id,
    }
  })

  if (data?.imageId && author?.imageId) {
    imageKit.deleteFile(author.imageId, function (error, result) {
      if (error) throw new Error(error.message);
    });
  }

  return await prisma.author.update({
    where: {
      id,
    },
    data
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