import { Card } from "../cards/card"
import { examDetails } from "../../../../lib/constants"
import chart from "../../../../public/_assets/preparation-chart.svg"

export const ExamDetails = () => {

    return (
        <main className="w-full h-auto py-[40px] px-[24px] border border-[#DCDEE1] bg-white rounded-[24px] ">
            <section className="flex items-center gap-x-[84px] text-black">
                <Card cardStyle={"w-full h-auto p-[24px] bg-[#FBFCFD] rounded-[24px]"}>
                    <Card.Title titleStyle={"text-2xl font-semibold"}>Exam Details</Card.Title>
                    <div className="flex justify-between items-center mt-[16px]">
                        <Card.Info infoStyle={"font-medium capitalize"}>
                            <span className="text-[#858688] mr-[8px] ">Subject</span>{examDetails.subject}
                        </Card.Info>
                        <Card.Time timeStyle={"font-bold"}>
                            <span className="text-[#858688] mr-[8px]">Time</span>
                            {examDetails.start} - {examDetails.end}
                        </Card.Time>
                    </div>
                    <div className="flex justify-between items-center mt-[8px] font-bold">
                        <Card.Date>
                            <span className="text-[#858688] mr-[8px]">Date</span>
                            {examDetails.date}
                        </Card.Date>
                        <Card.Info infoStyle={"w-45 font-medium capitalize self-start"}>
                            <span className="text-[#858688] mr-[8px]">Location</span>{examDetails.class} class
                        </Card.Info>
                    </div>
                    <div className="mt-[29px] font-medium ">
                        <Card.Title titleStyle={"text-[#858688] mb-[8px]"}>Syllabus</Card.Title>
                        <Card.Info infoStyle={"capitalize"}>{examDetails.syllabus}: {(examDetails.topics).join(", ")}</Card.Info>
                    </div>
                </Card>

                <Card cardStyle={"w-full h-auto flex flex-col justify-center items-center p-[24px] bg-[#FBFCFD] rounded-[24px]"}>
                    <Card.Title titleStyle={"text-2xl font-semibold"}>Preparation progress</Card.Title>
                    <Card.Icon ImgSrc={chart}></Card.Icon>
                    <div className="flex gap-x-[24px] font-bold">
                        <Card.Info>
                            <span className="text-[#858688]">Materials Downloaded: </span>
                            {examDetails.downloaded}/{examDetails.totalMaterials}
                        </Card.Info>
                        <Card.Info>
                            <span className="text-[#858688]">Practice Tests: </span>
                            {examDetails.testsDone}/{examDetails.totalTests}
                        </Card.Info>
                    </div>
                </Card>
            </section>
        </main>
    )
}