import Link from "next/link";
import { motion } from 'framer-motion'

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
            your post has been deleted!
        </>
    )
}

export function CreatedToast() {
    return (
        <div className="flex gap-2 w-full justify-center">
            Post Created !
        </div>
    )
}

export function FeatureNotAvailableToast() {
    return (
        <div className="flex gap-2 w-full justify-center">
            this feature is not available yet !
        </div>
    )
}

export function CopyURLToast() {
    return (
        <div className="flex gap-2 w-full justify-center">
            post URL been copyed to clipboard
        </div>
    )
}