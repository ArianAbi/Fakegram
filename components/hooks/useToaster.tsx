'use client'

import Link from "next/link";
import React, { createContext, useContext, useState } from "react"

interface hiddenCTX {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

interface jsxContext {
    content: JSX.Element,
    setContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

const hiddenContext = createContext<hiddenCTX | undefined>(undefined)
const jsxContext = createContext<jsxContext | undefined>(undefined);

export function Toaster() {

    const hiddenCtx = useContext(hiddenContext)
    const content = useContext(jsxContext)

    if (content && content.content) {
        return (
            <>
                <div className={`toaster ${hiddenCtx?.hidden ? '' : 'show'} text-[0.9rem]`}>
                    {content.content}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={`toaster ${hiddenCtx?.hidden ? '' : 'show'} text-[0.9rem]`}>
                    something went wrong!
                </div>
            </>
        )
    }
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {

    const [hidden, setHidden] = useState(true);
    const [content, setContent] = useState(<></>);

    return (
        <hiddenContext.Provider value={{ hidden, setHidden }}>
            <jsxContext.Provider value={{ content, setContent }}>
                {children}
            </jsxContext.Provider>
        </hiddenContext.Provider>
    )
}

export function useToaster() {

    const hiddenCtx = useContext(hiddenContext)
    const jsxCtx = useContext(jsxContext)
    const duration = 5000

    function awakeToaster(content: JSX.Element) {

        if (jsxCtx && jsxCtx.content) {
            jsxCtx.setContent(content)
        }

        if (hiddenCtx && hiddenCtx.hidden) {

            hiddenCtx.setHidden(false)

            setTimeout(() => {
                hiddenCtx.setHidden(true)
            }, duration);

        }

    }

    return { awakeToaster }
}
