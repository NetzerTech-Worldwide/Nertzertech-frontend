import Image from "next/image"
import headerImg from "../../../../public/_assets/contact-page-header.png"
import { ChevronRight } from "lucide-react"
import { Button } from "../cards/button"

export const ContactHeader = () => {

    return (
        <main className="w-full h-[485px] relative">
            <Image
                src={headerImg} 
                alt="image"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2E8BC087] "></div>
            <section className="h-full flex flex-col justify-center items-center text-white text-center relative">
                <h1 className="text-[4rem] font-bold ">
                    Contact Us
                </h1>
                <div className="flex gap-x-[24px] items-center text-2xl font-medium">
                    <Button redirect={"/"}
                        buttonStyle={"flex items-center gap-x-[8px] "}>
                        Home 
                        <ChevronRight /> 
                    </Button>
                    <Button redirect={"/about"}>
                        About Us
                    </Button>
                </div>
            </section>
        </main>
    )
}