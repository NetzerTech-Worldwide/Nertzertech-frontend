"use client";
import React from "react";
import { useAttendanceSubjects } from "@/hooks/useAttendance";

const statusCards = [
  { key: "total", label: "Total", className: "border-slate-200 bg-slate-50 text-slate-700" },
  { key: "pending", label: "Pending", className: "border-amber-200 bg-amber-50 text-amber-700" },
  { key: "approved", label: "Approved", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { key: "rejected", label: "Rejected", className: "border-red-200 bg-red-50 text-red-700" },
] as const;

const SummaryCard = ({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) => (
  <div className={`rounded-xl border px-4 py-4 ${className}`}>
    <p className="text-xs font-medium">{label}</p>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
  </div>
);

export const AttendanceSubjects = () => {
  const { data, loading, error } = useAttendanceSubjects();

  return (
    <div className="bg-white rounded-lg border border-blue-200 border-2 p-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Attendance Subjects</h3>
          <p className="text-[11px] text-gray-400">Summary of your subject attendance requests</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-4 rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
          Loading attendance subjects...
        </div>
      ) : error ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
          {error}
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statusCards.map((card) => (
            <SummaryCard
              key={card.key}
              label={card.label}
              value={data?.[card.key] ?? 0}
              className={card.className}
            />
          ))}
        </div>
      )}
    </div>
  );
};
