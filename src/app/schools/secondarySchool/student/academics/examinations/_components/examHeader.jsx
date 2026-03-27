"use client"

import { useContext } from "react"
import { examContext } from "../../../../../../../../lib/context/examContext"

export const ExamHeader = ({ children, title, description }) => {
    const { totalQuestions } = useContext(examContext)

    return (
        <section className="flex justify-between items-center w-full h-auto py-4 pr-[55px] pl-[40px] text-black shadow-[0_4px_70px_0_#0000000D] bg-white">
            <div>
                <h3 className="text-[1.75rem] font-bold pb-[6px] ">
                    {title}
                </h3>
                <p className="text-[#5D5C5C]">
                    {
                        description === "test" ? `1-${totalQuestions}`
                        : description === "exam" ? `1-${totalQuestions}`
                        : description === "preparation" ? `Advanced Mathematics - First term Examination`
                        : description === "result" && `Your practice test has been graded`
                    }
                </p>
            </div>
            <div className="">
                {children}
            </div>
        </section>
    )
}