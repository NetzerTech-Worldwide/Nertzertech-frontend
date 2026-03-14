import React from "react";
import { Percent, CheckCircle, XCircle, Clock } from "lucide-react";

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
      <div
        className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center border ${iconBg} ${iconBorder}`}
      >
        {icon}
      </div>
      <span className={`text-[11px] md:text-xs font-medium ${badgeColor}`}>
        {badge}
      </span>
    </div>

    <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-none">
      {value}
    </p>
    <p className="text-xs md:text-sm text-gray-500">{label}</p>

    {showBar && (
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden -mt-1">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}

    {sub && (
      <p className={`text-[11px] md:text-xs font-medium ${subColor}`}>{sub}</p>
    )}
  </div>
);

// Exported as 4 individual cards to work inside a grid
export const AttendanceStats = () => (
  <>
    <StatCard
      icon={<Percent className="w-4 h-4 text-blue-600" />}
      iconBg="bg-blue-50"
      iconBorder="border-blue-200"
      badge="Good"
      badgeColor="text-gray-400"
      value="91.7%"
      label="Attendance Rate"
      sub=""
      subColor=""
      showBar
      progress={91.7}
    />
    <StatCard
      icon={<CheckCircle className="w-4 h-4 text-blue-600" />}
      iconBg="bg-blue-50"
      iconBorder="border-blue-200"
      badge="Total"
      badgeColor="text-gray-400"
      value="165"
      label="Days Present"
      sub="out of 180 school days"
      subColor="text-blue-500"
    />
    <StatCard
      icon={<XCircle className="w-4 h-4 text-red-500" />}
      iconBg="bg-red-50"
      iconBorder="border-red-200"
      badge="Alert"
      badgeColor="text-red-400"
      value="12"
      label="Days Absent"
      sub="Max allowed: 18 days"
      subColor="text-orange-500"
    />
    <StatCard
      icon={<Clock className="w-4 h-4 text-orange-400" />}
      iconBg="bg-orange-50"
      iconBorder="border-orange-200"
      badge="This term"
      badgeColor="text-gray-400"
      value="3"
      label="Late Arrivals"
      sub="Longest streak: 22 days"
      subColor="text-orange-500"
    />
  </>
);