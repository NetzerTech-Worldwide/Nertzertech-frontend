"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const ExaminationsNavigation = () => {

    const baseStyles = `flex justify-center items-center h-[76px] py-[26px] px-[25px] text-[#858688] border-[#F2F4F7]`
    const activeStyles = `flex justify-center items-center h-[76px] py-[26px] px-[22px] text-[#2E8BC0] border-[#2E8BC0]`
    
    const pathName = usePathname()
    
    return (
        <nav className="flex text-xl">
            <Link href={`/examinations`}
                className={`w-[212px] border-b-2 cursor-pointer ${pathName === "/examinations" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Upcoming Exams
            </Link>
            <Link href={`/examinations/practice-tests`}
                className={`w-[276px] border-b-2 cursor-pointer ${pathName === "/examinations/practice-tests" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Practice Tests
            </Link>
        </nav>
    )
}
