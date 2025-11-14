"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  GraduationCap,
  UserRound,
  Clock,
  ClipboardList,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Library,
  Headset,
  LayoutDashboard,
  Users,
  MessageCircle,
  Calendar,
  Wallet,
  Search,
  IdCard,
  Headphones,
  CheckSquare,
  User,
  ChevronRight,
  Mail,
  LogOut,
  Bell,
} from "lucide-react";



type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
  hasArrow?: boolean;
  href: string;
};

function SidebarItem({ label, icon: Icon, hasArrow, href }: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const baseClasses =
    "group w-full flex items-center gap-3 rounded-xl px-3 text-left text-sm font-medium";
  const paddingClasses = isActive ? "py-3" : "py-2";
  const stateClasses = isActive
    ? "bg-[#2A7EAF] text-white"
    : "text-slate-600 hover:bg-slate-100 hover:text-sky-600";
  const iconClasses = isActive
    ? "text-white"
    : "text-slate-400 group-hover:text-sky-500";

  return (
    <Link href={href} className={`${baseClasses} ${paddingClasses} ${stateClasses}`}>
      <Icon className={`h-4 w-4 ${iconClasses}`} />
      <span className="flex-1">{label}</span>
      {hasArrow && (
        <ChevronRight
          className={`h-4 w-4 ${
            isActive ? "text-white" : "text-slate-400 group-hover:text-sky-500"
          }`}
        />
      )}
    </Link>
  );
}

/* ----------------------------- Highlight Card ---------------------------- */

type HighlightCardProps = {
  title: string;
  subject: string;
  time: string;
  bgColor: string; // e.g. "bg-[#D7FECC]"
  icon: ReactNode;
};

