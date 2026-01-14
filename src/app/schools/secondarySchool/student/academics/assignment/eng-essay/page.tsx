"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle, Search } from "lucide-react";

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

function StatusBadge() {
  return <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">Submitted</span>;
}

const submissionText = [
  "Discipline plays a crucial role in shaping students' academic success and personal development in schools. It creates an environment conducive to learning, promotes respect among students and teachers, and helps students develop self-control and responsibility.",
  "Firstly, discipline in schools establishes clear boundaries and expectations for behavior. When students understand what is expected of them, they feel more secure and focused on their studies. This structured environment minimizes distractions and allows both teachers and students to concentrate on the educational process.",
  "Moreover, discipline teaches students valuable life skills such as time management, punctuality, and respect for authority. These qualities are essential not only for academic success but also for future professional and personal relationships. Students who learn discipline early in life are better prepared to face challenges and responsibilities in their adult years.",
  "However, discipline should not be confused with punishment or strict authoritarianism. Effective discipline involves positive reinforcement, clear communication, and understanding. Teachers and administrators must balance firmness with compassion, recognizing that each student is unique and may require different approaches.",
  "In conclusion, discipline is fundamental to creating a productive learning environment in schools. It helps students develop essential character traits, promotes academic excellence, and prepares them for success beyond the classroom. When implemented thoughtfully and consistently, discipline becomes a tool for empowerment rather than restriction.",
];

export default function ViewSubmissionPage() {
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">English Essay</h2>
            <p className="text-sm text-slate-600">English</p>
          </div>
          <StatusBadge />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
          <div>
            <p className="font-semibold">Submitted Successfully</p>
            <p className="mt-1">You have already submitted this assignment. Your teacher will review it soon.</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Your Submission</h3>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm">
            {submissionText.map((p, idx) => (
              <p key={idx} className={idx ? "mt-3" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
          <h4 className="text-base font-semibold text-amber-800">Waiting for Feedback</h4>
          <p className="mt-1 text-sm text-amber-800">
            Your teacher will review your submission and provide feedback. Here's what you can expect:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium text-amber-800">
            <li>Detailed comments on your work</li>
            <li>Your final grade and score</li>
            <li>Suggestions for improvement</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
