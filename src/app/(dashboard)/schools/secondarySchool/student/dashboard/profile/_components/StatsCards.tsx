// components/profile/sections/StatCards.tsx
import type { StudentProfile } from "../profileData";
import { CheckCircle2, Book, Medal  } from "lucide-react";
import { PiMedalMilitary, PiTrophyLight } from "react-icons/pi";

interface Props {
  profile: StudentProfile;
}

export default function StatCards({ profile }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* Overall GPA */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex flex-row-reverse items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Overall GPA</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{profile.overallGpa}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Book className="text-[#2A8AE8] font-bold w-5 h-5"/>
        </div>
      </div>

      {/* Attendance */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between flex-row-reverse shadow-sm">
        <div>
          <p className="text-xs text-gray-400">Attendance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{profile.attendance}%</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      </div>

      {/* Completed Credits */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between flex-row-reverse shadow-sm">
        <div>
          <p className="text-xs text-gray-400">Completed Credits</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {profile.completedCredits}{" "}
            <span className="text-base font-medium text-gray-400">/ {profile.totalCredits}</span>
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          <PiMedalMilitary className='text-[#E86C2E] w-5 h-5'/>
        </div>
      </div>

      {/* Class Rank */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between flex-row-reverse shadow-sm">
        <div>
          <p className="text-xs text-gray-400">Class Rank</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            #{profile.classRank}{" "}
            <span className="text-xs font-normal text-gray-400">out of {profile.classTotal}</span>
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <PiTrophyLight className='text-[#8A38F5] w-5 h-5 font-bold'/>
        </div>
      </div>
    </div>
  );
}
