import { CATEGORIES, FAQS } from "./lib/support-data";
import SupportClientShell from "./_components/support-client-shell";

const BASE = "/schools/secondarySchool/student/dashboard";

// Server component — no "use client", no useState
export default function SupportPage() {
  return (
    <SupportClientShell
      categories={CATEGORIES}
      faqs={FAQS}
      ticketsHref={`${BASE}/support/tickets`}
    />
  );
}