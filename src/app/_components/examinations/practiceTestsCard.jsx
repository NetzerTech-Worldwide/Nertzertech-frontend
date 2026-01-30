export const PracticeTestsCard = () => {

    return (
        <main className="w-auto h-auto py-[37px] px-[20px] border border-black/10 rounded-[10px] ">
            <section className="w-[234px] space-y-[11px] mb-[26px] ">
                <h3 className="text-black text-2xl font-semibold">
                    Chemistry Quiz
                </h3>
                <div className="text-[#5D5C5C]  ">
                    <span className="pr-[20px] ">
                        Chemistry
                    </span>
                    <span className="pr-[10px]">
                        Time Limit
                    </span>
                    <span>
                        40Min
                    </span>
                </div>
            </section>
            <section className="text-black font-medium space-y-[15px] mb-[32px] ">
                <div className="flex justify-between">
                    <span>Question:</span>
                    <span>30</span>
                </div>
                <div className="flex justify-between">
                    <span>Attempts:</span>
                    <span>2</span>
                </div>
                <div className="flex justify-between">
                    <span>Best Score:</span>
                    <span>85%</span>
                </div>
            </section>
            <button className="w-full flex justify-center items-center text-[#216388] font-semibold p-[10px] border-2 border-[#216388] rounded-[10px] cursor-pointer">
                Retake
            </button>
        </main>
    )
}