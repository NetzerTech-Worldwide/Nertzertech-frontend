"use client"

import Image from "next/image"
import logo from "../../../../public/_assets/logo-blue.png"
import Link from "next/link"
import { Button } from "../cards/button"
import { Lato } from "next/font/google"
import { usePathname } from "next/navigation"
import polygon from "../../../../public/_assets/Polygon.svg"


const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"]
})

export const Navbar = () => {
    const pathName = usePathname()
    const navLinks = [
        {
            page: "Home",
            path: "/"
        }, 
        {
            page: "About",
            path: "/about"
        }, 
        {
            page: "Features",
            path: "/features"
        }, 
        {
            page: "Contact Us",
            path: "/contact-us"
        }, 
    ]

    return (
        <nav className="w-full h-auto flex justify-between items-center px-[63px] py-5 border-b border-b-[#F2F4F7] bg-[#F0FAFFCC] backdrop-blur-[20px]
            shadow-[0_4px_4px_0_#EFEAEA40] ">
            <Image 
                src={logo}
                alt="image"
                width={233}
                height={62}
            />
            <ul className="w-auto h-auto hidden xl:flex gap-x-[78px] text-xl font-medium">
            {
                navLinks.map((item) => 
                    <li key={item.page} className={`${pathName}` === `${item.path}` ? "text-[#2371B4] relative flex justify-center" : "text-[#666668]" }>
                        <Link href={item.path}>{item.page}</Link>
                        {
                            pathName === `${item.path}` &&
                                <Image 
                                    src={polygon}
                                    alt="polygon"
                                    width={17}
                                    height={17}
                                    className="absolute -bottom-3.5"
                                />
                        }
                    </li>
                )
            }
            </ul>
            <Button 
                redirect={"get-started"}
                buttonStyle={`w-[190px] h-auto px-[19px] py-[22px] text-xl text-white font-semibold bg-[#2A7EAF] rounded-[20px] duration-300 hover:bg-[#9FCAE2] active:bg-[#2A7EAF] ${lato.className}`}
            >
                Get Started
            </Button>
        </nav>
    )
}