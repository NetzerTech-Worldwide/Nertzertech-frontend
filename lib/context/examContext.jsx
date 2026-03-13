"use client"

import { createContext, useState } from "react"

export const examContext = createContext(null)

export const ExamProvider = ({ children }) => {
    const [selected, setSelected] = useState({answers: {}})
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [exams, setExams] = useState(null)
    const [examDuration, setExamDuration] = useState(null)


    // modal states
    const [submitModal, setSubmitModal] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)

    const contextValues = {
        selected,
        setSelected,
        currentQuestion,
        setCurrentQuestion,
        submitModal,
        setSubmitModal,
        loadingModal,
        setLoadingModal,
        successModal,
        setSuccessModal,
        totalQuestions,
        setTotalQuestions,
        examDuration,
        setExamDuration,
        exams,
        setExams
    }

    return <examContext.Provider value={contextValues}>
        {children}
    </examContext.Provider>
}