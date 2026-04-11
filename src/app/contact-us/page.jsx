import { Inter } from "next/font/google"
import demoIcon from "../../../public/_assets/demo-icon.svg"
import callIcon from "../../../public/_assets/call-icon.svg"
import enquiryIcon from "../../../public/_assets/enquiry-icon.svg"
import partnershipIcon from "../../../public/_assets/partnership-icon.svg"
import { Card } from "../_components/cards/card"
import { contactCard, contactInfo, contactTitle } from "../../../lib/cardStyles"
import { ContactForm } from "../_components/contact/contactForm"
import { ContactCard } from "../_components/contact/contactCard"
import { Footer } from "../_components/contact/footer"
import { ContactHeader } from "../_components/contact/contactHeader"
import { Navbar } from "../_components/contact/navbar"
import { ContactHero } from "../_components/contact/contactHero"


const inter = Inter({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"]
})


const Contact = () => {
    const cardData = [
        {
            id: "abc",
            icon: demoIcon,
            title: "Request a demo",
            info: "See NetzerTech in action for your institution or school.",
            bgOne: "#CC449E",
            bgTwo: "#9F2D79BD",
            bgThree: "#761856",
        },
        {
            id: "def",
            icon: callIcon,
            title: "Talk to our team",
            info: "Speak directly with someone who understands your situation.",
            bgOne: "#2E8BC0",
            bgTwo: "#2E8BC0",
            bgThree: "#196C9C",
        },
        {
            id: "ghi",
            icon: enquiryIcon,
            title: "General Enquiry",
            info: "Ask us anything about how we work or what we offer.",
            bgOne: "#E86C2E",
            bgTwo: "#FD8042",
            bgThree: "#B84004",
        },
        {
            id: "jkl",
            icon: partnershipIcon,
            title: "Partnership",
            info: "Explore ways we can work together for mutual benefit.",
            bgOne: "#237A0A",
            bgTwo: "#387227",
            bgThree: "#6ABC52",
        },
    ]

    return (
        <main className={`w-full h-auto flex flex-col justify-center items-center bg-[#F6FCFF] text-black ${inter.className}`}>
            <section className="w-full h-[487px] mb-[125px] relative">
                <div className="w-full fixed top-0 z-10">
                    <Navbar />
                </div>
                <div className="w-full absolute">
                    <ContactHeader />
                </div>
            </section>
            <section className="w-full h-auto px-10 lg:px-[130px] flex flex-col justify-center items-center gap-y-[48px]  ">
                <ContactHero />
                <div className="w-full grid md:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-[40px] ">
                {
                    cardData.map((data) =>
                        <Card cardStyle={contactCard} key={data.id}>
                            <div className={`w-[70px] h-[70px] flex justify-center items-center rounded-[24px] bg-linear-[141.34deg,var(--bg-colorOne)_-7.83%,var(--bg-colorTwo)_50.75%,var(--bg-colorThree)_106.05%] border border-gray-300`}
                                style={{"--bg-colorOne": data.bgOne, "--bg-colorTwo": data.bgTwo, "--bg-colorThree": data.bgThree}}
                            >   
                                <Card.Icon ImgSrc={data.icon} ImgWidth={30} ImgHeight={32}></Card.Icon>   
                            </div>
                            <div className="text-center">
                                <Card.Title titleStyle={contactTitle}>{data.title}</Card.Title>
                                <Card.Info infoStyle={contactInfo}>{data.info}</Card.Info>
                            </div>
                        </Card>
                    )
                }
                </div>
            </section>
            <section className="w-full flex flex-col xl:flex-row justify-between gap-y-10 px-10 lg:px-[63px] mt-[94px] border-0 border-gray-300">
                <div className="w-full xl:w-[51%] ">
                    <ContactForm />
                </div>
                <div className="w-full xl:w-[44%] ">
                    <ContactCard />
                </div>
            </section>
            <section className="w-full mt-[72px]">
                <Footer />
            </section>
        </main>
    )
}

export default Contact