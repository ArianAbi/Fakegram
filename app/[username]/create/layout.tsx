export async function generateMetadata({ params }: any) {

    const { username } = params;

    return {
        title: "Create " + username,
    }
}

export default function CreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}