"use client"

import { useContext } from "react"
import { examContext } from "../../../../lib/context/examContext"
import { question } from "../../../../lib/constants"

export const QuestionNavigation = ({ question }) => {
    
    const { currentQuestion, setCurrentQuestion } = useContext(examContext)
    
    const lastPage = question?.totalPages

    const handleNextPage = () => {
        if (question?.page !== lastPage) {
            setCurrentQuestion((prev) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (question?.page > 1) {
            setCurrentQuestion((prev) => prev - 1)
        }
    }

    return (
        <main className="flex items-cener gap-x-[16px] ">
            {question?.page > 1 && <button onClick={() => handlePreviousPage(question.page, setCurrentQuestion)}
                className={"w-[136px] h-[46px] flex justify-center items-center text-[#216388] font-semibold py-[16px] px-[24px] border border-[#216388] bg-white hover:bg-[#216388] hover:text-white active:bg-white active:text-[#216388] rounded-[10px] cursor-pointer"}
            >
                Previous
            </button>}
            <button onClick={() => handleNextPage()}
                className={"w-[123px] h-[46px] flex justify-center items-center text-white font-semibold py-[16px] px-[24px] bg-[#216388] rounded-[10px] cursor-pointer hover:bg-[#9FCAE2] active:bg-[#216388] disabled:bg-[#73B1D5]"}
                disabled={question?.page === lastPage}
            >
                Next
            </button>
        </main>
    )
}