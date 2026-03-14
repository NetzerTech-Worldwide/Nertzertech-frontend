"use client";
import React, { useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
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

  return (
    <div className="flex flex-col min-h-full bg-gray-50 p-4 md:p-6 gap-4 md:gap-5 overflow-auto">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <button className="flex items-center gap-1 text-sm bg-[#216388] px-3 py-2 rounded text-white w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <AcademicsNavigation />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Library</h1>
            <p className="text-xs text-gray-400">Manage your books, track borrowing & set reminders</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors bg-white">
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Interval</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reading Goal Banner */}
      <LibraryStats />

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-2 md:px-4 pt-1 overflow-x-auto">
          <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="p-3 md:p-4">
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