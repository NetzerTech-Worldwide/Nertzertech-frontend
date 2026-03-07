export const QuestionNavigation = ({ lastPage, currentQuestion, setCurrentQuestion, handleNextPage, handlePreviousPage }) => {

    return (
        <main className="flex items-cener gap-x-[16px] ">
            {currentQuestion > 0 && <button onClick={() => handlePreviousPage(currentQuestion, setCurrentQuestion)}
                className={"w-[136px] h-[46px] flex justify-center items-center text-[#216388] font-semibold py-[16px] px-[24px] border border-[#216388] bg-white hover:bg-[#216388] hover:text-white active:bg-white active:text-[#216388] rounded-[10px] cursor-pointer"}
            >
                Previous
            </button>}
            <button onClick={() => handleNextPage(currentQuestion, lastPage, setCurrentQuestion)}
                className={"w-[123px] h-[46px] flex justify-center items-center text-white font-semibold py-[16px] px-[24px] bg-[#216388] rounded-[10px] cursor-pointer hover:bg-[#9FCAE2] active:bg-[#216388] disabled:bg-[#73B1D5]"}
                disabled={currentQuestion + 1 === lastPage}
                >
                Next
            </button>
        </main>
    )
}