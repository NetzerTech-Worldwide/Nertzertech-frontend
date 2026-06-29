"use client";
import React, { useState } from "react";
import { Mic, MicOff, Share2, LogOut, Play, Volume2, Maximize2, UsersRound  } from "lucide-react";
import type { LiveSessionDetailDto, LiveSessionMessageDto, NoteTab } from "@/types/academic-classroom";
import { DEMO_SESSION_DETAIL, DEMO_MESSAGES } from "../demoData";
import { IoVideocam } from "react-icons/io5";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

const AVATAR_COLORS = [
  "bg-red-400", "bg-blue-500", "bg-orange-400",
  "bg-green-500", "bg-teal-500", "bg-purple-500",
];

interface LiveClassroomViewProps {
  // TODO: replace with real fetched data per sessionId
  session?: LiveSessionDetailDto;
  messages?: LiveSessionMessageDto[];
  isReplay?: boolean;
  onLeaveClass: () => void;
  onCheckAssignment?: () => void;
}

const NOTE_TABS: { id: NoteTab; label: string }[] = [
  { id: "notes", label: "Notes" },
  { id: "materials", label: "Materials" },
  { id: "ai-summary", label: "AI Summary" },
];

const CLASS_TIMESTAMPS = [
  { id: "t1", label: "BST Properties and Characteristics", time: "05:30" },
  { id: "t2", label: "Introduction to Binary Search Tree", time: "06:00" },
  { id: "t3", label: "Insertion Algorithm", time: "11:45" },
  { id: "t4", label: "Deletion Algorithm", time: "20:05" },
];

export const LiveClassroomView: React.FC<LiveClassroomViewProps> = ({
  session = DEMO_SESSION_DETAIL, // ← swap with API data
  messages = DEMO_MESSAGES,      // ← swap with API data (polled or WS)
  isReplay = false,
  onLeaveClass,
  onCheckAssignment,
}) => {
  const [activeNoteTab, setActiveNoteTab] = useState<NoteTab>("notes");
  const [note, setNote] = useState("");
  const [activePanel, setActivePanel] = useState<"participants" | "chat">("participants");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* ── Left: video + notes ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
              {isReplay ? (
                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">{session.totalParticipants} Participated</span>
                </span>
              ) : (
                <div className="flex items-center gap-4 text-sm ">
                     <p className='text-red-500 flex item-center gap-1.5'>
                        <span ><IoVideocam className="w-4 h-4 animate-pulse" /></span>
                        <span className="font-semibold ">Live Now</span>
                      </p>
                     <p className='flex gap-1.5 text-gray-500'>
                       <span ><UsersRound className="w-4 h-4 animate-pulse" /></span>
                       <span className="font-semibold">{session.totalParticipants} Participants</span>
                      </p>
                </div>
              )}
              
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{session.title}</h2>
                <p className="text-sm text-gray-500">
                  {session.teacherName} ·{" "}
                  <span className="text-[#216388] font-medium">Host</span>
                </p>
              </div>

              {/* Video player */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <Play className="w-12 h-12" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center gap-3">
                  <button className="text-white"><Play className="w-4 h-4" /></button>
                  <button className="text-white"><Volume2 className="w-4 h-4" /></button>
                  <div className="flex-1 h-1 bg-white/30 rounded-full" />
                  <span className="text-white text-xs">00 / 2.5mins</span>
                  <button className="text-white"><Maximize2 className="w-4 h-4" /></button>
                </div>

                {isReplay && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
                    <button className="bg-white/90 hover:bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-colors">
                      ▶ Watch Replay
                    </button>
                    {onCheckAssignment && (
                      <button
                        onClick={onCheckAssignment}
                        className="bg-white/90 hover:bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-colors"
                      >
                        Check Assignment
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Students + controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Students</span>
                <div className="flex -space-x-2">
                  {session.participants.slice(0, 4).map((p, i) => (
                    <div
                      key={p.id}
                      className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold flex items-center justify-center border-2 border-white`}
                    >
                      {getInitials(p.name)}
                    </div>
                  ))}
                  {session.totalParticipants > 4 && (
                    <div className="w-8 h-8 rounded-full bg-pink-400 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      +{session.totalParticipants - 4}
                    </div>
                  )}
                </div>

                {!isReplay && (
                  <div className="ml-auto flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onLeaveClass}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Leave Class
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes / Materials / AI Summary */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 pt-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">My Note</h3>
              <div className="flex gap-1 border-b border-gray-100">
                {NOTE_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveNoteTab(t.id)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeNoteTab === t.id
                        ? "border-[#216388] text-[#216388] bg-blue-50/50 rounded-t-lg"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4">
              {activeNoteTab === "notes" && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Take notes here .... your note will be saved automatically"
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388] resize-none"
                />
              )}
              {activeNoteTab === "materials" && (
                <p className="text-sm text-gray-400 py-6 text-center">No materials uploaded yet.</p>
              )}
              {activeNoteTab === "ai-summary" && (
                <p className="text-sm text-gray-400 py-6 text-center">AI summary will be available after the class ends.</p>
              )}
            </div>
          </div>

          {/* Class Timestamps — replay only */}
          {isReplay && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Class Timestamp</h3>
              <div className="flex flex-col gap-2">
                {CLASS_TIMESTAMPS.map((ts) => (
                  <div key={ts.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                    <div className="w-14 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#216388]/10 transition-colors">
                      <Play className="w-4 h-4 text-gray-500 group-hover:text-[#216388]" />
                    </div>
                    <p className="flex-1 text-sm text-gray-700 font-medium truncate">{ts.label}</p>
                    <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">{ts.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-400 text-xs">Topic</p><p className="font-medium text-gray-700">{session.title}</p></div>
                <div><p className="text-gray-400 text-xs">Duration</p><p className="font-medium text-gray-700">1 hour</p></div>
                <div><p className="text-gray-400 text-xs">Start time</p><p className="font-medium text-gray-700">{formatTime(session.startTime)}</p></div>
                <div><p className="text-gray-400 text-xs">Participants</p><p className="font-medium text-gray-700">{session.totalParticipants} Participants</p></div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="lg:w-64 flex-shrink-0">
          {!isReplay && (
                <div className="flex gap-2 mb-4">
                  {(["participants", "chat"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePanel(p)}
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize transition-colors ${
                        activePanel === p ? "bg-[#216388] text-white" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {p === "participants" ? "Private" : "Live Chat"}
                    </button>
                  ))}
                </div>
              )}
          {isReplay ? (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Chats</h3>
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-gray-700">{msg.senderName}</span>
                      <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Participants ({session.totalParticipants})
              </h3>
              <div className="flex flex-col gap-3">
                {session.participants.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                      {getInitials(p.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{p.role ?? "Student"}</p>
                    </div>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <MicOff className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};