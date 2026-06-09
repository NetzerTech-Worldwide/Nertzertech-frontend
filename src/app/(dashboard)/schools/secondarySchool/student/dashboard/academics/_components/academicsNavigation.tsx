"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ACADEMICS_BASE = "/schools/secondarySchool/student/dashboard/academics";

const TOP_FILTERS = [
  { label: "Subject", href: ACADEMICS_BASE },
  { label: "Classroom", href: `${ACADEMICS_BASE}/classroom` },
  { label: "Assignment", href: `${ACADEMICS_BASE}/assignment` },
  { label: "Examinations", href: `${ACADEMICS_BASE}/examinations` },
  { label: "Records", href: `${ACADEMICS_BASE}/records` },
  { label: "Attendance", href: `${ACADEMICS_BASE}/attendance` },
  { label: "Timetable", href: `${ACADEMICS_BASE}/timetable` },
  { label: "Library", href: `${ACADEMICS_BASE}/library` },
];

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== ACADEMICS_BASE && pathname.startsWith(href));

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