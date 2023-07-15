export default function CrateLoading() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="relative w-[24px] h-[24px] border-2 rounded-full border-stone-600 lg:scale-150 xl:scale-[2]">
                <div
                    className="loader-spiner">
                </div>
            </div>
        </div>
    )
}