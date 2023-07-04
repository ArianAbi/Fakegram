'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {

    console.log(error);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl mt-8">Something Went Wrong {':('}</h2>
                <span className="italic mt-4">{error.message}</span>

                <button
                    className="mt-4 bg-red-500"
                    onClick={() => reset()}
                >
                    Try Again
                </button>
            </div>
        </>
    )
}