import { useContext } from "react"
import { examContext } from "../../../../../../../../lib/context/examContext"
import { handleOnAnswer } from "../../../../../../../../lib/helpers"
import { Button } from "../../../../../../_components/cards/button"

export const Question = ({ question }) => {

    const { selected, setSelected, } = useContext(examContext)
    const selectedOption = selected.answers[question?.data[0].id] && selected.answers[question.data[0].id][1]
    
    return (
        <main className="w-full h-auto p-[16px] text-black text-xl font-semibold border-l-4 border-l-[#31AC0E] rounded-l-[16px] ">
            <h4>
                {question?.page}. {question?.data[0].text}
            </h4>
            {
                question?.data[0].options.map((opt) =>
                    <Button key={opt.option}
                        onClick={() => handleOnAnswer(opt.label, opt.option, question?.data[0].id, selected, setSelected)}
                        buttonStyle={`${selectedOption === opt.option ? "border-[#216388] bg-[#EAF3F9]" : "border-[#ACADAF]"} w-full flex items-center gap-x-[16px] p-[16px] border rounded-[16px] mt-[24px] cursor-pointer duration-100`}>
                        <span className={`${selectedOption === opt.option ? "bg-[#216388] text-white" : "bg-[#EAF3F9] text-[#216388]"} w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full duration-100`}>
                            {opt.label}
                        </span>
                        <span>
                            {opt.option}
                        </span>
                    </Button>
                )
            }
        </main>
    )
}