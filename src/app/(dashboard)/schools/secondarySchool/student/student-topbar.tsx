"use client";

import { Bell, Mail, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const DASHBOARD = "/schools/secondarySchool/student/dashboard";

function normalize(p: string) {
  const t = p.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

export default function StudentTopbar() {
  const pathname = normalize(usePathname() ?? "/");

  if (pathname !== normalize(DASHBOARD)) return null;

  return (
    <header className="bg-[#216388] border-b border-slate-200 px-4 py-4 sm:px-5 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h4 className='text-white text-[30px] font-bold'>Student Dashboard</h4>
       

        <div className="flex items-center justify-between gap-4 md:justify-start">
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="h-9 w-9 rounded-full bg-[#2A7EAF80] hover:bg-sky-100 flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </button>
            <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center">
              <Bell className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white">Daniel Dike</span>
              <span className="text-xs text-white">SS 2</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </header>
  );
}