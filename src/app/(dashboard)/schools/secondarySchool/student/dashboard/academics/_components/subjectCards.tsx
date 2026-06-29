"use client";

import { BookOpen, ChevronRight, LucideIcon } from "lucide-react";
import Image from "next/image";

// ─── StatCard ─────────────────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: string | number;
  Icon: LucideIcon;
};

export function StatCard({
  label,
  value,
  Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {value}
          </p>
        </div>

        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50">
          <Icon className="h-5 w-5 text-sky-600" />
        </span>
      </div>
    </div>
  );
}

// ─── SubjectCard ──────────────────────────────────────────────────────────────

export type SimpleSubject = {
  id: string;
  name: string;
  teacher: string;
  registered: boolean;
  img?: string;
};

type SubjectCardProps = {
  s: SimpleSubject;
  onRoadmap?: (subjectId: string) => void;
};

export function SubjectCard({ s, onRoadmap }: SubjectCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-40 w-full overflow-hidden bg-slate-100">
        {s.img ? (
          <Image
            src={s.img}
            alt={s.name}
            width={640}
            height={320}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-slate-400" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-slate-900">
              {s.name}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {s.teacher}
            </p>
          </div>

          <span
            className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              s.registered
                ? "border border-sky-100 bg-sky-50 text-sky-700"
                : "border border-amber-200 bg-amber-50 text-amber-600"
            }`}
          >
            {s.registered ? "Registered" : "Not Registered"}
          </span>
        </div>

        <button
          onClick={() => onRoadmap?.(s.id)}
          className="mt-3 inline-flex items-center gap-1 rounded-md bg-sky-800 px-3 py-2 text-[12px] font-medium text-white hover:bg-sky-900"
        >
          Learning Roadmap
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}