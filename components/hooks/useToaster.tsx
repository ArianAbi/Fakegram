'use client'
import { useSwipeable } from 'react-swipeable';
import React, { createContext, useContext, useState } from "react"

interface hiddenCTX {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

interface jsxContext {
    content: JSX.Element,
    setContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

interface borderColorContext {
    borderColor: 'mute' | 'danger' | 'warning' | 'successful',
    setBorderColor: React.Dispatch<React.SetStateAction<'mute' | 'danger' | 'warning' | 'successful'>>;
}

const hiddenContext = createContext<hiddenCTX | undefined>(undefined)
const jsxContext = createContext<jsxContext | undefined>(undefined);
const borderColorContext = createContext<borderColorContext | undefined>(undefined);

export function Toaster() {

    const hiddenCtx = useContext(hiddenContext)
    const content = useContext(jsxContext)
    const borderColor = useContext(borderColorContext)

    //close and set the border color to mute on swipe
    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            hiddenCtx?.setHidden(true)
            borderColor?.setBorderColor('mute')
        }
    })

    if (content && content.content) {

        return (
            <>
                <div
                    {...swipeHandlers}
                    className={`toaster ${hiddenCtx?.hidden ? '' : 'show'} ${borderColor?.borderColor} text-[0.9rem]`}
                >
                    {hiddenCtx && !hiddenCtx.hidden ? content.content : <></>}
                </div>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {

    const [hidden, setHidden] = useState(true);
    const [content, setContent] = useState(<></>);
    const [borderColor, setBorderColor] = useState<'mute' | 'danger' | 'warning' | 'successful'>("mute");

    return (
        <hiddenContext.Provider value={{ hidden, setHidden }}>
            <jsxContext.Provider value={{ content, setContent }}>
                <borderColorContext.Provider value={{ borderColor, setBorderColor }}>
                    {children}
                </borderColorContext.Provider>
            </jsxContext.Provider>
        </hiddenContext.Provider>
    )
}

export function useToaster() {

    const hiddenCtx = useContext(hiddenContext)
    const jsxCtx = useContext(jsxContext)
    const borderColorCtx = useContext(borderColorContext)
    const duration = 5000

    function awakeToaster(content: JSX.Element, borderColor?: 'mute' | 'danger' | 'warning' | 'successful') {

        //set border color if the user selected a color
        if (borderColor && borderColorCtx && borderColorCtx.borderColor) {
            borderColorCtx.setBorderColor(borderColor)
        }

        //set the content of the toaster
        if (jsxCtx && jsxCtx.content) {
            jsxCtx.setContent(content)
        }

        //show the toaster
        if (hiddenCtx && hiddenCtx.hidden) {

            hiddenCtx.setHidden(false)

            //close and set the border color to mute after `duration`
            setTimeout(() => {
                hiddenCtx?.setHidden(true)
                borderColorCtx?.setBorderColor('mute')
            }, duration);

        }

    }

    return { awakeToaster }
}