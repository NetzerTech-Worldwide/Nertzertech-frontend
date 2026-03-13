"use client"

import { useContext, useState } from "react"
import { Button } from "../../cards/button"
import { examContext } from "../../../../../lib/context/examContext"
import { useParams, useRouter } from "next/navigation"
import { usePostData } from "../../../../../lib/hooks"
import { postOptions } from "../../../../../lib/options"

export const SubmitModal = ({ type }) => {
    const router = useRouter()
    const params = useParams
    const { id } = params

    const [checkBox, setCheckBox] = useState(false)
    const { setSubmitModal, setLoadingModal, totalQuestions, selected, examDuration } = useContext(examContext)
    const answeredQuestions = Object.keys(selected.answers).length

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination/${id}/submit`
    const token = process.env.NEXT_PUBLIC_TOKEN
    const cacheId = "submitted exams/tests"
    const mutation = usePostData(url, postOptions(token, selected), cacheId)

    const handleCheckBox = () => {
        setCheckBox((prev) => !prev)
    }
    
    const handleLeftButtonClick = () => {
        setSubmitModal(false)
    }
    const handleRightButtonClick = () => {
        setSubmitModal(false)
        setLoadingModal(true)
        mutation.mutate(selected)
        if (type === "test") {
            router.push(`/examinations/${id}/result`)
        } else {
            router.push("/examinations")
        } 
    }
    
    return (
        <main className="w-[455px] h-fit p-[24px] border border-[#FBFCFD] bg-white rounded-[16px] ">
            <h2 className="text-[2rem] font-bold mb-[8px]">
                Submit {type === "exam" ? "Examination" : "Test"}
            </h2>
            <p className="text-[#666668] mb-[16px]">
                {
                    type === "exam" ? `Please review all your answers carefully, submitting your examination is final and cannot be edited.`
                    : `Please review before submitting your answers`
                }.
            </p>
            <section className="p-[10px] text-[#216388] font-medium mb-[26px] bg-[#EAF3F9]">
                <span className="font-medium">
                    {type === "exam" ? "Examination" : "Test"} summary 
                </span>
            </section>
            <section className="flex justify-between items-center text-[#858688] mb-[24px]">
                <div className="flex flex-col">
                    <span className="mb-[8px]">
                        • Total Questions: <span className="text-black">{totalQuestions}</span>
                    </span>
                    <span>
                        • Answered: <span className="text-[#31AC0E]">{answeredQuestions}</span>
                    </span>
                </div>
                <div className="w-[179px] flex flex-col justify-self-start">
                    <span className="mb-[8px]">
                        • Unanswered: <span className="text-[#E63B2E]">{totalQuestions ? Number(totalQuestions - answeredQuestions) : 0}</span>
                    </span>
                    <span>
                       • Time Spent: <span className="text-black">{examDuration}</span>
                    </span>
                </div>
            </section>
            <section className="flex items-center gap-x-[14px] mb-[32px]">
                <input
                    type="checkbox"
                    value={checkBox}
                    onChange={handleCheckBox}
                    className="ml-1 scale-120 border border-[#666668] cursor-pointer" 
                />
                <span className="text-[14px]">
                    {
                        type === "exam" ? `I have reviewed and answered all questions.`
                        : `I understand this is a practice test and will be graded automatically`
                    }.
                </span>
            </section>
            <section className="w-full flex justify-between items-center">
                <Button onClick={handleLeftButtonClick}
                    buttonStyle={"w-[48%] h-[46px] flex justify-center items-center py-[16px] px-[24px] text-[#216388] font-semibold border border-[#216388] hover:bg-[#216388] hover:text-white active:bg-white active:text-[#216388] rounded-[10px] "}>
                    {type === "exam" ? "Review Answers" : "Continue Test"}
                </Button>
                <Button onClick={handleRightButtonClick}
                    buttonStyle={"w-[48%] h-[46px] flex justify-center items-center py-[16px] px-[24px] text-white font-semibold bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] disabled:bg-[#9FCAE2]"}
                    disable={checkBox ? false : true}
                >
                    {type === "exam" ? "Submit" : "Get Result"}
                </Button>
            </section>
        </main>
    )
}