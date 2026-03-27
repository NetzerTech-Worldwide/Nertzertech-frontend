import { Lato } from "next/font/google"
import { ExamHeader } from "../../_components/examHeader"
import { Timer } from "../../_components/timer"
import { ArrowLeft } from "lucide-react"
import { TestTips } from "../../_components/testTips"
import { ExamModal } from "../../_components/modal/examModal"
import { BackButton } from "../../_components/backButton"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function TestLayout({ children }) {

    return (
        <main className={`w-full relative min-h-screen bg-[#FBFEFF] text-black ${lato.className}`}>
            <ExamHeader title={"Practice Test"} description={"test"}>
                <Timer title={"Test Timer"} />
            </ExamHeader>
            <BackButton
                buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] rounded-[8px] "}>
                <ArrowLeft />
                <span>Back</span>
            </BackButton>
            <section className="pr-[55px] pl-[40px]">
                {children}
            </section>
            <section className="pr-[55px] pl-[40px] pb-[95px] mt-[32px]">
                <TestTips title={"Test Tips"} />
            </section>
           <ExamModal useCase={"submit"}  type={"test"} /> 
           <ExamModal useCase={"loading"} type={"test"} />
        </main>
    )
}