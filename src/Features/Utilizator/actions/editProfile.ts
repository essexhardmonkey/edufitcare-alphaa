"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/../prisma/client";

const profileSchema = z.object({
  kg: z.number().min(1, "Kilogramele trebuie sa fie mai mari decat 0"),
  stilSportiv: z
    .string()
    .min(2, "Stilul sportiv trebuie sa aiba cel putin 2 caractere")
    .max(50, "Stilul sportiv nu poate avea mai mult de 50 de caractere"),
  varsta: z.number().min(2, "Varsta trebuie sa fie mai mare decat 1"),
  locatie: z
    .string()
    .min(2, "Locatia trebuie sa aiba cel putin 2 caractere")
    .max(50, "Locatia nu poate avea mai mult de 50 de caractere"),
});

export default async function editeazaProfilul(
  varsta: string,
  stilSportiv: string,
  kg: string,
  locatie: string
) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Nu esti logat");
  profileSchema.parse({
    varsta: Number(varsta),
    stilSportiv,
    locatie,
    kg: Number(kg),
  });

  await prisma.user.update({
    where: {
      id: parseInt(session.user.id),
    },
    data: {
      varsta,
      stilSportiv,
      kg,
      locatie,
    },
  });
}
