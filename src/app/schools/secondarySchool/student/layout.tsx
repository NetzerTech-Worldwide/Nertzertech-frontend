"use client";

import type { ReactNode } from "react";
import { Bell, Mail, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import StudentSidebar, { StudentSidebarToggle } from "./student-sidebar";

const DASHBOARD = "/schools/secondarySchool/student/dashboard";

function normalize(p: string) {
  const t = p.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = normalize(usePathname() ?? "/");
  const showTopbar = pathname === normalize(DASHBOARD); // only on dashboard

  return (
    <div className="relative min-h-screen bg-[#F5F7FB] md:pl-64 lg:pl-72">
      <StudentSidebar />
      <StudentSidebarToggle />

      <div className="min-h-screen flex flex-col">
        {/* Top bar — shown only on the dashboard */}
        {showTopbar && (
          <header className="bg-white border-b border-slate-200 px-4 py-4 sm:px-5 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="w-full md:max-w-md">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Search anything here"
                    className="flex-1 bg-transparent text-sm text-slate-500 placeholder:text-slate-400 outline-none"
                  />
                  <Search className="h-5 w-5 text-[#135D96]" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-start">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-black" />
                  </button>
                  <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-black" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900">Daniel Dike</span>
                    <span className="text-xs text-slate-500">SS 2</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-300" />
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 space-y-6 px-4 pb-12 pt-16 sm:px-5 md:px-6 md:pt-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
