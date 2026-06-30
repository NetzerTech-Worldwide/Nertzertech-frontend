"use client";

import { useEffect, useState } from "react";
import type { StudentProfileResponse } from "@/types/profile";
import { fetchStudentProfile } from "../../../../endpoints/profile";
import {
  feeBreakdown,
  feeStatus,
  recentActivity,
  sessionDevices,
  studentProfile,
  type StudentProfile,
} from "../profileData";
import HeroBanner from "./HeroBanner";
import StatCards from "./StatsCards";
import AcademicSummary from "./AcademicSummary";
import FeeStatusCard from "./feestatus";
import AccountSecurity from "./AccountSecurity";
import RecentActivity from "./recentActivity";

function calculateAge(dateOfBirth: string | null) {
  if (!dateOfBirth) return studentProfile.age;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return studentProfile.age;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function mapBackendProfile(profile: StudentProfileResponse): StudentProfile {
  const attendance = profile.metrics.attendancePercentage ?? 0;
  const averageGrade = profile.metrics.averageGrade ?? 0;

  return {
    ...studentProfile,
    name: profile.personalInfo.fullName || studentProfile.name,
    age: calculateAge(profile.personalInfo.dateOfBirth),
    mother:
      profile.guardianInfo.relationship?.toLowerCase() === "mother"
        ? profile.guardianInfo.fullName || studentProfile.mother
        : studentProfile.mother,
    father:
      profile.guardianInfo.relationship?.toLowerCase() === "father"
        ? profile.guardianInfo.fullName || studentProfile.father
        : studentProfile.father,
    studentId: profile.personalInfo.studentId || studentProfile.studentId,
    overallGpa: averageGrade,
    attendance,
    completedCredits: profile.metrics.totalClasses ?? 0,
    totalCredits: Math.max(profile.metrics.totalClasses ?? 0, studentProfile.totalCredits),
    currentTermGpa: averageGrade,
    performanceProgress: Math.min(Math.max(attendance, 0), 100),
  };
}

export default function ProfileClient() {
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProfile() {
    setLoading(true);
    setError("");

    try {
      const data = await fetchStudentProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProfile();
  }, []);

  const displayProfile = profile ? mapBackendProfile(profile) : studentProfile;

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
        {loading ? (
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
            Loading profile...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6">
            <p className="text-sm font-medium text-red-700">Unable to load profile.</p>
            <p className="mt-1 text-xs text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => void loadProfile()}
              className="mt-4 rounded-lg bg-[#2A7EAF] px-4 py-2 text-sm font-medium text-white hover:bg-[#216388]"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <HeroBanner profile={displayProfile} />
            <StatCards profile={displayProfile} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AcademicSummary profile={displayProfile} />
              <FeeStatusCard fee={feeStatus} breakdown={feeBreakdown} />
            </div>

            <AccountSecurity devices={sessionDevices} />
            <RecentActivity activity={recentActivity} />
          </>
        )}
      </div>
    </div>
  );
}
