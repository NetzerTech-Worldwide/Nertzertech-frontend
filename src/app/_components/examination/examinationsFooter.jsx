import classSchedule from "../../../../public/_assets/class-schedule-icon.svg"
import assignments from "../../../../public/_assets/assignments-icon.svg"
import studyGroup from "../../../../public/_assets/study-group-icon.svg"
import digitalLibrary from "../../../../public/_assets/digital-library-icon.svg"
import Link from "next/link"
import { examFooterCard, examFooterCardContainer, examFooterTitle } from "../../../../lib/cardStyles"
import { Card } from "../cards/card"

export const ExaminationsFooter = () => {
    const baseURL = "http://localhost:3000"

    const cardContent = [
        {
            icon: classSchedule,
            title: "Class Schedule",
            link: "class-schedule"
        },
        {
            icon: assignments,
            title: "Assignments",
            link: "assignments"
        },
        {
            icon: studyGroup,
            title: "Study Group",
            link: "study-group"
        },
        {
            icon: digitalLibrary,
            title: "Digital Library",
            link: "library"
        }

    ]   

    return (
        <main className="w-full">
            <section className="w-[327px]  ">
                <h3 className="text-2xl text-black font-semibold">
                    Quick Access
                </h3>
                <p className="text-[#5D5C5C] ">
                    Jump to your most-used tools and features
                </p>
            </section>
            <section className="grid grid-cols-4 gap-x-[39px] mt-[30px]  ">
                {
                    cardContent.map((content) =>
                        <Link href={`${baseURL}/${content.link}`}
                            key={content.link}
                            className={`${examFooterCardContainer}`}>
                            <Card cardStyle={examFooterCard}>
                                <Card.Icon ImgSrc={content.icon}></Card.Icon>
                                <Card.Title titleStyle={examFooterTitle}>{content.title}</Card.Title>
                            </Card>
                        </Link>
                    )
                }
            </section>
        </main>
    )
}