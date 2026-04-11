"use client"

import { useContext } from "react"
import { SubmitModal } from "../modal/submitModal"
import { LoadingModal } from "../modal/loadingModal"
import { SuccessModal } from "../modal/successModal"
import { examContext } from "../../../../../../../../../lib/context/examContext"

export const ExamModal = ({ type, useCase, id }) => {
    const { submitModal, loadingModal, successModal } = useContext(examContext)

    const modalSelect = () => {
        return (
            useCase === "submit" ? 
                (submitModal && <main className="absolute max-w-screen min-h-screen flex justify-center inset-0 fixed bg-black/50">
                    <section className="w-screen h-screen flex justify-center items-center">
                        <SubmitModal type={type} id={id} />
                    </section>
                </main>) :
            useCase === "loading" ? 
                (loadingModal && <main className="absolute max-w-screen min-h-screen flex justify-center inset-0 fixed bg-black/50">
                    <section className="w-screen h-screen flex justify-center items-center">
                        <LoadingModal type={type}/>
                    </section>
                </main>) :
            useCase === "success" && 
                (successModal && <main className="absolute max-w-screen min-h-screen flex justify-center inset-0 fixed bg-black/50">
                    <section className="w-screen h-screen flex justify-center items-center">
                        <SuccessModal />
                    </section>
                </main>)
        )
    }

    return (
        <>
            {modalSelect()}
        </>
    )
}