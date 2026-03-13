import Image from "next/image";
import type { ReactNode } from "react";
import { BookOpen, CalendarClock, Clock, Library, Headphones } from "lucide-react";

type HighlightCardProps = { title: string; subject: string; time: string; bgColor: string; icon: ReactNode };

function HighlightCard({ title, subject, time, bgColor, icon }: HighlightCardProps) {
  return (
    <div className={`rounded-2xl shadow-sm ${bgColor} px-6 py-4`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <div className="flex items-center justify-center flex-shrink-0">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <p className="flex-1 text-sm font-semibold text-slate-900">{subject}</p>
        <p className="text-xs font-semibold text-slate-900 whitespace-nowrap">{time}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      {/* Welcome + highlight cards */}
      <section className="space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Welcome, Daniel Dike</h1>
          <p className="mt-1 text-sm text-slate-500">Ready for another great day at school?</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <HighlightCard
            title="Next Class"
            subject="Mathematics"
            time="9AM - 11AM"
            bgColor="bg-[#D7FECC]"
            icon={<Image src="/_assets/Vector.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
          <HighlightCard
            title="Assignment Due"
            subject="Biology"
            time="Due Today"
            bgColor="bg-[#BFE8FF]"
            icon={<Image src="/_assets/Vector1.png" alt="Assignment due" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
          <HighlightCard
            title="Upcoming Test"
            subject="English Test"
            time="9AM - 11AM"
            bgColor="bg-[#FFE3CE]"
            icon={<Image src="/_assets/Vector2.png" alt="Upcoming test" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
        </div>
      </section>

      {/* Profile + Reminders */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.7fr_1.3fr]">
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
          <a href="#" className="mt-8 inline-flex items-center justify-center rounded-md bg-[#135D96] px-6 py-2.5 text-sm font-medium text-white">
            Edit Profile
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">Reminders</h2>
              <a href="#" className="text-xs font-medium text-[#135D96]">View all</a>
            </div>
            <p className="mt-1 text-xs text-slate-500">Stay on top of your upcoming tasks and events</p>
          </div>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">Biology Assignment Due</p>
                <p className="mt-1 text-xs text-slate-500">Assignment due tomorrow</p>
              </div>
              <span className="text-[10px] px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">Pending</span>
            </li>
            <li className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">Chemistry Project Due</p>
                <p className="mt-1 text-xs text-slate-500">Project due next week</p>
              </div>
              <span className="text-[10px] px-3 py-1 rounded-full border border-[#FF9F4A] bg-[#FFF3E5] text-[#F97316]">In progress</span>
            </li>
            <li className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">Science Fair Registration</p>
                <p className="mt-1 text-xs text-slate-500">Event happening in 2 days</p>
              </div>
              <span className="text-[10px] px-3 py-1 rounded-full border border-[#F97373] bg-[#FFECEC] text-[#E02424]">Action Needed</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Forum + Events */}
      <section className="grid gap-4 md:grid-cols-2 items-start w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 w-full">
          <h2 className="text-base font-semibold text-slate-900">Latest Forum Topics</h2>
          <p className="mt-1 text-xs text-slate-500">Latest Forum Topics</p>
          <div className="mt-4 space-y-3">
            {["Group Project A discussion", "Calculus", "Group Project B discussion"].map((topic) => (
              <div key={topic} className="flex items-center justify-between rounded-xl bg-[#EEF6FF] px-4 py-3">
                <span className="text-sm text-slate-900">{topic}</span>
                <button className="px-5 py-2 text-sm font-medium text-white bg-[#135D96] rounded-lg">Join</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 h-full flex flex-col w-full">
          <h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 flex flex-col h-full">
              <div className="h-20 rounded-xl overflow-hidden mb-3">
                <Image src="/_assets/SHE.jpg" alt="SHE Initiative" width={320} height={80} className="h-full w-full object-cover" />
              </div>
              <p className="text-sm font-semibold text-slate-900">SHE Initiative</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3 text-black" />Jul 10</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-black" />2:00PM</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 flex flex-col h-full">
              <div className="h-20 rounded-xl overflow-hidden mb-3">
                <Image src="/_assets/AI.jpg" alt="AI Intelligent Event" width={320} height={80} className="h-full w-full object-cover" />
              </div>
              <p className="text-sm font-semibold text-slate-900">AI Intelligent Event</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3 text-black" />Jul 12</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-black" />2:00PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section>
        <h2 className="text-base font-semibold text-slate-900 mb-3">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
          <a href="/schools/secondarySchool/student/subjects" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <BookOpen className="h-5 w-5 text-[#E48251]" />
            </div>
            <span className="font-medium text-slate-900">Subjects</span>
          </a>
          <a href="/schools/secondarySchool/student/timetable" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <CalendarClock className="h-5 w-5 text-[#2E8BC0]" />
            </div>
            <span className="font-medium text-slate-900">Timetable</span>
          </a>
          <a href="/schools/secondarySchool/student/library" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <Library className="h-5 w-5 text-[#72FC22]" />
            </div>
            <span className="font-medium text-slate-900">Library</span>
          </a>
          <a href="/schools/secondarySchool/student/support" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <Headphones className="h-5 w-5 text-[#FF77C6]" />
            </div>
            <span className="font-medium text-slate-900">Support</span>
          </a>
        </div>
      </section>
    </>
  );
}
