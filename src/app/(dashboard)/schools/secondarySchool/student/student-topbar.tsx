"use client";

import { Bell, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../../../../lib/context/authContext";

const DASHBOARD = "/schools/secondarySchool/student/dashboard";

function normalize(p: string) {
  const t = p.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

export default function StudentTopbar() {
  const { user } = useAuth();
  const pathname = normalize(usePathname() ?? "/");

  if (pathname !== normalize(DASHBOARD)) return null;

  return (
    <header className="bg-[#216388] border-b border-slate-200 px-4 py-4 sm:px-5 md:px-6">
     <div className="flex items-center justify-end gap-4">
        {/* Title — hidden on mobile, visible md+ */}
        <h4 className="hidden md:block text-white text-[30px] font-bold">
          Student Dashboard
        </h4>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-4 md:ml-auto">
          {/* Icons — hidden on mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <button className="h-9 w-9 rounded-full bg-[#2A7EAF80] hover:bg-sky-100 flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </button>
            <button className="h-9 w-9 rounded-full bg-[#2A7EAF80] hover:bg-sky-100 flex items-center justify-center">
              <Bell className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* User info — always visible */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white">{user?.fullName}</span>
              <span className="text-xs text-white/70">{user?.grade}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </header>
  );
}