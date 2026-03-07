export const ExamHeader = ({ children, title, description }) => {

    return (
        <section className="flex justify-between items-center w-full h-auto py-4 pr-[55px] pl-[40px] text-black shadow-[0_4px_70px_0_#0000000D] bg-white">
            <div>
                <h3 className="text-[1.75rem] font-bold pb-[6px] ">
                    {title}
                </h3>
                <p className="text-[#5D5C5C]">
                    {description}
                </p>
            </div>
            <div className="">
                {children}
            </div>
        </section>
    )
}