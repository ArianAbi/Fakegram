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

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-green-500">
                <motion.path
                    initial={{ rotateZ: 0 }}
                    animate={{ rotateZ: 180 }}
                    transition={{ duration: 0.25 }}
                    strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
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