'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { avatarPath, returnAvatarPath } from "@/utils/server/general.server"
import { existsSync, mkdirSync } from "fs"
import { unlink, writeFile } from "fs/promises"
import { getServerSession } from "next-auth"
import path, { extname } from "path"

export default async function schimbaAvatar(formData: FormData) {
    'use server'
    const session = await getServerSession(authOptions)
    if(!session)
        throw new Error("Nu esti logat")

    const avatar = formData.get('avatar') as File
    if(!avatar)
        throw new Error("Avatar invalid")
    
    const userInfo = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })
    if(!userInfo)
        throw new Error("Utilizatorul nu exista")

    if(userInfo.avatar) {
        unlink(returnAvatarPath(userInfo.avatar))
    }

    const avatarName = `${session.user.id}-${avatar.name}`
    const bytes = await avatar.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (!existsSync(avatarPath)) {
        mkdirSync(avatarPath, { recursive: true });
    }
    
    writeFile(path.join(avatarPath, avatarName), buffer)

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            avatar: avatarName
        }
    })
}