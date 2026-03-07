import { Lato } from "next/font/google"
import { ExamHeader } from "../../../_components/examination/examHeader"
import { Timer } from "../../../_components/examination/timer"
import { Button } from "../../../_components/cards/button"
import { ArrowLeft } from "lucide-react"
import { TestTips } from "../../../_components/examination/testTips"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function TestLayout({ children }) {

    return (
        <main className={`w-full min-h-screen bg-[#FBFEFF] text-black ${lato.className}`}>
            <ExamHeader title={"Practice Test"} description={"Question 1-5"}>
                <Timer title={"Test Timer"} />
            </ExamHeader>
            <Button buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[8px] "}>
                <ArrowLeft />
                <span>Back</span>
            </Button>
            <section className="flex justify-between items-center mt-[24px] mb-[32px] pr-[55px] pl-[40px]">
                <h3 className="text-[1.75rem] font-bold">
                    Your Practice Test
                </h3>
                <Button buttonStyle={"text-white font-semibold py-[16px] px-[24px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] "}>
                    Submit Test
                </Button>
            </section>
            <section className="pr-[55px] pl-[40px]">
                {children}
            </section>
            <section className="pr-[55px] pl-[40px] pb-[95px] mt-[32px]">
                <TestTips title={"Test Tips"} />
            </section>
        </main>
    )
}