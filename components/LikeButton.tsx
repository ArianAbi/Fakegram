'use client'

import { useState } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Like } from "@/actions";

interface LikeButton {
    postId: string,
    userId: string | undefined,
    likeCount: any,
    isLiked: boolean
}

function LikeButton({ postId, userId, likeCount }: LikeButton) {

    // const { supabase, session } = useSupabase();
    // const [isPending, startTransition] = useTransition();
    const [isLiked, setIsLiked] = useState(false);
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
                    if (isLiked) {
                        setIsLiked(!isLiked)
                        addOptLike(optLike.likeCount - 1)
                    } else {
                        setIsLiked(!isLiked)
                        addOptLike(optLike.likeCount + 1)
                    }
                    await Like(userId, postId)
                }}
            >
                {optLike.likeCount} OLike {optLike.sending ? "Likeing..." : ""}
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