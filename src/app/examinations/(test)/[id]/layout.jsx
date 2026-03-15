"use client"

import { Lato } from "next/font/google"
import { ExamHeader } from "../../../_components/examination/examHeader"
import { Timer } from "../../../_components/examination/timer"
import { Button } from "../../../_components/cards/button"
import { ArrowLeft } from "lucide-react"
import { TestTips } from "../../../_components/examination/testTips"
import { ExamModal } from "../../../_components/examination/modal/examModal"
import { useContext } from "react"
import { examContext } from "../../../../../lib/context/examContext"
import { BackButton } from "../../../_components/examination/backButton"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function TestLayout({ children }) {

    const { setSubmitModal, totalQuestions } = useContext(examContext)

    return (
        <main className={`w-full relative min-h-screen bg-[#FBFEFF] text-black ${lato.className}`}>
            <ExamHeader title={"Practice Test"} description={totalQuestions === undefined ? "" : totalQuestions}>
                <Timer title={"Test Timer"} />
            </ExamHeader>
            <BackButton
                buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] rounded-[8px] "}>
                <ArrowLeft />
                <span>Back</span>
            </BackButton>
            <section className="flex justify-between items-center mt-[24px] mb-[32px] pr-[55px] pl-[40px]">
                <h3 className="text-[1.75rem] font-bold">
                    Your Practice Test
                </h3>
                <Button onClick={() => setSubmitModal(true)}
                    buttonStyle={"text-white font-semibold py-[16px] px-[24px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] "}>
                    Submit Test
                </Button>
            </section>
            <section className="pr-[55px] pl-[40px]">
                {children}
            </section>
            <section className="pr-[55px] pl-[40px] pb-[95px] mt-[32px]">
                <TestTips title={"Test Tips"} />
            </section>
           <ExamModal useCase={"submit"}  type={"test"} totalQuestions={totalQuestions} /> 
           <ExamModal useCase={"loading"} type={"test"} />
        </main>
    )
}