'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ReactShowMoreText from "react-show-more-text"

interface Description {
    author_id: string,
    author_username: string,
    description: string
}

const Description = ({ author_id, author_username, description }: Description) => {

    return (
        <div className="w-full mb-4 px-4">
            <ReactShowMoreText
                expanded={false}
                className="w-full text-left"
            >
                <Link
                    href={`/${author_username}`}
                    className="pr-2 font-semibold text-base inline"
                >
                    {author_username}
                </Link>

                {description}
            </ReactShowMoreText>
        </div>
    )
}

export default Description