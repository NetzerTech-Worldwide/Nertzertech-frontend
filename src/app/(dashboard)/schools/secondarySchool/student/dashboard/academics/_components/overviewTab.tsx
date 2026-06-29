// app/academics/records/_components/overviewTab.tsx
"use client";

import { Fragment, useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import type { AcademicRecordOverview, RecordSubject } from "@/types/academic-record";
import { GradePill } from "./recordTabs";

function AttendanceBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-700"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function SubjectDetailCard({ subject }: { subject: RecordSubject }) {
  const { detail } = subject;
  const cells = [
    { label: "Midterm Score", value: `${detail.midtermScore} / ${detail.midtermTotal}` },
    { label: "Final Score", value: `${detail.finalScore} / ${detail.finalTotal}` },
    { label: "Assignments", value: `${detail.assignmentsCompleted}/${detail.assignmentsTotal} completed` },
    { label: "Quizzes", value: `${detail.quizzesPassed}/${detail.quizzesTotal} passed` },
  ];
  return (
    <tr>
      <td colSpan={5} className="bg-slate-50 px-4 py-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cells.map((cell) => (
            <div key={cell.label} className="rounded-xl bg-white px-3 py-2.5 text-center">
              <p className="text-[11px] text-slate-500">{cell.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{cell.value}</p>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

export function OverviewTab({ data }: { data: AcademicRecordOverview }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900">Subject Performance</h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-2 font-medium">Subject</th>
              <th className="px-4 py-2 font-medium">Teacher</th>
              <th className="px-4 py-2 font-medium">GPA</th>
              <th className="px-4 py-2 font-medium">Attendance</th>
              <th className="px-4 py-2 font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.map((subject) => {
              const expanded = expandedId === subject.id;
              return (
                <Fragment key={subject.id}>
                  <tr
                    onClick={() => setExpandedId(expanded ? null : subject.id)}
                    className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{subject.name}</p>
                      <p className="text-xs text-slate-400">{subject.credits} Credits</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{subject.teacher}</td>
                    <td className="px-4 py-3 text-slate-600">{subject.gpa.toFixed(1)}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <AttendanceBar percentage={subject.attendancePercentage} />
                        <span>{subject.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <GradePill grade={subject.grade} />
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </td>
                  </tr>
                  {expanded && <SubjectDetailCard subject={subject} />}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-sky-50/70 px-4 py-3 text-xs text-sky-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p>Keep track of your academic progress across subjects.</p>
          <p className="text-sky-700/80">
            You can review your past performance by visiting the Academic History tab above.
          </p>
        </div>
      </div>
    </section>
  );
}