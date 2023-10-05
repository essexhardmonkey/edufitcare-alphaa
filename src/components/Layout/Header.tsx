import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Button } from '@nextui-org/button'
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Header() {
    const session = await getServerSession(authOptions)

    return(
        <header className="bg-primary text-white">
            <HeaderMenu session={session?.user || null} />
            <div className='w-full h-[60vh] flex items-center justify-center flex-col gap-3'>
                <h1 className='text-2xl lg:text-6xl font-bold text-white'>
                    Edu-FitCare+
                </h1>
                <span className='text-sm lg:text-base font-semibold text-white'>
                    Edu-Fitcare+ iti ofera un plan alimentar personalizat bazat pe preferintele si nevoile tale!  
                </span>
            </div>
        </header>
    )
}