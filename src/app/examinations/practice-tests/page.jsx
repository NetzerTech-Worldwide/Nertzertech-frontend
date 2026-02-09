import { testButton, testCard, testInfo, testTitle } from "../../../../lib/cardStyles"
import { Button } from "../../_components/cards/button"
import { Card } from "../../_components/cards/card"
import { ExaminationsFooter } from "../../_components/examination/examinationsFooter"
import { ExaminationsNavigation } from "../../_components/examination/examinationsNavigation"

const testStyles = `mt-[56px] mb-[0px] mx-[57px]`
const PracticeTests = () => {
    const testData = [
        {
            id: "ghi",
            subject: "Chemistry",
            testType: "Quiz",
            questions: "30",
            attempts: "2",
            bestScore: [85, 83, 80],
            timeLimit: "40Min"
        },
        {
            id: "jkl",
            subject: "Biology",
            testType: "Mock Exam",
            questions: "30",
            attempts: "2",
            bestScore: [70, 72, 75],
            timeLimit: "20Min"
        },
        {
            id: "mno",
            subject: "English",
            testType: "Quiz",
            questions: "50",
            attempts: "",
            bestScore: [],
            timeLimit: "40Min"
        },
    ]

    return (
        <main className={`w-auto h-auto bg-white ${testStyles} `}>
            <ExaminationsNavigation />
            <section className="grid grid-cols-3 mt-[48px] gap-x-[44px] gap-y-[29px] ">
                {
                    testData.map((data) => 
                        <Card cardStyle={testCard} key={data.id}>
                            <div className="w-[234px] mb-[26px] ">
                                <Card.Title titleStyle={testTitle}>{data.subject} {data.testType}</Card.Title>
                                <div className="flex gap-x-[20px] mt-[11px]">
                                    <Card.Info infoStyle={testInfo}>{data.subject}</Card.Info>
                                    <Card.Info infoStyle={testInfo}>Time Limit: {data.timeLimit}</Card.Info>
                                </div>
                            </div>
                            <div className="text-black font-medium space-y-[15px] mb-[32px]">
                                <div className="flex justify-between">
                                    <Card.Analysis>Questions:</Card.Analysis>
                                    <Card.Analysis>{data.questions}</Card.Analysis>
                                </div>
                                <div className="flex justify-between">
                                    <Card.Analysis>Attempts:</Card.Analysis>
                                    <Card.Analysis>{data.attempts ? data.attempts : "N/A"}</Card.Analysis>
                                </div>
                                <div className="flex justify-between">
                                    <Card.Analysis>Best Score:</Card.Analysis>
                                    <Card.Analysis>{data.bestScore.length > 0 ? Math.max(...data.bestScore)+"%" : 0}</Card.Analysis>
                                </div>
                            </div>
                            <Button buttonStyle={testButton}>Retake</Button>
                        </Card>
                    )
                }
            </section>
            <section className="mt-50">
                <ExaminationsFooter />
            </section>
        </main>
    )
}

export default PracticeTests