'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Description {
    author_id: string,
    author_username: string,
    description: string
}

const Description = ({ author_id, author_username, description }: Description) => {

    const [showMore, setShowMore] = useState(false)

    const [isMoreThanThreeLines, setIsMoreThanThreeLines] = useState(false);
    const hiddenSpanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Assumption: Line height is 20px. Please adjust as per your CSS
        if (hiddenSpanRef.current?.offsetHeight! > 60) {
            console.log("BIG");
            setIsMoreThanThreeLines(true);
        } else {
            console.log("SMALL");
            setIsMoreThanThreeLines(false);
        }
    }, [description]);


    return (
        <div
            className={`relative w-full text-left text-[0.95rem] text-white mb-4 px-4 ${!showMore ? "line-clamp-3" : ""}`}
        >
            <Link
                href={`/${author_username}`}
                className="pr-2 font-semibold text-base inline"
            >
                {author_username}
            </Link>

            <span
                ref={hiddenSpanRef}
            >
                {description}
            </span>

            {isMoreThanThreeLines &&
                <div className="absolute backdrop-blur-3xl bottom-0 right-7 pl-4">
                    <input
                        className={showMore ? "appearance-none after:content-['show_less']" : "appearance-none after:content-['._._._show_more']"}
                        type="checkbox"
                        checked={showMore}
                        onClick={() => setShowMore(!showMore)}
                    />
                </div>
            }
        </div>
    )
}

export default Description