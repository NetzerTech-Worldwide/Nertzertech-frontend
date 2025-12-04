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

const BASE = "/schools/secondarySchool/student";

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
    <nav className="-mt-8 space-y-1">
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
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 pt-6 pb-4">
          <div className="-mt-15 flex items-start">
            <Image
              src="/_assets/Logo.png"
              alt="NetzerTech"
              width={160}
              height={48}
              className="h-auto w-40 max-w-full"
            />
          </div>
          <SidebarNav />
        </div>

        <div className="px-6 pb-6 pt-2">
          <button className="inline-flex w-[150px] items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-xs font-medium text-[#135D96] hover:bg-sky-50">
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
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
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <Image src="/_assets/Logo.png" alt="NetzerTech" width={140} height={40} />
          <button onClick={onClose} className="p-2 rounded-md hover:bg-white/10">
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="px-4 pb-6">
          <SidebarNav onNavigate={onClose} />
        </div>
      </div>
    </>
  );
}
