'use client'

import { useTransition } from "react";
import toast from "react-hot-toast";
import schimbaAvatar from "../actions/schimbaAvatar";
import { useRouter } from "next/navigation";

export default function ChangeAvatarInput() {
    const [pending, startTransition] = useTransition()
    const router = useRouter()
    
    const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(pending)
            return;
        const files = e.target.files
        if(!files || files.length === 0)
            return;
        const file = files[0]
        const formData = new FormData()

        formData.append('avatar', file)

        const request = async () => {
            await schimbaAvatar(formData)
        }

        startTransition(() => {
            toast.promise(request(), {
                loading: 'Se schimba poza de profil...',
                success: () => {
                    router.refresh()
                    return 'Poza de profil a fost schimbata cu succes!'
                },
                error: (err) => {
                    return err.message
                }
            })
        })
    }

    return(
        <input onChange={changeAvatar} type='file' name='avatar' id='avatar' className='hidden' />
    )
}