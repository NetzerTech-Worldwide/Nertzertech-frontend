"use client";
import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

type HistoryTab = "all" | "active" | "returned" | "record";

const HISTORY: any[] = [];

const SUB_TABS: { id: HistoryTab; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "active",   label: "Active" },
  { id: "returned", label: "Returned" },
  { id: "record",   label: "Record" },
];

export const BorrowedHistory = () => {
  const [subTab, setSubTab] = useState<HistoryTab>("all");

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-tabs */}
      <div className="flex gap-0 border-b border-gray-100 w-fit">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors
              ${subTab === tab.id
                ? "border-[#216388] text-[#216388]"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {HISTORY.length === 0 && (
        <div className="flex flex-col items-center py-12 gap-4">
          <RotateCcw className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-1">No borrow history yet</h3>
            <p className="text-xs text-gray-400">Your borrowing activity will appear here once you borrow a book.</p>
          </div>
          <button className="px-5 py-2 text-xs font-medium bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors">
            Browse &amp; Borrow a Book
          </button>
        </div>
      )}
    </div>
  );
};