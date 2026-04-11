"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";

type AssignmentStatus = "submitted" | "pending";
type PriorityLevel = "LOW" | "MEDIUM" | "HIGH";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  due: string;
  description: string;
  type: string;
  priority: PriorityLevel;
  points: string;
  status: AssignmentStatus;
  submissionHref?: string;
  startHref?: string;
};

const ASSIGNMENTS: Assignment[] = [
  {
    id: "eng-essay",
    title: "English Essay",
    subject: "English",
    due: "2025-07-15",
    description: 'Write an essay on "The Importance of Discipline in Schools" (450-500 words).',
    type: "Essay",
    priority: "LOW",
    points: "100/89",
    status: "submitted",
    submissionHref: `${SUBJECTS_BASE}/assignment/eng-essay`,
  },
  {
    id: "bio-digestive",
    title: "Human digestive system",
    subject: "Biology",
    due: "2025-07-21",
    description: "Draw and label the human digestive system.",
    type: "Worksheet",
    priority: "MEDIUM",
    points: "120",
    status: "pending",
  },
  {
    id: "math-graphs",
    title: "Mathematics Assignment",
    subject: "Mathematics",
    due: "2025-07-23",
    description: "Solve 10 questions on quadratic equations and plot their graphs.",
    type: "Worksheet",
    priority: "MEDIUM",
    points: "120",
    status: "pending",
  },
  {
    id: "geo-rainfall",
    title: "Rainfall Formation Processes",
    subject: "Geography",
    due: "2025-07-18",
    description: "Discuss types of rainfall and their formation processes.",
    type: "Worksheet",
    priority: "HIGH",
    points: "120",
    status: "pending",
    startHref: `${SUBJECTS_BASE}/assignment/geo-rainfall`,
  },
];

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

function StatusBadge({ status }: { status: AssignmentStatus }) {
  const isSubmitted = status === "submitted";
  const styles = isSubmitted
    ? "bg-slate-100 text-slate-700 border-slate-200"
    : "bg-rose-50 text-rose-600 border-rose-200";

  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles}`}>
      {isSubmitted ? "Submitted" : "Pending"}
    </span>
  );
}

function PriorityText({ level }: { level: PriorityLevel }) {
  const palette = {
    LOW: "text-emerald-600",
    MEDIUM: "text-amber-600",
    HIGH: "text-rose-600",
  } as const;

  return <span className={`font-semibold ${palette[level]}`}>{level}</span>;
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const isSubmitted = assignment.status === "submitted";
  const accentBorder = isSubmitted ? "border-l-4 border-l-[#2A7EAF] pl-[0.95rem]" : "";

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ${accentBorder}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <p className="text-[15px] font-semibold text-slate-900">{assignment.title}</p>
          <p className="text-[12px] text-slate-600">
            {assignment.subject} {"\u2022"} Due: {assignment.due}
          </p>
          <p className="text-[12px] leading-relaxed text-slate-500">{assignment.description}</p>
        </div>
        <StatusBadge status={assignment.status} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-[12px] text-slate-700 sm:grid-cols-2">
        <div>
          <span className="font-semibold">Type:</span> <span>{assignment.type}</span>
        </div>
        <div className="sm:text-right">
          <span className="font-semibold">Points:</span> <span>{assignment.points}</span>
        </div>
        <div>
          <span className="font-semibold">Priority:</span>{" "}
          <span className="ml-1">
            <PriorityText level={assignment.priority} />
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {isSubmitted ? (
          assignment.submissionHref ? (
            <Link
              href={assignment.submissionHref}
              className="w-full rounded-md bg-[#175F89] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#13567a] sm:w-auto"
            >
              View Submission
            </Link>
          ) : (
            <button className="w-full rounded-md bg-[#175F89] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#13567a] sm:w-auto">
              View Submission
            </button>
          )
        ) : (
          <>
            <button className="w-full rounded-md border border-[#175F89] px-4 py-2 text-sm font-medium text-[#175F89] transition hover:bg-sky-50 sm:w-auto">
              View Details
            </button>
            {assignment.startHref ? (
              <Link
                href={assignment.startHref}
                className="w-full rounded-md bg-[#175F89] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#13567a] sm:w-auto"
              >
                Start Assignment
              </Link>
            ) : (
              <button className="w-full rounded-md bg-[#175F89] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#13567a] sm:w-auto">
                Start Assignment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const TABS = [
  { key: "all", label: "All Assignments" },
  { key: "pending", label: "Pending" },
  { key: "submitted", label: "Submitted" },
] as const;

export default function AssignmentPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const isSubmittedTab = tab === "submitted";

  const filteredAssignments = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ASSIGNMENTS.filter((a) => {
      const matchesTab = tab === "all" ? true : tab === a.status;
      const matchesQuery = q
        ? [a.title, a.subject, a.description].some((field) => field.toLowerCase().includes(q))
        : true;
      return matchesTab && matchesQuery;
    });
  }, [query, tab]);

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
        <FilterPill href={`${SUBJECTS_BASE}/assignment`} label="Assignment" />
        <FilterPill href={`${SUBJECTS_BASE}/examinations`} label="Examinations" />
        <FilterPill href={`${SUBJECTS_BASE}/records`} label="Records" />
        <FilterPill href={`${SUBJECTS_BASE}/attendance`} label="Attendance" />
        <FilterPill href={`${SUBJECTS_BASE}/timetable`} label="Timetable" />
        <FilterPill href={`${SUBJECTS_BASE}/library`} label="Library" />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-6 border-b border-slate-100 px-4 pt-4 sm:px-5">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative -mb-px pb-3 text-sm font-medium transition ${
                  active ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
                {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#2A7EAF]" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">
          <div className={`grid gap-4 ${isSubmittedTab ? "max-w-xl mx-auto" : "lg:grid-cols-2"}`}>
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
          {!filteredAssignments.length && (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No assignments match your filters yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
