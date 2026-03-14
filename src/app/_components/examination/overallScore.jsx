import { Card } from "../cards/card"

export const OverallScore = ({ result }) => {
    const grade = () => {
        if (result.summary.score > 69 ) {
            return "excellent"
        }
        if (result.summary.score >= 50 ) {
            return "good"
        }
        return "fair"
    }

    const gradeBarOne = grade() === "excellent" ? "bg-[#EAF7E7]" : grade() === "good" ? "bg-[#EAF7E7]" : "bg-[#FDEBEA]"
    const gradeBarTwo = grade() === "excellent" ? "bg-[#31AC0E]" : grade() === "good" ? "bg-[#31AC0E]" : "bg-[#E63B2E]"
    const gradeStyle = grade() === "excellent" ? "text-[#154806] bg-[#E5FFDE]" : grade() === "good" ? "text-[#154806] bg-[#E5FFDE]" : "text-[#E63B2E] bg-[#FDEBEA]"

    return (
        <main >
            <Card cardStyle={"w-full p-[24px] border border-[#DCDEE1] bg-white rounded-[24px]"}>
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
                <div className="flex items-center gap-x-2 justify-self-end mt-[24px] text-[14px] text-[#666668] ">
                    <p>Your Grade:</p>
                    <span className={`py-[6px] px-[4px] text-[9.9px] capitalize rounded-[60px] ${gradeStyle}`}>
                        {/* {result.summary.score >= 70 ? "excellent" : result.summary.score = 60 ? "Good" : result.summary.score <= 30 && "Fair"} */}
                        {grade()}
                    </span>
                </div>
                <div className={`w-full h-[80px] ${gradeBarOne} rounded-[16px] mt-[8px]`}>
                    <div className={`flex items-center h-[inherit] pl-[42px] text-xl text-[#154806] font-extrabold ${gradeBarTwo} ${result.summary.score < 99 ? "rounded-l-[inherit]" : "rounded-[inherit]"}`}
                        style={{width: `${result.summary.score}%`}}
                    >{result.summary.score}%</div>
                </div>
            </Card>
        </main>
    )
}