"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useAttendanceCalendar } from "@/hooks/useAttendance";
import type { DayStatus } from "@/types/attendance";

type CalendarCell = {
  day: number | null;
  status: DayStatus;
};

const statusStyles: Record<DayStatus, string> = {
  present: "bg-blue-500 text-white",
  absent: "bg-orange-400 text-white",
  late: "bg-purple-400 text-white",
  missing: "bg-gray-300 text-gray-600",
  today: "bg-orange-500 text-white ring-2 ring-orange-300",
  empty: "bg-transparent text-gray-300 cursor-default",
};

const DAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildCalendarCells(
  year: number,
  month: number,
  statuses: Map<number, DayStatus>
): CalendarCell[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ day: null, status: "empty" });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, status: statuses.get(day) ?? "missing" });
  }

  return cells;
}

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

function SummaryCard({
  monthLabel,
  present,
  absent,
  late,
  missing,
}: {
  monthLabel: string;
  present: number;
  absent: number;
  late: number;
  missing: number;
}) {
  const total = present + absent + late + missing;
  const attendanceRate = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="bg-gray-50 md:bg-white rounded-lg md:border md:border-gray-200 p-3 md:p-4 md:w-52 md:flex-shrink-0 md:self-start">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{monthLabel} Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 md:space-y-2 text-xs">
        {[
          { label: "Days Present", value: present, color: "text-blue-500" },
          { label: "Days Absent", value: absent, color: "text-orange-400" },
          { label: "Days Late", value: late, color: "text-purple-400" },
          { label: "Missing", value: missing, color: "text-gray-400" },
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
          <span className="font-semibold text-gray-600">{attendanceRate}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${attendanceRate}%` }} />
        </div>
      </div>
    </div>
  );
}

export const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const month = currentMonth.getMonth() + 1;
  const year = currentMonth.getFullYear();
  const monthLabel = getMonthLabel(currentMonth);
  const { data, loading, error } = useAttendanceCalendar(month, year);

  const statusByDay = useMemo(() => {
    return new Map(data?.days?.map((day) => [day.day, day.status]) ?? []);
  }, [data?.days]);

  const cells = useMemo(
    () => buildCalendarCells(year, month, statusByDay),
    [year, month, statusByDay]
  );

  const goToPreviousMonth = () => {
    setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-gray-700">{monthLabel}</h3>
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-5 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin text-[#216388]" />
            Loading calendar...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-100 bg-red-50 p-5 text-sm text-red-500">
            Failed to load attendance calendar.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 mb-2">
              {DAYS_FULL.map((day, index) => (
                <div key={day} className="text-center py-1">
                  <span className="hidden sm:inline text-[11px] font-semibold text-gray-400">{day}</span>
                  <span className="inline sm:hidden text-[11px] font-semibold text-gray-400">{DAYS_SHORT[index]}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2">
              {cells.map((cell, index) => (
                <div key={`${cell.day ?? "empty"}-${index}`} className="flex items-center justify-center">
                  <button
                    type="button"
                    disabled={cell.status === "empty"}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center transition-transform hover:scale-105 ${statusStyles[cell.status]}`}
                  >
                    {cell.day ?? ""}
                  </button>
                </div>
              ))}
            </div>

            <Legend />
          </>
        )}
      </div>

      <SummaryCard
        monthLabel={monthLabel}
        present={data?.summary?.present ?? 0}
        absent={data?.summary?.absent ?? 0}
        late={data?.summary?.late ?? 0}
        missing={data?.summary?.missing ?? 0}
      />
    </div>
  );
};
