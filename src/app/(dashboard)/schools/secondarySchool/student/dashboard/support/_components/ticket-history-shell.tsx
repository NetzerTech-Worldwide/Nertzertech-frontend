"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import SubmitTicketModal from "./submit-ticket-modal";
import type { Ticket as TicketType, TicketStatus } from "../lib/support-data";

type TabFilter = "all" | "in_progress" | "resolved";

const STATUS_LABEL: Record<TicketStatus, string> = {
  open:        "Open",
  in_progress: "In Progress",
  resolved:    "Resolved",
  closed:      "Closed",
};

const STATUS_COLOR: Record<TicketStatus, string> = {
  open:        "text-blue-500",
  in_progress: "text-amber-500",
  resolved:    "text-green-500",
  closed:      "text-gray-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  tickets: TicketType[];
  backHref: string;
}

export default function TicketHistoryClientShell({ tickets, backHref }: Props) {
  const [tab, setTab]           = useState<TabFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all",         label: "All" },
    { key: "in_progress", label: "In Progress" },
    { key: "resolved",    label: "Resolved" },
  ];

  const filtered = useMemo(() => {
    if (tab === "all") return tickets;
    return tickets.filter((t) => t.status === tab);
  }, [tickets, tab]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex align-center gap-5">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#2A7EAF] transition-colors mb-1.5"
            >
              <ArrowLeft className="h-5.5 w-8.5 text-blue-400" />

            </Link>
        <div>
                <h1 className="text-xl font-semibold text-gray-900">Support Ticket History</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                View and manage your previous support requests.
                </p>
            </div>

          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2A7EAF] text-white text-sm font-medium hover:bg-[#175F89] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Ticket
          </button>
        </div>

        {/* Single card: tabs + table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Tabs — flush to top of card, no gap */}
          <div className="flex border-b border-gray-200 px-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors relative ${
                  tab === key
                    ? "text-[#2A7EAF]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                {tab === key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A7EAF] rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <p className="text-sm font-medium text-gray-600">No tickets found</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">
                {tab !== "all"
                  ? `You have no ${tab === "in_progress" ? "in progress" : "resolved"} tickets.`
                  : "You haven't submitted any support requests yet."}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#2A7EAF] text-white text-xs font-medium hover:bg-[#175F89] transition-colors"
              >
                Submit a Ticket
              </button>
            </div>
          ) : (
            <>
              {/* Desktop table — hidden on mobile */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 w-32">Ticket ID</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-40">Category</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Subject</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-32">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 w-36">Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">
                          {ticket.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {ticket.category.replace(" Issues", "").replace(" Requests", "")}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-800">
                          {ticket.subject}
                        </td>
                        <td className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${STATUS_COLOR[ticket.status]}`}>
                          {STATUS_LABEL[ticket.status]}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(ticket.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards — shown only on small screens */}
              <div className="sm:hidden divide-y divide-gray-100">
                {filtered.map((ticket) => (
                  <div key={ticket.id} className="px-4 py-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-gray-400">{ticket.id}</span>
                      <span className={`text-xs font-medium ${STATUS_COLOR[ticket.status]}`}>
                        {STATUS_LABEL[ticket.status]}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 leading-snug">{ticket.subject}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">
                        {ticket.category.replace(" Issues", "").replace(" Requests", "")}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <SubmitTicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}