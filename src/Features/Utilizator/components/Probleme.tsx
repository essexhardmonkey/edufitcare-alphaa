'use client'

import { Button, Card, CardBody, CardHeader, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import { ProblemeSanatate } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { creeazaProblema } from "../actions/problemeActions"
import Problema from "./Problema"

const numeProblemaSchema = z.string().min(2, "Problema trebuie sa aiba cel putin 2 caractere").max(50, "Problema nu poate avea mai mult de 50 de caractere")

export default function Probleme({ probleme } : { probleme: ProblemeSanatate[] }) {
    const [numeProblema, setNumeProblema] = useState('')
    const [pending, startTransition] = useTransition()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(pending)
            return;
        const request = async () => {
            numeProblemaSchema.parse(numeProblema)
            await creeazaProblema(numeProblema)
        }

        startTransition(() => {
            toast.promise(request(), {
                loading: 'Se adauga problema...',
                success: () => {
                    onClose()
                    router.refresh()
                    return 'Problema a fost adaugata cu succes!'
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
            <Card>
                <CardHeader className='flex flex-col gap-3'>
                    <div className='flex justify-between items-center w-full'>
                        <div className="flex flex-col w-full">
                            <p className="text-md">Probleme de sanatate</p>
                            <p className="text-small text-default-500">Informatii</p>
                        </div>
                        <Tooltip className='text-black' content='Creeaza o noua problema de sanatate' showArrow>
                            <span onClick={onOpen} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </Tooltip>
                    </div>
                    <Divider />
                </CardHeader>
                <CardBody className='flex flex-row gap-3 flex-wrap'>
                    {
                        probleme.length === 0 ? <Chip>Nu ai probleme de sanatate</Chip> : (
                            probleme.map(item => (
                                <Problema item={item} key={item.id} />
                            ))
                        )
                    }
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className='flex flex-col gap-1'>
                        <h2 className='text-black font-medium'>Adauga o noua problema</h2>
                        <Divider />
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <Input value={numeProblema} onChange={e => setNumeProblema(e.target.value)} type='text' label='Nume' name='nume' className='text-black' />
                            <Button disabled={pending} isLoading={pending} type='submit' color='primary' variant='solid'>
                                {
                                    pending ? 'Se adauga...' : 'Adauga'
                                }
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}