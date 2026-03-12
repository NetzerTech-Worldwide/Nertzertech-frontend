"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Sep", present: 22, absent: 1, late: 0 },
  { month: "Oct", present: 20, absent: 2, late: 1 },
  { month: "Nov", present: 18, absent: 3, late: 1 },
  { month: "Dec", present: 17, absent: 2, late: 2 },
  { month: "Jan", present: 21, absent: 1, late: 0 },
  { month: "Feb", present: 19, absent: 2, late: 1 },
  { month: "Mar", present: 20, absent: 1, late: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MonthlyAttendanceTrend = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Monthly Attendance Trend</h3>
        <span className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5">2024 - 2025</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
          />
          <Line
            type="monotone"
            dataKey="present"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
            name="Present"
          />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#f97316" }}
            activeDot={{ r: 6 }}
            name="Absent"
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#a78bfa"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#a78bfa" }}
            activeDot={{ r: 6 }}
            name="Late"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};