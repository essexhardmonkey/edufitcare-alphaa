import { NextApiRequest } from "next";
import { SessionBase, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Roles } from "@prisma/client";

declare module "next-auth" {
  interface Session extends SessionBase {
    user: {
      id: number;
      name: string;
      email: string;
      role: Roles;
    };
  }

  interface User extends NextAuthUser {
    id: number;
    role: Roles;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    role: Roles;
  }
}

declare module "next-auth/providers" {
  interface CredentialsProvider<
    CredentialsType extends Record<string, any> = Record<string, any>
  > {
    authorize(
      credentials: CredentialsType,
      req: NextApiRequest
    ): Awaitable<User | null>;
  }
}
