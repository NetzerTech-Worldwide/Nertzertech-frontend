"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const TicketNavigation = () => {
    const baseStyles = `flex justify-center items-center font-medium text-xl py-[32px] px-[24px] text-[#666668]`
    const activeStyles = `flex justify-center items-center font-semibold text-xl py-[32px] px-[24px] text-[#216388] border-b-3 border-[#216388]`
    const baseURL = `/schools/secondarySchool/student/support/tickets`
    
    const pathName = usePathname()
    
    return (
        <nav className="flex text-xl border-1 border-[#DCDEE1] bg-white ">
            <Link href={`${baseURL}`}
                className={`w-auto cursor-pointer ${pathName === baseURL ? `${activeStyles}` : `${baseStyles}`}`}
            >
                All 
            </Link>
            <Link href={`${baseURL}/in-progress`}
                className={`w-auto cursor-pointer ${pathName === `${baseURL}/in-progress` ? `${activeStyles}` : `${baseStyles}`}`}
            >
                In Progress
            </Link>
            <Link href={`${baseURL}/resolved`}
                className={`w-auto cursor-pointer ${pathName === `${baseURL}/resolved` ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Resolved
            </Link>
        </nav>
    )
}