"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbulb, Lock } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
import AcademicsPageHeader from "../_components/academicsPageHeader";

type RoadmapItem = {
  id: number;
  title: string;
  duration: string;
  status: "completed" | "in-progress" | "locked";
  progress: number;
};

const ROADMAP: RoadmapItem[] = [
  { id: 1, title: "Mathematics", duration: "2 Weeks", status: "completed", progress: 100 },
  { id: 2, title: "English Language", duration: "3 Weeks", status: "completed", progress: 100 },
  { id: 3, title: "Physic", duration: "4 Weeks", status: "in-progress", progress: 52 },
  { id: 4, title: "Biology Practical", duration: "5 Weeks", status: "locked", progress: 0 },
];


function StatusChip({ status }: { status: RoadmapItem["status"] }) {
  if (status === "completed") {
    return <span className="rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-[10px]">Completed</span>;
  }
  if (status === "in-progress") {
    return <span className="rounded-full bg-sky-100 text-sky-700 px-2.5 py-0.5 text-[10px]">In Progress</span>;
  }
  return <span className="rounded-full bg-slate-200 text-slate-700 px-2.5 py-0.5 text-[10px]">Locked</span>;
}

function StageChips() {
  const chip = (t: string) => (
    <span key={t} className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] text-slate-700">
      {t}
    </span>
  );
  return <div className="mt-2 flex flex-wrap gap-2">{["Foundation", "Intermediate", "Advance"].map(chip)}</div>;
}

function ProgressBar({ value, status }: { value: number; status: RoadmapItem["status"] }) {
  const barColor = status === "completed" ? "bg-sky-500" : status === "in-progress" ? "bg-orange-500" : "bg-slate-300";

  return (
    <div className="mt-2 min-w-0">
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
        <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function LeftBadge({ id, status }: { id: number; status: RoadmapItem["status"] }) {
  if (status === "completed" && id <= 2) {
    return (
      <span className="mr-3 grid h-9 w-9 place-items-center rounded-full bg-emerald-50">
        <Lightbulb className="h-4 w-4 text-emerald-600" />
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span className="mr-3 grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-slate-600">
        <Lock className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="mr-3 grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
      {id}
    </span>
  );
}

function RoadmapRow({ item }: { item: RoadmapItem }) {
  const rowBg = item.status === "completed" ? "bg-emerald-50" : item.status === "in-progress" ? "bg-sky-50" : "bg-slate-50";

  return (
    <div className={`rounded-xl border border-slate-200 ${rowBg} px-4 py-4`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-1 min-w-0 items-start gap-3">
          <LeftBadge id={item.id} status={item.status} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="text-[11px] text-slate-500">Duration · {item.duration}</p>

            <ProgressBar value={item.progress} status={item.status} />
            <StageChips />
          </div>
        </div>

        <StatusChip status={item.status} />
      </div>
    </div>
  );
}

export default function ClassroomPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="px-4 pt-0 pb-6 space-y-5 sm:px-5 md:px-6">
      <AcademicsPageHeader
        title="Subjects"
        subtitle="Access your learning materials and track progress"
        searchValue={query}
        onSearchChange={setQuery}
      />
      <AcademicsNavigation />

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-900">Learning Roadmap</h2>
          <p className="text-xs text-slate-500">Your structured learning path across all subjects</p>
        </div>

        <div className="space-y-4">
          {ROADMAP.map((item) => (
            <RoadmapRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
