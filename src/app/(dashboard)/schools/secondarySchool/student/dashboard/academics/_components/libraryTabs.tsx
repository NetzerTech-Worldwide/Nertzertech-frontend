"use client";
import React from "react";
import { Heart } from "lucide-react";

type Tab = "browse" | "current" | "history" | "reserved" | "wishlist";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; badge?: number; icon?: React.ReactNode }[] = [
  { id: "browse",   label: "Browse Book",     badge: 9 },
  { id: "current",  label: "Current Borrowed" },
  { id: "history",  label: "Borrowed History" },
  { id: "reserved", label: "Reserved Books" },
  { id: "wishlist", label: "Wishlist", badge: 2, icon: <Heart className="w-3.5 h-3.5" /> },
];

export const LibraryTabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="flex gap-0 border-b border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 md:px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap border-b-2 transition-colors
            ${activeTab === tab.id
              ? "border-[#216388] text-[#216388]"
              : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-0.5 bg-[#216388] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};