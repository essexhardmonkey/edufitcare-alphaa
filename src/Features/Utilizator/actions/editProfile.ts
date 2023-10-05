"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/../prisma/client";

const profileSchema = z.object({
  varsta: z.number().min(2, "Varsta trebuie sa fie mai mare decat 1"),
  stilSportiv: z
    .string()
    .min(2, "Stilul sportiv trebuie sa aiba cel putin 2 caractere")
    .max(50, "Stilul sportiv nu poate avea mai mult de 50 de caractere"),
  locatie: z
    .string()
    .min(2, "Locatia trebuie sa aiba cel putin 2 caractere")
    .max(50, "Locatia nu poate avea mai mult de 50 de caractere"),
  kg: z.number().min(1, "Kilogramele trebuie sa fie mai mari decat 0"),
});

export default async function editeazaProfilul(
  varsta: number,
  stilSportiv: string,
  locatie: string,
  kg: number
) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Nu esti logat");

  profileSchema.parse({
    varsta,
    stilSportiv,
    locatie,
    kg,
  });

  await prisma.user.update({
    where: {
      id: parseInt(session.user.id),
    },
    data: {
      varsta,
      stilSportiv,
      locatie,
      kg,
    },
  });
}
