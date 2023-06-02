'use server'

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { headers, cookies } from "next/headers"

const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
})

export async function Like(userId: string | undefined, postId: string) {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        console.log("Need to Loggin");
        return;
    }

    const { data: _postsLiked } = await supabase.from('likes').select('id').eq('post_id', postId).eq('user_id', userId)

    if (_postsLiked && _postsLiked.length > 0) {
        const { error: _deleteError } = await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', userId)
        console.log("POST DISLIKE LOGGED");
    }
    else {
        const { error: _insertError } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }])
        console.log("POST LIKE LOGGED");
    }

    revalidatePath('/')
}