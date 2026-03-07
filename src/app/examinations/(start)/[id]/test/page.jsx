"use client"

import { useState } from "react"
import { Question } from "../../../../_components/examination/question"
import { QuestionNavigation } from "../../../../_components/examination/questionNavigation"

const questions = [
        {
            id: "abc",
            text: "What is the derivative of sin(x)?",
            options: [{label: "A", option: "Cos(x)"}, {label: "B", option: "-Cos(x)"}, {label: "C", option: "Sin(x)"}, {label: "D", option: "Tan(x)"} ],
            answer:"cos(x)",
            page: 1,
            total: 3,
            totalPages: 3
        },
        {
            id: "def",
            text: "Solve 2x + 5 = 13",
            options: [{label: "A", option: "x = 2"}, {label: "B", option: "x = 4"}, {label: "C", option: "x = 5"}, {label: "D", option: "x = 3"} ],
            answer:"cos(x)",
            page: 2,
            total: 3,
            totalPages: 3
        },
        {
            id: "ghi",
            text: "What is the sum of interior angles in a triangle?",
            options: [{label: "A", option: "90°"}, {label: "B", option: "180°"}, {label: "C", option: "270°"}, {label: "D", option: "360°"} ],
            answer:"cos(x)",
            page: 3,
            total: 3,
            totalPages: 3
        }
    ]
    
const Test = () => {
    const [selected, setSelected] = useState({answers: {}})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const handleOnAnswer = (label, option, questionId) => {
        setSelected({...selected, answers: {
            ...selected.answers, [questionId] : [label, option]
        }})    
    }

    console.log(selected)
    
    const handleNextPage = (page, end, setPage) => {
        if (page !== end) {
            setPage((prev) => prev + 1)
        }
        console.log("next page")
    }

    const handlePreviousPage = (page, setPage) => {
        if (page !== 0) {
            setPage((prev) => prev - 1)
        }
        console.log("previous page")
    }

    // answer progress
    const progress = Object.keys(selected.answers).length

    //update progress bar
    const showProgress = () => {
        return Math.floor(progress/questions[currentQuestion].total * 100)
    }
    
    return (
        <main className="w-full h-auto p-[24px] border border-[#DCDEE1] text-black rounded-[24px]">
            <section className="flex justify-between items-center text-xl font-semibold mb-[16px]">
                <h5>Progress</h5>
                <span>{progress}/{questions[currentQuestion].total}</span>
            </section>
            <section className="text-[#666668] mb-[24px]">
                <span>Answered</span>
                <div className="w-full h-[10px] bg-[#EAF3F9] mt-[8px] rounded-[50px] ">
                    <div className={`h-[10px] bg-[#216388] rounded-[50px] duration-400`}
                        style={{width: `${showProgress()}%`}}
                    ></div>
                </div>
            </section>
            <section>
                <Question 
                    questions={questions}
                    currentQuestion={currentQuestion}
                    handleOnAnswer={handleOnAnswer} 
                    selected={selected} 
                    setSelected={setSelected}
                />
            </section>
            <section className="flex justify-end mt-[32px]">
                <QuestionNavigation 
                    lastPage={questions[0].totalPages}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion} 
                    handleNextPage={handleNextPage} 
                    handlePreviousPage={handlePreviousPage}
                />
            </section>
        </main>
    )
}

export default Test