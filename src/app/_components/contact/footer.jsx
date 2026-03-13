import Image from "next/image"
import logo from "../../../../public/_assets/logo.png"
import Link from "next/link"

export const Footer = () => {
    const quickLinks = [ 
        {
            page: "About Us",
            path: "/aboutus"

        }, 
        {
            page: "Features",
            path: "/features"
        }, 
        {
            page: "Get Started",
            path: "/get-started"
        }, 
        
    ]

    return (
        <footer className="w-full py-1 bg-[#3D5A80] px-[63px] text-white">
            <section className="w-full xl:w-1/2 flex justify-between items-center">
                <div className="w-[70%] space-y-8 relative">
                    <Image 
                        src={logo}
                        alt="logo"
                        width={250}
                        height={50}
                        className="mt-[-20px] "
                    />
                    <span className="absolute text-xl text-white mt-[-70px]">
                        Empowering education through technology
                    </span> 
                </div>
                <div className=" text-xl pt-[60px]">
                    <h4 className="font-bold mb-[25px] ">
                        Quick Links
                    </h4>
                    <ul className="flex flex-col gap-y-[17px] ">
                    {
                        quickLinks.map((item) =>
                            <li key={item.page}>
                                <Link href={item.path}>{item.page}</Link>
                            </li>
                        )
                    }
                    </ul>
                </div>
            </section>
            <section className="text-xl mb-[40px] mt-[50px]">
                <span>&#169;2025 Netzertech All rights reserved.</span>
            </section>
        </footer>
    )
}