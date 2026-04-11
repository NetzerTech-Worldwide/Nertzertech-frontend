"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const PreparationNavigation = () => {

    const baseStyles = `flex justify-center items-center font-medium text-xl py-[38px] px-[38px] text-[#666668]`
    const activeStyles = `flex justify-center items-center font-medium text-xl py-[38px] px-[38px] text-[#2A7EAF] border-b-[3.5px] border-[#2A7EAF]`
    const baseURL = `/schools/secondarySchool/student/academics/examinations`
    const params = useParams()
    const { id } = params
    const pathName = usePathname()
    
    return (
        <nav className="flex text-xl border-2 border-b-0 border-[#F2F4F7] bg-white rounded-t-[24px]">
            <Link href={`${baseURL}/${id}/study-materials`}
                className={`w-auto cursor-pointer ${pathName === `${baseURL}/${id}/study-materials` ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Study Materials
            </Link>
            <Link href={`${baseURL}/${id}/practice-test`}
                className={`w-auto cursor-pointer ${pathName === `${baseURL}/${id}/practice-test` ? `${activeStyles}` : `${baseStyles}`}`}
            >
                Practice Test
            </Link>
        </nav>
    )
}
