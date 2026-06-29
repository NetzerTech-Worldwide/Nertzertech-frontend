"use client";
import React from "react";
import { BookOpen } from "lucide-react";

// Matches the subject card grid seen in screenshot Image 2
// Reuses the same visual design language as the Subject tab

type SubjectStatus = "completed" | "in-progress" | "not-started";

interface RoadmapSubject {
  id: string;
  name: string;
  duration: string;
  progress: number;
  status: SubjectStatus;
  color: string;
}

const SUBJECTS: RoadmapSubject[] = [
  { id: "s1", name: "Mathematics", duration: "24 Weeks", progress: 100, status: "completed", color: "bg-blue-400" },
  { id: "s2", name: "English Language", duration: "26 Weeks", progress: 65, status: "in-progress", color: "bg-purple-500" },
  { id: "s3", name: "Biology", duration: "28 Weeks", progress: 100, status: "not-started", color: "bg-cyan-400" },
  { id: "s4", name: "Further Mathematics", duration: "26 Weeks", progress: 100, status: "not-started", color: "bg-pink-500" },
  { id: "s5", name: "Physics", duration: "26 Weeks", progress: 65, status: "in-progress", color: "bg-green-500" },
  { id: "s6", name: "Chemistry", duration: "24 Weeks", progress: 100, status: "completed", color: "bg-blue-500" },
  { id: "s7", name: "Civic Education", duration: "26 Weeks", progress: 100, status: "not-started", color: "bg-sky-400" },
  { id: "s8", name: "Agriculture", duration: "26 Weeks", progress: 65, status: "in-progress", color: "bg-emerald-500" },
  { id: "s9", name: "Geography", duration: "24 Weeks", progress: 100, status: "completed", color: "bg-orange-500" },
];

const STATUS_CONFIG: Record<SubjectStatus, { label: string; color: string }> = {
  completed: { label: "Completed", color: "text-green-600" },
  "in-progress": { label: "In Progress", color: "text-orange-500" },
  "not-started": { label: "Not Started", color: "text-gray-400" },
};

export const LearningRoadmap: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-800">Your Learning Roadmap</h2>
          <span className="text-xs bg-[#216388]/10 text-[#216388] font-semibold px-2 py-0.5 rounded-full">
            First Term
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Your structured learning path across all subjects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map((subject) => {
          const status = STATUS_CONFIG[subject.status];
          return (
            <div
              key={subject.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Illustration placeholder */}
              <div className={`${subject.color} h-36 flex items-center justify-center`}>
                <BookOpen className="w-10 h-10 text-white/60" />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-sm font-semibold text-gray-800">{subject.name}</h3>
                  <span className={`text-xs font-semibold flex-shrink-0 ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Duration · {subject.duration}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Progress</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        subject.status === "completed" ? "bg-green-500" :
                        subject.status === "in-progress" ? "bg-orange-400" : "bg-gray-300"
                      }`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{subject.progress}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};