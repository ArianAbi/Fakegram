export default function ProfileLoading() {
    return (
        <section className="max-w-[924px] w-full mx-auto pt-4">
            {/* profile */}
            <div className="flex justify-start md:justify-between md:grid md:grid-cols-3 grid-rows-1 items-start gap-4 p-4 text-2xl">
                {/* profile image */}
                <div className="md:col-span-1 md:justify-self-end md:pr-8">
                    {/* mobile profile image */}
                    <div
                        className="md:hidden rounded-full w-[70px] aspect-square skeleton"
                    ></div>

                    {/* desktop profile image */}
                    <div
                        className="hidden md:block rounded-full w-[130px] aspect-square skeleton"
                    ></div>
                </div>

                {/* edit profile button */}
                <div className="col-span-1 flex flex-col items-center justify-center gap-4 pl-4 md:pl-0">

                    <div className="flex flex-col md:flex-row justify-start w-full gap-3 md:gap-6">
                        {/* username */}
                        <div className="h-5 w-32 rounded-md skeleton"></div>
                    </div>

                    {/* bio for large screens */}
                    <div className="w-full hidden md:flex flex-col items-start justify-start gap-2">
                        <div className="h-3 w-[90%] rounded-md skeleton"></div>
                        <div className="h-3 w-[90%] rounded-md skeleton"></div>
                        <div className="h-3 w-[90%] rounded-md skeleton"></div>
                        <div className="h-3 w-[68%] rounded-md skeleton"></div>
                    </div>
                </div>
            </div>

            {/* bio for smaller screens */}
            <div className="md:hidden flex flex-col items-start justify-start gap-2 px-4 mt-4 mb-8">
                <div className="h-5 w-[70%] rounded-md skeleton"></div>
                <div className="h-5 w-[70%] rounded-md skeleton"></div>
                <div className="h-5 w-[50%] rounded-md skeleton"></div>
            </div>


            {/* Post `with the count on smaller screens` */}
            <div className="w-full border-t-[1px] border-stone-600 text-center text-sm h-14 md:text-base">
            </div>

            <div className="h-auto grid grid-cols-3 grid-rows-3 gap-1">
                <div className="w-full col-span-1 h-full aspect-square skeleton"></div>
                <div className="w-full col-span-1 h-full aspect-square skeleton"></div>
                <div className="w-full col-span-1 h-full aspect-square skeleton"></div>
            </div>
        </section>
    )
}
