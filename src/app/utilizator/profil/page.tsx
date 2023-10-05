import Profil from "@/Features/Utilizator/components/Profil"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { returnPageTitle } from "@/utils/general"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: returnPageTitle('Profil')
}

export default async function Page() {
    
    const session = await getServerSession(authOptions)
    if(!session)
        return redirect('/')

    return(
        <Profil />
    )
}