import { Card } from "../../../../../../_components/cards/card"
import Image from "next/image"
import ideaIcon from "../../../../../../../../public/_assets/idea-icon.svg"
import { recommendedSteps } from "../../../../../../../../lib/constants"
import { Button } from "../../../../../../_components/cards/button"
import { Chart } from "./chart"
import { useRouter } from "next/navigation"
import { getOptions } from "../../../../../../../../lib/options"
import { useFetchDataWithId } from "../../../../../../../../lib/hooks"

export const Statistics = ({ result, examId }) => {
    const router = useRouter()

    const chartValues = {
        pathStroke: '42, 126, 175',
        trailStroke: '#EAF3F9',
        fontSize: '17px',
        fontWeight: '700'
    }

    const handleClick = () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination/${examId}/start`
        const token = process.env.NEXT_PUBLIC_TOKEN
        const cacheId = "start"
        const { data: start } = useFetchDataWithId(url, getOptions(token), id, cacheId)
        if (start?.startTime) {
            router.push(`/examinations/${examId}/test`)
        }
        throw new Error("something went wrong")
    }

    return (
        <main className="bg-white border border-[#F2F4F7] rounded-[24px]">
            <section className="p-[24px] text-xl font-semibold border-b border-[#F2F4F7]">
                <h5>Statistics</h5>
            </section>
            <div className="p-[24px]">
                <section>
                    <Card cardStyle={"p-[16px] bg-[#F9FAFB] rounded-[8px] "}>
                        <div className="flex justify-center items-center gap-x-[42px] text-xl font-bold">
                            <div className="flex flex-col justify-center items-center">
                                <Card.Info infoStyle={"font-normal text-base mb-[17px]"}>Time Taken</Card.Info>
                                <Card.Analysis>{result.timeTakenSeconds * 60} mins</Card.Analysis>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Card.Info infoStyle={"font-normal text-base mb-[17px]"}>Time Per Question</Card.Info>
                                <Card.Analysis>{result.timePerQuestionSeconds * 60}</Card.Analysis>
                            </div>
                        </div>
                    </Card>
                </section>
                <section className="mt-[32px]">
                    <h5 className="text-xl font-semibold mb-[24px]">
                        Category Performance
                    </h5>
                    <div className="flex items-center justify-center gap-x-[34px]">
                        <div className="flex flex-col items-center text-[#2A7EAF] font-bold">
                            <div className="w-[64px]">
                                <Chart score={result?.summary.score} values={{...chartValues}} />
                            </div>
                            <span>Problem Solving</span>
                        </div>
                        <div className="flex flex-col items-center text-[#2A7EAF] font-bold">
                            <div className="w-[64px] ">
                                <Chart score={result?.summary.score} values={{...chartValues}} />
                            </div>
                            <span>Application</span>
                        </div>
                    </div>
                </section>
                <section className=" py-[27px] px-[28px] text-[#B55424] bg-[#FFFBF6] mt-[32px] rounded-[12px] ">
                    <div className="flex items-center gap-x-[16px] mb-[24px]">
                        <Image 
                            src={ideaIcon}
                            alt="idea"
                            width={20}
                            height={20}
                        />
                        <h5 className="text-xl font-semibold">Recommended Steps</h5>
                    </div>
                    {
                        recommendedSteps.map((tip, index) =>
                            <div key={index}
                                className="flex items-center gap-x-[17px] mb-[20px] ">
                                <span className="w-[7px] h-[7px] bg-[#B55424] rounded-full "></span>
                                <p>
                                    {tip}.
                                </p>
                            </div>
                        )
                    }
                </section>
                <Button onClick={handleClick}
                    buttonStyle={"w-full py-[16px] px-[24px] text-white  mt-[32px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] "} examId={examId} >
                    Retake Test
                </Button>
            </div>
        </main>
    )
}