import { TicketList } from "../../../_components/ticketList"
import { tickets } from "../../../../../../../../../lib/constants"

const Resolved = () => {
    const resolvedTickets = tickets.filter((ticket) => ticket.status === "resolved")

    return (
        <main className="w-full text-black">
            <TicketList tickets={resolvedTickets} />
        </main>
    )
}

export default Resolved