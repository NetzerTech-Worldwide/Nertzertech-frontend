"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Status = "Present" | "Absent" | "Late";
type Filter = "All" | Status;

interface HistoryRecord {
  date: string;
  subject: string;
  status: Status;
  checkIn: string;
  checkOut: string;
}

const records: HistoryRecord[] = [
  { date: "Feb 26, 2026", subject: "Mathematics", status: "Present", checkIn: "08:15 AM", checkOut: "03:30 PM" },
  { date: "Feb 25, 2026", subject: "Science", status: "Absent", checkIn: "—", checkOut: "—" },
  { date: "Feb 24, 2026", subject: "English", status: "Late", checkIn: "09:32 AM", checkOut: "03:30 PM" },
  { date: "Feb 23, 2026", subject: "History", status: "Present", checkIn: "09:05 AM", checkOut: "03:30 PM" },
  { date: "Feb 22, 2026", subject: "Computer Science", status: "Present", checkIn: "07:58 AM", checkOut: "03:30 PM" },
  { date: "Feb 21, 2026", subject: "Physics", status: "Present", checkIn: "08:05 AM", checkOut: "03:30 PM" },
  { date: "Feb 20, 2026", subject: "Mathematics", status: "Present", checkIn: "08:10 AM", checkOut: "03:30 PM" },
  { date: "Feb 19, 2026", subject: "Chemistry", status: "Present", checkIn: "08:00 AM", checkOut: "03:30 PM" },
  { date: "Feb 18, 2026", subject: "English", status: "Absent", checkIn: "—", checkOut: "—" },
  { date: "Feb 17, 2026", subject: "History", status: "Present", checkIn: "08:20 AM", checkOut: "03:30 PM" },
  { date: "Feb 16, 2026", subject: "Physics", status: "Late", checkIn: "09:45 AM", checkOut: "03:30 PM" },
  { date: "Feb 14, 2026", subject: "Computer Science", status: "Present", checkIn: "07:55 AM", checkOut: "03:30 PM" },
];

const PAGE_SIZE = 5;

const statusBadge: Record<Status, string> = {
  Present: "bg-blue-100 text-blue-600",
  Absent: "bg-orange-100 text-orange-500",
  Late: "bg-purple-100 text-purple-500",
};

const filterBtnStyle = (active: boolean) =>
  `px-3 py-1 text-xs rounded font-medium transition-colors ${
    active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
  }`;

export const AttendanceHistory = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);

  const filtered = filter === "All" ? records : records.filter((r) => r.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setPage(1);
  };

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Attendance History</h3>
          <p className="text-[11px] text-gray-400">Showing {filtered.length} records</p>
        </div>
        <div className="flex items-center gap-1.5">
          {(["All", "Present", "Absent", "Late"] as Filter[]).map((f) => (
            <button key={f} onClick={() => handleFilter(f)} className={filterBtnStyle(filter === f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {["Date", "Subject", "Status", "Check-in", "Check-out"].map((col) => (
                <th key={col} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-xs text-gray-700 font-medium whitespace-nowrap">{row.date}</td>
                  <td className="py-3 pr-4 text-xs text-blue-500 hover:underline cursor-pointer whitespace-nowrap">{row.subject}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusBadge[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-600 whitespace-nowrap">{row.checkIn}</td>
                  <td className="py-3 text-xs text-gray-600 whitespace-nowrap">{row.checkOut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                  No records found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[11px] text-gray-400">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} records
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-7 h-7 text-xs rounded border transition-colors ${
                p === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};