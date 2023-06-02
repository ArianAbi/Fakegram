'use client'

import { use, useTransition } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Like } from "@/actions";

interface LikeButton {
    postId: string,
    userId: string | undefined,
    likeCount: any
}

function LikeButton({ postId, userId, likeCount }: LikeButton) {

    // const { supabase, session } = useSupabase();
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <div
                onClick={() => startTransition(() => Like(userId, postId))}
            >
                Like
            </div>
        </>
    )
}

export default LikeButton