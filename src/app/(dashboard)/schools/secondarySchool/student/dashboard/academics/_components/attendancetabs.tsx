"use client";
import React from "react";

type Tab = "overview" | "calendar" | "subjects" | "history";

interface AttendanceTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "calendar", label: "Calendar" },
  { key: "subjects", label: "Subjects" },
  { key: "history", label: "History" },
];

export const AttendanceTabs = ({ activeTab, onTabChange }: AttendanceTabsProps) => {
  return (
    <div className="flex gap-0 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === tab.key
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};