"use client";
import React from "react";
import { Clock, Users, Bookmark } from "lucide-react";
import type { LiveSessionDto } from "@/types/academic-classroom";
import { DEMO_LIVE_SESSIONS } from "../demoData";

// Maps subjectName → card colour. Extend as needed.
const SUBJECT_COLOR: Record<string, string> = {
  Mathematics: "bg-blue-600",
  Physics: "bg-green-600",
  Chemistry: "bg-purple-500",
  Biology: "bg-teal-600",
  English: "bg-orange-500",
};
const DEFAULT_COLOR = "bg-[#216388]";

function cardColor(subjectName: string) {
  return SUBJECT_COLOR[subjectName] ?? DEFAULT_COLOR;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface LiveClassCardsProps {
  // TODO: replace with API data — swap DEMO_LIVE_SESSIONS for real fetch
  sessions?: LiveSessionDto[];
  onJoinClass: (session: LiveSessionDto) => void;
  onSetReminder: (session: LiveSessionDto) => void;
}

const StatusBadge: React.FC<{ status: LiveSessionDto["status"] }> = ({ status }) => {
  if (status === "live") {
    return (
      <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Live
      </span>
    );
  }
  if (status === "scheduled") {
    return <span className="text-gray-500 text-xs font-semibold">Scheduled</span>;
  }
  if (status === "completed") {
    return <span className="text-green-600 text-xs font-semibold">Completed</span>;
  }
  if (status === "cancelled") {
    return <span className="text-red-400 text-xs font-semibold">Cancelled</span>;
  }
  return null;
};

const TeacherAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name.split(" ").slice(-2).map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-[#216388] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
      {initials}
    </div>
  );
};

const ClassCard: React.FC<{
  session: LiveSessionDto;
  onJoin: () => void;
  onReminder: () => void;
}> = ({ session, onJoin, onReminder }) => {
  const isLive = session.status === "live";
  const isCompleted = session.status === "completed" || session.status === "cancelled";
  const color = cardColor(session.subjectName);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Coloured header */}
      <div className={`${color} p-4 pb-6 relative min-h-[120px]`}>
        {isLive && (
          <div className="absolute top-3 right-3">
            <StatusBadge status="live" />
          </div>
        )}
        <h3 className="text-white font-bold text-lg leading-tight">{session.subjectName}</h3>
        <p className="text-white/80 text-sm mt-0.5">{session.title}</p>
        {/* decorative circles */}
        <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-10 bg-white translate-x-6 translate-y-6" />
        <div className="absolute bottom-4 right-10 w-12 h-12 rounded-full opacity-10 bg-white" />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <TeacherAvatar name={session.teacherName} />
          <p className="text-sm font-medium text-gray-800 flex-1 truncate">{session.teacherName}</p>
          {!isLive && <StatusBadge status={session.status} />}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatTime(session.startTime)} – {formatTime(session.endTime)}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-1">
          {/* canJoin drives the CTA, status drives the label */}
          {session.canJoin && !isCompleted ? (
            <button
              onClick={onJoin}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Join live class
            </button>
          ) : isCompleted ? (
            <button
              onClick={onJoin}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              View Replay
            </button>
          ) : (
            <button
              onClick={onReminder}
              className="flex-1 bg-[#216388] hover:bg-[#1a5070] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Set Reminder
            </button>
          )}
          <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LiveClassCards: React.FC<LiveClassCardsProps> = ({
  sessions = DEMO_LIVE_SESSIONS, // ← swap with API data
  onJoinClass,
  onSetReminder,
}) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Live Classes</h2>
        <p className="text-sm text-gray-500">Join ongoing and upcoming virtual classes</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <ClassCard
            key={session.id}
            session={session}
            onJoin={() => onJoinClass(session)}
            onReminder={() => onSetReminder(session)}
          />
        ))}
      </div>
    </div>
  );
};