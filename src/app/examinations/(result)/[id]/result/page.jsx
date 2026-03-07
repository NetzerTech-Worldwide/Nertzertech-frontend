import { Lato } from "next/font/google"
import { ExamHeader } from "../../../../_components/examination/examHeader"
import Image  from "next/image"
import profilePhoto from "../../../../../../public/_assets/profile-photo.png"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../../_components/cards/button"
import { Card } from "../../../../_components/cards/card"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

const Result = () => {
    const result = {
        review: [
            {
            questionId: "string",
            text: "string",
            type: "multiple_choice",
            options: [
                "string"
            ],
            studentAnswer: {},
            correctAnswer: "string",
            isCorrect: true
            }
        ],
        summary: {
            score: 85,
            totalQuestions: 50,
            correctAnswers: 42,
            incorrectAnswers: 5,
            skippedAnswers: 3,
            classAverage: 78,
            grade: "excellent"
        }
    }

    return (
        <main className={`w-full min-h-screen text-black bg-[#FBFEFF] ${lato.className}`}>
            <section>
                <ExamHeader title={"Test Result"} description={"Your practice test has been graded"} >
                    <div className="flex items-center gap-x-[13px] ">
                        <div className="w-[54px] h-[54px] rounded-full relative">
                            <Image 
                                src={profilePhoto}
                                alt="profile photo"
                                fill
                                className="object-cover rounded-[inherit]"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-[7px] ">Daniel Dike</h3>
                            <span>SS 2</span>
                        </div>
                    </div>
                </ExamHeader>
                <Button buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[8px] "}>
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                <section className="mt-[32px] flex items-center pr-[55px] pl-[40px]">
                    <div className="w-[55%]">
                        <Card cardStyle={"w-full p-[24px] border border-[#DCDEE1] bg-white rounded-[24px] "}>
                            <Card.Title titleStyle={"text-xl font-semibold"}>Overall Score</Card.Title>
                            <div className="flex justify-center items-center gap-x-[42px] text-xl font-bold mt-[40px]">
                                <div className="flex flex-col justify-center items-center">
                                    <Card.Analysis>{result.summary.totalQuestions}</Card.Analysis>
                                    <Card.Info infoStyle={"font-normal text-base mt-[20px]"}>Total Questions</Card.Info>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <Card.Analysis>{result.summary.correctAnswers}</Card.Analysis>
                                    <Card.Info infoStyle={"font-normal text-base mt-[20px]"}>Correct Answers</Card.Info>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <Card.Analysis>{result.summary.classAverage}%</Card.Analysis>
                                    <Card.Info infoStyle={"font-normal text-base mt-[20px]"}>Class Average</Card.Info>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div>

                    </div>
                </section>
            </section>
        </main>
    )
}

export default Result