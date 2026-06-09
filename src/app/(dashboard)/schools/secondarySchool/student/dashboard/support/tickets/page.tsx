import { DUMMY_TICKETS } from "../lib/support-data";
import TicketHistoryClientShell from ".././_components/ticket-history-shell";

const BASE = "/schools/secondarySchool/student/dashboard";

// Server component — fetches/prepares ticket data, no interactivity here
export default function TicketHistoryPage() {
  // With a real API, you'd do:
  // const tickets = await fetch("/api/support/tickets").then(r => r.json());
  const tickets = DUMMY_TICKETS;

  return (
    <TicketHistoryClientShell
      tickets={tickets}
      backHref={`${BASE}/support`}
    />
  );
}