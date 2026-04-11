import { TicketList } from "../../_components/ticketList"
import { tickets } from "../../../../../../../../lib/constants"

const Tickets = () => {

    return (
        <main className="w-full text-black">
            <TicketList tickets={tickets} />
        </main>
    )
}

export default Tickets