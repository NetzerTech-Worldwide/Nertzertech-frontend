"use client"

import { Lato } from "next/font/google"
import { ExamHeader } from "../../../../_components/examination/examHeader"
import Image  from "next/image"
import profilePhoto from "../../../../../../public/_assets/profile-photo.png"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../../_components/cards/button"
import { OverallScore } from "../../../../_components/examination/overallScore"
import { QuestionReview } from "../../../../_components/examination/questionReview"
import { Statistics } from "../../../../_components/examination/statistics"
import { useParams, useRouter } from "next/navigation"
import { useFetchDataWithId } from "../../../../../../lib/hooks"
import { getOptions } from "../../../../../../lib/options"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

const Result = () => {
    const params = useParams()
    const { id } = params

    const router = useRouter()

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}examination/${id}/review`
    const token = process.env.NEXT_PUBLIC_TOKEN
    const cacheId = "result review"
    const { data: result } = useFetchDataWithId(url, getOptions(token), id, cacheId)

    return (
        <main className={`w-full min-h-screen pb-[195px] text-black bg-[#FBFEFF] ${lato.className}`}>
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
                <Button onClick={() => router.push(`/examinations/${id}/practice-test`)}
                    buttonStyle={"flex items-center gap-x-[16px] text-white font-semibold py-[8px] px-[16px] mt-[29px] ml-[39px] bg-[#216388] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[8px] "}>
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                {result ?
                    <div className="mt-[32px] flex gap-x-[32px] pr-[55px] pl-[40px]">
                        <div className="w-[60%]">
                            <div className="mb-[26px]">
                                <OverallScore result={result} />
                            </div>
                            <div>
                                <QuestionReview result={result} />
                            </div>
                        </div>
                        <div className="w-[40%]">
                            <Statistics result={result} examId={id} />
                        </div>
                    </div> :
                    <div className="mt-[32px] flex gap-x-[32px] pr-[55px] pl-[40px]">
                        <div className="w-full min-h-80 flex justify-center items-center">
                            <h2 className="text-3xl font-bold">NO RESULT TO SHOW</h2>
                        </div>
                    </div>
                }
            </section>
        </main>
    )
}

export default Result

// const result = {
//         questions: [
//             {
//             questionId: "abc",
//             text: "What is the derivative of sin(x)?",
//             type: "multiple_choice",
//             studentAnswer: {
//                 label: "A",
//                 option: "cos (x)"
//             },
//             correctAnswer: {
//                 label: "A",
//                 option: "cos (x)"
//             },
//             isCorrect: true,
//             solution: "cos (x)"
//             },
//             {
//             questionId: "def",
//             text: "Integrate ∫ 2x dx",
//             type: "multiple_choice",
//             studentAnswer: {
//                 label: "B",
//                 option: "2x + C"
//             },
//             correctAnswer: {
//                 label: "A",
//                 option: "x + C"
//             },
//             isCorrect: false,
//             solution: "Using the power of rule of integration: ∫ 2x dx =2 ∫ x dx=2 . x²/2 +C=x² +C"
//             },
//         ],
//         summary: {
//             score: 85,
//             totalQuestions: 50,
//             correctAnswers: 42,
//             incorrectAnswers: 5,
//             skippedAnswers: 3,
//             classAverage: 78,
//             timeTaken: "25 mis 34 sec",
//             timePerQuestion: "25 mis 34 sec"
//         }
//     }