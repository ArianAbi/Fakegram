import Image from "next/image"
import Link from "next/link"
import { headers, cookies } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import PostInteractives from "./PostInteractives"
import Description from "./Description"
import PostOptions from "./PostOptions"

export default function LoadingPost() {
    return (
        <div
            className="w-full flex flex-col items-center justify-center relative overflow-hidden shadow-inset mx-auto"
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
                    {/* Profile Photo */}
                    <div
                        className="rounded-full w-[40px] h-[40px] skeleton"
                    ></div>

                    {/* username */}
                    <div className="w-32 h-6 skeleton rounded-md"></div>
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
        </div>
    )
}