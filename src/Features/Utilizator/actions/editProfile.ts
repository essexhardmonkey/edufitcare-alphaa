'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Fizic, Sex } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from '@/../prisma/client'

const profileSchema = z.object({
    fizic: z.nativeEnum(Fizic),
    kg: z.number().min(1, "Kilogramele trebuie sa fie mai mari decat 0"),
    sex: z.nativeEnum(Sex),
    stilSportiv: z.string().min(2, "Stilul sportiv trebuie sa aiba cel putin 2 caractere").max(50, "Stilul sportiv nu poate avea mai mult de 50 de caractere"),
    varsta: z.number().min(2, "Varsta trebuie sa fie mai mare decat 1")
})

export default async function editeazaProfilul(fizic: Fizic, sex: Sex, varsta: string, stilSportiv: string, kg: string) {
    'use server'
    const session = await getServerSession(authOptions)
    if(!session)
        throw new Error("Nu esti logat")
    profileSchema.parse({
        fizic,
        sex,
        varsta: Number(varsta),
        stilSportiv,
        kg: Number(kg)
    })

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            fizic,
            sex,
            varsta,
            stilSportiv,
            kg
        }
    })
}