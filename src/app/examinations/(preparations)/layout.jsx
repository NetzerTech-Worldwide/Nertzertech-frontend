"use client"

import { Lato } from "next/font/google"
import { PreparationNavigation } from "../../_components/examination/preparationNavigation"
import { ExamDetails } from "../../_components/examination/examDetails"
import { ExamHeader } from "../../_components/examination/examHeader"
import Image from "next/image"
import profilePhoto from "../../../../public/_assets/profile-photo.png"
import { Button } from "../../_components/cards/button"
import { ArrowLeft } from "lucide-react"
import { TestTips } from "../../_components/examination/testTips"
import { useRouter } from "next/navigation"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function PreparationLayout ({ children }) {
    const router = useRouter()
    
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
            <Button onClick={() => router.back()}
                buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] mb-[0px] ml-[39px] bg-[#216388] rounded-[8px] "}>
                <ArrowLeft />
                <span>Back</span>
            </Button>
            <section className={`w-full h-auto bg-[#FBFEFF]  pb-20 pr-[55px] pl-[40px] pt-[32px]`} >
                <section className="mb-[32px]">
                    <ExamDetails />
                </section>
                <section className=" ">
                    <section>
                        <PreparationNavigation />
                    </section>
                    <section className="border-2 border-[#F2F4F7] rounded-b-[16px]">
                        {children}
                    </section>
                </section>
                <section className="mt-[32px] ">
                    <TestTips title={"Test Tips"} />
                </section>
            </section>
        </main>
    )
}


// ACADEMIC HEADER
{/* 
    <section className="flex justify-between w-full h-auto py-4 px-[53px] text-black shadow-[0_4px_70px_0_#000000]/5 bg-white">
    <div>
        <h3 className="text-[1.75rem] font-bold pb-[6px] ">
            Examinations
        </h3>
        <p className="text-[#5D5C5C]">
            Manage your examinations and practice tests
        </p>
    </div>
    <div className="flex justify-between w-[495px] h-[65px] py-[13px] px-[26px] bg-[#F6F7F8]/74 rounded-[7px] ">
        <input 
            type="text" 
            placeholder="Search anything here"
            className="outline-none text-lg placeholder-black/36 "
        />
        <Image 
            src={searchIcon}
            alt="search icon"
            width={20}
            height={20}
        />
    </div>
</section> */}