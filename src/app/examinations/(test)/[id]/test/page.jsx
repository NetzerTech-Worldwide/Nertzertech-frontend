"use client"

import { useContext, useEffect } from "react"
import { Question } from "../../../../_components/examination/question"
import { QuestionNavigation } from "../../../../_components/examination/questionNavigation"
import { examContext } from "../../../../../../lib/context/examContext"
import { useFetchDataWithId } from "../../../../../../lib/hooks"
import { getOptions } from "../../../../../../lib/options"
import { useParams } from "next/navigation"
    
const Test = () => {
    const params = useParams()
    const { id } = params
    const { selected, currentQuestion, setTotalQuestions, setExamDuration } = useContext(examContext)
    
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination/${id}/questions?page=${currentQuestion}&limit=1`
    const token = process.env.NEXT_PUBLIC_TOKEN
    const cacheId = `question ${currentQuestion}`
    const {data: question} = useFetchDataWithId(url, getOptions(token), currentQuestion, cacheId)

    // answer progress
    const progress = Object.keys(selected.answers).length

    //update progress bar
    const showProgress = () => {
        if (progress === 0) {
            return 0
        }
        return Math.floor(progress/question?.total * 100)
    }

    useEffect((question) => {
        let set = true
        if (set) {
            setTotalQuestions(question?.total)
            // setExamDuration(question?.duration)
        }

        return () => set = false
    }, [id])
    
    return (
        <main className="w-full h-auto p-[24px] border border-[#DCDEE1] text-black rounded-[24px]">
            <section className="flex justify-between items-center text-xl font-semibold mb-[16px]">
                <h5>Progress</h5>
                <span>{progress}/{question?.total}</span>
            </section>
            <section className="text-[#666668] mb-[24px]">
                <span>Answered</span>
                <div className="w-full h-[10px] bg-[#EAF3F9] mt-[8px] rounded-[50px] ">
                    <div className={`h-[10px] bg-[#216388] rounded-[50px] duration-400`}
                        style={{width: `${showProgress()}%`}}
                    ></div>
                </div>
            </section>
            {
                question ? <Question question={question} /> : 
                <div className="w-full h-50 flex justify-center items-center">
                    <h2 className="text-3xl font-bold">QUESTIONS NOT AVAILABLE YET</h2>
                </div>
            }
            <section className="flex justify-end mt-[32px]">
                <QuestionNavigation question={question} />
            </section>
        </main>
    )
}

export default Test