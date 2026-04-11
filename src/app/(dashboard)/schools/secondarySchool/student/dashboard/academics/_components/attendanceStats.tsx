"use client";
import React from "react";
import { Percent, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAttendanceOverview } from "@/hooks/useAttendance";
import { AttendanceOverview } from "@/types/attendance";

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  badge: string;
  badgeColor: string;
  value: string;
  label: string;
  sub: string;
  subColor: string;
  showBar?: boolean;
  progress?: number;
}

const StatCard = ({
  icon,
  iconBg,
  iconBorder,
  badge,
  badgeColor,
  value,
  label,
  sub,
  subColor,
  showBar,
  progress,
}: StatCardProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center border ${iconBg} ${iconBorder}`}>
        {icon}
      </div>
      <span className={`text-[11px] md:text-xs font-medium ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-none">{value}</p>
    <p className="text-xs md:text-sm text-gray-500">{label}</p>
    {showBar && (
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden -mt-1">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    )}
    {sub && <p className={`text-[11px] md:text-xs font-medium ${subColor}`}>{sub}</p>}
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const StatCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 flex flex-col gap-2 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-100" />
      <div className="w-10 h-3 rounded bg-gray-100" />
    </div>
    <div className="w-16 h-7 rounded bg-gray-100" />
    <div className="w-24 h-3 rounded bg-gray-100" />
    <div className="w-full h-1.5 rounded-full bg-gray-100" />
    <div className="w-32 h-3 rounded bg-gray-100" />
  </div>
);

// ─── Cards builder ────────────────────────────────────────────────────────────

const buildCards = (data: AttendanceOverview) => [
  {
    icon: <Percent className="w-4 h-4 text-blue-600" />,
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-200",
    badge: data.attendancePercentage >= 75 ? "Good" : "At Risk",
    badgeColor: data.attendancePercentage >= 75 ? "text-gray-400" : "text-red-400",
    value: `${data.attendancePercentage}%`,
    label: "Attendance Rate",
    sub: "",
    subColor: "",
    showBar: true,
    progress: data.attendancePercentage,
  },
  {
    icon: <CheckCircle className="w-4 h-4 text-blue-600" />,
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-200",
    badge: "Total",
    badgeColor: "text-gray-400",
    value: String(data.present),
    label: "Days Present",
    sub: `out of ${data.totalClasses} school days`,
    subColor: "text-blue-500",
    showBar: false,
  },
  {
    icon: <XCircle className="w-4 h-4 text-red-500" />,
    iconBg: "bg-red-50",
    iconBorder: "border-red-200",
    badge: data.absent > 0 ? "Alert" : "Good",
    badgeColor: data.absent > 0 ? "text-red-400" : "text-gray-400",
    value: String(data.absent),
    label: "Days Absent",
    sub: `Excused: ${data.excused} days`,
    subColor: "text-orange-500",
    showBar: false,
  },
  {
    icon: <Clock className="w-4 h-4 text-orange-400" />,
    iconBg: "bg-orange-50",
    iconBorder: "border-orange-200",
    badge: "This term",
    badgeColor: "text-gray-400",
    value: String(data.late),
    label: "Late Arrivals",
    sub: "",
    subColor: "",
    showBar: false,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const AttendanceStats = () => {
  const { data, loading, error } = useAttendanceOverview();

  if (loading) {
  return (
    <>
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </>
  );
}

if (error || !data) {
  return (
    <div className="col-span-2 md:col-span-4 text-center text-sm text-red-400 py-6">
      Failed to load attendance stats. Please try again.
    </div>
  );
}

// data is guaranteed to be AttendanceOverview here — no ! needed
return (
  <>
    {buildCards(data).map((card, i) => (
      <StatCard key={i} {...card} />
    ))}
  </>
);
};