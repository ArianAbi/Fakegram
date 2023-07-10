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
            <div className="flex flex-col items-center justify-center m-auto">
                <h2 className="text-2xl mt-8 italic">Something Went Wrong {':('}</h2>
                <span className="italic mt-4 font-semibold text-stone-400">{error.message}</span>

                <button
                    className="mt-4 py-2 px-6 rounded-md border-2 border-white"
                    onClick={() => reset()}
                >
                    Try Again
                </button>
            </div>
        </>
    )
}