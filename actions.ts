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
        return { error: "login" };
    }

    const { error } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }])

    revalidatePath('/')
    return { error }
}


export async function Dislike(userId: string | undefined, postId: string) {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        console.log("Need to Loggin");
        return { error: "Need to Loggin" };
    }

    const { error } = await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', userId)

    revalidatePath('/')
    return { error }
}
