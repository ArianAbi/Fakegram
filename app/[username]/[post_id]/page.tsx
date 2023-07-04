import Description from "@/components/Description";
import PostInteractives from "@/components/PostInteractives";
import PostOptions from "@/components/PostOptions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import Image from "next/image";
import Link from "next/link";

export default async function Post({ params: { post_id } }: any) {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })
    const { data: { session } } = await supabase.auth.getSession();

    const { data: post, error: postError } = await supabase.from('posts').select().eq('id', post_id);

    if (postError) {
        throw new Error(postError.message)
    }

    const { data: _username, error: _usernameErr } = await supabase.from('users').select('user_name').eq('user_id', post[0].creator_id)
    const { data: _imageUrl } = await supabase.storage.from('posts').getPublicUrl(post[0].image_path)
    const { data: _likes, error: _likesErr } = await supabase.from('likes').select('id').eq('post_id', post[0].id)

    if (_likesErr || _usernameErr) {
        throw new Error('Something went wrong')
    }

    const username = _username && _username[0].user_name

    return (
        <>
            <article
                className="relative flex flex-grow justify-start flex-col items-center overflow-hidden shadow-inset max-w-[468px] mx-auto"
                role="presentation"
                tabIndex={-1}
            >

                {/* blury backgraound */}
                <Image
                    alt={post[0].description}
                    src={_imageUrl.publicUrl}
                    fill
                    loading="lazy"
                    style={{ objectFit: "cover", filter: "blur(30px)", transform: 'scale(1.4)', opacity: '15%', zIndex: '-1' }}
                />

                {/* Profile */}
                <div
                    className="w-full p-4 flex justify-between items-center bg-black"
                >
                    <Link
                        href={`/${username}`}
                        className="flex gap-2 items-center text-xl font-semibold"
                    >
                        <Image
                            className="rounded-full"
                            alt="profile"
                            src={'/defaultProfile.png'}
                            height={40}
                            width={40}
                        />

                        <h2>{username}</h2>
                    </Link>

                    <PostOptions post_id={post_id} username={username} />
                </div>

                <div className="bg-stone-500 w-full relative rounded-md overflow-hidden">
                    <Image
                        alt={post[0].description}
                        src={_imageUrl.publicUrl}
                        placeholder="blur"
                        blurDataURL={post[0].image_thumbnail}
                        width={1000}
                        height={1000}
                        priority
                    // style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                    />
                </div>

                {/* Interactive Section */}
                <div className="w-full flex flex-col items-start pb-2 pt-4 px-4 gap-2 text-white ">

                    <PostInteractives
                        postId={post[0].id}
                        userId={session?.user.id}
                        likeCount={_likes ? _likes.length : 0}
                    />

                </div >

                {/* Description */}
                <Description
                    author_id={post[0].id}
                    author_username={username}
                    description={post[0].description}
                />
            </article >
        </>
    )
}