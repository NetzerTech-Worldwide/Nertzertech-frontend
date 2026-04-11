import { Lato } from "next/font/google"
import { SupportHeader } from "../_components/supportHeader"
import { TicketNavigation } from "../_components/ticketNavigation"

const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

export default function TicketHistoryLayout ({ children }) {

    return (
        <main className={`w-full min-h-screen ${lato.className} `}>
            <SupportHeader title={"Support Ticket History"} description={"View and manage your previous support requests."} type={"support history"}/>
            <section className="pl-[39px] pr-[50px] mt-[50px]">
                <TicketNavigation />
                <div className="mt-[50px] ">
                    {children}
                </div>
            </section>
        </main>
    )
}