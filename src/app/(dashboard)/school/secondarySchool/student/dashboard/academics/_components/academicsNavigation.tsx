"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUBJECTS_BASE = "/school/secondarySchool/student/dashboard/academics";

const TOP_FILTERS = [
  { label: "Subject", href: SUBJECTS_BASE },
  { label: "Classroom", href: `${SUBJECTS_BASE}/classroom` },
  { label: "Assignment", href: `${SUBJECTS_BASE}/assignment` },
  { label: "Examinations", href: `${SUBJECTS_BASE}/examinations` },
  { label: "Records", href: `${SUBJECTS_BASE}/records` },
  { label: "Attendance", href: `${SUBJECTS_BASE}/attendance` },
  { label: "Timetable", href: `${SUBJECTS_BASE}/timetable` },
  { label: "Library", href: `${SUBJECTS_BASE}/library` },
];

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== SUBJECTS_BASE && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3 py-1.5 text-xs leading-none transition
        ${
          active
            ? "bg-[#2A7EAF] text-white border-[#2A7EAF]"
            : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
        }`}
    >
      {label}
    </Link>
  );
}

export default function AcademicsNavigation() {
  return (
    <div className="flex flex-wrap gap-2">
      {TOP_FILTERS.map(({ label, href }) => (
        <FilterPill key={href} href={href} label={label} />
      ))}
    </div>
  );
}