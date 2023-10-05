import type { User } from 'next-auth'
import 'next-auth/jwt'
import {AdminPerms, Fizic, Sex} from "@prisma/client";

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    avatar: string;
    email: string;
    varsta: string;
    kg: string;
    sex: Sex;
    fizic: Fizic;
    stilSportiv: string;
    moderator: number;
  }
 
}

declare module 'next-auth' { 
  interface Session { 
    user: {
        moderator: number;
        id: string;
        name: string;
        avatar: string;
        email: string;
        varsta: string;
        kg: string;
        sex: Sex;
        fizic: Fizic;
        stilSportiv: string;
    }
  }
  interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
    varsta: string;
    kg: string;
    sex: Sex;
    fizic: Fizic;
    stilSportiv: string;
    moderator: number;
  }
}