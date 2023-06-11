import Image from "next/image"
import Link from "next/link"
import { headers, cookies } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import PostInteractives from "./PostInteractives"
import Description from "./Description"

interface Post {
    id: string,
    creator_id: string,
    description: string,
    date: string,
    image_path: string,
    image_thumbnail: string,
}

const Post = async ({ id, creator_id, description, date, image_path, image_thumbnail }: Post) => {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: { session } } = await supabase.auth.getSession();
    const { data: _imageUrl } = await supabase.storage.from('posts').getPublicUrl(image_path)
    const { data: _username } = await supabase.from('users').select('user_name').eq('user_id', creator_id)
    const { data: _likes } = await supabase.from('likes').select('id').eq('post_id', id)

    const username = _username && _username[0].user_name

    return (
        <article
            className="flex flex-col items-center justify-center relative overflow-hidden shadow-inset"
            role="presentation"
            tabIndex={-1}
        >

            {/* blury backgraound */}
            <Image
                alt={description}
                src={_imageUrl.publicUrl}
                fill
                loading="lazy"
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
                    alt={description}
                    src={_imageUrl.publicUrl}
                    placeholder="blur"
                    blurDataURL={image_thumbnail}
                    width={1000}
                    height={1000}
                    priority
                // style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                />
            </div>

            {/* Interactive Section */}
            <div className="w-full flex flex-col items-start pb-2 pt-4 px-4 gap-2 text-white ">

                <PostInteractives
                    postId={id}
                    userId={session?.user.id}
                    likeCount={_likes ? _likes.length : 0}
                />

            </div >

            {/* Description */}
            <Description
                author_id={id}
                author_username={username}
                description={description}
            />
        </article >
    )
}

export default Post as any