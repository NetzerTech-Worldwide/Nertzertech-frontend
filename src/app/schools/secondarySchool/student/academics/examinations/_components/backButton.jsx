"use client"

import { useRouter } from "next/navigation"

export const BackButton = ({ children, buttonStyle }) => {
    const router = useRouter()

    return (
        <button onClick={() => router.back()}
            className={`${buttonStyle} bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] cursor-pointer `}>
            {children}
        </button>
    )
}