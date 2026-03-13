"use client"

import { Card } from "../../_components/cards/card"
import { examButton, examCard, examStatus, examStatusCompleted, examTitle } from "../../../../lib/cardStyles"
import { Button } from "../../_components/cards/button"
import { Calendar, Clock } from "lucide-react"
import subjectImg from "../../../../public/_assets/subject-image.svg"
import { useFetchData, useFetchDataWithId } from "../../../../lib/hooks"
import { getOptions } from "../../../../lib/options"
import { getDueDate, getDueTime } from "../../../../lib/helpers"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { examContext } from "../../../../lib/context/examContext"

const Examinations = () => {
    const router = useRouter()

    const { setExams } = useContext(examContext)

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination?filter=all`
    const token = process.env.NEXT_PUBLIC_TOKEN
    const cacheId = "all exams"
    const {data: exams} = useFetchData(url, getOptions(token), cacheId)

    const handleClick = (dueDate, id, registeredScore) => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination/${id}/start`
        const cacheId = "start"
        const now = new Date()
        if (dueDate <= now) {
            const { data: start } = useFetchDataWithId(url, getOptions(token), id, cacheId)
            if (start?.startTime) {
                router.push(`/examinations/${id}/exam`)
            }
            return
        }
        if (dueDate > now) {
            router.push(`/examinations/${id}/study-materials`)
        }
        if (dueDate < now && registeredScore > 0) {
            router.push(`/examinations/${id}/result`)
        }
    }

    useEffect(() => {
        setExams(exams)
    }, [])

    return (
            <main className={`w-auto h-auto bg-white py-[32px] px-[24px] rounded-2xl `}>
                <section className="w-full grid grid-cols-3 gap-[48px] ">
                {
                    exams?.map((data) => 
                        <Card cardStyle={examCard} key={data?.id}>
                            <Card.Icon ImgSrc={subjectImg} ImgWidth={400} ImgHeight={100} iconStyle={"rounded-[16px]"}></Card.Icon>
                            <section className="w-full flex justify-between items-center pt-[24px] ">
                                <Card.Title titleStyle={examTitle}>{data?.subject}</Card.Title>
                                <Card.Status statusStyle={`${data?.status === "completed" ? examStatusCompleted : examStatus}`}>
                                    {new Date(data?.dueDate) <= new Date() && 
                                        <div className="w-[15px] h-[15px] border-[4px] border-[#D1362A] bg-white rounded-full mr-[8px] "></div>
                                    } {data?.status}
                                </Card.Status>
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
                            <Button onClick={() => handleClick(data?.dueDate, data?.id, Object.entries(data?.score).length)}
                                buttonStyle={examButton}
                            >
                                {new Date(data?.dueDate) <= new Date() ? "Start Examination" 
                                : new Date(data?.dueDate) > new Date() 
                                ? "Prepare" 
                                : new Date(data?.dueDate) < new Date() && Object.entries(data?.score).length > 0 && "View Result"}
                            </Button>
                        </Card>
                    )
                }
                </section>
            </main>
    )
}

export default Examinations