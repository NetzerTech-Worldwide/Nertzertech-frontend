"use client"

import { useContext, useEffect } from "react"
import { Question } from "../../../../_components/examination/question"
import { QuestionNavigation } from "../../../../_components/examination/questionNavigation"
import { PageSelect } from "../../../../_components/examination/pageSelect"
import { examContext } from "../../../../../../lib/context/examContext"
import { useParams } from "next/navigation"
import { getOptions } from "../../../../../../lib/options"
import { useFetchDataWithId } from "../../../../../../lib/hooks"
import { Button } from "@/app/_components/cards/button"

const Exam = () => {
    const params = useParams()
    const { id } = params

    const { selected, currentQuestion, setCurrentQuestion, setTotalQuestions, setSubmitModal, setExamDuration } = useContext (examContext)

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

    useEffect(() => {
        let set = true
        if (set) {
            setTotalQuestions(question?.total)
            // setExamDuration(question?.duration)
        }

        return () => set = false
    }, [id])

    return (
        <main className="w-full">
            <div className="flex justify-between items-center mt-[24px] mb-[32px]">
                <h3 className="text-[1.75rem] font-bold">
                    Examination
                </h3>
                <Button onClick={() => setSubmitModal(true)}
                    buttonStyle={"text-white font-semibold py-[16px] px-[24px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] "}>
                    Submit Exam
                </Button>
            </div>
            {question ?
                <section className="mb-[32px] overflow-x-hidden overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    <PageSelect question={question} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
                </section> : null
            }
            <section className="w-full h-auto p-[24px] border border-[#DCDEE1] text-black rounded-[24px]">
                <div className="flex justify-between items-center text-xl font-semibold mb-[16px]">
                    <h5>Progress</h5>
                    <span>{progress}/{question?.total}</span>
                </div>
                <div className="text-[#666668] mb-[24px]">
                    <span>Answered</span>
                    <div className="w-full h-[10px] bg-[#EAF3F9] mt-[8px] rounded-[50px] ">
                        <div className={`h-[10px] bg-[#216388] rounded-[50px] duration-400`}
                            style={{width: `${showProgress()}%`}}
                        ></div>
                    </div>
                </div>
                <div>
                {
                    question ? <Question question={question} /> : 
                    <div className="w-full h-50 flex justify-center items-center">
                        <h2 className="text-3xl font-bold">QUESTIONS NOT AVAILABLE YET</h2>
                    </div>
                }
                </div>
                <div className="flex justify-end mt-[32px]">
                    <QuestionNavigation question={question} />
                </div>
            </section>
        </main>
    )
}

export default Exam