export const LoadingModal = ({ type }) => {

    return (
        <main className="w-1/3 h-fit p-[24px] bg-white text-black flex flex-col text-center justify-center items-center rounded-[32px] ">
            <span className="w-[92px] h-[92px] border-15 border-[#2A7EAF33] border-t-[#216388] border-r-[#216388] rounded-full animate-spin"></span>
            <section className="flex flex-col justify-center items-center mt-[40px]">
                <h2 className="text-[2.125rem] font-bold mb-[25px]">
                    {type === "exam" ? "Submitting your examination..." : "Getting your result..."}
                </h2>
                <p className="w-[395px] text-xl text-[#5D5C5C] ">
                    {type === "exam" ? "We are submitting your examination now. Hang tight while we complete the process."
                    :"We are getting your result now. Hang tight while we complete the process."}
                </p>
            </section>
        </main>
    )
}