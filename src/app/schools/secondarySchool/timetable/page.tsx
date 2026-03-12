"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimetableEntry {
  id?: string;
  type?: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher?: string;
  room?: string;
  isBreak?: boolean;
}

interface DaySchedule {
  date: string;
  entries: TimetableEntry[];
}

// ─── API ──────────────────────────────────────────────────────────────────────
const BASE_URL = "https://dev-netzertech-backend.vercel.app/api/v1";

const getAuthHeaders = (): Record<string, string> => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const api = {
  getTodayTimetable: async (): Promise<TimetableEntry[]> => {
    const res = await fetch(`${BASE_URL}/timetable`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch timetable");
    return res.json();
  },
  getTimetableByDate: async (date: string): Promise<TimetableEntry[]> => {
    const res = await fetch(`${BASE_URL}/timetable?date=${date}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch timetable");
    return res.json();
  },
  getTimetableRange: async (startDate: string, endDate: string): Promise<DaySchedule[]> => {
    const res = await fetch(`${BASE_URL}/timetable?startDate=${startDate}&endDate=${endDate}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch timetable range");
    return res.json();
  },
  joinSession: async (eventId: string, type: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/timetable/join`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventId, type }),
    });
    if (!res.ok) throw new Error("Failed to join session");
  },
};

// ─── Static timetable data ────────────────────────────────────────────────────
const STATIC_TIMETABLE: Record<string, TimetableEntry[]> = {
  Monday: [
    { startTime: "08:00", endTime: "09:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
    { startTime: "09:00", endTime: "10:00", subject: "English Language", teacher: "Prof. Michael Brown", room: "Room 205" },
    { startTime: "10:00", endTime: "10:15", subject: "Break", isBreak: true },
    { startTime: "10:15", endTime: "11:15", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 3" },
    { startTime: "11:15", endTime: "12:15", subject: "Physics", teacher: "Prof. James Wilson", room: "Lab 1" },
    { startTime: "12:15", endTime: "01:00", subject: "Lunch Break", isBreak: true },
    { startTime: "01:00", endTime: "02:00", subject: "History", teacher: "Ms. Lisa Anderson", room: "Room 302" },
    { startTime: "02:00", endTime: "03:00", subject: "Physical Education", teacher: "Coach Robert Lee", room: "Gym" },
  ],
  Tuesday: [
    { startTime: "08:00", endTime: "09:00", subject: "Biology", teacher: "Dr. Patricia Moore", room: "Lab 2" },
    { startTime: "09:00", endTime: "10:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
    { startTime: "10:00", endTime: "10:15", subject: "Break", isBreak: true },
    { startTime: "10:15", endTime: "11:15", subject: "Computer Science", teacher: "Mr. David Chen", room: "Computer Lab" },
    { startTime: "11:15", endTime: "12:15", subject: "English Literature", teacher: "Prof. Michael Brown", room: "Room 205" },
    { startTime: "12:15", endTime: "01:00", subject: "Lunch Break", isBreak: true },
    { startTime: "01:00", endTime: "02:00", subject: "Geography", teacher: "Ms. Jennifer Taylor", room: "Room 303" },
    { startTime: "02:00", endTime: "03:00", subject: "Art", teacher: "Ms. Amanda White", room: "Art Studio" },
  ],
  Wednesday: [
    { startTime: "08:00", endTime: "09:00", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 3" },
    { startTime: "09:00", endTime: "10:00", subject: "Physics", teacher: "Prof. James W", room: "Lab 1" },
    { startTime: "10:00", endTime: "10:15", subject: "Break", isBreak: true },
    { startTime: "10:15", endTime: "11:15", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
    { startTime: "11:15", endTime: "12:15", subject: "English Language", teacher: "Prof. Michael Brown", room: "Room 205" },
    { startTime: "12:15", endTime: "01:00", subject: "Lunch Break", isBreak: true },
    { startTime: "01:00", endTime: "02:00", subject: "Music", teacher: "Mr. Thomas Garcia", room: "Music Room" },
    { startTime: "02:00", endTime: "03:00", subject: "Study Hall", isBreak: true },
  ],
  Thursday: [
    { startTime: "08:00", endTime: "09:00", subject: "English Literature", teacher: "Prof. Michael Brown", room: "Room 205" },
    { startTime: "09:00", endTime: "10:00", subject: "Biology", teacher: "Dr. Patricia Moor", room: "Lab 2" },
    { startTime: "10:00", endTime: "10:15", subject: "Break", isBreak: true },
    { startTime: "10:15", endTime: "11:15", subject: "History", teacher: "Dr. Sarah Johnson", room: "Room 101" },
    { startTime: "11:15", endTime: "12:15", subject: "Computer Science", teacher: "Mr. David Chen", room: "Computer Lab" },
    { startTime: "12:15", endTime: "01:00", subject: "Lunch Break", isBreak: true },
    { startTime: "01:00", endTime: "02:00", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
    { startTime: "02:00", endTime: "03:00", subject: "Physical Education", teacher: "Coach Robert Lee", room: "Gym" },
  ],
  Friday: [
    { startTime: "08:00", endTime: "09:00", subject: "Physics", teacher: "Prof. James Wilson", room: "Lab 1" },
    { startTime: "09:00", endTime: "10:00", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 3" },
    { startTime: "10:00", endTime: "10:15", subject: "Break", isBreak: true },
    { startTime: "10:15", endTime: "11:15", subject: "Geography", teacher: "Ms. Jennifer Taylor", room: "Room 303" },
    { startTime: "11:15", endTime: "12:15", subject: "English Language", teacher: "Prof. Michael Brown", room: "Room 205" },
    { startTime: "12:15", endTime: "01:00", subject: "Lunch Break", isBreak: true },
    { startTime: "01:00", endTime: "02:00", subject: "Art", teacher: "Ms. Amanda White", room: "Art Studio" },
    { startTime: "02:00", endTime: "03:00", subject: "Club Activities", isBreak: true },
  ],
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
type Day = (typeof DAYS)[number];

// ─── Subject colour map ───────────────────────────────────────────────────────
const subjectStyles: Record<string, { color: string; border: string }> = {
  Mathematics:          { color: "#7C3AED", border: "#7C3AED" },
  "English Language":   { color: "#0891B2", border: "#0891B2" },
  Chemistry:            { color: "#059669", border: "#059669" },
  Physics:              { color: "#D97706", border: "#D97706" },
  History:              { color: "#D97706", border: "#D97706" },
  Biology:              { color: "#16A34A", border: "#16A34A" },
  "Computer Science":   { color: "#0891B2", border: "#0891B2" },
  "English Literature": { color: "#7C3AED", border: "#7C3AED" },
  Geography:            { color: "#DC2626", border: "#DC2626" },
  Art:                  { color: "#EA580C", border: "#EA580C" },
  Music:                { color: "#7C3AED", border: "#7C3AED" },
  "Physical Education": { color: "#EA580C", border: "#EA580C" },
};

const getSubjectStyle = (subject: string) =>
  subjectStyles[subject] ?? { color: "#374151", border: "#D1D5DB" };

// ─── Icons ────────────────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const BackArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const AcademicsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const StudentLifeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ForumIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ClubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="11" /><line x1="20" y1="8" x2="20" y2="14" />
  </svg>
);
const EventIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const ApprovalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const SupportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TimetablePage() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState<Day>("Monday");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiEntries, setApiEntries] = useState<TimetableEntry[] | null>(null);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);

  const displayEntries = apiEntries ?? STATIC_TIMETABLE[activeDay];

  // Fetch today on mount
  useEffect(() => {
    const fetchToday = async () => {
      setLoading(true);
      try {
        const data = await api.getTodayTimetable();
        console.log("API response:", data);
        if (data && data.length > 0) setApiEntries(data);
      } catch {
        // fall back to static
      } finally {
        setLoading(false);
      }
    };
    fetchToday();
  }, []);

  // Fetch by date when day tab changes
  const handleDayChange = useCallback(async (day: Day) => {
    setActiveDay(day);
    setApiEntries(null);
    const dayIndex = DAYS.indexOf(day);
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + mondayOffset + dayIndex);
    const dateStr = targetDate.toISOString().split("T")[0];
    setLoading(true);
    try {
      const data = await api.getTimetableByDate(dateStr);
      if (data && data.length > 0) setApiEntries(data);
    } catch {
      // fall back to static
    } finally {
      setLoading(false);
    }
  }, []);

  // Join a session
  const handleJoin = async (entry: TimetableEntry) => {
    if (!entry.id) return;
    setJoiningId(entry.id);
    try {
      await api.joinSession(entry.id, entry.type ?? "class");
      setJoinSuccess(entry.id);
      setTimeout(() => setJoinSuccess(null), 2000);
    } catch {
      // silent
    } finally {
      setJoiningId(null);
    }
  };

  const filteredEntries = displayEntries.filter((e) =>
    searchQuery
      ? e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.teacher?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true
  );

  const navItems = [
    { icon: <DashboardIcon />, label: "Dashboard", active: true },
    { icon: <AcademicsIcon />, label: "Academics" },
    { icon: <StudentLifeIcon />, label: "Student Life" },
    { icon: <ForumIcon />, label: "Forum" },
    { icon: <ClubIcon />, label: "Club" },
    { icon: <EventIcon />, label: "Event" },
    { icon: <ProfileIcon />, label: "Profile" },
    { icon: <ApprovalIcon />, label: "Approval" },
    { icon: <SupportIcon />, label: "Support" },
  ];

  const topTabs = ["Subject", "Classroom", "Assignment", "Examinations", "Records", "Attendance", "Timetable", "Library"];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f5f6fa", overflow: "hidden" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: "220px", minWidth: "220px", backgroundColor: "#216388",
        display: "flex", flexDirection: "column", padding: "24px 12px", gap: "4px", overflowY: "auto",
      }}>

        {/* Logo */}
        <div style={{ padding: "0 8px 24px 8px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/_assets/logo.png"
            alt="NetzerTech Logo"
            style={{ width: "140px", height: "48px", objectFit: "contain" }}
          />
        </div>

        {/* Nav Items */}
        {navItems.map(({ icon, label, active }) => (
          <button
            key={label}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 14px", borderRadius: "10px", border: "none", cursor: "pointer",
              backgroundColor: active ? "white" : "transparent",
              color: active ? "#216388" : "rgba(255,255,255,0.8)",
              fontWeight: active ? 600 : 400, fontSize: "14px",
              transition: "all 0.15s", width: "100%", textAlign: "left",
            }}
            onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            {icon}{label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Log Out */}
        <button
          onClick={() => router.push("/schools/secondarySchool/studentLogin")}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 14px", borderRadius: "10px",
            border: "1.5px solid rgba(255,255,255,0.3)",
            cursor: "pointer", backgroundColor: "transparent",
            color: "white", fontSize: "14px", fontWeight: 500, width: "100%",
          }}
        >
          <LogOutIcon />
          Log Out
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", backgroundColor: "white", borderBottom: "1px solid #e5e7eb",
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111827" }}>Timetable</h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>View your weekly class schedules</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
            borderRadius: "8px", padding: "8px 14px", width: "260px",
          }}>
            <span style={{ color: "#9ca3af" }}><SearchIcon /></span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything here"
              style={{ border: "none", background: "none", outline: "none", fontSize: "14px", color: "#374151", width: "100%" }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

          {/* Back Button */}
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "7px 14px", borderRadius: "8px", backgroundColor: "#216388",
            color: "white", border: "none", cursor: "pointer", fontSize: "13px",
            fontWeight: 500, marginBottom: "20px",
          }}>
            <BackArrowIcon /> Back
          </button>

          {/* Top Navigation Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {topTabs.map((tab) => (
              <button
                key={tab}
                style={{
                  padding: "7px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
                  cursor: "pointer", border: "1.5px solid",
                  backgroundColor: tab === "Timetable" ? "#216388" : "transparent",
                  borderColor: tab === "Timetable" ? "#216388" : "#d1d5db",
                  color: tab === "Timetable" ? "white" : "#374151",
                  transition: "all 0.15s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 style={{ margin: "0 0 20px 0", fontSize: "17px", fontWeight: 700, color: "#216388" }}>
            Class Timetable
          </h2>

          {/* Grade / Section + Download */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            backgroundColor: "white", borderRadius: "12px", padding: "14px 20px",
            border: "1px solid #e5e7eb", marginBottom: "16px",
          }}>
            <div style={{ display: "flex", gap: "12px" }}>
              {["10th Grade", "Section A"].map((label) => (
                <button key={label} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 14px", borderRadius: "8px", border: "1px solid #d1d5db",
                  backgroundColor: "white", color: "#374151", fontSize: "13px", fontWeight: 500, cursor: "pointer",
                }}>
                  {label} <ChevronIcon />
                </button>
              ))}
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "8px", border: "1.5px solid #d1d5db",
              backgroundColor: "white", color: "#374151", fontSize: "13px", fontWeight: 500, cursor: "pointer",
            }}>
              <DownloadIcon /> Download PDF
            </button>
          </div>

          {/* Day Tabs + Schedule */}
          <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>

            {/* Day Tab Bar */}
            <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", padding: "0 20px" }}>
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  style={{
                    padding: "14px 20px", fontSize: "14px",
                    fontWeight: activeDay === day ? 600 : 400,
                    border: "1px solid #d1d5db", cursor: "pointer",
                    backgroundColor: activeDay === day ? "#216388" : "transparent",
                    color: activeDay === day ? "white" : "#5D5C5C",
                    borderRadius: activeDay === day ? "8px" : "0",
                    margin: "8px 24px", transition: "all 0.15s",
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Entries */}
            <div style={{ padding: "8px 16px 16px" }}>
              {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                  Loading schedule...
                </div>
              ) : (
                filteredEntries.map((entry, idx) => {
                  const style = getSubjectStyle(entry.subject);
                  const isBreakRow = entry.isBreak;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "14px 12px",
                        borderBottom: idx < filteredEntries.length - 1 ? "1px solid #f3f4f6" : "none",
                        gap: "20px",
                      }}
                    >
                      {/* Time */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: "120px", color: "#6b7280", fontSize: "13px" }}>
                        <span style={{ color: "#9ca3af" }}><ClockIcon /></span>
                        {entry.startTime} - {entry.endTime}
                      </div>

                      {/* Subject chip */}
                      <div style={{ minWidth: "140px", display: "flex", alignItems: "center" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 12px", borderRadius: "6px",
                          border: `1.5px solid ${isBreakRow ? "#d1d5db" : style.border}`,
                          color: isBreakRow ? "#374151" : style.color,
                          fontSize: "13px", fontWeight: 500,
                        }}>
                          {entry.subject}
                        </span>
                      </div>

                      {/* Teacher */}
                      {entry.teacher && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", fontSize: "13px", flex: 1 }}>
                          <span style={{ color: "#9ca3af" }}><UserIcon /></span>
                          {entry.teacher}
                        </div>
                      )}

                      {/* Room */}
                      {entry.room && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", fontSize: "13px", minWidth: "120px" }}>
                          <span style={{ color: "#9ca3af" }}><LocationIcon /></span>
                          {entry.room}
                        </div>
                      )}

                      {/* Join button (API entries only) */}
                      {entry.id && !isBreakRow && (
                        <button
                          onClick={() => handleJoin(entry)}
                          disabled={joiningId === entry.id}
                          style={{
                            marginLeft: "auto", padding: "6px 14px", borderRadius: "8px",
                            border: "none", cursor: "pointer",
                            backgroundColor: joinSuccess === entry.id ? "#16a34a" : "#216388",
                            color: "white", fontSize: "12px", fontWeight: 600,
                            opacity: joiningId === entry.id ? 0.7 : 1,
                            transition: "background-color 0.2s", whiteSpace: "nowrap",
                          }}
                        >
                          {joinSuccess === entry.id ? "Joined ✓" : joiningId === entry.id ? "Joining..." : "Join"}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
              {!loading && filteredEntries.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                  No classes found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
