// components/profile/sections/HeroBanner.tsx
import Image from "next/image";
import type { StudentProfile } from "../profileData";

interface Props {
  profile: StudentProfile;
}

export default function HeroBanner({ profile }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-t from-[#216388] to-[#5ABEF6] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 overflow-hidden shrink-0">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="120px"
        />
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white break-words">
          {profile.name}
        </h2>

        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-8 text-sm sm:text-base lg:text-[20px] text-white/80">
          <span>
            School:{" "}
            <span className="font-bold text-white">
              {profile.school}
            </span>
          </span>

          <span>
            Age:{" "}
            <span className="font-bold text-white">
              {profile.age} Years
            </span>
          </span>

          <span>
            Class Teacher:{" "}
            <span className="font-bold text-white">
              {profile.classTeacher}
            </span>
          </span>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-8 text-xs sm:text-sm text-white/80">
          <span>
            Mother:{" "}
            <span className="font-bold text-white">
              {profile.mother}
            </span>
          </span>

          <span>
            Father:{" "}
            <span className="font-bold text-white">
              {profile.father}
            </span>
          </span>

          <span>
            Student ID:{" "}
            <span className="font-bold text-white">
              {profile.studentId}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}