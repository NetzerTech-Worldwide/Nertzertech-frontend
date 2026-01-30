export const UpcomingExamsCard = () => {
    
    return (
        <main className="w-full h-auto py-[22px] px-[25px] border border-black/10 rounded-xl ">
            <section className="w-full flex justify-between">
                <div className="w-[406px] space-y-[6px] ">
                    <h4 className="text-black text-2xl font-medium">
                        Mathematics - Midterm Exam
                    </h4>
                    <p className="capitalize text-base text-black/69">
                        Chapters 1-8: Calculus, integration, differential equations
                    </p>
                </div>
                <span className="w-auto h-[27px] p-2.5 flex justify-center items-center text-[#216388] text-xl font-medium border-1 border-[#2E8BC0] 
                    bg-[#EAF3F9] rounded-[20px] ">
                    Scheduled
                </span>
            </section>
            <section className="w-full flex justify-between pt-[22px] pb-[24px] text-[1.0625rem] text-black font-medium ">
                <span>2025-08-05</span>
                <span>11:00AM - 2:00PM</span>
                <span>3 hours</span>
            </section>
            <section className="w-[242px] h-[53px] flex justify-between font-semibold text-[#216388] ">
                <button className="w-[108px] h-full p-2.5 border-2 border-[#216388] rounded-[10px] cursor-pointer ">
                    Back
                </button>
                <button className="w-[108px] h-full p-2.5 border-2 border-[#216388] rounded-[10px] cursor-pointer ">
                    Prepare
                </button>
            </section>
        </main>
    )
}