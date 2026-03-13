"use client"

import { useRouter } from "next/navigation"

export const Button = ({ children, buttonStyle, redirect, type }) => {
    const router = useRouter()
    const handleClick = () => {
        if (redirect) {
            router.push(`${redirect}`)
        }
    }

    return (
        <button 
            onClick={handleClick}
            className={`${buttonStyle} cursor-pointer`}
            type={type} 
        >
            {children}
        </button>
    )
}