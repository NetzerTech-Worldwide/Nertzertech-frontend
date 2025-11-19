import type { ReactNode } from "react";
import Image from "next/image";
import { Bell, Mail, Search } from "lucide-react";
import StudentSidebar from "./student-sidebar";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FB] md:pl-64 lg:pl-72">
      <StudentSidebar />

      {/* Right side */}
      <div className="min-h-screen flex flex-col">
        {/* Top bar shown on all pages */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
              <input
                type="text"
                placeholder="Search anything here"
                className="flex-1 bg-transparent text-sm text-slate-500 placeholder:text-slate-400 outline-none"
              />
              <Search className="h-5 w-5 text-[#135D96]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center">
              <Mail className="h-4 w-4 text-black" />
            </button>
            <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center">
              <Bell className="h-4 w-4 text-black" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">Daniel Dike</span>
                <span className="text-xs text-slate-500">SS 2</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-300" />
            </div>
          </div>
        </header>

        {/* Page content swaps here */}
        <main className="flex-1 p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
