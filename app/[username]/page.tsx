import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import Image from "next/image"
import ProfilePost from "./ProfilePost"
import ProfileButtons from "./ProfileButtons"

export default async function userPage({ params: { username } }: any) {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: [{ user_id }] }: any = await supabase.from('users').select('*').eq('user_name', username)
    const { data: posts } = await supabase.from('posts').select('*').eq('creator_id', user_id)

    return (
        <section className="max-w-[924px] w-full mx-auto pt-4">
            {/* profile */}
            <div className="flex justify-start md:justify-between md:grid md:grid-cols-3 grid-rows-1 items-start gap-4 p-4 text-2xl">
                {/* profile image */}
                <div className="md:col-span-1 md:justify-self-end md:pr-8">
                    {/* mobile profile image */}
                    <Image
                        className="md:hidden rounded-full inline"
                        src={'/defaultProfile.png'}
                        width={70}
                        height={70}
                        priority
                        alt="profile"
                    />

                    {/* desktop profile image */}
                    <Image
                        className="hidden md:inline rounded-full"
                        src="/defaultProfile.png"
                        width={130}
                        height={130}
                        priority
                        alt="profile"
                    />
                </div>

                {/* edit profile button */}
                <div className="col-span-1 flex flex-col items-center justify-center gap-4 pl-4 md:pl-0">

                    <div className="flex flex-col md:flex-row justify-start w-full gap-3 md:gap-6">
                        <h2>{username}</h2>

                        <ProfileButtons username={username} />
                    </div>

                    {/* post count for large screens */}
                    <span className="hidden md:inline w-full text-base">{posts?.length} posts</span>

                    {/* bio for large screens */}
                    <p className="hidden md:block text-sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta alias aliquam asperiores corporis placeat iste autem numquam reiciendis inventore temporibus?
                    </p>
                </div>
            </div>

            {/* bio for smaller screens */}
            <p className="md:hidden text-sm px-4 mt-4 mb-8">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta alias aliquam asperiores corporis placeat iste autem numquam reiciendis inventore temporibus?
            </p>


            {/* Post `with the count on smaller screens` */}
            <div className="w-full border-t-[1px] border-stone-600 text-center text-sm py-4 md:text-base">
                <span className="md:hidden">{posts?.length}</span> Posts
            </div>

            <div className="grid grid-cols-3 gap-1">
                {posts?.map(post => <>
                    <ProfilePost
                        key={post.id}
                        id={post.id}
                        username={username}
                        description={post.description}
                        date={post.date}
                        image_path={post.image_path}
                        image_thumbnail={post.image_thumbnail}
                    />
                </>
                )}
            </div>
        </section>
    )
}
