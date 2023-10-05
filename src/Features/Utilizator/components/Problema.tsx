'use client'


import WarningModal from "@/components/Modal/WarningModal";
import { Chip, useDisclosure } from "@nextui-org/react";
import { ProblemeSanatate } from "@prisma/client";
import { useTransition } from "react";
import { stergeProblema } from "../actions/problemeActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Problema({ item } : { item: ProblemeSanatate}) {
    const [pending, startTransition] = useTransition()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const router = useRouter()

    const action = () => {
        if(pending)
            return;
        const request = async () => {
            await stergeProblema(item.id)
        }
        startTransition(() => {
            toast.promise(request(), {
                loading: 'Se sterge problema...',
                success: () => {
                    router.refresh()
                    return 'Problema a fost stearsa cu succes!'
                },
                error: (err) => {
                    return err.message
                }
            })
        })
    }

    return(
        <>
            <Chip onClose={onOpen}>{item.problema}</Chip>
            <WarningModal isOpen={isOpen} onClose={onClose} onApprove={action} title="Sterge problema" subtitle={'Esti sigur ca vrei sa stergi problema ' + item.problema + '?'} />
        </>
    )
}