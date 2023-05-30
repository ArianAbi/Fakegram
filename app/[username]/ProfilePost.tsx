import Image from "next/image"
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

type ProfilePost = {
    id: string,
    creator_id: string,
    date: string,
    title: string,
    image_path: string,
    description: string
}

async function ProfilePost({ id, creator_id, date, title, image_path, description }: ProfilePost) {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: { publicUrl } } = await supabase.storage.from('posts').getPublicUrl(image_path)

    return (
        <>
            <div className="relative aspect-square overflow-hidden">
                <Image
                    className="object-cover"
                    src={publicUrl}
                    alt={title}
                    fill
                    quality={25}
                />
            </div>
        </>
    )
}

export default ProfilePost as any