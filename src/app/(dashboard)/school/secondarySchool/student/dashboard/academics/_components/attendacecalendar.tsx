"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DayStatus = "present" | "absent" | "late" | "missing" | "today" | "empty";

interface DayData {
  day: number;
  status: DayStatus;
}

const FEBRUARY_2026: DayData[] = [
  { day: 1, status: "empty" },
  { day: 2, status: "present" },
  { day: 3, status: "present" },
  { day: 4, status: "present" },
  { day: 5, status: "present" },
  { day: 6, status: "present" },
  { day: 7, status: "absent" },
  { day: 8, status: "absent" },
  { day: 9, status: "present" },
  { day: 10, status: "present" },
  { day: 11, status: "present" },
  { day: 12, status: "present" },
  { day: 13, status: "late" },
  { day: 14, status: "absent" },
  { day: 15, status: "absent" },
  { day: 16, status: "present" },
  { day: 17, status: "present" },
  { day: 18, status: "present" },
  { day: 19, status: "present" },
  { day: 20, status: "present" },
  { day: 21, status: "absent" },
  { day: 22, status: "absent" },
  { day: 23, status: "present" },
  { day: 24, status: "present" },
  { day: 25, status: "present" },
  { day: 26, status: "today" },
  { day: 27, status: "present" },
  { day: 28, status: "present" },
];

const februarySummary = { present: 20, absent: 5, late: 1, missing: 2 };

const statusStyles: Record<DayStatus, string> = {
  present: "bg-blue-500 text-white",
  absent: "bg-orange-400 text-white",
  late: "bg-purple-400 text-white",
  missing: "bg-gray-300 text-gray-600",
  today: "bg-orange-500 text-white ring-2 ring-orange-300",
  empty: "bg-transparent text-gray-300 cursor-default",
};

// Shorten day labels on mobile
const DAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

const Legend = () => (
  <div className="flex items-center gap-3 mt-4 flex-wrap">
    {[
      { label: "Present", color: "bg-blue-500" },
      { label: "Absent", color: "bg-orange-400" },
      { label: "Late", color: "bg-purple-400" },
      { label: "Missing", color: "bg-gray-300" },
    ].map((item) => (
      <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
        {item.label}
      </div>
    ))}
  </div>
);

const SummaryCard = () => (
  <div className="bg-gray-50 md:bg-white rounded-lg md:border md:border-gray-200 p-3 md:p-4 md:w-52 md:flex-shrink-0 md:self-start">
    <h4 className="text-sm font-semibold text-gray-700 mb-3">February Summary</h4>
    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 md:space-y-2 text-xs">
      {[
        { label: "Days Present", value: februarySummary.present, color: "text-blue-500" },
        { label: "Days Absent", value: februarySummary.absent, color: "text-orange-400" },
        { label: "Days Late", value: februarySummary.late, color: "text-purple-400" },
        { label: "Late entries", value: februarySummary.missing, color: "text-gray-400" },
      ].map((item) => (
        <div key={item.label} className="flex justify-between items-center">
          <span className="text-gray-500">{item.label}</span>
          <span className={`font-bold ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>

    <div className="mt-3">
      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
        <span>Attendance rate</span>
        <span className="font-semibold text-gray-600">80%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: "80%" }} />
      </div>
    </div>

    <div className="mt-4 pt-3 border-t border-gray-100">
      <h4 className="text-xs font-semibold text-gray-600 mb-2">Today's Status</h4>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
        <span className="text-xs text-gray-600">Present</span>
      </div>
      <p className="text-[11px] text-gray-400 mt-1">On time today</p>
      <p className="text-[11px] text-gray-400 mt-0.5">Feb 26, 2026</p>
    </div>
  </div>
);

export const AttendanceCalendar = () => {
  const [month] = useState("February 2026");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Calendar */}
      <div className="flex-1 min-w-0">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-gray-700">{month}</h3>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS_FULL.map((d, i) => (
            <div key={d} className="text-center py-1">
              {/* Full label on sm+, single letter on mobile */}
              <span className="hidden sm:inline text-[11px] font-semibold text-gray-400">{d}</span>
              <span className="inline sm:hidden text-[11px] font-semibold text-gray-400">{DAYS_SHORT[i]}</span>
            </div>
          ))}
        </div>

        {/* Day grid — circles scale with viewport */}
        <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2">
          {FEBRUARY_2026.map((day, i) => (
            <div key={i} className="flex items-center justify-center">
              <button
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-medium
                  flex items-center justify-center transition-transform hover:scale-105
                  ${statusStyles[day.status]}
                `}
              >
                {day.status !== "empty" ? day.day : ""}
              </button>
            </div>
          ))}
        </div>

        <Legend />
      </div>

      {/* Summary — below calendar on mobile, sidebar on md+ */}
      <SummaryCard />
    </div>
  );
};