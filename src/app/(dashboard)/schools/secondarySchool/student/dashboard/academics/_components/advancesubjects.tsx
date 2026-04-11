"use client";
import React from "react";

interface Subject {
  name: string;
  teacher: string;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

const subjects: Subject[] = [
  { name: "Mathematics", teacher: "Mr. John Smith", present: 28, absent: 1, late: 0, percentage: 96.7 },
  { name: "Physics", teacher: "Mrs. Grace Okafor", present: 25, absent: 3, late: 1, percentage: 85.7 },
  { name: "Chemistry", teacher: "Mr. Emeka Nwosu", present: 23, absent: 3, late: 2, percentage: 82.1 },
  { name: "English", teacher: "Ms. Amara Chukwu", present: 27, absent: 1, late: 1, percentage: 93.1 },
  { name: "History", teacher: "Mr. Tunde Bello", present: 24, absent: 4, late: 1, percentage: 82.8 },
  { name: "Computer Science", teacher: "Mrs. Ngozi Eze", present: 26, absent: 2, late: 1, percentage: 89.7 },
];

const getBarColor = (pct: number) => {
  if (pct >= 90) return "bg-blue-500";
  if (pct >= 80) return "bg-orange-400";
  return "bg-red-400";
};

const getPercentColor = (pct: number) => {
  if (pct >= 90) return "text-blue-500";
  if (pct >= 80) return "text-orange-400";
  return "text-red-400";
};

const SubjectRow = ({ subject }: { subject: Subject }) => (
  <div className="py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center justify-between mb-2">
      <div>
        <p className="text-sm font-semibold text-gray-700">{subject.name}</p>
        <p className="text-[11px] text-gray-400">{subject.teacher}</p>
      </div>
      <div className="flex items-center gap-6 text-xs text-gray-500">
        <span>{subject.present} Present</span>
        <span>{subject.absent} Absent</span>
        <span>{subject.late} Late</span>
        <span className={`font-bold text-sm w-12 text-right ${getPercentColor(subject.percentage)}`}>
          {subject.percentage}%
        </span>
      </div>
    </div>
    {/* Progress bar */}
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${getBarColor(subject.percentage)}`}
        style={{ width: `${subject.percentage}%` }}
      />
    </div>
  </div>
);

export const AttendanceSubjects = () => {
  return (
    <div className="bg-white rounded-lg border border-blue-200 border-2 p-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Subject-wise Attendance</h3>
          <p className="text-[11px] text-gray-400">Breakdown of your attendance per subject</p>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 uppercase tracking-wide mt-3 mb-1 pr-0">
        <span>Subject</span>
        <div className="flex gap-6">
          <span>Present</span>
          <span>Absent</span>
          <span>Late</span>
          <span className="w-12 text-right">Rate</span>
        </div>
      </div>

      <div>
        {subjects.map((subject) => (
          <SubjectRow key={subject.name} subject={subject} />
        ))}
      </div>
    </div>
  );
};