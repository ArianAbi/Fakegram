'use client'

import { useState } from "react"

export default function PostOptions() {

    const [open, setOpen] = useState(false)

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

                <div className={`absolute text-sm flex flex-col items-center justify-center divide-y-[1px] backdrop-blur-md right-4 top-4 w-[160px] p-2 bg-transparent rounded-md border-[1px] border-white border-opacity-25 z-20
                origin-top-right ${open ? 'scale-100' : 'scale-0'} transition-all duration-75`}>
                    <button
                        className="bg-transparent active:bg-black active:bg-opacity-50 h-[40px] w-full"
                        onClick={() => {
                            console.log('copy post url');
                        }}
                    >
                        Copy Post URL
                    </button>

                    <button
                        className="bg-transparent active:bg-black active:bg-opacity-50 h-[40px] w-[90%]"
                        onClick={() => {
                            console.log('copy post url');
                        }}
                    >
                        Delete Post
                    </button>

                </div>
            </div>
        </>
    )
}