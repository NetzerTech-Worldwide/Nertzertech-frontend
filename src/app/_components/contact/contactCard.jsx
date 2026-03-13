import contactCardImg from "../../../../public/_assets/contact-card-img.jpg"
import { Card } from "../cards/card"
import { contactInfoCard, contactInfoCardInfo, contactInfoCardTitle } from "../../../../lib/cardStyles"
import { Lato } from "next/font/google"
import emailIcon from "../../../../public/_assets/email-icon.svg"
import phoneIcon from "../../../../public/_assets/phone-icon.svg"
import locationIcon from "../../../../public/_assets/location-icon.svg"

const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"]
})

export const ContactCard = () => {
    const cardDetails = [
        {
            id: "abc",
            title: "Call Us",
            detail: "+234 8123 567 8456",
            icon: phoneIcon,
            backgroundColor: "#FFF1EB"
        },
        {
            id: "def",
            title: "Email Us",
            detail: "Netzertech@gmail.com",
            icon: emailIcon,
            backgroundColor: "#EAF3F9"
        },
        {
            id: "ghi",
            title: "Head office",
            detail: "Oshodi, Lagos State",
            icon: locationIcon,
            backgroundColor: "#EAF7E7"
        }
    ]

    return (
        <Card cardStyle={`${contactInfoCard}`}>
            <Card.Icon ImgSrc={contactCardImg} type={"background"}></Card.Icon>
            <div className="absolute inset-0 bg-linear-[180deg,rgba(67,154,205,0.8544)_0%,rgba(25,76,106,0.89)_50.09%] rounded-[inherit] ">
            </div>
            <div className="relative flex flex-col justify-start mb-[48px] ">
                <Card.Title titleStyle={contactInfoCardTitle}>Get in touch with us</Card.Title>
                <Card.Info infoStyle={contactInfoCardInfo}>Multiple ways to connect with our team whenever you need us</Card.Info>
            </div>
            <div className="relative w-full h-[0.5px] bg-white mb-[48px]"></div>
            {
                cardDetails.map((data) => 
                    <div key={data.id} className="relative flex items-center gap-x-3 text-white mb-[32px] ">
                        <div className={`w-[68px] h-[68px] flex justify-center items-center bg-[var(--bg-color)] rounded-full`}
                            style={{"--bg-color": data.backgroundColor}}
                        >
                            <Card.Icon ImgSrc={data.icon} ImgWidth={25} ImgHeight={25}></Card.Icon>
                        </div>
                        <div className="flex flex-col">
                            <Card.Detail detailStyle={"font-semibold"}>{data.title}:</Card.Detail>
                            <Card.Detail>{data.detail}</Card.Detail>
                        </div>
                    </div>
                )
            }
        </Card>
    )
}

// bg-linear-[180deg,rgba(67,154,205,0.8544)_0%,rgba(25,76,106,0.89)_50.09%]