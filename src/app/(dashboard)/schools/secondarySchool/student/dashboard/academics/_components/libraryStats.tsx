"use client";
import React from "react";
import { Grid2X2 } from "lucide-react";

export const LibraryStats = () => {
  const booksRead = 0;
  const goal = 20;
  const progress = Math.min((booksRead / goal) * 100, 100);

  return (
    <div
      className="relative rounded-xl overflow-hidden text-white p-5 md:p-6"
      style={{ background: "linear-gradient(to right, #216388, #5ABEF6)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(255,255,255,.3) 30px,rgba(255,255,255,.3) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(255,255,255,.3) 30px,rgba(255,255,255,.3) 31px)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-blue-100 mb-1">2026 Reading Goal</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            {booksRead} of {goal} books read
          </h2>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-1.5 mt-3 mb-2 max-w-md">
            <div
              className="bg-white rounded-full h-1.5 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-blue-100">
            {goal - booksRead} more books to reach your goal — keep it up!
          </p>
        </div>

        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0">
          <Grid2X2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};