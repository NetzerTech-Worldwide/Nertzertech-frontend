import Link from "next/link"
import { Card } from "../../../../../_components/cards/card"
import { ArrowRight } from "lucide-react"
import gradIcon  from "../../../../../../../public/_assets/grad-hat.svg"
import cardIcon  from "../../../../../../../public/_assets/card-icon.svg"
import monitorIcon  from "../../../../../../../public/_assets/monitor-icon.svg"
import documentIcon  from "../../../../../../../public/_assets/document-icon.svg"

export const QuickHelp = () => {
    const helpCategories = [
        {
            id: "abc",
            icon: gradIcon,
            title: "Academic Issues",
            info: "Get help with grades, assignments, course enrollment, and academic queries."
        },
        {
            id: "def",
            icon: cardIcon,
            title: "Fee/Payment Issues",
            info: "Resolve payment concerns, request receipts, or inquire about fee structures."
        },
        {
            id: "ghi",
            icon: monitorIcon,
            title: "Technical Issues",
            info: "Report portal access problems, login issues, or technical difficulties."
        },
        {
            id: "jkl",
            icon: documentIcon,
            title: "Document Requests",
            info: "Request transcripts, certificates, letters, or other official documents."
        },
    ]

    return (
        <main className="w-full">
            <section className="w-full flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-[21px]">
                    Quick Help Categories
                </h2>
                <Link href={`support/tickets`}
                    className="flex items-center gap-x-[9px] text-[#2A7EAF]"
                >
                    View Ticket History
                    <ArrowRight color="#2A7EAF"/>
                </Link>
            </section>
            <section className="w-full grid grid-cols-4 gap-x-[13px] ">
            {
                helpCategories.map((data) =>
                    <Card key={data.id} cardStyle="w-full h-auto flex items-center gap-x-[11px] py-[18px] px-[12px] border border-[#DCDEE1] rounded-[7px] ">
                        <div className="flex items-center gap-x-[11px] ">
                            <div className="flex items-center justify-center w-[38px] h-[38px] p-8 bg-[#EAF3F9] rounded-[7px] relative">
                                <Card.Icon ImgSrc={data.icon} ImgWidth={23} ImgHeight={20} iconStyle={"absolute"}></Card.Icon>
                            </div>
                            <div>
                                <Card.Title titleStyle="font-semibold mb-[4px]">
                                    {data.title}
                                </Card.Title>
                                <Card.Info infoStyle={"text-xs"}>
                                    {data.info}
                                </Card.Info>
                            </div>
                        </div>
                    </Card>
                )
            }
            </section>
        </main>
    )
}