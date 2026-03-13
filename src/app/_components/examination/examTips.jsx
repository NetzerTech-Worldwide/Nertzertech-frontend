import Image from "next/image"
import ideaIcon from "../../../../public/_assets/idea-icon.svg"
import { examTips } from "../../../../lib/constants"

export const ExamTips = ({ title }) => {

    return (
        <main className="w-full h-auto py-[27px] px-[28px] text-[#B55424] bg-[#FFF1EB] rounded-[12px]">
            <section className="flex items-center gap-x-[16px] mb-[24px]">
                <Image 
                    src={ideaIcon}
                    alt="image"
                    width={20}
                    height={20}
                />
                <h3 className="font-smibold text-2xl">
                    {title}
                </h3>
            </section>
            <section className="space-y-[20px] ">
            {
                examTips.map((tip, index) =>
                    <div key={index}
                        className="flex items-center gap-x-[17px] ">
                        <span className="w-[7px] h-[7px] bg-[#B55424] rounded-full "></span>
                        <p>
                            {tip}.
                        </p>
                    </div>
                )
            }
            </section>
        </main>
    )
}