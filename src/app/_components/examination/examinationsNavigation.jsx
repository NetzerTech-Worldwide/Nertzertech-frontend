"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const ExaminationsNavigation = () => {

    const baseStyles = `flex justify-center items-center h-[76px] py-[52px] px-[24px] text-[#858688]`
    const activeStyles = `flex justify-center items-center h-[76px] py-[52px] px-[24px] text-[#216388] border-b-3 border-[#216388]`
    const notStyles = `w-[28px] h-[22px] flex justify-center items-center text-[12px] font-bold text-white rounded-[14px] bg-[#133A51] ml-[8px]`
    
    const pathName = usePathname()
    
    return (
        <nav className="flex text-xl border-b-1 border-[#F2F4F7]">
            <Link href={`/examinations`}
                className={`w-auto cursor-pointer ${pathName === "/examinations" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                All Examinations 
                <span className={notStyles}>
                    9
                </span>
            </Link>
            <Link href={`/examinations/practice-tests`}
                className={`w-auto cursor-pointer ${pathName === "/examinations/practice-tests" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Upcoming
                <span className={notStyles}>
                    3
                </span>
            </Link>
            <Link href={`/examinations/submitted`}
                className={`w-auto cursor-pointer ${pathName === "/examinations/submitted" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Submitted
                <span className={notStyles}>
                    3
                </span>
            </Link>
        </nav>
    )
}
