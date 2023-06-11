'use client'

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
            <div className={`toaster ${hiddenCtx?.hidden ? '' : 'show'}`}>
                you have to loggin to use this feature
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

    function awakeToaster() {

        if (hiddenCtx && hiddenCtx.hidden) {

            hiddenCtx.setHidden(false)

            setTimeout(() => {
                hiddenCtx.setHidden(true)
            }, 2500);

        }

    }

    return { awakeToaster }
}
