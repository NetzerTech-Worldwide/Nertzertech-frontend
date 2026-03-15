import { Lato } from "next/font/google"
import { PreparationNavigation } from "../../_components/examination/preparationNavigation"
import { ExamDetails } from "../../_components/examination/examDetails"
import { ExamHeader } from "../../_components/examination/examHeader"
import Image from "next/image"
import profilePhoto from "../../../../public/_assets/profile-photo.png"
import { ArrowLeft } from "lucide-react"
import { TestTips } from "../../_components/examination/testTips"
import { BackButton } from "../../_components/examination/backButton"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function PreparationLayout ({ children }) {
    
    return (
        <main className={`bg-[#FBFEFF] ${lato.className}`}>
            <section>
                <ExamHeader title={"Examination Preparation"} description={"Advanced Mathematics - First term Examination"}>
                    <div className="flex items-center gap-x-[13px] ">
                        <div className="w-[54px] h-[54px] rounded-full relative">
                            <Image 
                                src={profilePhoto}
                                alt="profile photo"
                                fill
                                className="object-cover rounded-[inherit]"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-[7px] ">Daniel Dike</h3>
                            <span>SS 2</span>
                        </div>
                    </div>
                </ExamHeader>
            </section>
            <BackButton
                buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] rounded-[8px] "}>
                <ArrowLeft />
                <span>Back</span>
            </BackButton>
            <section className={`w-full h-auto bg-[#FBFEFF]  pb-20 pr-[55px] pl-[40px] pt-[32px]`} >
                <div className="mb-[32px]">
                    <ExamDetails />
                </div>
                <div className=" ">
                    <div>
                        <PreparationNavigation />
                    </div>
                    <div className="border-2 border-[#F2F4F7] rounded-b-[16px]">
                        {children}
                    </div>
                </div>
                <div className="mt-[32px] ">
                    <TestTips title={"Test Tips"} />
                </div>
            </section>
        </main>
    )
}