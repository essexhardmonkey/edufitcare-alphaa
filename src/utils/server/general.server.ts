import path from "path";

export const avatarPath = path.join(process.cwd(), 'uploads', 'avatars')

export function returnAvatarPath(string: string) {
    return path.join(process.cwd(), 'uploads', 'avatars', string)
}