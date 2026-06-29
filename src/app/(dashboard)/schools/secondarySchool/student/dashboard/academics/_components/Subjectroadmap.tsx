"use client";

import { ArrowLeft, CalendarDays, GraduationCap, Loader2 } from "lucide-react";
import type { AcademicRoadmapDetail } from "@/types/academic";

type SubjectRoadmapProps = {
  subjectName: string;
  roadmap: AcademicRoadmapDetail | null;
  loading?: boolean;
  error?: string;
  onBack: () => void;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function statusStyles(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("complete")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (normalized.includes("progress")) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

export function SubjectRoadmap({
  subjectName,
  roadmap,
  loading = false,
  error,
  onBack,
}: SubjectRoadmapProps) {
  const progress = Math.max(0, Math.min(roadmap?.overallProgress ?? 0, 100));

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[13px] text-[#2A7EAF] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Go back
      </button>

      {loading ? (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin text-[#2A7EAF]" />
          Loading roadmap...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-700">
          {error}
        </div>
      ) : roadmap ? (
        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{roadmap.subject}</h2>
                <p className="mt-1 text-sm text-slate-500">Subject roadmap</p>
              </div>

              <span className="inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {progress}% Complete
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">Overall Progress</span>
                <span className="font-semibold text-slate-900">{progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-[#2A7EAF]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {roadmap.milestones.length ? (
            <div className="space-y-3">
              {roadmap.milestones.map((milestone) => (
                <article
                  key={`${milestone.sessionYear}-${milestone.term}-${milestone.level}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {milestone.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {milestone.sessionYear} · {milestone.term}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles(
                        milestone.status
                      )}`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <GraduationCap className="h-4 w-4 text-[#2A7EAF]" />
                      <p className="mt-3 text-xs text-slate-500">Level</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {milestone.level.toUpperCase()}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <CalendarDays className="h-4 w-4 text-[#2A7EAF]" />
                      <p className="mt-3 text-xs text-slate-500">Start Date</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatDate(milestone.startDate)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <CalendarDays className="h-4 w-4 text-[#2A7EAF]" />
                      <p className="mt-3 text-xs text-slate-500">End Date</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatDate(milestone.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-600">Grade</span>
                      <span className="font-semibold text-slate-900">{milestone.grade}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${Math.max(0, Math.min(milestone.grade, 100))}%` }}
                      />
                    </div>
                  </div>

                  {milestone.modules.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-700">Modules</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {milestone.modules.map((module, index) => (
                          <span
                            key={`${module}-${index}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
              No milestones found for {roadmap.subject}.
            </div>
          )}
        </section>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
          No roadmap found for {subjectName}.
        </div>
      )}
    </div>
  );
}
