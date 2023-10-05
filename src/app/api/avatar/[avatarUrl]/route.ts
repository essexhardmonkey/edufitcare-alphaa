import { returnAvatarPath } from "@/utils/server/general.server";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import mime from 'mime'

export async function GET(request: Request, { params: { avatarUrl }} : { params: { avatarUrl: string }}) {
    if(!avatarUrl)
        return NextResponse.json({ error: "Avatar invalid" }, { status: 400 })

    const avatarPath = returnAvatarPath(avatarUrl)

    const file = await readFile(avatarPath)
    if(!file)
        return NextResponse.json({ error: "Avatar invalid" }, { status: 400 })
    const mimeType = mime.getType(avatarPath)

    return new Response(file, {
        headers: {
            'Content-Type': mimeType ?? 'application/octet-stream',
        }
    })
}