"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Bell, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import StudentSidebar, { StudentSidebarToggle } from "./student-sidebar";
import { getCurrentUserProfile, getStoredAuthUser, getStoredToken } from "@/lib/netzertech-api";

const DASHBOARD = "/schools/secondarySchool/student/dashboard";

function normalize(path: string) {
  const trimmed = path.replace(/\/+$/g, "");
  return trimmed.length ? trimmed : "/";
}

type HeaderUser = {
  fullName: string;
  gradeLabel: string;
  profilePicture: string | null;
};

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function pickString(source: Record<string, unknown> | null, keys: string[]) {
  if (!source) return null;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function toHeaderUser(source: Record<string, unknown> | null): HeaderUser | null {
  if (!source) return null;

  const nestedUser = asObject(source.user);
  const profile = asObject(source.profile);
  const root = source;

  const fullName =
    pickString(profile, ["fullName", "name"]) ||
    pickString(nestedUser, ["fullName", "name"]) ||
    pickString(root, ["fullName", "name"]);

  const gradeLabel =
    pickString(profile, ["grade", "className", "classLevel"]) ||
    pickString(nestedUser, ["grade", "className", "classLevel"]) ||
    pickString(root, ["grade", "className", "classLevel"]) ||
    "SS 2";

  const profilePicture =
    pickString(profile, ["profilePicture", "avatar", "photoUrl"]) ||
    pickString(nestedUser, ["profilePicture", "avatar", "photoUrl"]) ||
    pickString(root, ["profilePicture", "avatar", "photoUrl"]);

  if (!fullName) return null;

  return {
    fullName,
    gradeLabel,
    profilePicture: profilePicture || null,
  };
}

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = normalize(usePathname() ?? "/");
  const showTopbar = pathname === normalize(DASHBOARD);
  const [headerUser, setHeaderUser] = useState<HeaderUser>({
    fullName: "Daniel Dike",
    gradeLabel: "SS 2",
    profilePicture: null,
  });

  useEffect(() => {
    const stored = toHeaderUser(getStoredAuthUser());
    if (stored) {
      setHeaderUser(stored);
    }

    const token = getStoredToken();
    if (!token) return;

    let mounted = true;
    getCurrentUserProfile(token)
      .then((profileResponse) => {
        if (!mounted) return;
        const mapped = toHeaderUser(profileResponse);
        if (mapped) {
          setHeaderUser(mapped);
        }
      })
      .catch(() => {
        // Keep currently available user details if profile request fails.
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#EDF2F6] md:pl-56 lg:pl-64">
      <StudentSidebar />
      <StudentSidebarToggle />

      <div className="min-h-screen flex flex-col">
        {showTopbar && (
          <header className="bg-[#2A7EAF] px-4 py-3.5 sm:px-5 md:px-8">
            <div className="flex items-center justify-between">
              <h2 className="pl-10 text-xl font-semibold text-white md:pl-0 md:text-[1.65rem]">Dashboard</h2>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="hidden items-center gap-2 sm:flex">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                    <Mail className="h-4 w-4" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                    <Bell className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/30 bg-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={headerUser.profilePicture || "/_assets/teacherportal.png"} alt={`${headerUser.fullName} profile photo`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-white">{headerUser.fullName}</p>
                    <p className="text-xs text-white/90">{headerUser.gradeLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className={`flex-1 space-y-6 overflow-x-hidden px-4 pb-12 sm:px-5 md:px-6 ${showTopbar ? "pt-6" : "pt-16 md:pt-6"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
