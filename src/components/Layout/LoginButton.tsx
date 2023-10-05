'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email("Email invalid"),
    parola: z.string().min(6, "Parola trebuie sa aiba cel putin 6 caractere").max(50, "Parola nu poate avea mai mult de 50 de caractere")
})

export default function LoginButton() {
    const {onOpen, isOpen, onClose} = useDisclosure()
    const [pending, startTransition] = React.useTransition()
    const router = useRouter()
    const [loginData, setLoginData] = React.useState({
        email: "",
        parola: ""
    })

    const updateLoginData = (key: string, value: string) => setLoginData({...loginData, [key]: value})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(pending)
            return;

        const request = async () => {
            loginSchema.parse(loginData)
            await signIn('HTTPCredentials', {
                email: loginData.email, password: loginData.parola,
                redirect: false,
                callbackUrl: '/'
            })
        }

        startTransition(() => {
            toast.promise(request(), {
                loading: 'Se logheaza...',
                success: () => {
                    onClose()
                    router.refresh()
                    return 'Te-ai logat cu succes!'
                },
                error: (err) => {
                    if(err instanceof z.ZodError)
                        return err.issues[0].message
                    return err.message
                }
            })
        })

    }
    return(
        <>
            <span onClick={onOpen} className='font-semibold cursor-pointer'>Login</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className='flex flex-col gap-1'>
                        <h2 className='text-black font-medium'>Logare</h2>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <Input value={loginData.email} onChange={e => updateLoginData('email', e.target.value)} placeholder='Email' type='text' label='Email' name='email' className='text-black' required />
                            <Input value={loginData.parola} onChange={e => updateLoginData('parola', e.target.value)} placeholder='Parola' label='Parola' type='password' name='password' className='text-black' required />
                            <Button type='submit' color='primary' variant='solid'>Logheaza-te</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}