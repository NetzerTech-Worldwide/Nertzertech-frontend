"use client"

import { Lato } from "next/font/google"
import { ExamHeader } from "../../../_components/examination/examHeader"
import { Timer } from "../../../_components/examination/timer"
import { Profile } from "../../../_components/examination/profile"
import { ArrowLeft } from "lucide-react"
import { ExamTips } from "../../../_components/examination/examTips"
import { ExamModal } from "../../../_components/examination/modal/examModal"
import { useContext } from "react"
import { examContext } from "../../../../../lib/context/examContext"
import { BackButton } from "../../../_components/examination/backButton"


const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function ExamLayout ({ children }) {

    const { totalQuestions } = useContext(examContext)
    return (
        <main className={`w-full relative min-h-screen bg-[#FBFEFF] text-black ${lato.className}`}>
            <section>
                <ExamHeader title={"Examination"} description={totalQuestions ? 1-totalQuestions : ""}>
                    <Timer title={"Exam Timer"}/>
                </ExamHeader>
            </section>
            <section className="pr-[55px] pl-[40px] mt-[64px]">
                <div>
                    <Profile />
                </div>
                <BackButton
                    buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[47px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[8px] "}>
                    <ArrowLeft />
                    <span>Back</span>
                </BackButton>
                <div className="mt-[32px]">
                    {children}
                </div>
            </section>
            <section className="pr-[55px] pl-[40px] pb-[95px] mt-[32px]">
                <ExamTips title={"Exam Tips"} />
            </section>
            <ExamModal useCase={"submit"} type={"exam"} totalQuestions={totalQuestions} /> 
            <ExamModal useCase={"loading"} type={"exam"} /> 
            <ExamModal useCase={"success"} /> 
        </main>
    )
}