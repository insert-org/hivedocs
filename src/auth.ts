import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Osu from "next-auth/providers/osu"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Osu
  ],
  // debug: true
});
