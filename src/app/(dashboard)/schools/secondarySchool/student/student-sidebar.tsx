"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, BookOpen, GraduationCap, MessageSquare, Users,
  Trophy, Headphones, CheckSquare, User, Menu, ChevronRight, LogOut, X
} from "lucide-react";

const BASE = "/schools/secondarySchool/student/dashboard";

type Item = { label: string; href: string; icon: LucideIcon; hasArrow?: boolean };

export const NAV: Item[] = [
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

function normalize(path: string) {
  const t = path.replace(/\/+$/g, "");
  return t.length ? t : "/";
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = normalize(usePathname() ?? "/");
  return (
    <nav className="space-y-2">
      {NAV.map(({ label, href, icon: Icon, hasArrow }) => {
        const target = normalize(href);
        const active = pathname === target || pathname.startsWith(target + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={[
              "group flex items-center gap-3 rounded-xl px-3",
              active ? "py-3 bg-white text-[#175F89] shadow-sm"
                     : "py-2 text-white/90 hover:bg-white/10",
            ].join(" ")}
          >
            <Icon className={`h-4 w-4 ${active ? "text-[#175F89]" : "text-white/80 group-hover:text-white"}`} />
            <span className="flex-1 text-sm font-medium">{label}</span>
            {hasArrow && (
              <ChevronRight className={`h-4 w-4 ${active ? "text-[#175F89]" : "text-white/70 group-hover:text-white"}`} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

/* ---------- Desktop sidebar (md+) ---------- */
export default function StudentSidebar() {
  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 w-56 lg:w-64 bg-[#2A7EAF]">
      <div className="flex h-full flex-col">
        <div className="px-5 lg:px-6 pt-4 pb-3">
          <Image src="/_assets/brand-logo.png" alt="NetzerTech" width={340} height={102} className="h-35 w-auto object-contain" priority />
        </div>

        <div className=" -mt-13 flex-1 px-5 lg:px-6 pb-4">
          <div className="flex h-full flex-col gap-4">
            <SidebarNav />
            <div className="mt-auto pt-2">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-medium text-[#135D96] hover:bg-sky-50">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Mobile trigger + drawer (<md) ---------- */
export function StudentSidebarToggle() {
  const [open, setOpen] = useState(false);
  const drawerId = "student-sidebar-drawer";

  return (
    <>
      <button
        type="button"
        aria-controls={drawerId}
        aria-expanded={open}
        aria-label="Open student navigation"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2A7EAF] text-white shadow-lg shadow-sky-900/20 transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/70 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <StudentSidebarMobile id={drawerId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/* ---------- Mobile drawer (<md) ---------- */
export function StudentSidebarMobile({
  open,
  onClose,
  id = "student-sidebar-drawer",
}: {
  open: boolean;
  onClose: () => void;
  id?: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ease-out md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div
        id={id}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2A7EAF] shadow-xl transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden
        ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        style={{ paddingTop: "max(2.5rem, env(safe-area-inset-top))", paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex h-full flex-col px-4 pb-2">
          <div className="flex items-center justify-between pb-3">
            <Image src="/_assets/brand-logo.png" alt="NetzerTech" width={320} height={96} className="h-35 w-auto object-contain" priority />
            <button onClick={onClose} className="p-2 rounded-md hover:bg-white/10 shrink-0">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="-mt-13 flex-1 flex flex-col gap-3 pt-1">
            <SidebarNav onNavigate={onClose} />
            <div className="mt-auto pt-1 pb-1">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-medium text-[#135D96] hover:bg-sky-50">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
