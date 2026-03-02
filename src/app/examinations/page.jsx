import { Card } from "../_components/cards/card"
import { examButton, examCard, examInfo, examStatus, examTitle } from "../../../lib/cardStyles"
import { Button } from "../_components/cards/button"
import { Calendar, Clock } from "lucide-react"
import subjectImg from "../../../public/_assets/subject-image.svg"


const examStyles = `bg-white py-[32px] px-[24px] rounded-2xl`

const Examinations = () => {

    const examData = [
        {
            id: "abc",
            subject: "Mathematics",
            examType: "Midterm Exam",
            chapters: "1-8",
            topics: ["calculus", "integration", "differential equations"],
            date: "2025-08-05",
            start: "11:00AM",
            end: "2:00PM",
            duration: "3 hours",
            status: "scheduled"
        },
        {
            id: "def",
            subject: "Biology",
            examType: "Examination",
            chapters: "1-8",
            topics: ["photosynthesis and its importance to plants"],
            date: "2025-08-05",
            start: "12:00PM",
            end: "3:00PM",
            duration: "3 hours",
            status: "scheduled"
        },
        {
            id: "def",
            subject: "Biology",
            examType: "Examination",
            chapters: "1-8",
            topics: ["photosynthesis and its importance to plants"],
            date: "2025-08-05",
            start: "12:00PM",
            end: "3:00PM",
            duration: "3 hours",
            status: "scheduled"
        },
        {
            id: "def",
            subject: "Biology",
            examType: "Examination",
            chapters: "1-8",
            topics: ["photosynthesis and its importance to plants"],
            date: "2025-08-05",
            start: "12:00PM",
            end: "3:00PM",
            duration: "3 hours",
            status: "scheduled"
        },
        {
            id: "def",
            subject: "Biology",
            examType: "Examination",
            chapters: "1-8",
            topics: ["photosynthesis and its importance to plants"],
            date: "2025-08-05",
            start: "12:00PM",
            end: "3:00PM",
            duration: "3 hours",
            status: "scheduled"
        }
    ]

    return (
            <main className={`w-auto h-auto bg-white ${examStyles} `}>
                <section className="w-full grid grid-cols-3 gap-[48px] ">
                {
                    examData.map((data) => 
                        <Card cardStyle={examCard} key={data.id}>
                            <Card.Icon ImgSrc={subjectImg} ></Card.Icon>
                            <section className="w-full flex justify-between items-center">
                                <Card.Title titleStyle={examTitle}>{data.subject}</Card.Title>
                                <Card.Status statusStyle={examStatus}>{data.status}</Card.Status>
                            </section>
                            <section className="w-full flex justify-between items-center pt-[22px] pb-[24px] text-[1.0625rem] text-black font-medium">
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Calendar color="#216388" width={16} height={16}/>
                                    <Card.Date>Date . {data.date}</Card.Date>
                                </div>
                                <div className="flex gap-x-[8px] items-center text-[#858688] ">
                                    <Clock color="#216388" width={16} height={16}/>
                                    <Card.Time>{data.start}</Card.Time>
                                </div>
                            </section>
                            <Button buttonStyle={examButton}>Start Examination</Button>
                        </Card>
                    )
                }
                </section>
            </main>
    )
}

export default Examinations