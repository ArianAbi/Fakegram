import LoadingPost from "@/components/LoadingPost"

export default function RootLoading() {
    return (
        <div className="max-w-[468px] w-full mx-auto grid grid-cols-1 text-center divide-y-[1px] divide-white divide-opacity-40">
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
        </div>
    )
}