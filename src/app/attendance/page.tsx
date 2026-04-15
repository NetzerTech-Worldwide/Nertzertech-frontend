"use client";

import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";

// ─── Types ─────────────────────────────────────────────────────

interface CircleProps { cx: number; cy: number; r: number; }
interface RectProps   { x: number; y: number; w: number; h: number; rx?: number; }
interface LineProps   { x1: number; y1: number; x2: number; y2: number; }

interface IconProps {
  d?:          string;
  d2?:         string;
  path2?:      string;
  circle?:     CircleProps;
  rect?:       RectProps;
  polyline?:   string;
  line?:       LineProps;
  size?:       number;
  strokeWidth?: number;
}

interface NavItemProps {
  icon:    ReactNode;
  label:   string;
  active?: boolean;
  sub?:    boolean;
}

interface SubjectRowProps {
  name:     string;
  attended: number;
  total:    number;
  pct:      number;
  color:    "blue" | "green" | "red";
}

interface RecentItemProps {
  subject: string;
  date:    string;
  time:    string;
  status:  "Present" | "Absent";
}

interface BottomNavItemProps {
  icon:  ReactNode;
  label: string;
}

// ─── Icon ──────────────────────────────────────────────────────

const Icon: React.FC<IconProps> = ({
  d, d2, path2, circle, rect, polyline, line,
  size = 16, strokeWidth = 2,
}) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
  >
    {d        && <path d={d} />}
    {d2       && <path d={d2} />}
    {path2    && <path d={path2} />}
    {circle   && <circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
    {rect     && <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={rect.rx} />}
    {polyline && <polyline points={polyline} />}
    {line     && <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />}
  </svg>
);

// ─── Named Icons ───────────────────────────────────────────────

const GridIcon    = () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />;
const FolderIcon  = () => <Icon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />;
const BookIcon    = () => <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" d2="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />;
const MonitorIcon = () => <Icon d="M2 3h20v14H2z" d2="M8 21h8M12 17v4" />;
const PenIcon     = () => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" d2="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;

const CalendarIcon = () => (
  <Icon
    rect={{ x: 3, y: 4, w: 18, h: 18, rx: 2 }}
    d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"
  />
);

const FileIcon    = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" d2="M14 2v6h6M16 13H8M16 17H8M10 9H8" />;
const UsersIcon   = () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" circle={{ cx: 9, cy: 7, r: 4 }} d2="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />;
const ChatIcon    = () => <Icon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const ClubIcon    = () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" circle={{ cx: 9, cy: 7, r: 4 }} d2="M23 21v-2a4 4 0 0 0-3-3.87" />;
const ShieldIcon  = () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const HelpIcon    = () => <Icon circle={{ cx: 12, cy: 12, r: 10 }} d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" path2="M12 17h.01" />;
const UserIcon    = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" circle={{ cx: 12, cy: 7, r: 4 }} />;
const CheckIcon   = () => <Icon d="M9 11l3 3L22 4" path2="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />;
const SearchIcon  = () => <Icon circle={{ cx: 11, cy: 11, r: 8 }} line={{ x1: 21, y1: 21, x2: 16.65, y2: 16.65 }} />;

const LogoutIcon  = () => (
  <Icon
    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    polyline="16 17 21 12 16 7"
    line={{ x1: 21, y1: 12, x2: 9, y2: 12 }}
  />
);

// ─── Nav Item ──────────────────────────────────────────────────

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, sub = false }) => (
  <a
    href="#"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: active ? "9px 12px" : sub ? "7px 20px" : "9px 20px",
      cursor: "pointer",
      color: active ? "#fff" : sub ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.82)",
      fontSize: sub ? "12.5px" : "13px",
      fontWeight: 400,
      textDecoration: "none",
      background: active ? "rgba(255,255,255,0.15)" : "transparent",
      borderRadius: active ? "4px" : undefined,
      margin: active ? "0 8px" : undefined,
      transition: "background 0.15s",
    }}
    onMouseEnter={(e) => {
      if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
    }}
    onMouseLeave={(e) => {
      if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
    }}
  >
    {icon}
    <span>{label}</span>
  </a>
);

// ─── Subject Row ───────────────────────────────────────────────

