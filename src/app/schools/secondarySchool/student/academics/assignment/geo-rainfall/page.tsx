"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paperclip, Search, Send } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";
const ASSIGNMENT_BASE = `${SUBJECTS_BASE}/assignment`;

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== SUBJECTS_BASE && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-full border px-3 py-1.5 text-xs leading-none transition
        ${isActive ? "bg-[#2A7EAF] text-white border-[#2A7EAF]" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
    >
      {label}
    </Link>
  );
}

function Points({ value }: { value: string }) {
  return <span className="text-sm font-semibold text-[#135D96]">{value}</span>;
}

export default function StartAssignmentPage() {
  return (
    <div className="px-4 py-6 sm:px-5 md:px-6 space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Assignments</h1>
          <p className="text-sm text-slate-500">Manage your home and project submissions</p>
        </div>

        <div className="w-full md:max-w-md">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
            <input
              type="text"
              placeholder="Search anything here"
              className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
            />
            <Search className="h-5 w-5 text-slate-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterPill href={SUBJECTS_BASE} label="Subject" />
        <FilterPill href={`${SUBJECTS_BASE}/classroom`} label="Classroom" />
        <FilterPill href={ASSIGNMENT_BASE} label="Assignment" />
        <FilterPill href={`${SUBJECTS_BASE}/examinations`} label="Examinations" />
        <FilterPill href={`${SUBJECTS_BASE}/records`} label="Records" />
        <FilterPill href={`${SUBJECTS_BASE}/attendance`} label="Attendance" />
        <FilterPill href={`${SUBJECTS_BASE}/timetable`} label="Timetable" />
        <FilterPill href={`${SUBJECTS_BASE}/library`} label="Library" />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Rainfall Formation Processes</h2>
            <p className="text-[12px] text-slate-600">Geography • Due: 7/18/2025</p>
          </div>
          <Points value="120 Points" />
        </div>

        <div className="mt-4 rounded-xl border border-[#d9ecf7] bg-[#f5fbff] px-4 py-3">
          <p className="text-sm font-semibold text-[#135D96]">Assignment Task:</p>
          <p className="mt-1 text-sm text-slate-700">Discuss types of rainfall and their formation processes.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-slate-900">Your Work</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Save as Draft
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[#175F89] px-4 py-2 text-sm font-medium text-white hover:bg-[#13567a]">
              <Send className="h-4 w-4" />
              Submit Assignment
            </button>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Paperclip className="h-4 w-4 text-slate-600" />
          Attach File
        </button>

        <div className="rounded-lg border border-[#2A7EAF] bg-[#f8fbff]">
          <textarea
            rows={10}
            placeholder="Start typing your assignment here"
            className="w-full resize-none rounded-lg border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
          <h4 className="text-base font-semibold text-amber-800">Tips for Success:</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-800">
            <li>Save your work regularly to avoid losing progress</li>
            <li>Review the assignment requirements before submitting</li>
            <li>Check your spelling and grammar</li>
            <li>Make sure you&apos;ve answered all parts of the question</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
