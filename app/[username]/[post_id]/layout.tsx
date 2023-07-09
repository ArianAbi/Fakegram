export async function generateMetadata({ params }: any) {

    const { username } = params;

    return {
        title: username + " Post",
    }
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}