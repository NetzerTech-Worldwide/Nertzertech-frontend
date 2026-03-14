import React from "react";
import { CheckCircle } from "lucide-react";

export const TodaysStatus = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Today's Status</h3>

      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-gray-700">Present</p>
          <p className="text-[11px] text-gray-400">On time today</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Check-in time</span>
          <span className="font-semibold text-gray-700">08:02 AM</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Check-out time</span>
          <span className="font-semibold text-gray-700">03:30 PM</span>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-blue-500 cursor-pointer hover:underline">
        Current streak: last 5 days →
      </div>
    </div>
  );
};