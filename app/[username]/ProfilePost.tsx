import Image from "next/image"
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

type ProfilePost = {
    id: string,
    username: string,
    date: string,
    image_path: string,
    image_thumbnail: string,
    description: string
}

async function ProfilePost({ id, username, date, image_path, description, image_thumbnail }: ProfilePost) {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: { publicUrl } } = await supabase.storage.from('posts').getPublicUrl(image_path)

    return (
        <>
            <Link href={`/${username}/${id}`}>
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={image_thumbnail}
                        src={publicUrl}
                        alt={description}
                        fill
                        quality={25}
                    />
                </div>
            </Link>
        </>
    )
}

export default ProfilePost as any