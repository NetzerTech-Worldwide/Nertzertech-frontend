"use client";
import React from "react";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { ASSIGNMENT_META } from "../demoData";

interface StartAssignmentProps {
  onBack: () => void;
  onStart: () => void;
}

export const StartAssignment: React.FC<StartAssignmentProps> = ({ onBack, onStart }) => {
  const meta = ASSIGNMENT_META;

  return (
    <div className="flex flex-col gap-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to class
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Start your Assignment</h1>
      </div>

      {/* Assignment Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{meta.title}</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Related class: Live Class on {meta.title.split(" - ")[1] ?? meta.title}
              </p>
            </div>
          </div>
        </div>

        {/* Time limit */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Time Limit</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-500">Due: {meta.dueDate}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5 ml-5">{meta.durationMinutes} Mins</p>
          </div>
          <button
            onClick={onStart}
            className="px-5 py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Start Assignment
          </button>
        </div>
      </div>

      {/* Teacher Instructions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Teacher Instructions</h3>
        <p className="text-sm text-gray-500 mb-3">
          Solve the following {ASSIGNMENT_META.instructions.length} questions on Calculus Integration Technique
        </p>
        <div className="flex flex-col gap-2.5">
          {meta.instructions.map((instruction, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{instruction}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};