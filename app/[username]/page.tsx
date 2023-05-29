import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import Image from "next/image"
import ProfilePost from "./ProfilePost"
import { Suspense } from "react"

export default async function userPage({ params: { username } }: any) {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: [{ user_id }] }: any = await supabase.from('users').select('*').eq('user_name', username)
    const { data: posts } = await supabase.from('posts').select('*').eq('creator_id', user_id)


    console.log(posts);

    return (
        <section>
            {/* profile */}
            <div className="flex gap-4 p-4 text-xl">
                <Image
                    className="rounded-full"
                    src={'/blank_profile.png'}
                    width={70}
                    height={70}
                    priority
                    alt="profile"
                />

                <h2>{username}</h2>
            </div>

            {/* content */}
            <div className="flex flex-col items-center w-full text-base py-4">
                <span>{posts?.length}</span>
                <span className="text-gray-400">post</span>
            </div>

            <div className="grid grid-cols-3 gap-1">
                {posts?.map(post => <>
                    {/* @ts-expect-error Server Component */}
                    <ProfilePost
                        key={post.id}
                        id={post.id}
                        creator_id={post.creator_id}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        image_path={post.image_path}
                    />
                </>)}
            </div>
        </section>
    )
}
