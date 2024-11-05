import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Osu from "next-auth/providers/osu"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import { User as PrismaUser } from "@prisma/client";

declare module "@auth/core/types" {
  interface Session {
    user: PrismaUser & DefaultSession["user"];
  }

  interface User extends PrismaUser { }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    Google,
    Osu
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
});
