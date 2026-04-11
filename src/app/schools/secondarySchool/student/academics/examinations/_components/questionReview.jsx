import Image from "next/image"
import { Card } from "../../../../../../_components/cards/card"
import check from "../../../../../../../../public/_assets/answer-check.svg"
import ex from "../../../../../../../../public/_assets/answer-x.svg"

export const QuestionReview = ({ result }) => {

    return (
        <main className="w-full p-[24px] bg-white border border-[#F2F4F7] rounded-[24px]">
            <section className="w-full space-y-[8px] mb-[23px]">
                <h5 className="text-xl font-semibold">Question Review</h5>
                <p className="text-[#666668]">
                    See how you performed on each question
                </p>
            </section>
            {
                result.questions.map((q, index) =>
                    <section key={q.questionId} className="w-full py-[14px] px-[16px] border border-[#F2F4F7] rounded-[24px]">
                        <Card cardStyle={"w-full flex items-center justify-between"}>
                            <section className="w-full">
                                <Card.Title titleStyle={"block font-semibold mb-[16px]"}>Question {index + 1}</Card.Title>
                                <Card.Detail detailStyle={"text-[#666668] mb-[8px]"}>What is the derivative of sin(x)?</Card.Detail>
                                <Card.Info infoStyle={"flex items-center gap-x-[8px]"}>
                                    <span className={`${q.isCorrect ? "text-[#31AC0E]" : "text-[#E63B2E]"}`}>
                                        Your answer: 
                                    </span>
                                    <span className={`w-[20px] h-[20px] flex justify-center items-center text-[14px] ${q.isCorrect ? "text-[#31AC0E] bg-[#EAF7E7] border-[#31AC0E]" : "text-[#E63B2E] bg-[#FDEBEA] border-[#E63B2E]"}  border rounded-full`}>
                                        {q.studentAnswer.label}
                                    </span>
                                    <span className={`${q.isCorrect ? "text-[#31AC0E]" : "text-[#E63B2E]"} capitalize`}>
                                        {q.studentAnswer.option}
                                    </span>
                                    {!q.isCorrect && <>
                                    <span className="text-[#31AC0E]">
                                        Correct Answer: 
                                    </span>
                                    <span className="w-[20px] h-[20px] flex justify-center items-center text-[14px] text-[#31AC0E] bg-[#EAF7E7] border border-[#31AC0E] rounded-full">
                                        {q.correctAnswer.label}
                                    </span>
                                    <span className="text-[#31AC0E]">
                                        {q.correctAnswer.option}
                                    </span>
                                    </>}
                                </Card.Info>
                            </section>
                            <section className="">
                                <div className={`flex items-center justify-center gap-x-[8px] py-[1px] px-[15px] text-[14px] ${!q.isCorrect ? "text-[#E63B2E] bg-[#FDEBEA] border-[#E63B2E]" : "text-[#31AC0E] border-[#31AC0E]"} text-[#31AC0E] border  bg-[#EAF7E7] rounded-full`}>
                                    <Image
                                        src={q.isCorrect ? check : ex}
                                        alt="check"
                                        width={15} 
                                        height={15}
                                    />
                                    <span>{q.isCorrect ? "Correct" : "Incorrect"}</span>
                                </div>
                            </section>
                        </Card>
                        {!q.isCorrect && <div className="w-full flex gap-x-[8px] py-[14px] px-[24px] text-[#31AC0E] bg-[#EAF7E7] mt-[10px] rounded-[16px] ">
                            <p className="font-bold">
                                Solution:
                            </p>
                            <span className="w-[268px] ">
                                {q.solution}
                            </span>
                        </div>}
                    </section>
                )
            }
        </main>
    )
}