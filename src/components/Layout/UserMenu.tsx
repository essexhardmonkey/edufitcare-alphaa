'use client'

import { returnInitials } from "@/utils/general";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserMenu({ session } : { session: User | null }) {
    const router = useRouter();
    if(!session)
        return <></>

    const logOut = async () => {
        if(!session)
            return;
        await signOut({ callbackUrl: '/' }).finally(() => {
            router.refresh()
            toast.success('Te-ai delogat cu succes!')
        })
    }
    return(
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={returnInitials(session.name)}
                    size="sm"
                    src={session.avatar ? '/api/avatar/' + session.avatar : undefined}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className='text-black' variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Esti logat ca</p>
                    <p className="font-semibold">{session.email}</p>
                </DropdownItem>
                <DropdownItem onClick={() => router.push('/utilizator/profil')} key="profil">
                    <Link href='/utilizator/profil'>
                        Profil
                    </Link>
                </DropdownItem>
                <DropdownItem onClick={logOut} key="logout" color="danger">
                    Delogheaza-te
                </DropdownItem>
            </DropdownMenu>
      </Dropdown>
    )
}