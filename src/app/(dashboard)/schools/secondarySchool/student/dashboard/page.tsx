import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { BookOpen, CalendarClock, Clock, Headphones, Library } from "lucide-react";
import { BASE_URL } from "@/app/utils/config";
import type { DashboardSummaryItem, StudentDashboard } from "@/types/studentDashboard";

type HighlightCardProps = {
  title: string;
  subject: string;
  time: string;
  bgColor: string;
  icon: ReactNode;
};

function HighlightCard({ title, subject, time, bgColor, icon }: HighlightCardProps) {
  return (
    <div className={`rounded-2xl shadow-sm ${bgColor} px-6 py-4`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <div className="flex items-center justify-center shrink-0">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <p className="flex-1 text-sm font-semibold text-slate-900">{subject}</p>
        <p className="text-xs font-semibold text-slate-900 whitespace-nowrap">{time}</p>
      </div>
    </div>
  );
}

async function getStudentDashboard(): Promise<StudentDashboard | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/dashboard/secondary-student`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function itemTitle(item: DashboardSummaryItem | null | undefined, fallback: string) {
  return item?.subject || item?.title || item?.name || fallback;
}

function itemMeta(item: DashboardSummaryItem | null | undefined, fallback: string) {
  return item?.time || item?.date || item?.description || fallback;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
      {message}
    </div>
  );
}

export default async function DashboardPage() {
  const dashboard = await getStudentDashboard();
  const profile = dashboard?.profile;
  const progress = dashboard?.academicProgress;
  const nextActivity = dashboard?.classActivities?.[0];
  const upcomingTest = dashboard?.upcomingTests?.[0];
  const progressPercentage = Math.max(0, Math.min(progress?.progressPercentage ?? 0, 100));

  return (
    <>
      <section className="space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            Welcome, {profile?.fullName || "Student"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">Ready for another great day at school?</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <HighlightCard
            title="Next Class"
            subject={itemTitle(dashboard?.nextClass, "No class scheduled")}
            time={itemMeta(dashboard?.nextClass, "Today")}
            bgColor="bg-[#D7FECC]"
            icon={<Image src="/_assets/Vector.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
          <HighlightCard
            title="Class Activity"
            subject={itemTitle(nextActivity, "No activity due")}
            time={itemMeta(nextActivity, "All caught up")}
            bgColor="bg-[#BFE8FF]"
            icon={<Image src="/_assets/Vector1.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
          <HighlightCard
            title="Upcoming Test"
            subject={itemTitle(upcomingTest, "No test scheduled")}
            time={itemMeta(upcomingTest, "Keep studying")}
            bgColor="bg-[#FFE3CE]"
            icon={<Image src="/_assets/Vector2.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.7fr_1.3fr]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          <div className="mt-5 flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-full bg-slate-200 bg-cover bg-center"
              style={profile?.profilePicture ? { backgroundImage: `url(${profile.profilePicture})` } : undefined}
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{profile?.fullName || "Student"}</p>
              <p className="text-xs text-slate-500">{profile?.grade || "Grade not available"}</p>
              <p className="text-xs text-slate-500">Student ID: {profile?.studentId || "Unavailable"}</p>
              {profile?.school ? <p className="text-xs text-slate-500">{profile.school}</p> : null}
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">Academic Progress</span>
              <span className="text-xs font-medium text-slate-900">{progressPercentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-[#1C89D9]" style={{ width: `${progressPercentage}%` }} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
              <span>GPA: <strong className="text-slate-900">{progress?.gpa || "N/A"}</strong></span>
              <span>Credits: <strong className="text-slate-900">{progress?.completedCredits ?? 0}/{progress?.totalCredits ?? 0}</strong></span>
            </div>
          </div>
          <Link href="/schools/secondarySchool/student/dashboard/profile" className="mt-8 inline-flex items-center justify-center rounded-md bg-[#135D96] px-6 py-2.5 text-sm font-medium text-white">
            View Profile
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">Reminders</h2>
              <Link href="/schools/secondarySchool/student/dashboard/event" className="text-xs font-medium text-[#135D96]">View all</Link>
            </div>
            <p className="mt-1 text-xs text-slate-500">Stay on top of your upcoming tasks and events</p>
          </div>

          {dashboard?.reminders?.length ? (
            <ul className="space-y-4 text-sm">
              {dashboard.reminders.slice(0, 3).map((reminder, index) => (
                <li key={`${itemTitle(reminder, "Reminder")}-${index}`} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{itemTitle(reminder, "Reminder")}</p>
                    <p className="mt-1 text-xs text-slate-500">{itemMeta(reminder, "No details provided")}</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    {reminder.status || "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No reminders yet." />
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 items-start w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 w-full">
          <h2 className="text-base font-semibold text-slate-900">Latest Forum Topics</h2>
          <p className="mt-1 text-xs text-slate-500">Recent discussions from your school community</p>
          <div className="mt-4 space-y-3">
            {dashboard?.latestForumTopics?.length ? (
              dashboard.latestForumTopics.slice(0, 3).map((topic, index) => (
                <div key={`${itemTitle(topic, "Topic")}-${index}`} className="flex items-center justify-between rounded-xl bg-[#EEF6FF] px-4 py-3">
                  <span className="text-sm text-slate-900">{itemTitle(topic, "Forum topic")}</span>
                  <Link href="/schools/secondarySchool/student/dashboard/forum" className="px-5 py-2 text-sm font-medium text-white bg-[#135D96] rounded-lg">Join</Link>
                </div>
              ))
            ) : (
              <EmptyState message="No forum topics yet." />
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 h-full flex flex-col w-full">
          <h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {dashboard?.upcomingEvents?.length ? (
              dashboard.upcomingEvents.slice(0, 2).map((event, index) => (
                <div key={`${itemTitle(event, "Event")}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 flex flex-col h-full">
                  <div className="h-20 rounded-xl overflow-hidden mb-3 bg-slate-200">
                    <Image src={index % 2 === 0 ? "/_assets/SHE.jpg" : "/_assets/AI.jpg"} alt="" width={320} height={80} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{itemTitle(event, "School event")}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3 text-black" />{event.date || "Date TBA"}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-black" />{event.time || "Time TBA"}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="sm:col-span-2">
                <EmptyState message="No upcoming events yet." />
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 mb-3">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
          <Link href="/schools/secondarySchool/student/dashboard/academics" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <BookOpen className="h-5 w-5 text-[#E48251]" />
            </div>
            <span className="font-medium text-slate-900">Academics</span>
          </Link>
          <Link href="/schools/secondarySchool/student/dashboard/academics/timetable" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <CalendarClock className="h-5 w-5 text-[#2E8BC0]" />
            </div>
            <span className="font-medium text-slate-900">Timetable</span>
          </Link>
          <Link href="/schools/secondarySchool/student/dashboard/academics/library" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <Library className="h-5 w-5 text-[#72FC22]" />
            </div>
            <span className="font-medium text-slate-900">Library</span>
          </Link>
          <Link href="/schools/secondarySchool/student/dashboard/support" className="rounded-2xl bg-white p-4 flex flex-col items-center justify-center hover:bg-slate-50">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full">
              <Headphones className="h-5 w-5 text-[#FF77C6]" />
            </div>
            <span className="font-medium text-slate-900">Support</span>
          </Link>
        </div>
      </section>
    </>
  );
}
