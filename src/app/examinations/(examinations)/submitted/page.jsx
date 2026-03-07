import { Card } from "../../../_components/cards/card"
import { examButton, examCard, examInfo, examStatus, examStatusCompleted, examTitle } from "../../../../../lib/cardStyles"
import { Button } from "../../../_components/cards/button"
import { Calendar, Clock } from "lucide-react"
import subjectImg from "../../../../../public/_assets/subject-image.svg"
import { examData } from "../../../../../lib/constants"


export const examStyles = `bg-white py-[32px] px-[24px] rounded-2xl`

const SubmittedExams = () => {

    const completedExams = examData.filter((data) => 
        data.status === "completed"
    )

    console.log(completedExams)
    return (
            <main className={`w-auto h-auto bg-white ${examStyles} `}>
                <section className="w-full grid grid-cols-3 gap-[48px] ">
                {
                    completedExams.map((data) => 
                        <Card cardStyle={examCard} key={data.id}>
                            <Card.Icon 
                                ImgSrc={subjectImg} 
                                ImgWidth={400} 
                                ImgHeight={100}
                                iconStyle={"rounded-[16px]"}
                            >
                            </Card.Icon>
                            <section className="w-full flex justify-between items-center pt-[24px] ">
                                <Card.Title titleStyle={examTitle}>{data.subject}</Card.Title>
                                <Card.Status statusStyle={examStatusCompleted}>{data.status}</Card.Status>
                            </section>
                            <section className="w-full flex justify-between items-center py-[8px] text-[1.0625rem] font-medium">
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Calendar color="#216388" width={17} height={17}/>
                                    <Card.Date>Date . {data.date}</Card.Date>
                                </div>
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Clock color="#216388" width={17} height={17}/>
                                    <Card.Time>{data.start}</Card.Time>
                                </div>
                            </section>
                            <Button buttonStyle={examButton}>View Result</Button>
                        </Card>
                    )
                }
                </section>
            </main>
    )
}

export default SubmittedExams