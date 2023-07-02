import Link from "next/link";

export function LoginToast() {
    return (
        <>
            quickly
            <span className="text-cyan-500 italic underline mx-1 text-base">
                <Link href='/login'>
                    Login
                </Link>
            </span>
            to use this feature
        </>
    )
}

export function DeleteToast() {
    return (
        <>
            you'r post has been deleted!
        </>
    )
}