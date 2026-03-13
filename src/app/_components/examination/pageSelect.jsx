import { Button } from "../cards/button";

export const PageSelect = ({ question, currentQuestion, setCurrentQuestion }) => {

    const allQuestions = () => {
        let list = []
        for (let index = 1; index <= question?.total; index++) {
            list.push(index);
        }
        return list
    }

    const handleClick = (q) => {
        setCurrentQuestion(q)
    }

    return (
        <main className="w-fit flex py-4 px-2 items-center gap-x-[24px]">
        {
            allQuestions().map((q) => 
                <Button 
                    key={q} 
                    onClick={() => handleClick(q)}
                    buttonStyle={`w-[50px] h-[50px] flex justify-center items-center text-2xl font-bold hover:scale-105 duration-200 cursor-pointer ${currentQuestion === q ? "text-white bg-[#216388]" : "text-[#216388] bg-[#EAF3F9]"} rounded-full `}
                >
                    {q}
                </Button>
            )
        } 
        </main>
    )
}