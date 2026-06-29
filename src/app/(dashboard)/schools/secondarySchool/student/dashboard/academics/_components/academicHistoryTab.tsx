// app/academics/records/_components/academicHistoryTab.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import type { AcademicHistoryYear } from "@/types/academic-record";
import { GradePill, TabEmpty } from "./recordTabs";

export function AcademicHistoryTab({ years }: { years: AcademicHistoryYear[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(years[0]?.id ?? null);

  if (!years.length) {
    return <TabEmpty message="No academic history found yet." />;
  }

  return (
    <section className="space-y-3">
      {years.map((year) => {
        const expanded = expandedId === year.id;
        return (
          <div key={year.id} className="rounded-xl border border-slate-200">
            <button
              onClick={() => setExpandedId(expanded ? null : year.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Calendar className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{year.academicYear}</p>
                  <p className="text-xs text-slate-400">{year.gradeLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-sky-700">
                  GPA {year.termGpa.toFixed(1)}
                  <span className="ml-1 text-xs text-slate-400">Rank {year.classRank}</span>
                </p>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {expanded && (
              <div className="border-t border-slate-100 px-4 py-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                      <th className="py-1.5 font-medium">Subject</th>
                      <th className="py-1.5 font-medium">Credits</th>
                      <th className="py-1.5 font-medium">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {year.subjects.map((subject) => (
                      <tr key={subject.name} className="border-t border-slate-50">
                        <td className="py-2 text-slate-700">{subject.name}</td>
                        <td className="py-2 text-slate-500">{subject.credits} cr.</td>
                        <td className="py-2">
                          <GradePill grade={subject.grade} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}