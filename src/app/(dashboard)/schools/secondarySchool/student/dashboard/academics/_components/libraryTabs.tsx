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
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[11px] md:text-xs font-semibold rounded-full transition-all whitespace-nowrap
            ${activeTab === tab.id
              ? "bg-[#216388] text-white shadow-sm"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-1 bg-white text-[#216388] text-[10px] rounded-full w-5 h-5 flex items-center justify-center leading-none font-semibold">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};