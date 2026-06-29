// app/academics/records/_components/recordHeader.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { RecordStudent } from "@/types/academic-record";

export function RecordHeader({
  student,
  classLabel,
}: {
  student: RecordStudent;
  classLabel: string;
}) {
  const initials = student.fullName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-3">
      <Link
        href="/academics"
        className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-teal-800"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-800 text-sm font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{student.fullName}</p>
          <p className="text-xs text-slate-500">
            Student ID: {student.studentId}
            <span className="mx-1.5">·</span>
            {classLabel}
            <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              Enrolled
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}