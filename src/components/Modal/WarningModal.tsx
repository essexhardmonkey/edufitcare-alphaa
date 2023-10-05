'use client'

import { Button, Divider, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

type Props = {
    title: string;
    subtitle?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    disabled?: boolean;
    isOpen: boolean;
    onApprove?: () => void;
    onClose?: () => void;
}


export default function WarningModal({title, isOpen, subtitle, cancelButtonText, confirmButtonText, disabled, onApprove, onClose} : Props) {
    return(
        <Modal isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-2'>
                    <p className='text-foreground'>
                        {title}
                    </p>
                    {
                        subtitle ? <p className="text-small text-default-700">{subtitle}</p> : null
                    }
                    <Divider />
                </ModalHeader>
                <div className='flex w-full items-center justify-center my-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-warning animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <ModalFooter>
                    <Button disabled={disabled} color='danger' variant='light' onPress={onClose}>
                        {cancelButtonText || 'Cancel'}
                    </Button>
                    <Button disabled={disabled} color='primary' onPress={() => {
                        onApprove?.()
                    }}>
                        {confirmButtonText || 'Confirm'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}