"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Present", value: 165, color: "#3b82f6" },
  { name: "Absent", value: 12, color: "#f97316" },
  { name: "Late", value: 3, color: "#a78bfa" },
];

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs">
        <p style={{ color: payload[0].payload.color }} className="font-semibold">
          {payload[0].name}: {payload[0].value} days
        </p>
      </div>
    );
  }
  return null;
};

export const AttendanceBreakdown = () => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-56 flex-shrink-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Attendance Breakdown</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={62}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">
              {((data[0].value / total) * 100).toFixed(0)}%
            </div>
            <div className="text-[10px] text-gray-400">Present</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 space-y-1.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-500">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-700">{item.value} days</span>
          </div>
        ))}
      </div>
    </div>
  );
};