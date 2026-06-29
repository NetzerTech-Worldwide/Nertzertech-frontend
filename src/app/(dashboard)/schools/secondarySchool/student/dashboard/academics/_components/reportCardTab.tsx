// app/academics/records/_components/reportCardsTab.tsx
"use client";

import { useState } from "react";
import type { ReportCardDetail } from "@/types/academic-record";
import { GradePill, TabEmpty } from "./recordTabs";

function statusTone(status: string) {
  if (status.toLowerCase() === "outstanding") return "text-violet-600";
  if (status.toLowerCase() === "excellent") return "text-emerald-600";
  return "text-slate-500";
}

export function ReportCardsTab({ cards }: { cards: ReportCardDetail[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(cards[0]?.id ?? null);
  const selected = cards.find((card) => card.id === selectedId) ?? cards[0];

  if (!cards.length) {
    return <TabEmpty message="No report cards published yet." />;
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* Left: term list */}
      <div className="space-y-2">
        {cards.map((card) => {
          const active = card.id === selected?.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedId(card.id)}
              className={`w-full rounded-xl border px-3.5 py-3 text-left transition ${
                active
                  ? "border-sky-300 bg-sky-50/60"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{card.termLabel}</p>
                  <p className="text-xs text-slate-400">{card.dateLabel}</p>
                  <p className="mt-1 text-xs font-medium text-sky-700">
                    GPA {card.gpa.toFixed(1)}
                    <span className="ml-1 text-slate-400">| {card.classRank}</span>
                  </p>
                </div>
                <span className={`text-xs font-medium ${statusTone(card.status)}`}>
                  {card.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: selected detail */}
      {selected && (
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{selected.termLabel}</p>
              <p className="text-xs text-slate-400">{selected.dateLabel}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
              GPA {selected.gpa.toFixed(1)}
            </span>
          </div>

          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 font-medium">Subject</th>
                <th className="py-1.5 font-medium">Score</th>
                <th className="py-1.5 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {selected.subjects.map((row) => (
                <tr key={row.name} className="border-t border-slate-100">
                  <td className="py-2 text-slate-700">{row.name}</td>
                  <td className="py-2 text-slate-500">{row.score}%</td>
                  <td className="py-2">
                    <GradePill grade={row.grade} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 rounded-lg bg-slate-50 px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
              Teacher&apos;s Comment
            </p>
            <p className="mt-1 text-sm italic text-slate-600">&ldquo;{selected.teacherComment}&rdquo;</p>
          </div>
        </div>
      )}
    </section>
  );
}