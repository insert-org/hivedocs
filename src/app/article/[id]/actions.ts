"use server";

import { prisma } from "@/lib/prisma";
import { ObjectId } from "bson";

export const getArticle = async (id: string) => {
  try {
    const article = await prisma.article.update({
      where: {
        id,
      },
      include: {
        author: true,
        reviews: true,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return article;
  } catch (error) {
    return null;
  }
};

export const getReviews = async (
  articleId: string,
  userId: string | undefined
) => {
  const reviews = await prisma.review.findMany({
    where: {
      articleId,
      NOT: {
        userId,
      },
    },
    include: {
      user: true,
      ReviewAnswer: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const getUserReview = async (articleId: string, userId: string) => {
  const reviews = await prisma.review.findFirst({
    where: {
      articleId,
      userId,
    },
    include: {
      user: true,
    },
  });

  return reviews;
};

export const upsertReview = async (
  id: string | undefined,
  articleId: string,
  userId: string,
  data: { rating: number; content: string }
) => {
  const review = await prisma.review.upsert({
    where: {
      id: id ?? new ObjectId().toString(),
      articleId,
      userId,
    },
    update: {
      rating: data.rating,
      content: data.content,
    },
    create: {
      articleId,
      userId,
      rating: data.rating,
      content: data.content,
    },
  });

  return review;
};

export const deleteReview = async (id: string) => {
  await prisma.review.delete({
    where: {
      id,
    },
  });
};

export const deleteAnswer = async (id: string) => {
  await prisma.reviewAnswer.delete({
    where: {
      id,
    },
  });
};

export const upsertAnswer = async (
  id: string | undefined,
  reviewId: string,
  userId: string,
  data: { content: string }
) => {
  const answer = await prisma.reviewAnswer.upsert({
    where: {
      id: id ?? new ObjectId().toString(),
      reviewId,
      userId,
    },
    update: {
      content: data.content,
    },
    create: {
      reviewId,
      userId,
      content: data.content,
    },
  });

  return answer;
};
