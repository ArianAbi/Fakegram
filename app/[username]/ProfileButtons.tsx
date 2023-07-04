'use client'

import { FeatureNotAvailableToast } from "@/components/ToastComponents";
import { useToaster } from "@/components/hooks/useToaster";
import { useSupabase } from "../supabase-provider";
import { useEffect, useState } from "react";

// this component decides which button to show if the user owns the page and is logged in
export default function ProfileButtons({ username }: any) {

    const { supabase, session } = useSupabase();

    const [isThePageOwner, setIsThePageOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const { awakeToaster } = useToaster()

    useEffect(() => {

        (async () => {
            if (!session) {
                return;
            }

            const { data: [{ user_id }] }: any = await supabase.from('users').select('*').eq('user_name', username)
            user_id === session.user.id ? setIsThePageOwner(true) : setIsThePageOwner(false)
            setLoading(false)
        })()

    }, [session])

    if (isThePageOwner) {
        return (
            <button
                onClick={() => awakeToaster(<FeatureNotAvailableToast />, 'warning')}
                disabled={loading}
                className={`flex items-center justify-center gap-2 text-sm md:text-[0.92rem] font-semibold bg-stone-200 rounded-lg text-black px-4 py-2 
            hover:scale-105 transition-all duration-75 ${loading ? 'bg-stone-400' : ''}`}
            >
                {loading ? 'loading...' : 'Edit Profile'}
            </button>
        )
    } else {
        return (
            <button
                onClick={() => awakeToaster(<FeatureNotAvailableToast />, 'warning')}
                disabled={loading}
                className={`flex items-center justify-center gap-2 text-sm md:text-[0.92rem] font-semibold bg-stone-200 rounded-lg text-black px-4 py-2 
        hover:scale-105 transition-all duration-75 ${loading ? 'bg-stone-400' : ''}`}
            >
                {loading ? 'loading...' : 'Message'}
            </button>
        )
    }
}