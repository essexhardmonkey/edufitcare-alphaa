import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  parola: z
    .string()
    .min(6, "Parola trebuie sa aiba cel putin 6 caractere")
    .max(50, "Parola nu poate avea mai mult de 50 de caractere"),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "HTTPCredentials",
      id: "HTTPCredentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;

          authSchema.parse({
            email: credentials.email,
            parola: credentials.password,
          });

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const hashPassword = user.password;
            if (hashPassword !== user.password) return null;
            return {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              email: user.email,
              fizic: user.fizic,
              kg: user.kg,
              inaltime: user.inaltime,
              stilSportiv: user.stilSportiv,
              sex: user.sex,
              varsta: user.varsta,
              locatie: user.locatie,
            } as any;
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.avatar = token.avatar;
        session.user.email = token.email;
        session.user.fizic = token.fizic;
        session.user.kg = token.kg;
        session.user.sex = token.sex;
        session.user.inaltime = token.inaltime;
        session.user.stilSportiv = token.stilSportiv;
        session.user.varsta = token.varsta;
        session.user.locatie = token.locatie;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) return token;

      return {
        id: dbUser.id,
        name: dbUser.name,
        avatar: dbUser.avatar,
        email: dbUser.email,
        fizic: dbUser.fizic,
        kg: dbUser.kg,
        inaltime: dbUser.inaltime,
        sex: dbUser.sex,
        stilSportiv: dbUser.stilSportiv,
        varsta: dbUser.varsta,
        locatie: dbUser.locatie,
      } as any;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
