"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, ArrowLeft, CircleDot, Search } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";
const RECORDS_BASE = `${SUBJECTS_BASE}/records`;

type StudentInfo = {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  section: string;
};

const STUDENTS: StudentInfo[] = [
  { id: "STU001", initials: "EW", name: "Emma Wilson", email: "emma.wilson@school.edu", phone: "+1 234-567-8901", grade: "10th Grade", section: "Section A" },
  { id: "STU002", initials: "LJ", name: "Liam Johnson", email: "liam.johnson@school.edu", phone: "+1 234-567-8902", grade: "10th Grade", section: "Section A" },
  { id: "STU003", initials: "OB", name: "Olivia Brown", email: "olivia.brown@school.edu", phone: "+1 234-567-8903", grade: "10th Grade", section: "Section B" },
  { id: "STU004", initials: "ND", name: "Noah Davis", email: "noah.davis@school.edu", phone: "+1 234-567-8904", grade: "11th Grade", section: "Section A" },
  { id: "STU005", initials: "AM", name: "Ava Martinez", email: "ava.martinez@school.edu", phone: "+1 234-567-8905", grade: "11th Grade", section: "Section B" },
  { id: "STU006", initials: "EG", name: "Ethan Garcia", email: "ethan.garcia@school.edu", phone: "+1 234-567-8906", grade: "12th Grade", section: "Section A" },
  { id: "STU007", initials: "SR", name: "Sophia Rodriguez", email: "sophia.rodriguez@school.edu", phone: "+1 234-567-8907", grade: "12th Grade", section: "Section B" },
  { id: "STU008", initials: "ML", name: "Mason Lee", email: "mason.lee@school.edu", phone: "+1 234-567-8908", grade: "9th Grade", section: "Section A" },
];

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== SUBJECTS_BASE && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-4 py-2 text-xs leading-none transition
      ${active ? "border-[#2A7EAF] bg-[#2A7EAF] text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}
    >
      {label}
    </Link>
  );
}

export default function DeleteStudentPage() {
  const [queryStudentId, setQueryStudentId] = useState<string | null>(null);
  const student = useMemo(() => STUDENTS.find((s) => s.id === queryStudentId) ?? STUDENTS[0], [queryStudentId]);
  const [pageSearch, setPageSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQueryStudentId(params.get("id"));
    }
  }, []);

  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[21px] font-semibold text-slate-900">Examinations</h1>
          <p className="text-xs text-slate-500">Manage your examinations and practice tests</p>
        </div>

        <div className="w-full md:max-w-[360px]">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
            <input
              type="text"
              value={pageSearch}
              onChange={(event) => setPageSearch(event.target.value)}
              placeholder="Search anything here"
              className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
            />
            <Search className="h-4 w-4 text-[#2A7EAF]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="inline-flex h-7 items-center gap-1 rounded-md bg-[#1B628A] px-3 text-[10px] font-medium text-white transition hover:bg-[#164f70]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <div className="flex flex-wrap gap-2">
        <FilterPill href={SUBJECTS_BASE} label="Subject" />
        <FilterPill href={`${SUBJECTS_BASE}/classroom`} label="Classroom" />
        <FilterPill href={`${SUBJECTS_BASE}/assignment`} label="Assignment" />
        <FilterPill href={`${SUBJECTS_BASE}/examinations`} label="Examinations" />
        <FilterPill href={RECORDS_BASE} label="Records" />
        <FilterPill href={`${SUBJECTS_BASE}/attendance`} label="Attendance" />
        <FilterPill href={`${SUBJECTS_BASE}/timetable`} label="Timetable" />
        <FilterPill href={`${SUBJECTS_BASE}/library`} label="Library" />
      </div>

      <section className="space-y-1">
        <h2 className="text-[26px] leading-[1.1] font-semibold text-slate-900">Delete Student</h2>
      </section>

      <section className="max-w-[700px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="bg-[#EC6156] px-5 py-5 text-white">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/90">
              <AlertTriangle className="h-3 w-3" />
            </span>
            <div>
              <h3 className="text-[17px] font-semibold leading-none">Confirm Deletion</h3>
              <p className="mt-2 max-w-[480px] text-[11px] leading-[1.4] text-white/90">
                This action cannot be undone. All student data will be permanently removed from the system.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <h4 className="text-[11px] font-medium text-slate-800">Student Information</h4>

          <div className="rounded-lg bg-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1F658D] text-[16px] font-semibold text-white">
                {student.initials}
              </span>
              <div>
                <p className="text-[12px] font-medium text-slate-900">{student.name}</p>
                <p className="text-[10px] text-slate-500">{student.id}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-[10px] text-slate-500">Grade</p>
              <p className="mt-1 text-[11px] font-medium text-slate-900">{student.grade}</p>
            </div>
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-[10px] text-slate-500">Section</p>
              <p className="mt-1 text-[11px] font-medium text-slate-900">{student.section}</p>
            </div>
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-[10px] text-slate-500">Email</p>
              <p className="mt-1 text-[11px] font-medium text-slate-900">{student.email}</p>
            </div>
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-[10px] text-slate-500">Phone</p>
              <p className="mt-1 text-[11px] font-medium text-slate-900">{student.phone}</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#F4C394] bg-[#FFF8EF] px-4 py-3">
            <p className="flex items-center gap-2 text-[11px] font-semibold text-[#C96B1A]">
              <AlertTriangle className="h-3.5 w-3.5" />
              What will be deleted:
            </p>
            <ul className="mt-2 space-y-2 text-[11px] text-[#D58A3B]">
              <li className="flex items-center gap-2">
                <CircleDot className="h-3 w-3" />
                Student profile and personal information
              </li>
              <li className="flex items-center gap-2">
                <CircleDot className="h-3 w-3" />
                Academic records and GPA history
              </li>
              <li className="flex items-center gap-2">
                <CircleDot className="h-3 w-3" />
                Attendance records
              </li>
              <li className="flex items-center gap-2">
                <CircleDot className="h-3 w-3" />
                Library borrowing history
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row">
            <Link
              href={RECORDS_BASE}
              className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-md border border-[#2A7EAF] bg-white px-6 text-[11px] font-medium text-[#2A7EAF] transition hover:bg-sky-50"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-md bg-[#EC6156] px-6 text-[11px] font-medium text-white transition hover:bg-[#df574c]"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

