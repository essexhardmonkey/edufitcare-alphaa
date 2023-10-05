'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { z } from "zod"


const numeProblemaSchema = z.string().min(2, "Problema trebuie sa aiba cel putin 2 caractere").max(50, "Problema nu poate avea mai mult de 50 de caractere")


export async function creeazaProblema(value: string) {
    'use server'
    const session = await getServerSession(authOptions)
    if(!session)
        throw new Error("Nu esti logat")
    numeProblemaSchema.parse(value)

    const detaliiProblema = await prisma.problemeSanatate.findFirst({
        where: {
            problema: value
        }
    })

    if(detaliiProblema)
        throw new Error("Problema deja exista")

    await prisma.problemeSanatate.create({
        data: {
            problema: value,
            user: {
                connect: {
                    id: session.user.id
                }
            }
        }
    })
}


export async function stergeProblema(id: string) {
    'use server'
    const session = await getServerSession(authOptions)
    if(!session)
        throw new Error("Nu esti logat")

    const detaliiProblema = await prisma.problemeSanatate.findFirst({
        where: {
            id,
            userId: session.user.id
        }
    })

    if(!detaliiProblema)
        throw new Error("Problema nu exista")

    await prisma.problemeSanatate.delete({
        where: {
            id
        }
    })
}