'use client'

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import { User } from "next-auth"
import UserMenu from "./UserMenu"


export default function HeaderMenu({ session } : { session: User | null }) {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if(isMenuOpen) setIsMenuOpen(false)
    }, [pathname])

    return(
        <Navbar className='bg-primary' onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href='/' className="font-bold text-inherit">Edu-FitCare+</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    session ? (
                        <UserMenu session={session} />
                    ) : (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <LoginButton />
                            </NavbarItem>
                            <NavbarItem>
                                <RegisterButton />
                            </NavbarItem>
                        </>
                    )
                }
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link
                    className="w-full"
                    href="#"
                    >
                        Test
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}