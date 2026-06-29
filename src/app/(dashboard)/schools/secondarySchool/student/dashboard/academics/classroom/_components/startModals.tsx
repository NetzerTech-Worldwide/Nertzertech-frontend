"use client";
import React from "react";
import { UserX } from "lucide-react";

// ─── Leaving Class Modal ──────────────────────────────────────────────────────
interface LeaveClassModalProps {
  onLeave: () => void;
  onStay: () => void;
}

export const LeaveClassModal: React.FC<LeaveClassModalProps> = ({ onLeave, onStay }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center gap-5">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-red-300 flex items-center justify-center">
          <UserX className="w-6 h-6 text-red-400" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800">Leaving Class?</h2>
        <p className="text-sm text-gray-500 mt-1">
          You're about to leave this class and you may miss ongoing activities.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onLeave}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Leave Class
        </button>
        <button
          onClick={onStay}
          className="flex-1 py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Stay in Class
        </button>
      </div>
    </div>
  </div>
);

// ─── Class Ended Modal ────────────────────────────────────────────────────────
interface ClassEndedModalProps {
  onLater: () => void;
  onStartAssignment: () => void;
}

export const ClassEndedModal: React.FC<ClassEndedModalProps> = ({ onLater, onStartAssignment }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center gap-5">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-red-300 flex items-center justify-center">
          <UserX className="w-6 h-6 text-red-400" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800">Class ended</h2>
        <p className="text-sm text-gray-500 mt-1">Your mathematics class has ended</p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onLater}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Later
        </button>
        <button
          onClick={onStartAssignment}
          className="flex-1 py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Start Assignment
        </button>
      </div>
    </div>
  </div>
);

// ─── Assignment Completed Modal ───────────────────────────────────────────────
interface AssignmentCompleteModalProps {
  onNextClass: () => void;
  onDashboard: () => void;
}

export const AssignmentCompleteModal: React.FC<AssignmentCompleteModalProps> = ({
  onNextClass,
  onDashboard,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center gap-5">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-[#216388] flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#216388]/40 scale-125"
          style={{ animation: "spin 8s linear infinite" }}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800">Assignment Completed</h2>
        <p className="text-sm text-gray-500 mt-1">
          You're about to leave this class and you may now relax ongoing activities.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onNextClass}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Next Class
        </button>
        <button
          onClick={onDashboard}
          className="flex-1 py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>

    <style>{`@keyframes spin { from { transform: scale(1.25) rotate(0deg); } to { transform: scale(1.25) rotate(360deg); } }`}</style>
  </div>
);