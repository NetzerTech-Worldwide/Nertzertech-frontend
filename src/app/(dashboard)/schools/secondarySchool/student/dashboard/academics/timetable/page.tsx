"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Clock, User, MapPin } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
import AcademicsPageHeader from "../_components/academicsPageHeader";

type TimetableEntry = {
  start: string;
  end: string;
  subject: string;
  teacher?: string;
  room?: string;
  tagColor: string;
  isBreak?: boolean;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
type Day = (typeof DAYS)[number];

const WEEKLY_SCHEDULE: Record<Day, TimetableEntry[]> = {
  Monday: [
    { start: "08:00", end: "09:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101", tagColor: "#C084FC" },
    { start: "09:00", end: "10:00", subject: "English Language", teacher: "Prof. Michael Brown", room: "Room 205", tagColor: "#60A5FA" },
    { start: "10:00", end: "10:15", subject: "Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "10:15", end: "11:15", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 3", tagColor: "#4ADE80" },
    { start: "11:15", end: "12:15", subject: "Physics", teacher: "Prof. James Wilson", room: "Lab 1", tagColor: "#FBBF24" },
    { start: "12:15", end: "13:00", subject: "Lunch Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "13:00", end: "14:00", subject: "History", teacher: "Ms. Lisa Anderson", room: "Room 302", tagColor: "#A5B4FC" },
    { start: "14:00", end: "15:00", subject: "Physical Education", teacher: "Coach Robert Lee", room: "Gym", tagColor: "#F87171" },
  ],
  Tuesday: [
    { start: "08:00", end: "09:00", subject: "Biology", teacher: "Dr. Patricia Moore", room: "Lab 2", tagColor: "#34D399" },
    { start: "09:00", end: "10:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101", tagColor: "#C084FC" },
    { start: "10:00", end: "10:15", subject: "Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "10:15", end: "11:15", subject: "Computer Science", teacher: "Mr. David Chen", room: "Computer Lab", tagColor: "#FCA5A5" },
    { start: "11:15", end: "12:15", subject: "English Literature", teacher: "Prof. Michael Brown", room: "Room 205", tagColor: "#F472B6" },
    { start: "12:15", end: "13:00", subject: "Lunch Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "13:00", end: "14:00", subject: "Geography", teacher: "Ms. Jennifer Taylor", room: "Room 303", tagColor: "#F59E0B" },
    { start: "14:00", end: "15:00", subject: "Art", teacher: "Ms. Amanda White", room: "Art Studio", tagColor: "#A5B4FC" },
  ],
  Wednesday: [
    { start: "08:00", end: "09:00", subject: "Biology", teacher: "Dr. Patricia Moore", room: "Lab 2", tagColor: "#34D399" },
    { start: "09:00", end: "10:00", subject: "English Literature", teacher: "Prof. Michael Brown", room: "Room 205", tagColor: "#F472B6" },
    { start: "10:00", end: "10:15", subject: "Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "10:15", end: "11:15", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101", tagColor: "#C084FC" },
    { start: "11:15", end: "12:15", subject: "Geography", teacher: "Ms. Jennifer Taylor", room: "Room 303", tagColor: "#F59E0B" },
    { start: "12:15", end: "13:00", subject: "Lunch Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "13:00", end: "14:00", subject: "Computer Science", teacher: "Mr. David Chen", room: "Computer Lab", tagColor: "#FCA5A5" },
    { start: "14:00", end: "15:00", subject: "Art", teacher: "Ms. Amanda White", room: "Art Studio", tagColor: "#A5B4FC" },
  ],
  Thursday: [
    { start: "08:00", end: "09:00", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 3", tagColor: "#4ADE80" },
    { start: "09:00", end: "10:00", subject: "Physics", teacher: "Prof. James Wilson", room: "Lab 1", tagColor: "#FBBF24" },
    { start: "10:00", end: "10:15", subject: "Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "10:15", end: "11:15", subject: "English Language", teacher: "Prof. Michael Brown", room: "Room 205", tagColor: "#60A5FA" },
    { start: "11:15", end: "12:15", subject: "Biology", teacher: "Dr. Patricia Moore", room: "Lab 2", tagColor: "#34D399" },
    { start: "12:15", end: "13:00", subject: "Lunch Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "13:00", end: "14:00", subject: "History", teacher: "Ms. Lisa Anderson", room: "Room 302", tagColor: "#A5B4FC" },
    { start: "14:00", end: "15:00", subject: "Physical Education", teacher: "Coach Robert Lee", room: "Gym", tagColor: "#F87171" },
  ],
  Friday: [
    { start: "08:00", end: "09:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101", tagColor: "#C084FC" },
    { start: "09:00", end: "10:00", subject: "English Literature", teacher: "Prof. Michael Brown", room: "Room 205", tagColor: "#F472B6" },
    { start: "10:00", end: "10:15", subject: "Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "10:15", end: "11:15", subject: "Computer Science", teacher: "Mr. David Chen", room: "Computer Lab", tagColor: "#FCA5A5" },
    { start: "11:15", end: "12:15", subject: "Geography", teacher: "Ms. Jennifer Taylor", room: "Room 303", tagColor: "#F59E0B" },
    { start: "12:15", end: "13:00", subject: "Lunch Break", tagColor: "#E2E8F0", isBreak: true },
    { start: "13:00", end: "14:00", subject: "Art", teacher: "Ms. Amanda White", room: "Art Studio", tagColor: "#A5B4FC" },
    { start: "14:00", end: "15:00", subject: "History", teacher: "Ms. Lisa Anderson", room: "Room 302", tagColor: "#A5B4FC" },
  ],
};

export default function AcademicsTimetablePage() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState<Day>("Monday");
  const [grade, setGrade] = useState("10th Grade");
  const [section, setSection] = useState("Section A");
  const [search, setSearch] = useState("");

  const entries = WEEKLY_SCHEDULE[activeDay].filter((entry) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      entry.subject.toLowerCase().includes(q) ||
      entry.teacher?.toLowerCase().includes(q) ||
      entry.room?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-full flex-col gap-4 bg-slate-50 px-4 pt-0 pb-4 md:px-6 md:pt-0 md:pb-6">
      <AcademicsPageHeader
        title="Timetable"
        subtitle="View your weekly class schedules"
        showBack
        searchValue={search}
        onSearchChange={setSearch}
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 transition-colors">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        }
      />

      <AcademicsNavigation />

      {/* ── Class Timetable heading ── */}
      <h2 className="text-xl font-semibold text-slate-900">Class Timetable</h2>

      {/* ── Grade / Section / Download card ── */}
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          {/* Grade + Section selectors */}
          <div className="flex items-center gap-3">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#216388] focus:ring-1 focus:ring-[#216388]"
            >
              <option>10th Grade</option>
              <option>9th Grade</option>
              <option>11th Grade</option>
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#216388] focus:ring-1 focus:ring-[#216388]"
            >
              <option>Section A</option>
              <option>Section B</option>
              <option>Section C</option>
            </select>
          </div>

          {/* Download PDF */}
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#216388] bg-white px-4 py-2.5 text-sm font-medium text-[#216388] transition-colors hover:bg-[#216388]/5">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* ── Schedule card: day tabs + entries combined ── */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        {/* Day tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition ${
                activeDay === day
                  ? "border-[#216388] bg-[#216388] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {entries.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">No classes match your search.</p>
          ) : (
            entries.map((entry, index) => (
              <div
                key={index}
                className={`rounded-2xl border px-5 py-4 ${
                  entry.isBreak ? "border-slate-100 bg-slate-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-5">
                  {/* Time */}
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 whitespace-nowrap">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{entry.start} - {entry.end}</span>
                  </div>

                  {/* Subject */}
                  {entry.isBreak ? (
                    <span className="text-sm font-medium text-slate-500">{entry.subject}</span>
                  ) : (
                    <span
                      className="rounded-lg border px-3 py-1 text-xs font-semibold whitespace-nowrap"
                      style={{ borderColor: entry.tagColor, color: entry.tagColor }}
                    >
                      {entry.subject}
                    </span>
                  )}

                  {/* Teacher */}
                  {!entry.isBreak && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500 whitespace-nowrap">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {entry.teacher}
                    </span>
                  )}

                  {/* Room */}
                  {!entry.isBreak && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500 whitespace-nowrap">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {entry.room}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
