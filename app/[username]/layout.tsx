import { Metadata, ResolvedMetadata } from "next"
import { useRouter } from "next/router"

export async function generateMetadata({ params }: any) {

    const { username } = params;

    return {
        title: username + " Profile",
    }
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}