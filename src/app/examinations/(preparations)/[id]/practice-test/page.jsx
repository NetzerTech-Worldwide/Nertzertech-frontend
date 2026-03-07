import { Card } from "../../../../_components/cards/card"
import practiceChartOne from "../../../../../../public/_assets/practice-chart-one.svg"
import { Button } from "../../../../_components/cards/button"

const PracticeTest = () => {
    const testData = [
        {
            id: "abc",
            score: 35,
            grade: "Fair",
            title: "Midterm practice test 1",
            questions: 25,
            time: 90,
            failed: 28
        },
        {
            id: "abc",
            score: 0,
            grade: "",
            title: "Midterm practice test 1",
            questions: 30,
            time: 90,
            failed: 0
        },
        {
            id: "abc",
            score: 89,
            grade: "Fair",
            title: "Midterm practice test 1",
            questions: 25,
            time: 90,
            failed: 4
        },
        {
            id: "abc",
            score: 75,
            grade: "Fair",
            title: "Midterm practice test 1",
            questions: 25,
            time: 90,
            failed: 4
        },
    ] 

    return (
        <main className="w-full p-[38px] bg-white">
            <section className="w-full text-black grid grid-cols-2 gap-x-[32px] gap-y-[24px] ">
            {
                testData.map((data) => 
                    <Card key={data.id}
                        cardStyle={"w-auto h-auto flex justify-between items-center mt-[38px] py-[32px] px-[16px] border border-[#DCDEE1] hover:border-[#216388] hover:bg-[#F4FAFE] rounded-[16px] cursor-pointer"}>
                        <div className="flex flex-col justify-center items-center gap-y-[13px] ">
                            <Card.Icon ImgSrc={practiceChartOne}></Card.Icon>
                            <span className={`font-bold ${data.grade? "text-[#FF7733]" : "text-[#858688] "}  `}>
                                {data.grade ? data.grade : "No Score yet"}
                            </span>
                        </div>
                        <div className="flex flex-col justify-center gap-y-[16px]">
                            <Card.Title titleStyle={"text-2xl font-semibold"}>{data.title}</Card.Title>
                            <div className="flex gap-x-3 items-center text-[#666668] font-medium text-xl ">
                                <span>{data.questions} questions</span>
                                <span className="w-3 h-3 bg-[#666668] rounded-full"></span>
                                <span>{data.time} min</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-[36px] text-white font-semibold">
                            <Card.Status statusStyle={`w-fit p-[8px] text-[10px] ${data.score >= 50 ? "bg-[#31AC0E]" : data.score === 0 ? "bg-[#858688]" : data.score <= 49 && "bg-[#E86C2E]"}  rounded-[4px] self-end`}>
                                {data.failed !== 0 ? data.failed + " INCORRECT" : "PENDING"}
                            </Card.Status>
                            <Button buttonStyle={"flex justify-center items-center h-[46px] py-[16px] px-[24px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[10px] "}>
                                {data.grade ? "Retake Test" : "Take Test"}
                            </Button>
                        </div>
                    </Card>
                )
            }
            </section>
        </main>
    )
}

export default PracticeTest