function HighlightCard({ title, subject, time, bgColor, icon }: HighlightCardProps) {
  return (
    <div className={`rounded-2xl shadow-sm ${bgColor} px-6 py-4`}>
      {/* top row: label + icon */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <div className="flex items-center justify-center flex-shrink-0">{icon}</div>
      </div>

      {/* bottom row: subject left, time right on SAME line */}
      <div className="mt-4 flex items-center">
        <p className="flex-1 text-sm font-semibold text-slate-900">{subject}</p>
        <p className="text-xs font-semibold text-slate-900 text-right whitespace-nowrap">
          {time}
        </p>
      </div>
    </div>
  );
}



export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#F5F7FB]">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-slate-200 px-6 pb-6">
        {/* Logo + text */}
        <div className="flex flex-col items-start leading-none">
          <Image
            src="/_assets/logo.png"
            alt="NetzerTech logo"
            width={160}
            height={48}
            className="w-40 h-auto block"
          />
          <span className="-mt-11 ml-6 text-[11px] font-medium text-slate-500">
            Student Dashboard
          </span>
        </div>

        {/* Nav items */}
        <nav className="mt-8 space-y-1">
          <SidebarItem
            label="Dashboard"
            icon={LayoutDashboard}
            href="/schools/secondarySchool/student/dashboard"
          />
          <SidebarItem
            label="Academics"
            icon={BookOpen}
            hasArrow
            href="/schools/secondarySchool/student/academics"
          />
          <SidebarItem
            label="Student Life"
            icon={Users}
            hasArrow
            href="/schools/secondarySchool/student/student-life"
          />
          <SidebarItem
            label="Forum"
            icon={MessageCircle}
            href="/schools/secondarySchool/student/forum"
          />
          <SidebarItem label="Club" icon={Users} href="/schools/secondarySchool/student/club" />
          <SidebarItem label="Event" icon={Calendar} href="/schools/secondarySchool/student/event" />
          <SidebarItem
            label="Finance"
            icon={Wallet}
            hasArrow
            href="/schools/secondarySchool/student/finance"
          />
          <SidebarItem
            label="School Fees"
            icon={Wallet}
            href="/schools/secondarySchool/student/school-fees"
          />
          <SidebarItem
            label="Student ID"
            icon={IdCard}
            href="/schools/secondarySchool/student/student-id"
          />
          <SidebarItem
            label="Support"
            icon={Headphones}
            hasArrow
            href="/schools/secondarySchool/student/support"
          />
          <SidebarItem
            label="Approval"
            icon={CheckSquare}
            href="/schools/secondarySchool/student/approval"
          />
          <SidebarItem
            label="Profile"
            icon={User}
            href="/schools/secondarySchool/student/profile"
          />
        </nav>

        {/* Logout button */}
        <button
          className="mt-auto mb-4 inline-flex w-[150px] items-center justify-center gap-2
                     rounded-md border border-sky-100 border-b-sky-200
                     bg-white px-5 py-2.5 text-xs font-medium text-[#135D96]
                     hover:bg-sky-50 active:translate-y-[1px]"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4">
          {/* Search */}
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

          {/* Actions + user */}
          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 cursor-pointer border border-none flex items-center justify-center">
              <Mail className="h-4 w-4 text-black" />
            </button>
            <button className="h-9 w-9 rounded-full bg-sky-50 hover:bg-sky-100 cursor-pointer border border-none flex items-center justify-center">
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

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome + highlight cards */}
          <section className="space-y-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Welcome, Daniel Dike</h1>
              <p className="mt-1 text-sm text-slate-500">Ready for another great day at school?</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Next Class */}
              <HighlightCard
                title="Next Class"
                subject="Mathematics"
                time="9AM - 11AM"
                bgColor="bg-[#D7FECC]"
                icon={
                  <div className="relative h-10 w-10">
                    <UserRound className="h-10 w-10 text-[#91F675] z-0" />
                    <div className="absolute right-1 -top-4 h-6 w-8 overflow-hidden z-10 flex items-center justify-center">
                      <GraduationCap className="h-9 w-9 translate-y-2" color="#91F675" fill="#91F675" />
                    </div>
                  </div>
                }
              />

              {/* Assignment Due */}
              <HighlightCard
                title="Assignment Due"
                subject="Biology"
                time="Due Today"
                bgColor="bg-[#BFE8FF]"
                icon={<ClipboardList className="h-8 w-8 text-[#1C89D9]" />}
              />

              {/* Upcoming Test */}
              <HighlightCard
                title="Upcoming Test"
                subject="English Test"
                time="9AM - 11AM"
                bgColor="bg-[#FFE3CE]"
                icon={
                  <div className="relative h-10 w-10">
                    <Calendar className="h-9 w-9 text-[#F97316]" />
                    <ArrowRight className="h-4 w-4 text-[#F97316] absolute -right-1 -bottom-1" />
                  </div>
                }
              />
            </div>
          </section>

          {/* Profile + Reminders */}
          <section className="grid gap-4 lg:grid-cols-[1.7fr_1.3fr]">
            {/* Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-base font-semibold text-slate-900">Profile</h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-300 overflow-hidden" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Daniel Dike</p>
                  <p className="text-xs text-slate-500">SS 2-Science Class</p>
                  <p className="text-xs text-slate-500">Student ID: ST20250012</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Academics Progress</span>
                  <span className="text-xs font-medium text-slate-900">75%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-3/4 bg-[#1C89D9]" />
                </div>
              </div>

              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-[#135D96] px-6 py-2.5 text-sm font-medium text-white cursor-pointer"
              >
                Edit Profile
              </Link>
            </div>

            {/* Reminders */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">Reminders</h2>
                  <Link href="/" className="text-xs font-medium text-[#135D96] cursor-pointer">
                    View all
                  </Link>
                </div>
                <p className="mt-1 text-xs text-slate-500">Stay on top of your upcoming tasks and events</p>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">Biology Assignment Due</p>
                    <p className="mt-1 text-xs text-slate-500">Assignment · Due Tomorrow</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    Pending
                  </span>
                </li>

                <li className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">Chemistry Project Due</p>
                    <p className="mt-1 text-xs text-slate-500">Project · Due Next Week</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-[#FF9F4A] bg-[#FFF3E5] text-[#F97316]">
                    In progress
                  </span>
                </li>

                <li className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">Science Fair Registration</p>
                    <p className="mt-1 text-xs text-slate-500">Event · Due in 2 days</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-[#F97373] bg-[#FFECEC] text-[#E02424]">
                    Action Needed
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Forum topics + Events */}
          <section className="grid gap-4 lg:grid-cols-2">
            {/* Forum topics */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h2 className="text-base font-semibold text-slate-900">Latest Forum Topics</h2>
              <p className="mt-1 text-xs text-slate-500">Latest Forum Topics</p>

              <div className="mt-4 space-y-3">
                {["Group Project A discussion", "Calculus", "Group Project B discussion"].map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between rounded-xl bg-[#EEF6FF] px-4 py-3"
                  >
                    <span className="text-sm text-slate-900">{topic}</span>
                    <button className="px-5 py-2 text-sm font-medium text-white bg-[#135D96] rounded-lg cursor-pointersecondarySchool/">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 h-full flex flex-col">
              <h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2>

              <div className="mt-3 flex-1 flex gap-3 overflow-x-auto pb-1">
                {/* SHE Initiative */}
                <div className="min-w-[180px] h-full rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="h-20 rounded-xl overflow-hidden mb-3">
                    <Image
                      src="/_assets/SHE.jpg"
                      alt="SHE Initiative"
                      width={320}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">SHE Initiative</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarClock className="h-3 w-3 text-black" />
                      Jul 10
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-black" />
                      2:00PM
                    </span>
                  </div>
                </div>

                {/* AI Intelligent Event */}
                <div className="min-w-[180px] h-full rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="h-20 rounded-xl overflow-hidden mb-3">
                    <Image
                      src="/_assets/AI.jpg"
                      alt="AI Intelligent Event"
                      width={320}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">AI Intelligent Event</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarClock className="h-3 w-3 text-black" />
                      Jul 12
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-black" />
                      2:00PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick access */}
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">Quick Access</h2>

            <div className="grid gap-4 md:grid-cols-4 text-sm">
              <Link
                href="/schools/secondarySchool/student/subjects"
                className="rounded-2xl bg-white border-none p-4 flex flex-col items-center justify-center hover:bg-slate-50 transition"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-none">
                  <BookOpen className="h-5 w-5 text-[#E48251]" />
                </div>
                <span className="font-medium text-slate-900">Subjects</span>
              </Link>

              <Link
                href="/schools/secondarySchool/student/timetable"
                className="rounded-2xl bg-white border-none p-4 flex flex-col items-center justify-center hover:bg-slate-50 transition"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-none">
                  <CalendarClock className="h-5 w-5 text-[#2E8BC0]" />
                </div>
                <span className="font-medium text-slate-900">Timetable</span>
              </Link>

              <Link
                href="/schools/secondarySchool/student/library"
                className="rounded-2xl bg-white border-none p-4 flex flex-col items-center justify-center hover:bg-slate-50 transition"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-none">
                  <Library className="h-5 w-5 text-[#72FC22]" />
                </div>
                <span className="font-medium text-slate-900">Library</span>
              </Link>

              <Link
                href="/schools/secondarySchool/student/support"
                className="rounded-2xl bg-white border-none p-4 flex flex-col items-center justify-center hover:bg-slate-50 transition"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-none">
                  <Headset className="h-5 w-5 text-[#FF77C6]" />
                </div>
                <span className="font-medium text-slate-900">Support</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
