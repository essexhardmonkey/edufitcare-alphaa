import md5 from "md5";

export function returnPageTitle(string: string) {
    return string + " | " + process.env.NEXT_PUBLIC_SITE_NAME
}
export function hashPassword(string: string) {
    return md5(string)
}

export function returnInitials(string: string) {
    return string.split(" ").map((word) => word[0]).join("")
}

export function returnFirstLetterUpper(string: string) {
    return string[0].toUpperCase() + string.slice(1)
}
