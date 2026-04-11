"use client"

import { Card } from "../../../../../../../_components/cards/card"
import { examButton, examCard, examStatusCompleted, examTitle } from "../../../../../../../../../lib/cardStyles"
import { Button } from "../../../../../../../_components/cards/button"
import { Calendar, Clock } from "lucide-react"
import subjectImg from "../../../../../../../../../public/_assets/subject-image.svg"
import { getDueDate, getDueTime } from "../../../../../../../../../lib/helpers"
import { useFetchData } from "../../../../../../../../../lib/hooks"
import { getOptions } from "../../../../../../../../../lib/options"


const SubmittedExams = () => {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination?filter=past`
    const token = process.env.NEXT_PUBLIC_TOKEN
    const cacheId = "submitted exams"
    const {data: submittedExams} = useFetchData(url, getOptions(token), cacheId)
    
    return (
            <main className={`w-auto h-auto bg-white py-[32px] px-[24px] rounded-2xl`}>
                <section className="w-full grid grid-cols-3 gap-[48px] ">
                {
                    submittedExams?.map((data) => 
                        <Card cardStyle={examCard} key={data?.id}>
                            <Card.Icon ImgSrc={subjectImg} ImgWidth={400} ImgHeight={100} iconStyle={"rounded-[16px]"}></Card.Icon>
                            <section className="w-full flex justify-between items-center pt-[24px] ">
                                <Card.Title titleStyle={examTitle}>{data?.subject}</Card.Title>
                                <Card.Status statusStyle={examStatusCompleted}>{data?.status}</Card.Status>
                            </section>
                            <section className="w-full flex justify-between items-center py-[8px] text-[1.0625rem] font-medium">
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Calendar color="#216388" width={17} height={17}/>
                                    <Card.Date>Date . {getDueDate(data?.dueDate)}</Card.Date>
                                </div>
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Clock color="#216388" width={17} height={17}/>
                                    <Card.Time>{getDueTime(data?.dueDate)}</Card.Time>
                                </div>
                            </section>
                            <Button onClick={() => router.push(`/examinations/${data?.id}/result`)}
                                buttonStyle={examButton} 
                            >
                                View Result
                            </Button>
                        </Card>
                    )
                }
                </section>
            </main>
    )
}

export default SubmittedExams