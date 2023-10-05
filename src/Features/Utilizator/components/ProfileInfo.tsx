
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { returnFirstLetterUpper, returnInitials } from "@/utils/general";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { getServerSession } from "next-auth";
import EditeazaProfilulBtn from "./EditeazaProfilulBtn";
import { Avatar } from "@nextui-org/avatar";
import ChangeAvatarInput from "./ChangeAvatarInput";


export default async function ProfileInfo() {
    const session = await getServerSession(authOptions)
    if(!session)
        return <></>
    const objKeys = Object.keys(session.user)

    return(
        <Card>
            <CardHeader className='flex flex-col gap-3'>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex flex-col w-full">
                        <p className="text-md">{session.user.name}</p>
                        <p className="text-small text-default-500">Informatii</p>
                        <p>Rol: {session.user.moderator === 1 ? 'Moderator' : 'User'}</p>
                    </div>
                    <EditeazaProfilulBtn session={session.user} />                    
                </div>
                <Divider />
            </CardHeader>
            <CardBody>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-center relative group'>
                        <div className='relative'>
                            <label htmlFor='avatar'>
                                <Avatar
                                    color='primary'
                                    size='lg'
                                    className='z-1'
                                    src={session.user.avatar ? '/api/avatar/' + session.user.avatar : undefined}
                                />
                                <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden group-hover:block'>
                                    <Tooltip content='Schimba poza de profil' showArrow className="text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                    </Tooltip>
                                </div>
                            </label>
                        </div>
                        <ChangeAvatarInput />
                    </div>
                    {
                        Object.values(session.user).map((value, index) => {
                            if(objKeys[index] !== 'image' && objKeys[index] !== 'avatar' && objKeys[index] !== 'id')
                                return(
                                    <div className='flex gap-2'>
                                        <strong>{returnFirstLetterUpper(objKeys[index])}:</strong>
                                        <span>{value === '0' ? 'Nesetat' : value}</span>
                                    </div>
                                )
                        })
                    }
                </div>
            </CardBody>
        </Card>
    )
}