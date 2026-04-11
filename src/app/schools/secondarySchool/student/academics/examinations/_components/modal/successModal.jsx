"use client"

import Image from "next/image"
import checkIcon from "../../../../../../../../../public/_assets/check-icon.svg"
import { Button } from "../../../../../../../_components/cards/button"
import { useContext } from "react"
import { examContext } from "../../../../../../../../../lib/context/examContext"
import { useRouter } from "next/navigation"

export const SuccessModal = () => {
    const router = useRouter()
    const { setSuccessModal } = useContext(examContext)

    const handleClick = () => {
        setSuccessModal(false)
        router.push("/schools/secondarySchool/student/dashboard")
    }
    
    return (
        <main className="w-[50%] h-fit flex flex-col justify-center items-center p-[50px] bg-white rounded-[30px]">
            <section className="flex justify-center items-center mb-[40px]">
                <div className="w-[192px] h-[192px] flex justify-center items-center bg-[#21638854] rounded-full">
                    <div className="flex justify-center items-center w-[156px] h-[156px] bg-[#216388] rounded-full ">
                        <Image 
                            src={checkIcon}
                            alt="check"
                            width={62}
                            height={45}
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center mb-[40px] ">
                <h2 className="text-[2.125rem] font-bold">
                    Examination Submitted Sucessfully!
                </h2>
                <p className="w-[80%] text-xl text-[#5D5C5C] text-center mt-[25px] leading-[150%]">
                    Your answers have been securely recorded and finalized. Click the 
                    <span className="text-black font-semibold">“Go to Dashboard“</span> to go back.
                </p>
            </section>
            <Button onClick={handleClick}
                buttonStyle={"w-[232px] h-[50px] mx-auto p-[10px] text-white font-semibold bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px]"}
            >
                Go to Dashboard
            </Button>
        </main>
    )
}