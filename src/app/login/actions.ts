"use server"

import { signIn } from "@/auth"

export const signInCredentials = async (email: string, password: string) => {
  return await signIn("credentials", {
    email,
    password,
    redirect: false
  })
}