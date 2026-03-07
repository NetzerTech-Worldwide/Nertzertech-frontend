
export const Question = ({ questions, currentQuestion, handleOnAnswer, selected }) => {

    const selectedOption = selected.answers[questions[currentQuestion].id] && selected.answers[questions[currentQuestion].id][1]
    
    return (
        <main className="w-full h-auto p-[16px] text-black text-xl font-semibold border-l-4 border-l-[#31AC0E] rounded-l-[16px] ">
            <h4>
                {questions[currentQuestion].page}. {questions[currentQuestion].text}
            </h4>
            {
                questions[currentQuestion].options.map((opt) =>
                    <button key={opt.option}
                        onClick={() => handleOnAnswer(opt.label, opt.option, questions[currentQuestion].id)}
                        className={`${selectedOption === opt.option ? "border-[#216388] bg-[#EAF3F9]" : "border-[#ACADAF]"} w-full flex items-center gap-x-[16px] p-[16px] border rounded-[16px] mt-[24px] cursor-pointer duration-100`}>
                        <span className={`${selectedOption === opt.option ? "bg-[#216388] text-white" : "bg-[#EAF3F9] text-[#216388]"} w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full duration-100`}>
                            {opt.label}
                        </span>
                        <span>
                            {opt.option}
                        </span>
                    </button>
                )
            }
        </main>
    )
}