import { Clock } from "lucide-react"
import { Lexend_Peta } from "next/font/google"

const lexend = Lexend_Peta({
    weight: ["100", "400", "600", "700"],
    subsets: ["latin"]
})

export const Timer = ({ title }) => {

    return (
        <main className="flex flex-col justify-center items-center p-[16px] text-[#7F2019] border border-[#E63B2E] bg-[#FDEBEA] rounded-[16px] ">
            <h5 className="text-[14px] mb-[8px]">{title}</h5>
            <section className="flex items-center gap-x-[8px]">
                <Clock color="#7F2019"/>
                <div className=" flex flex-col items-center justify-center">
                    <span className={`text-xl font-semibold ${lexend.className}`}>
                        00:20:11
                    </span>
                    <div className="flex gap-x-[19px] items-center text-[10px]">
                        <span>Hours</span>
                        <span>Mins</span>
                        <span>Sec</span>
                    </div>
                </div>
            </section>
        </main>
    )
}