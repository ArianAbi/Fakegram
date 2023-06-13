'use client'

import Link from "next/link";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface hiddenCTX {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const hiddenContext = createContext<hiddenCTX | undefined>(undefined)

export function Toaster() {

    const hiddenCtx = useContext(hiddenContext)

    return (
        <>
            <div className={`toaster ${hiddenCtx?.hidden ? '' : 'show'} text-[0.9rem]`}>
                quickly loggin with
                <span className="text-cyan-500 italic underline mx-1 text-base">
                    <Link href='/login'>
                        Magic Link
                    </Link>
                </span>
                to use this feature
            </div>
        </>
    )
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {

    const [hidden, setHidden] = useState(true);

    return (
        <hiddenContext.Provider value={{ hidden, setHidden }}>
            {children}
        </hiddenContext.Provider>
    )
}

export function useToaster() {

    const hiddenCtx = useContext(hiddenContext)
    const duration = 5000

    function awakeToaster() {

        if (hiddenCtx && hiddenCtx.hidden) {

            hiddenCtx.setHidden(false)

            setTimeout(() => {
                hiddenCtx.setHidden(true)
            }, duration);

        }

    }

    return { awakeToaster }
}
