import { Card } from "./cards/card"
import { timeTableCard, timeTableInfo, timeTableTime, timeTableTitle } from "../../../lib/cardStyles"
import iconOne from "../../../public/_assets/timetable-card-icon-one.svg"
import iconTwo from "../../../public/_assets/timetable-card-icon-two.svg"
import iconThree from "../../../public/_assets/timetable-card-icon-three.svg"

export const DashboardTimetable = () => {

    const timeTableData = [
        {
            id: "abc",
            title: "Next Class",
            icon: iconOne,
            info: "Mathematics",
            start: "9AM",
            end: "11AM",
            backgroundColor: "#D7FECC82"
        },
        {
            id: "def",
            title: "Assignment Due",
            icon: iconTwo,
            info: "Biology",
            start: "9AM",
            end: "11AM",
            backgroundColor: "#BFE8FF4F"
        },
        {
            id: "ghi",
            title: "Upcoming Test",
            icon: iconThree,
            info: "English Test",
            start: "9AM",
            end: "11AM",
            backgroundColor: "#FFE3CE4F"
        },
    ]

    return (
        <main className="w-full pr-[63px] pl-[38px] grid grid-cols-3 gap-x-[34px]">
        {
            timeTableData.map((data) => 
                <Card cardStyle={timeTableCard} backGround={`bg-[${data.backgroundColor}]`} key={data.id}>
                    <div className="flex justify-between">
                        <Card.Title titleStyle={timeTableTitle}>{data.title}</Card.Title>
                        <Card.Icon ImgSrc={data.icon} ImgWidth={42} ImgHeight={40}></Card.Icon>
                    </div>
                    <div className="flex justify-between items-center text-black/80 font-bold">
                        <Card.Info infoStyle={timeTableInfo}>{data.info}</Card.Info>
                        <Card.Time timeStyle={timeTableTime}>{data.start} - {data.end}</Card.Time>
                    </div>
                </Card>
            )
        }
        </main>
    )
}