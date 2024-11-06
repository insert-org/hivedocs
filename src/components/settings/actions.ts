"use server"

import { imageKit } from "@/lib/imageKit"
import { prisma } from "@/lib/prisma"
import { createHmac, randomUUID } from "crypto"
import ImageKit from "imagekit"

export const changeName = async (userId: string, name: string) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name
    }
  })
}

export const changePhoto = async (userId: string, image: string, imageId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (user?.imageId) {
    imageKit.deleteFile(user.imageId, function (error, result) {
      if (error) throw new Error(error.message);
    });
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      image,
      imageId
    }
  })
}

export const authorizeImageKit = async () => {
  const token = randomUUID().toString();
  const expire = (Math.floor(Date.now() / 1000) + 2400);
  const privateAPIKey = process.env.PRIVATE_KEY || "";
  const signature = createHmac('sha1', privateAPIKey).update(token + expire).digest('hex');

  return {
    token,
    expire,
    signature
  }
}