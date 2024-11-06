"use server"

import { prisma } from "@/lib/prisma"
import { hashSync, genSaltSync } from "bcryptjs"
import { faker } from '@faker-js/faker';

type CreateUserProps = {
  email: string
  password: string
}

export const createUser = async ({ email, password }: CreateUserProps) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (user) throw new Error("Usuário já existe")

  const saltRounds = 10
  const salt = genSaltSync(saltRounds)
  const hashedPassword = hashSync(password, salt)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: faker.internet.displayName(),
    }
  })
}