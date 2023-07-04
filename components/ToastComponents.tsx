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

            <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <motion.path
                    initial={{ pathLength: 0 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    animate={{ pathLength: 1 }}
                    strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>

        </div>
    )
}