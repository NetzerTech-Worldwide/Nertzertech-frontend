"use client";
import React from "react";
import type { ClassroomTab } from "@/types/academic-classroom";

interface ClassroomTabsProps {
  activeTab: ClassroomTab;
  onTabChange: (tab: ClassroomTab) => void;
  counts?: { liveClasses?: number; learningRoadmap?: number; learningMaterials?: number };
}

const TABS: { id: ClassroomTab; label: string; countKey?: keyof NonNullable<ClassroomTabsProps["counts"]> }[] = [
  { id: "live-classes", label: "Live Classes", countKey: "liveClasses" },
  { id: "learning-roadmap", label: "Learning Roadmap", countKey: "learningRoadmap" },
  { id: "learning-materials", label: "Learning Materials", countKey: "learningMaterials" },
];

export const ClassroomTabs: React.FC<ClassroomTabsProps> = ({
  activeTab,
  onTabChange,
  counts = { liveClasses: 3, learningRoadmap: 6, learningMaterials: 6 },
}) => {
  return (
    <div className="flex gap-0 border-b border-gray-200">
      {TABS.map((tab) => {
        const count = tab.countKey ? counts[tab.countKey] : undefined;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
              ${isActive
                ? "border-[#216388] text-[#216388]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {tab.label}
            {count !== undefined && (
              <span
                className={`
                  inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold
                  ${isActive ? "bg-[#216388] text-white" : "bg-gray-100 text-gray-500"}
                `}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};