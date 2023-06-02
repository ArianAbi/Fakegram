'use client'

import { useState } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Dislike, Like } from "@/actions";

interface LikeButton {
    postId: string,
    userId: string | undefined,
    likeCount: any,
    isLiked: boolean
}

function PostInteractives({ postId, userId, likeCount, isLiked }: LikeButton) {
    const [_isLiked, setIsLiked] = useState(isLiked);
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
            <div className="w-full text-left">
                <button
                    onClick={async () => {
                        if (_isLiked) {
                            setIsLiked(false)
                            addOptLike(optLike.likeCount - 1)
                            const { error } = await Dislike(userId, postId)
                            if (error) setIsLiked(true)
                        } else {
                            setIsLiked(true)
                            addOptLike(optLike.likeCount + 1)
                            const { error } = await Like(userId, postId)
                            if (error) setIsLiked(false)
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={_isLiked ? 'white' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>

                </button>

                <p>{optLike.likeCount} Likes</p>
            </div>
        </>
    )
}

export default PostInteractives