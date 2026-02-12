import { ExaminationsNavigation } from "../_components/examination/examinationsNavigation"
import { Card } from "../_components/cards/card"
import { examButton, examCard, examInfo, examStatus, examTitle } from "../../../lib/cardStyles"
import { Button } from "../_components/cards/button"


const examStyles = `border-1 border-black/10 bg-white py-[57px] px-[34px] mt-[54px] mx-[57px] rounded-2xl`

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
        }
    ]

    return (
            <main className={`w-auto h-auto bg-white ${examStyles} `}>
                <ExaminationsNavigation />
                <section className="w-full mt-[54px] space-y-[20px] ">
                {
                    examData.map((data) => 
                        <Card cardStyle={examCard} key={data.id}>
                            <section className="w-full flex justify-between">
                                <div className="w-[406px] space-y-[6px] ">
                                    <Card.Title titleStyle={examTitle}>{data.subject} - {data.examType}</Card.Title>
                                    <Card.Info infoStyle={examInfo}>Chapters {data.chapters}: {data.topics.join(", ")}
                                    </Card.Info>
                                </div>
                                <Card.Status statusStyle={examStatus}>{data.status}</Card.Status>
                            </section>
                            <section className="w-full flex justify-between pt-[22px] pb-[24px] text-[1.0625rem] text-black font-medium">
                                <Card.Date>{data.date}</Card.Date>
                                <Card.Time>{data.start} - {data.end}</Card.Time>
                                <Card.Duration>{data.duration}</Card.Duration>
                            </section>
                            <section className="w-[242px] h-[53px] flex justify-between font-semibold text-[#216388]">
                                <Button buttonStyle={examButton}>Back</Button>
                                <Button buttonStyle={examButton}>Prepare</Button>
                            </section>
                        </Card>
                    )
                }
                </section>
            </main>
    )
}

export default Examinations