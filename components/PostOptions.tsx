'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSupabase } from "@/app/supabase-provider"

interface PostOptions {
    creator_id: string
}

export default function PostOptions({ creator_id }: PostOptions) {

    const [open, setOpen] = useState(false)
    const [deletable, setDeletable] = useState(false);
    const { supabase, session } = useSupabase();

    useEffect(() => {
        if (session?.user) {
            setDeletable(true)
        } else {
            setDeletable(false)
        }
    }, [session])

    const deletePost = async () => {
        console.log('deleting...');

        // const { error: deleteLikesErr } = await supabase.from('likes').delete().eq('user_id', creator_id)

        // if (deleteLikesErr) {
        //     console.log('Failed , likes');
        //     return;
        // }

        const { error: deletePostErr } = await supabase.from('posts').delete().eq('creator_id', creator_id)

        if (deletePostErr) {
            console.log(deletePostErr);
            return;
        }

        console.log("DELETED !");
    }

    return (
        <>
            <div className="relative">

                <button
                    className="text-xl"
                    onClick={() => {
                        console.log('Toggle Dialog');

                        setOpen(!open)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                </button>

                <div
                    className={`absolute text-sm flex flex-col items-center justify-center divide-y-[1px] right-4 top-4 w-[160px] py-2 px-4 bg-black bg-opacity-80 rounded-md border-[1px] border-white border-opacity-25 z-20
                origin-top-right ${open ? 'scale-100' : 'scale-0'} transition-all duration-75`}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-between bg-transparent h-[40px] w-full"
                        onClick={() => {
                            console.log('copy post url');
                        }}


                    >
                        Copy Post URL

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>

                    </motion.button>

                    {deletable &&
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-between bg-transparent h-[40px] w-full"
                            onClick={() => deletePost()}
                        >
                            Delete Post

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </motion.button>
                    }

                </div>
            </div>
        </>
    )
}