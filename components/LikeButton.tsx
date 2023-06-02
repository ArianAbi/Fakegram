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
    // const [isPending, startTransition] = useTransition();
    const [optLike, addOptLike] = useOptimistic(
        { likeCount, sending: false },
        (state, newLike) => ({
            ...state,
            likeCount: newLike,
            sending: true
        })
    )

    return (
        <>
            <div
                onClick={async () => {
                    addOptLike(optLike.likeCount + 1)
                    await Like(userId, postId)
                }}
            >
                OLike {optLike.sending ? "Likeing..." : ""}
            </div>
            {/* <div
                onClick={() => startTransition(() => Like(userId, postId))}
            >
                Like
            </div> */}
        </>
    )
}

export default LikeButton