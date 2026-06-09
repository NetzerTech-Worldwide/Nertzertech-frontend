"use client";
import React, { useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
import AcademicsPageHeader from "../_components/academicsPageHeader";
import { LibraryStats } from "../_components/libraryStats";
import { LibraryTabs } from "../_components/libraryTabs";
import { BrowseBooks } from "../_components/browseBooks";
import { CurrentBorrowed } from "../_components/currentBorrowed";
import { BorrowedHistory } from "../_components/borrowedHistory";
import { ReservedBooks } from "../_components/reservedBooks";
import { Wishlist } from "../_components/wishlist";

type Tab = "browse" | "current" | "history" | "reserved" | "wishlist";

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("browse");
  const [searchLibrary, setSearchLibrary] = useState("");

  return (
    <div className="flex flex-col min-h-full bg-slate-50 px-4 pt-0 pb-4 md:px-6 md:pt-0 md:pb-6 gap-4 md:gap-5 overflow-auto">

      <div className="space-y-4">
        <AcademicsPageHeader
          title="Library"
          subtitle="Manage your books, track borrowing, and set reminders."
          showBack
          searchValue={searchLibrary}
          onSearchChange={setSearchLibrary}
          searchPlaceholder="Search library"
          actions={
            <>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-full text-slate-600 hover:bg-slate-100 transition-colors bg-white">
                <Printer className="w-3.5 h-3.5" />
                <span>Interval</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#216388] text-white rounded-full hover:bg-[#1a5070] transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Catalog</span>
              </button>
            </>
          }
        />

        <AcademicsNavigation />
      </div>

      {/* Reading Goal Banner */}
      <LibraryStats />

      {/* Tabs and content */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-3 md:px-4 pt-3 pb-2 border-b border-slate-200">
          <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="p-4 md:p-5">
          {activeTab === "browse"   && <BrowseBooks />}
          {activeTab === "current"  && <CurrentBorrowed />}
          {activeTab === "history"  && <BorrowedHistory />}
          {activeTab === "reserved" && <ReservedBooks />}
          {activeTab === "wishlist" && <Wishlist />}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
