"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, BookOpen, GraduationCap, MessageSquare, Users,
  Trophy, Headphones, CheckSquare, User, ChevronRight, LogOut,
} from "lucide-react";

const BASE = "/schools/secondarySchool/student";

type Item = { label: string; href: string; icon: LucideIcon; hasArrow?: boolean };

const NAV: Item[] = [
  { label: "Dashboard",    href: `${BASE}/dashboard`,    icon: LayoutDashboard },
  { label: "Academics",    href: `${BASE}/academics`,    icon: BookOpen,      hasArrow: true },
  { label: "Student Life", href: `${BASE}/student-life`, icon: GraduationCap, hasArrow: true },
  { label: "Forum",        href: `${BASE}/forum`,        icon: MessageSquare },
  { label: "Club",         href: `${BASE}/club`,         icon: Users },
  { label: "Event",        href: `${BASE}/event`,        icon: Trophy },
  { label: "Support",      href: `${BASE}/support`,      icon: Headphones,    hasArrow: true },
  { label: "Approval",     href: `${BASE}/approval`,     icon: CheckSquare },
  { label: "Profile",      href: `${BASE}/profile`,      icon: User },
];

function normalize(s: string) {
  const t = s.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

export default function StudentSidebar() {
  const pathname = normalize(usePathname() ?? "/");

  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 w-64 lg:w-72 bg-white border-r border-slate-200">
      <div className="flex h-full flex-col">
        {/* scrollable area */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
          <div className="-mt-11 flex flex-col items-start leading-none">
            <Image src="/_assets/logo.png" alt="NetzerTech logo" width={160} height={48} className="w-40 h-auto" />
            <span className="-mt-11 ml-6 text-[11px] font-medium text-slate-500">Student Dashboard</span>
          </div>

          <nav className="mt-6 space-y-1">
            {NAV.map(({ label, href, icon: Icon, hasArrow }) => {
              const target = normalize(href);
              const isActive = pathname === target || pathname.startsWith(target + "/");

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group w-full flex items-center gap-3 rounded-xl px-3 text-sm font-medium
                    ${isActive ? "py-3 bg-[#2A7EAF] text-white" : "py-2 text-slate-600 hover:bg-slate-100 hover:text-sky-600"}`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-sky-500"}`} />
                  <span className="flex-1">{label}</span>
                  {hasArrow && (
                    <ChevronRight className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-sky-500"}`} />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* pinned footer */}
        <div className="px-6 pb-6 pt-2 border-t border-slate-100">
          <button
            className="inline-flex w-[150px] items-center justify-center gap-2
                       rounded-md border border-sky-100 border-b-sky-200
                       bg-white px-5 py-2.5 text-xs font-medium text-[#135D96]
                       hover:bg-sky-50 active:translate-y-[1px]"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
