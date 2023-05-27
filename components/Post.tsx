import Image from "next/image"
import Link from "next/link"
import { headers, cookies } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"


interface Post {
    id: string,
    creator_id: string,
    title: string,
    description: string,
    date: string,
    image_path: string,
}

export const Post = async ({ id, creator_id, title, description, date, image_path }: Post) => {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: _imageUrl } = await supabase.storage.from('posts').getPublicUrl(image_path)
    const { data: _username } = await supabase.from('users').select('user_name').eq('user_id', creator_id)

    const username = _username![0].user_name

    return (
        <article
            className="flex flex-col items-center justify-center relative overflow-hidden shadow-inset"
            role="presentation"
            tabIndex={-1}
        >

            {/* blury backgraound */}
            <Image
                alt={title}
                src={_imageUrl.publicUrl}
                fill
                style={{ objectFit: "cover", filter: "blur(30px)", transform: 'scale(1.4)', opacity: '15%', zIndex: '-1' }}
            />

            {/* Profile */}
            <Link
                className="w-full"
                href={`/${username}`}
            >
                <div className="text-lg font-bold text-left py-4 px-4 text-white z-10">
                    <div
                        className="flex gap-3 items-center"
                    // href={`/post/${id}`}
                    >
                        {/* Profile Logo */}
                        <div className="bg-white w-10 aspect-square rounded-full relative overflow-hidden">
                            {/* Body */}
                            <div
                                className="bg-gray-700 w-8 aspect-square rounded-full absolute
                            left-[50%] top-[50%] translate-x-[-50%] translate-y-[-0%]"
                            ></div>

                            {/* Head */}
                            <div
                                className="bg-gray-700 w-5 aspect-square rounded-full absolute
                            left-[50%] top-[50%] translate-x-[-50%] translate-y-[-70%]"
                            ></div>
                        </div>

                        {username}
                    </div>
                </div>
            </Link>

            <div className="bg-stone-500 w-full relative rounded-md overflow-hidden">
                <Image
                    alt={title}
                    src={_imageUrl.publicUrl}
                    width={1000}
                    height={1000}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                />
            </div>

            {/* Interactive Section */}
            <div className="w-full flex flex-col items-start pb-2 pt-4 px-4 gap-2 text-white ">

                <div className="flex gap-6">
                    {/* Like */}
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div >

                    {/* Comment */}
                    < div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                    </div >
                </div>

                {/* likes counter */}
                <span className="text-white">
                    2048 likes
                </span>

            </div >

            {/* Description */}
            <div
                className="w-full text-left text-[0.95rem] text-white mb-4 px-4 line-clamp-3 overflow-hidden"
            >
                <div
                    // href={`/post/${id}`}
                    className="pr-2 font-semibold text-base inline"
                >
                    {username}
                </div>

                {description}
            </div>

        </article >
    )
}