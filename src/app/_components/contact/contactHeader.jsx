import Image from "next/image"
import headerImg from "../../../../public/_assets/contact-page-header.png"
import { ChevronRight } from "lucide-react"
import { Button } from "../cards/button"
import Link from "next/link"

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
                    <Link href={"/"}
                        className={"flex items-center gap-x-[8px] "}>
                        Home 
                        <ChevronRight /> 
                    </Link>
                    <Link href={"/aboutus"}>
                        About Us
                    </Link>
                </div>
            </section>
        </main>
    )
}