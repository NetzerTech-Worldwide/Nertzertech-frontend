import { Lato } from "next/font/google"
import { ExaminationsNavigation } from "../../_components/examination/examinationsNavigation"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function ExaminationsLayout ({ children }) {

    return (
        <main className={`w-full h-auto bg-[#FBFEFF] ${lato.className} pb-20 pr-[55px] pl-[40px] pt-[32px]`} >
            <section className="">
                <section>
                    <ExaminationsNavigation />
                </section>
                <section className="border-2 border-[#F2F4F7] rounded-b-[16px] ">
                    {children}
                </section>
            </section>
        </main>
    )
}


// ACADEMIC HEADER
{/* 
    <section className="flex justify-between w-full h-auto py-4 px-[53px] text-black shadow-[0_4px_70px_0_#000000]/5 bg-white">
    <div>
        <h3 className="text-[1.75rem] font-bold pb-[6px] ">
            Examinations
        </h3>
        <p className="text-[#5D5C5C]">
            Manage your examinations and practice tests
        </p>
    </div>
    <div className="flex justify-between w-[495px] h-[65px] py-[13px] px-[26px] bg-[#F6F7F8]/74 rounded-[7px] ">
        <input 
            type="text" 
            placeholder="Search anything here"
            className="outline-none text-lg placeholder-black/36 "
        />
        <Image 
            src={searchIcon}
            alt="search icon"
            width={20}
            height={20}
        />
    </div>
</section> */}