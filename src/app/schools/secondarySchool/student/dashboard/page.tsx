"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { CalendarClock, Clock } from "lucide-react";
import {
  type EventDto,
  type ReminderDto,
  type SecondaryStudentDashboardDto,
  getSecondaryStudentDashboard,
  getStoredToken,
} from "@/lib/netzertech-api";

type HighlightCardProps = {
  title: string;
  subject: string;
  time: string;
  bgColor: string;
  icon: ReactNode;
};

const FALLBACK_DASHBOARD: SecondaryStudentDashboardDto = {
  profile: {
    fullName: "Daniel Dike",
    studentId: "ST20250012",
    grade: "SS 2-Science Class",
    school: "NetzerTech Secondary School",
    email: "daniel@example.com",
    profilePicture: null,
  },
  nextClass: {
    id: "next-1",
    title: "Mathematics",
    subject: "Mathematics",
    startTime: "2026-03-04T09:00:00.000Z",
    endTime: "2026-03-04T11:00:00.000Z",
    location: "Classroom A",
  },
  classActivities: [
    {
      id: "act-1",
      title: "Biology Assignment",
      subject: "Biology",
      dueDate: "2026-03-05T09:00:00.000Z",
      totalPoints: 100,
    },
  ],
  upcomingTests: [
    {
      id: "test-1",
      title: "English Test",
      subject: "English Test",
      testDate: "2026-03-06T09:00:00.000Z",
      totalPoints: 100,
    },
  ],
  academicProgress: {
    gpa: 3.5,
    grades: null,
    totalCredits: 40,
    completedCredits: 30,
    progressPercentage: 75,
  },
  reminders: [
    {
      id: "rem-1",
      title: "Biology Assignment Due",
      description: "Assignment",
      dueDate: "2026-03-05T09:00:00.000Z",
      isImportant: false,
      type: "Assignment",
      status: "pending",
    },
    {
      id: "rem-2",
      title: "Chemistry Project Due",
      description: "Project",
      dueDate: "2026-03-11T09:00:00.000Z",
      isImportant: false,
      type: "Project",
      status: "in_progress",
    },
    {
      id: "rem-3",
      title: "Science Fair Registration",
      description: "Event",
      dueDate: "2026-03-06T09:00:00.000Z",
      isImportant: true,
      type: "Event",
      status: "action_needed",
    },
  ],
  latestForumTopics: [
    {
      id: "topic-1",
      title: "Group Project A discussion",
      content: "",
      views: 0,
      replies: 0,
      createdAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "topic-2",
      title: "Calculus",
      content: "",
      views: 0,
      replies: 0,
      createdAt: "2026-03-02T00:00:00.000Z",
    },
    {
      id: "topic-3",
      title: "Group Project A discussion",
      content: "",
      views: 0,
      replies: 0,
      createdAt: "2026-03-03T00:00:00.000Z",
    },
  ],
  upcomingEvents: [
    {
      id: "ev-1",
      title: "SHE Intiative",
      description: "SHE Intiative Event",
      eventDate: "2026-07-10T14:00:00.000Z",
      location: null,
      image: "/_assets/SHE.jpg",
    },
    {
      id: "ev-2",
      title: "AI Intelligent Event",
      description: "AI Event",
      eventDate: "2026-07-12T14:00:00.000Z",
      location: null,
      image: "/_assets/AI.jpg",
    },
  ],
};

function formatTimeOnly(dateString: string) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return "";
  return value
    .toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
    .replace(" ", "")
    .toUpperCase();
}

function formatTimeRange(start: string, end: string) {
  const startTime = formatTimeOnly(start);
  const endTime = formatTimeOnly(end);
  if (!startTime || !endTime) return "TBA";
  return `${startTime} -${endTime}`;
}

function formatShortDate(dateString: string) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return "TBA";
  return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatEventDate(dateString: string) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return "tba";
  return value
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toLowerCase();
}

function formatEventTime(dateString: string) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return "TBA";
  return value
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(" ", "")
    .toUpperCase();
}

function formatReminderSubtitle(reminder: ReminderDto) {
  const dueDate = new Date(reminder.dueDate);
  if (Number.isNaN(dueDate.getTime())) return reminder.description ?? "No due date";

  const now = new Date();
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dueMidnight = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()).getTime();
  const dayDiff = Math.round((dueMidnight - nowMidnight) / 86_400_000);

  const dueText =
    dayDiff === 0 ? "Due Today" : dayDiff === 1 ? "Due Tomorrow" : dayDiff > 1 ? `Due in ${dayDiff} days` : `Due ${formatShortDate(reminder.dueDate)}`;

  const prefix = reminder.description?.trim();
  return prefix ? `${prefix} . ${dueText}` : dueText;
}

function toDisplayStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function reminderStatusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress")) return "border-[#FF9F4A] bg-[#FFF3E5] text-[#F97316]";
  if (normalized.includes("action") || normalized.includes("urgent") || normalized.includes("late")) {
    return "border-[#F97373] bg-[#FFECEC] text-[#E02424]";
  }
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function HighlightCard({ title, subject, time, bgColor, icon }: HighlightCardProps) {
  return (
    <div className={`rounded-2xl border border-[#E3E9EF] shadow-sm ${bgColor} px-6 py-4`}>
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

function EventImage({ event }: { event: EventDto }) {
  const src = event.image || "/_assets/SHE.jpg";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={event.title} className="h-full w-full object-cover" loading="lazy" />;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<SecondaryStudentDashboardDto>(FALLBACK_DASHBOARD);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;

    let mounted = true;
    getSecondaryStudentDashboard(token)
      .then((data) => {
        if (!mounted) return;
        setDashboardData({
          ...FALLBACK_DASHBOARD,
          ...data,
          classActivities: data.classActivities ?? [],
          upcomingTests: data.upcomingTests ?? [],
          reminders: data.reminders ?? [],
          latestForumTopics: data.latestForumTopics ?? [],
          upcomingEvents: data.upcomingEvents ?? [],
        });
      })
      .catch((error) => {
        if (!mounted) return;
        const message = error instanceof Error ? error.message : "Unable to load dashboard data";
        setLoadError(message);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const nextClass = dashboardData.nextClass ?? FALLBACK_DASHBOARD.nextClass;
  const nextActivity = dashboardData.classActivities[0] ?? FALLBACK_DASHBOARD.classActivities[0];
  const nextTest = dashboardData.upcomingTests[0] ?? FALLBACK_DASHBOARD.upcomingTests[0];
  const progress = Math.max(0, Math.min(100, Math.round(dashboardData.academicProgress?.progressPercentage ?? 75)));

  const reminders = useMemo(() => {
    const source = dashboardData.reminders.length ? dashboardData.reminders : FALLBACK_DASHBOARD.reminders;
    return source.slice(0, 3);
  }, [dashboardData.reminders]);

  const forumTopics = useMemo(() => {
    const source = dashboardData.latestForumTopics.length ? dashboardData.latestForumTopics : FALLBACK_DASHBOARD.latestForumTopics;
    return source.slice(0, 3);
  }, [dashboardData.latestForumTopics]);

  const events = useMemo(() => {
    const source = dashboardData.upcomingEvents.length ? dashboardData.upcomingEvents : FALLBACK_DASHBOARD.upcomingEvents;
    return source.slice(0, 2);
  }, [dashboardData.upcomingEvents]);

  return (
    <>
      <section className="space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Welcome, {dashboardData.profile.fullName}</h1>
          <p className="mt-1 text-sm text-slate-500">Ready for another great day at school?</p>
          {loadError && <p className="mt-1 text-xs text-amber-600">Live dashboard data unavailable. Showing fallback data.</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <HighlightCard
            title="Next Class"
            subject={nextClass?.subject || nextClass?.title || "No class scheduled"}
            time={nextClass ? formatTimeRange(nextClass.startTime, nextClass.endTime) : "TBA"}
            bgColor="bg-[#DFF3DC]"
            icon={<Image src="/_assets/Vector.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" priority />}
          />
          <HighlightCard
            title="Assignment Due"
            subject={nextActivity?.subject || nextActivity?.title || "No assignment"}
            time={nextActivity ? formatShortDate(nextActivity.dueDate) : "TBA"}
            bgColor="bg-[#DDECF7]"
            icon={<Image src="/_assets/Vector1.png" alt="Assignment due" width={32} height={32} className="h-8 w-8 object-contain" priority />}
          />
          <HighlightCard
            title="Upcoming Test"
            subject={nextTest?.subject || nextTest?.title || "No test"}
            time={nextTest ? formatShortDate(nextTest.testDate) : "TBA"}
            bgColor="bg-[#F4ECE8]"
            icon={<Image src="/_assets/Vector2.png" alt="Upcoming test" width={32} height={32} className="h-8 w-8 object-contain" priority />}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.7fr_1.3fr]">
        <div className="bg-white rounded-2xl shadow-sm border border-[#DEE6EE] p-6">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          <div className="mt-5 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-300 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dashboardData.profile.profilePicture || "/_assets/teacherportal.png"}
                alt={`${dashboardData.profile.fullName} profile photo`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{dashboardData.profile.fullName}</p>
              <p className="text-xs text-slate-500">{dashboardData.profile.grade || "Secondary Student"}</p>
              <p className="text-xs text-slate-500">Student ID: {dashboardData.profile.studentId}</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">Academics Progress</span>
              <span className="text-xs font-medium text-slate-900">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-[#1C89D9]" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button className="mt-8 inline-flex items-center justify-center rounded-md bg-[#135D96] px-6 py-2.5 text-sm font-medium text-white">
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#DEE6EE] p-5">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">Reminders</h2>
              <a href="#" className="text-xs font-medium text-[#135D96]">
                View all
              </a>
            </div>
            <p className="mt-1 text-xs text-slate-500">Stay on top of your upcoming tasks and events</p>
          </div>

          <ul className="space-y-4 text-sm">
            {reminders.map((reminder) => (
              <li key={reminder.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{reminder.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatReminderSubtitle(reminder)}</p>
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full border ${reminderStatusClass(reminder.status)}`}>
                  {toDisplayStatus(reminder.status)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 items-start w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-[#DEE6EE] p-5 w-full">
          <h2 className="text-base font-semibold text-slate-900">Latest Forum Topics</h2>
          <p className="mt-1 text-xs text-slate-500">Latest Forum Topics</p>
          <div className="mt-4 space-y-3">
            {forumTopics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between rounded-xl bg-[#ECF3F8] px-4 py-3">
                <span className="text-sm text-slate-900">{topic.title}</span>
                <button className="px-5 py-2 text-sm font-medium text-white bg-[#135D96] rounded-lg">Join</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#DEE6EE] p-5 h-full flex flex-col w-full">
          <h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {events.map((event) => (
              <div key={event.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 flex flex-col h-full">
                <div className="h-20 rounded-xl overflow-hidden mb-3">
                  <EventImage event={event} />
                </div>
                <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarClock className="h-3 w-3 text-black" />
                    {formatEventDate(event.eventDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-black" />
                    {formatEventTime(event.eventDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
