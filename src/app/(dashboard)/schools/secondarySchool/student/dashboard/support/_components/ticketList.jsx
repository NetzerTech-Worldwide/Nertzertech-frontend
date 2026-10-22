export const TicketList = ({ tickets }) => {

    return (
        <main className="w-full">
            <table className="w-full">
                <thead className="">
                    <tr className="w-full text-xl text-left font-medium bg-[#EAF3F9]">
                        <th>Ticket ID</th>
                        <th>Category</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date Submitted</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tickets.map((ticket) =>
                        <tr key={ticket.id} className="text-xl font-medium bg-white">
                            <td>{ticket.id}</td>
                            <td>{ticket.cat}</td>
                            <td>{ticket.subject}</td>
                            <td className={`${ticket.status === "in progress" ? "text-[#FF925C]" : "text-[#31AC0E]"}`}>
                                {ticket.status}
                            </td>
                            <td>{ticket.dateSubmitted}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </main>
    )
}