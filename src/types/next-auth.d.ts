import type { User } from "next-auth";
import "next-auth/jwt";
import { AdminPerms, Fizic, Sex } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    avatar: string;
    email: string;
    varsta: number;
    kg: number;
    inaltime: number;
    sex: Sex;
    fizic: Fizic;
    stilSportiv: string;
    locatie: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      avatar: string;
      email: string;
      varsta: number;
      kg: number;
      inaltime: number;
      sex: Sex;
      fizic: Fizic;
      stilSportiv: string;
      locatie: string;
    };
  }
  interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
    varsta: number;
    inaltime: number;
    kg: number;
    sex: Sex;
    fizic: Fizic;
    stilSportiv: string;
    locatie: string;
  }
}
