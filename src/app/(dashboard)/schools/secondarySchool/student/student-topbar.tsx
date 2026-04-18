"use client";

import { Bell, Mail, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const DASHBOARD = "/school/secondarySchool/student/dashboard";

function normalize(p: string) {
  const t = p.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

export default function StudentTopbar() {
  const pathname = normalize(usePathname() ?? "/");

  if (pathname !== normalize(DASHBOARD)) return null;

  return (
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
  );
}