export default async function LoadingPost() {

    return (
        <>
            <article
                className="relative flex flex-grow justify-start flex-col items-center overflow-hidden shadow-inset max-w-[468px] w-full mx-auto"
                role="presentation"
                tabIndex={-1}
            >

                {/* Profile */}
                <div
                    className="w-full p-4 flex justify-between items-center bg-black"
                >
                    <div
                        className="flex gap-2 items-center text-xl font-semibold"
                    >
                        <div
                            className="rounded-full w-[40px] h-[40px] skeleton"
                        ></div>

                        {/* username */}
                        <h2 className="h-4 w-24 rounded-md skeleton"></h2>
                    </div>
                </div>

                {/* post */}
                <div className="bg-stone-500 w-full relative rounded-md overflow-hidden">
                    <div className="w-full aspect-square skeleton"></div>
                </div>

                {/* Description */}
                <div className="w-full flex flex-col justify-start items-start gap-2 mt-10 p-4">
                    <div className="h-5 w-[80%] skeleton rounded-md"></div>
                    <div className="h-5 w-[60%] skeleton rounded-md"></div>
                    <div className="h-5 w-[55%] skeleton rounded-md"></div>
                </div>
            </article >
        </>
    )
}