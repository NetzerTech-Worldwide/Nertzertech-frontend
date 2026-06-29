// app/profile/page.tsx

import {
  studentProfile,
  feeStatus,
  feeBreakdown,
  recentActivity,
  sessionDevices,
} from "./profileData";

import HeroBanner from "./_components/HeroBanner";
import StatCards from "./_components/StatsCards";
import AcademicSummary from "./_components/AcademicSummary";
import FeeStatusCard from "./_components/feestatus";
import AccountSecurity from "./_components/AccountSecurity";
import RecentActivity from "./_components/recentActivity";

export const metadata = {
  title: "Profile | Student Overview",
};

export default function ProfilePage() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Profile</h1>
          <p className="text-xs text-gray-400">Student Overview</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search anything here"
            className="pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <HeroBanner profile={studentProfile} />
        <StatCards profile={studentProfile} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AcademicSummary profile={studentProfile} />
          <FeeStatusCard
            fee={feeStatus}
            breakdown={feeBreakdown}
          />
        </div>

        <AccountSecurity devices={sessionDevices} />
        <RecentActivity activity={recentActivity} />
      </div>
    </div>
  );
}
