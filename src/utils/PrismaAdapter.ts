import type { PrismaClient, Prisma } from "@prisma/client";
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "@auth/core/adapters";

export function PrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
  const p = prisma as PrismaClient;
  return {
    // We need to let Prisma generate the ID because our default UUID is incompatible with MongoDB
    createUser: async ({ id, ...data }) => {
      console.log("Creating user with data:", data);

      const user = await p.user.create({
        data: {
          ...stripUndefined(data).data, // .data porque stripUndefined retorna { data }
        },
      });

      if (!user.email) throw new Error("User email is null");
      return user as AdapterUser;
    },
    getUser: async (id) => {
      const user = await p.user.findFirst({ where: { id } });
      if (!user || !user.email) return null;
      return user as AdapterUser;
    },
    getUserByEmail: async (email) => {
      const user = await p.user.findFirst({ where: { email } });
      if (!user || !user.email) return null;
      return user as AdapterUser;
    },
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return (account?.user as AdapterUser) ?? null;
    },
    updateUser: ({ id, ...data }) =>
      p.user.update({
        where: { id },
        ...stripUndefined(data),
      }) as Promise<AdapterUser>,
    deleteUser: (id) =>
      p.user.delete({ where: { id } }) as Promise<AdapterUser>,
    linkAccount: (data) =>
      p.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session } as {
        user: AdapterUser;
        session: AdapterSession;
      };
    },
    createSession: (data) => p.session.create(stripUndefined(data)),
    updateSession: (data) =>
      p.session.update({
        where: { sessionToken: data.sessionToken },
        ...stripUndefined(data),
      }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create(
        stripUndefined(data)
      );
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
    async getAccount(providerAccountId, provider) {
      return p.account.findFirst({
        where: { providerAccountId, provider },
      }) as Promise<AdapterAccount | null>;
    },
  };
}

/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */
function stripUndefined<T>(obj: T) {
  const data = {} as T;
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key];
  return { data };
}
