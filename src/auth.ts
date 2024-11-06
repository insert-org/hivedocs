import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Osu from "next-auth/providers/osu"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import { User as PrismaUser } from "@prisma/client";
import { compareSync } from "bcryptjs";
import { GoogleAccount, IncorrectPassword, UserNotFound } from "./utils/errors";
import { encode as defaultEncode } from "next-auth/jwt"
import { v4 as uuid } from "uuid"

declare module "@auth/core/types" {
  interface Session {
    user: PrismaUser & DefaultSession["user"];
  }

  interface User extends PrismaUser { }
}

const adapter = PrismaAdapter(prisma)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  trustHost: true,
  providers: [
    Google,
    Osu,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
          include: {
            accounts: true,
          }
        });

        if (!user) throw new UserNotFound();
        if (user.accounts.length > 0 && user.accounts[0].provider === "google") throw new GoogleAccount();
        if (!compareSync(credentials.password as string, user?.password as string)) throw new IncorrectPassword();

        return user
      },
    })
  ],
  callbacks: {
    session: ({ session, user, trigger, newSession }) => {
      if (trigger === "update" && newSession?.name) {
        session.user.name = newSession.name
      }

      return ({
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      })
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true
      }
      return token
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid()

        if (!params.token.sub) {
          throw new Error("No user ID found in token")
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error("Failed to create session")
        }

        return sessionToken
      }
      return defaultEncode(params)
    },
  },
});
