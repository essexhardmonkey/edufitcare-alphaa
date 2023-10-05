"use server";

import { hashPassword } from "@/utils/general";
import { z } from "zod";
import prisma from "@/../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const registerSchema = z.object({
  nume: z
    .string()
    .min(2, "Numele trebuie sa aiba cel putin 2 caractere")
    .max(50, "Numele nu poate avea mai mult de 50 de caractere"),
  email: z.string().email("Email invalid"),
  parola: z
    .string()
    .min(6, "Parola trebuie sa aiba cel putin 6 caractere")
    .max(50, "Parola nu poate avea mai mult de 50 de caractere"),
  varsta: z.string(),
  kg: z.string(),
  inaltime: z.string(),
});

export default async function registerApi(
  nume: string,
  email: string,
  parola: string,
  varsta: string,
  kg: string,
  inaltime: string
) {
  "use server";
  const session = await getServerSession(authOptions);
  if (session) throw new Error("Sesiune deja existenta");

  registerSchema.parse({
    nume,
    email,
    parola,
    varsta,
    kg,
    inaltime,
  });
  const detailsExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (detailsExists) throw new Error("Email deja folosit");

  const hashedPassword = hashPassword(parola);

  await prisma.user.create({
    data: {
      name: nume,
      email,
      password: hashedPassword,
      varsta,
      kg,
      inaltime,
    },
  });
}
