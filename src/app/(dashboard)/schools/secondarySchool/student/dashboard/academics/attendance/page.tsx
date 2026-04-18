"use client";
import React, { useState } from "react";
import { AttendanceStats } from "../_components/attendanceStats";
import { AttendanceTabs } from "../_components/attendancetabs";
import { MonthlyAttendanceTrend } from "../_components/monthlyattendancetrend";
import { AttendanceBreakdown } from "../_components/attendancebreakdown";
import { TodaysStatus } from "../_components/todaysstatus";
import { Achievements } from "../_components/achievements";
import { Notifications } from "../_components/notifications";
import { AttendanceCalendar } from "../_components/attendacecalendar";
import { AttendanceSubjects } from "../_components/advancesubjects";
import { AttendanceHistory } from "../_components/attendancehistory";
import { ArrowLeft, Download, Printer } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
import { useAttendanceOverview } from "@/hooks/useAttendance"; // ← added

type Tab = "overview" | "calendar" | "subjects" | "history";

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // ── TEMPORARY TEST — remove once confirmed working ──
  const { data, loading, error } = useAttendanceOverview();
  if (!loading) {
  console.log("🧪 attendance overview:", { data, error });
}
  

  return (
    <div className="flex flex-col min-h-full bg-gray-50 p-4 md:p-6 gap-4 md:gap-5 overflow-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-3">
        
        {/* Row 1: Back button */}
        <div>
          <button className="flex items-center gap-1 text-sm bg-[#216388] px-3 py-2 rounded text-white w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Row 2: Navigation pills */}
        <AcademicsNavigation />

        {/* Row 3: Title + Buttons */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Attendance</h1>
            <p className="text-xs text-gray-400">Monitor your attendance record and statistics</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors bg-white">
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print View</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>

      </div>

      {/* Stats Strip — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <AttendanceStats />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-2 md:px-4 pt-1 overflow-x-auto">
          <AttendanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="p-3 md:p-4">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <MonthlyAttendanceTrend />
                <AttendanceBreakdown />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <TodaysStatus />
                <Achievements />
                <Notifications />
              </div>
            </div>
          )}

          {activeTab === "calendar" && <AttendanceCalendar />}
          {activeTab === "subjects" && <AttendanceSubjects />}
          {activeTab === "history" && <AttendanceHistory />}
        </div>
      </div>

    </div>
  );
};

export default AttendancePage;