"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { examContext } from "../../../../lib/context/examContext"

export const ExaminationsNavigation = () => {
    const { exams } = useContext(examContext)
    const upcoming = exams?.filter((data) => {
        return data.status === "pending"
    })
    const completed = exams?.filter((data) => {
        return data.status === "completed"
    })

    const baseStyles = `flex justify-center items-center font-medium text-xl  py-[38px] px-[24px] text-[#666668]`
    const activeStyles = `flex justify-center items-center font-semibold text-xl  py-[38px] px-[24px] text-[#216388] border-b-3 border-[#216388]`
    const notStyles = `w-[28px] h-[22px] flex justify-center items-center text-[12px] font-bold text-white rounded-[14px] bg-[#133A51] ml-[8px]`
    
    const pathName = usePathname()
    
    return (
        <nav className="flex text-xl border-2 border-b-0 border-[#F2F4F7] bg-white rounded-t-[24px] ">
            <Link href={`/examinations`}
                className={`w-auto cursor-pointer ${pathName === "/examinations" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                All Examinations 
                <span className={notStyles}>
                    {exams ? exams.length : 0}
                </span>
            </Link>
            <Link href={`/examinations/upcoming`}
                className={`w-auto cursor-pointer ${pathName === "/examinations/upcoming" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Upcoming
                <span className={notStyles}>
                    {upcoming ? upcoming.length : 0}
                </span>
            </Link>
            <Link href={`/examinations/submitted`}
                className={`w-auto cursor-pointer ${pathName === "/examinations/submitted" ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Submitted
                <span className={notStyles}>
                    {completed ? completed.length : 0}
                </span>
            </Link>
        </nav>
    )
}
