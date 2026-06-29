// components/profile/sections/AcademicSummary.tsx
import type { StudentProfile } from "../profileData";
import { ArrowRight } from "lucide-react";

interface Props {
  profile: StudentProfile;
}

export default function AcademicSummary({ profile }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 h-full flex flex-col shadow-sm">
      <h3 className="text-[28px] font-semibold text-gray-900 mb-4">Academic Summary</h3>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div>
          <p className="text-xs text-gray-400">Current Term GPA</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{profile.currentTermGpa}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Percentile</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{profile.percentile}th %</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Class Rank</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{profile.classRankDisplay}</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-gray-500">Performance Progress</p>
          <p className="text-xs font-semibold text-gray-700">{profile.performanceProgress}%</p>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2E8BC0] rounded-full"
            style={{ width: `${profile.performanceProgress}%` }}
          />
        </div>
      </div>

      <button className="mt-auto w-full flex items-center justify-center gap-2 text-sm text-[#2E8BC0] font-medium border border-[#2A7EAF] rounded-lg py-2.5 hover:bg-gray-50 hover:cursor-pointer transition-colors">
        View Full Academic Records
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