const colorMap = {
  blue:  { fill: "#3b9bd4", badge: { color: "#3b9bd4", border: "#3b9bd4" } },
  green: { fill: "#4caf50", badge: { color: "#4caf50", border: "#4caf50" } },
  red:   { fill: "#e74c3c", badge: { color: "#e74c3c", border: "#e74c3c" } },
} as const;

const SubjectRow: React.FC<SubjectRowProps> = ({ name, attended, total, pct, color }) => {
  const c = colorMap[color];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a2e", width: "150px", flexShrink: 0 }}>
        {name}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "11px", color: "#9099a8", marginBottom: "4px", textAlign: "right" }}>
          {attended}/{total} classes
        </div>
        <div style={{ height: "7px", background: "#eaedf2", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: c.fill, borderRadius: "10px" }} />
        </div>
      </div>
      <div style={{
        fontSize: "11.5px", fontWeight: 600, padding: "2px 9px", borderRadius: "20px",
        border: `1.5px solid ${c.badge.border}`, color: c.badge.color,
        whiteSpace: "nowrap", flexShrink: 0, width: "58px", textAlign: "center",
      }}>
        {pct}%
      </div>
    </div>
  );
};

// ─── Recent Item ───────────────────────────────────────────────

const RecentItem: React.FC<RecentItemProps> = ({ subject, date, time, status }) => {
  const isPresent = status === "Present";
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#f8f9fb", borderRadius: "10px", padding: "14px 18px",
    }}>
      <div>
        <div style={{ fontSize: "11.5px", color: "#9099a8", fontWeight: 400 }}>{subject}</div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginTop: "2px" }}>
          {date} &bull; {time}
        </div>
      </div>
      <span style={{
        fontSize: "12px", fontWeight: 600, padding: "5px 16px", borderRadius: "20px",
        background: isPresent ? "#e6f9ed" : "#fde8e8",
        color: isPresent ? "#27ae60" : "#e74c3c",
        border: isPresent ? "none" : "1.5px solid #e74c3c",
      }}>
        {status}
      </span>
    </div>
  );
};

// ─── Bottom Nav Item ───────────────────────────────────────────

const BottomNavItem: React.FC<BottomNavItemProps> = ({ icon, label }) => (
  <div style={{
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "12px 8px", cursor: "pointer",
    fontSize: "11.5px", color: "#8a93a2", fontWeight: 500, gap: "4px",
  }}>
    {icon}
    <span>{label}</span>
  </div>
);

// ─── Page ──────────────────────────────────────────────────────

