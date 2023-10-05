'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ProblemeSanatate } from "@prisma/client"
import { getServerSession } from "next-auth"

export default async function getProbleme() {
    'use server'
    const session = await getServerSession(authOptions)
    if(!session)
        return []

    const probleme = await prisma.problemeSanatate.findMany({
        where: {
            userId: session.user.id
        }
    })

    return probleme as ProblemeSanatate[]
}