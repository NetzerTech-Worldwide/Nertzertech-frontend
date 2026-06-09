"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, ChevronRight, ArrowRight,
  GraduationCap, CreditCard, Monitor, FileText,
} from "lucide-react";
import SubmitTicketModal from "./submit-ticket-modal";
import type { TicketCategory } from "../lib/support-data";

type Category = {
  label: TicketCategory;
  description: string;
  icon: string;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: TicketCategory;
};

interface Props {
  categories: Category[];
  faqs: Faq[];
  ticketsHref: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  graduation:    <GraduationCap className="h-5 w-5 text-[#2A7EAF]" />,
  "credit-card": <CreditCard    className="h-5 w-5 text-[#2A7EAF]" />,
  monitor:       <Monitor       className="h-5 w-5 text-[#2A7EAF]" />,
  "file-text":   <FileText      className="h-5 w-5 text-[#2A7EAF]" />,
};

export default function SupportClientShell({ categories, faqs, ticketsHref }: Props) {
  const [modalOpen, setModalOpen]           = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<TicketCategory | undefined>();
  const [openFaqId, setOpenFaqId]           = useState<string | null>(null);
  const [searchQuery, setSearchQuery]       = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  }, [searchQuery, faqs]);

  function openModal(category?: TicketCategory) {
    setDefaultCategory(category);
    setModalOpen(true);
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Support Center</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Need help? Submit a request or browse common solutions.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="shrink-0 px-4 py-2 rounded-lg bg-[#2A7EAF] text-white text-sm font-medium hover:bg-[#175F89] transition-colors shadow-sm"
          >
            Submit a Ticket
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, FAQs, or solutions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A7EAF]/20 focus:border-[#2A7EAF] transition-colors shadow-sm"
          />
        </div>

        {/* Quick Help Categories — hidden while searching */}
        {!searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800">Quick Help Categories</h2>
              <Link
                href={ticketsHref}
                className="flex items-center gap-1 text-xs font-medium text-[#2A7EAF] hover:text-[#175F89] transition-colors"
              >
                View Ticket History
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                key={cat.label}
                onClick={() => openModal(cat.label)}
                className="group text-left bg-white flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-[#2A7EAF]/30 hover:shadow-md transition-all duration-150"
                >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-[#2A7EAF]/[0.08] flex items-center justify-center group-hover:bg-[#2A7EAF]/[0.12] transition-colors">
                    {ICON_MAP[cat.icon]}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{cat.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">
              {searchQuery ? `Search results for "${searchQuery}"` : "Frequently Asked Questions"}
            </h2>
            {searchQuery && (
              <p className="text-xs text-gray-500 mt-0.5">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <Search className="h-8 w-8 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-600">No results found</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">
                Try different keywords or submit a support ticket.
              </p>
              <button
                onClick={() => openModal()}
                className="px-4 py-2 rounded-lg bg-[#2A7EAF] text-white text-xs font-medium hover:bg-[#175F89] transition-colors"
              >
                Submit a Ticket
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      <SubmitTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCategory={defaultCategory}
      />
    </>
  );
}