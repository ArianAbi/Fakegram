import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Signup | Fakegram'
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}