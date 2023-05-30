'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { useSupabase } from "../supabase-provider"

type ProfilePost = {
    id: string,
    creator_id: string,
    date: string,
    title: string,
    image_path: string,
    description: string
}

function ProfilePost({ id, creator_id, date, title, image_path, description }: ProfilePost) {

    const { supabase } = useSupabase()
    const [publicUrl, setPublicUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.storage.from('posts').getPublicUrl(image_path)
            setPublicUrl(data.publicUrl)
            setLoading(false)
        })()
    }, [])

    return (
        <>
            <div className="relative aspect-square overflow-hidden">
                {loading && <div className="w-full h-full bg-slate-500"></div>}

                {!loading &&
                    <Image
                        className="object-cover"
                        src={publicUrl}
                        alt={title}
                        fill
                        quality={25}
                    />}
            </div>
        </>
    )
}

export default ProfilePost