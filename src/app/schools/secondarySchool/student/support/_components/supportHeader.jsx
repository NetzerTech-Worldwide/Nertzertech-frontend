import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const SupportHeader = ({ children, title, description, type }) => {

    return (
        <section className={`flex ${type === "support history" ? "gap-x-[17px]" : "justify-between"} items-center w-full h-auto py-4 pr-[55px] pl-[40px] text-black shadow-[0_4px_70px_0_#0000000D] bg-white`}>
            {
                type === "support history" &&
                <Link href={"/schools/secondarySchool/student/support"} >
                    <ArrowLeft color="#2A7EAF"/>
                </Link>
            }
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