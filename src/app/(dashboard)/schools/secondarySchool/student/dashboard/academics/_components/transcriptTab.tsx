// app/academics/records/_components/transcriptTab.tsx
"use client";

import type { TranscriptData } from "@/types/academic-record";
import { GradePill } from "./recordTabs";

export function TranscriptTab({ data }: { data: TranscriptData }) {
  const { student } = data;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Official Transcript</h3>
        <p className="text-xs text-slate-500">Cumulative academic record</p>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:grid-cols-4">
        <div>
          <p className="text-slate-400">Student Name</p>
          <p className="mt-0.5 font-medium text-slate-900">{student.fullName}</p>
        </div>
        <div>
          <p className="text-slate-400">Student ID</p>
          <p className="mt-0.5 font-medium text-slate-900">{student.studentId}</p>
        </div>
        <div>
          <p className="text-slate-400">Current Grade</p>
          <p className="mt-0.5 font-medium text-slate-900">{student.currentGrade}</p>
        </div>
        <div>
          <p className="text-slate-400">Cumulative GPA</p>
          <p className="mt-0.5 font-medium text-sky-700">{student.cumulativeGpa.toFixed(1)}</p>
        </div>
      </div>

      <div className="space-y-5">
        {data.terms.map((term) => (
          <div
            key={term.id}
            className={
              term.isCurrent
                ? "rounded-xl border-2 border-dashed border-sky-300 p-3"
                : ""
            }
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                  <th colSpan={5} className="pb-2 font-semibold text-slate-600">
                    {term.label}
                  </th>
                </tr>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-1.5 font-medium">Subject</th>
                  <th className="py-1.5 font-medium">Teacher</th>
                  <th className="py-1.5 font-medium">Credits</th>
                  <th className="py-1.5 font-medium">Score</th>
                  <th className="py-1.5 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {term.subjects.map((row) => (
                  <tr key={row.name} className="border-t border-slate-100">
                    <td className="py-2 text-slate-700">{row.name}</td>
                    <td className="py-2 text-slate-500">{row.teacher}</td>
                    <td className="py-2 text-slate-500">{row.credits}</td>
                    <td className="py-2 text-slate-500">{row.score}%</td>
                    <td className="py-2">
                      <GradePill grade={row.grade} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!term.isCurrent && term.termGpa && (
              <p className="mt-2 text-right text-xs font-medium text-sky-700">
                Term GPA {term.termGpa.toFixed(1)}
                {term.classRank && (
                  <span className="ml-1 text-slate-400">| Rank {term.classRank}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}