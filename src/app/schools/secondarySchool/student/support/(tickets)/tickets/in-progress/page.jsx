import { TicketList } from "../../../_components/ticketList"
import { tickets } from "../../../../../../../../../lib/constants"

const InProgress = () => {
    const ticketsInProgress = tickets.filter((ticket) => ticket.status === "in progress")

    return (
        <main className="w-full text-black">
            <TicketList tickets={ticketsInProgress} />
        </main>
    )
}

export default InProgress