export default function AttendancePage() {
  return (
    <>
      <Head>
        <title>Attendance Tracking — NetzerTech</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Global reset */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #__next { height: 100%; overflow: hidden; }
        body { font-family: 'Poppins', sans-serif; background: #f4f6f9; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>

      {/* Layout */}
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* ══════════════ SIDEBAR ══════════════ */}
        <aside style={{
          width: "215px", minWidth: "215px", background: "#1b5f7a",
          display: "flex", flexDirection: "column",
          height: "100vh", overflowY: "auto", paddingBottom: "20px",
        }}>
          {/* Logo */}
          <div style={{ padding: "18px 20px 14px" }}>
            <Image
              src="/assets/logo.png"
              alt="NetzerTech"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>

          <NavItem icon={<GridIcon />}    label="Dashboard" />
          <NavItem icon={<FolderIcon />}  label="Academics" />

          {/* Academics sub-menu */}
          <div style={{ paddingLeft: "10px" }}>
            <NavItem sub icon={<BookIcon />}     label="Subjects" />
            <NavItem sub icon={<MonitorIcon />}  label="Classroom" />
            <NavItem sub icon={<PenIcon />}      label="Assignment" />
            <NavItem sub active icon={<CalendarIcon />} label="Examination" />
          </div>

          <NavItem icon={<FileIcon />}    label="Records" />
          <NavItem icon={<UsersIcon />}   label="Attendance" />
          <NavItem icon={<CalendarIcon />} label="Timetable" />
          <NavItem icon={<BookIcon />}    label="Library" />
          <NavItem icon={<UsersIcon />}   label="Student Life" />

          {/* Student Life sub-menu */}
          <div style={{ paddingLeft: "10px" }}>
            <NavItem sub icon={<ChatIcon />}   label="Forum" />
            <NavItem sub icon={<ClubIcon />}   label="Club" />
            <NavItem sub icon={<ShieldIcon />} label="Event" />
          </div>

          <NavItem icon={<HelpIcon />}  label="Support" />
          <NavItem icon={<UserIcon />}  label="Profile" />
          <NavItem icon={<CheckIcon />} label="Approval" />

          {/* Log Out */}
          <div style={{ marginTop: "auto", padding: "12px 0" }}>
            <button
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                margin: "10px 14px 0", padding: "9px 14px",
                border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "8px",
                color: "rgba(255,255,255,0.85)", fontSize: "13px", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif", background: "transparent",
                fontWeight: 500, width: "calc(100% - 28px)",
              }}
            >
              <LogoutIcon /> Log Out
            </button>
          </div>
        </aside>

        {/* ══════════════ MAIN ══════════════ */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Topbar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 30px 12px", background: "#fff",
            borderBottom: "1px solid #e9ecef", flexShrink: 0,
          }}>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
                Attendance Tracking
              </h1>
              <p style={{ fontSize: "12px", color: "#8a93a2", fontWeight: 400, marginTop: "1px" }}>
                Monitor your class attendance and participation
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              border: "1px solid #dde2ea", borderRadius: "8px",
              padding: "7px 14px", background: "#f8f9fb",
              minWidth: "240px", color: "#8a93a2",
            }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search anything here"
                style={{
                  border: "none", background: "transparent", fontSize: "13px",
                  color: "#555", outline: "none", fontFamily: "'Poppins', sans-serif", width: "100%",
                }}
              />
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "24px 28px",
            display: "flex", flexDirection: "column", gap: "22px",
          }}>

            {/* Subject-wise Attendance */}
            <div style={{
              background: "#fff", borderRadius: "12px", padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e" }}>
                Subject-wise Attendance
              </div>
              <div style={{ fontSize: "11.5px", color: "#9099a8", marginTop: "2px" }}>
                Your attendance breakdown by subject
              </div>
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <SubjectRow name="Mathematics"         attended={28} total={30} pct={93.3} color="blue"  />
                <SubjectRow name="English Language"    attended={25} total={28} pct={89.3} color="blue"  />
                <SubjectRow name="Physics"             attended={26} total={29} pct={89.7} color="blue"  />
                <SubjectRow name="Biology"             attended={30} total={32} pct={93.8} color="blue"  />
                <SubjectRow name="Chemistry"           attended={27} total={28} pct={96.4} color="blue"  />
                <SubjectRow name="Geography"           attended={26} total={29} pct={92.4} color="green" />
                <SubjectRow name="Agricultural Scence" attended={26} total={29} pct={92.4} color="red"   />
              </div>
            </div>

            {/* Recent Attendance */}
            <div style={{
              background: "#fff", borderRadius: "12px", padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e" }}>
                Recent Attendance
              </div>
              <div style={{ fontSize: "11.5px", color: "#9099a8", marginTop: "2px" }}>
                Your attendance record for the past week
              </div>
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <RecentItem subject="Mathematics"        date="1/19/2024" time="9:00 AM"  status="Present" />
                <RecentItem subject="English Language"   date="1/19/2024" time="11:00 AM" status="Present" />
                <RecentItem subject="Physics"            date="1/18/2024" time="2:00 PM"  status="Absent"  />
                <RecentItem subject="Computer Science"   date="1/18/2024" time="10:00 AM" status="Present" />
                <RecentItem subject="Agricultural science" date="1/17/2024" time="1:00 PM" status="Present" />
              </div>
            </div>

          </div>{/* /content */}

          {/* Bottom Nav */}
          <div style={{
            display: "flex", background: "#fff",
            borderTop: "1px solid #e9ecef", flexShrink: 0,
          }}>
            <BottomNavItem
              label="Class Schedule"
              icon={<Icon size={20} strokeWidth={1.8} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" d2="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />}
            />
            <BottomNavItem
              label="Assignments"
              icon={<Icon size={20} strokeWidth={1.8} rect={{ x: 3, y: 4, w: 18, h: 18, rx: 2 }} d="M16 2v4M8 2v4M3 10h18" />}
            />
            <BottomNavItem
              label="Study Group"
              icon={<Icon size={20} strokeWidth={1.8} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" circle={{ cx: 9, cy: 7, r: 4 }} d2="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />}
            />
            <BottomNavItem
              label="Digital Library"
              icon={<Icon size={20} strokeWidth={1.8} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" d2="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />}
            />
          </div>

        </div>{/* /main */}
      </div>
    </>
  );
}