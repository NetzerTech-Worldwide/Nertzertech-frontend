import type {
  LiveSessionDto,
  LiveSessionDetailDto,
  LiveSessionMessageDto,
  QuestionDto,
  LearningMaterialDto,
  StartActivityResponseDto,
} from "@/types/academic-classroom";

// ─── Live Sessions (mirrors GET /api/v1/academic/live-sessions) ───────────────
export const DEMO_LIVE_SESSIONS: LiveSessionDto[] = [
  {
    id: "sess-1",
    title: "Calculus Integration Techniques",
    description: "Deep dive into integration by parts and substitution",
    startTime: "2026-06-28T10:00:00.000Z",
    endTime: "2026-06-28T11:00:00.000Z",
    status: "live",
    canJoin: true,
    meetingUrl: "https://meet.example.com/sess-1",
    subjectName: "Mathematics",
    className: "SS2 A",
    teacherName: "Mrs Blessing Okoro",
  },
  {
    id: "sess-2",
    title: "Electro Magnetic Induction",
    description: "Faraday's law and Lenz's law explained",
    startTime: "2026-06-28T12:00:00.000Z",
    endTime: "2026-06-28T13:00:00.000Z",
    status: "scheduled",
    canJoin: false,
    subjectName: "Physics",
    className: "SS2 A",
    teacherName: "Mr Maxwell Ben",
  },
  {
    id: "sess-3",
    title: "Organic Chemistry Synthesis",
    description: "Mechanisms of organic reactions",
    startTime: "2026-06-28T14:00:00.000Z",
    endTime: "2026-06-28T15:00:00.000Z",
    status: "scheduled",
    canJoin: false,
    subjectName: "Chemistry",
    className: "SS2 A",
    teacherName: "Mr Ezra John",
  },
];

// ─── Session Detail (mirrors GET /api/v1/academic/live-sessions/{sessionId}) ──
export const DEMO_SESSION_DETAIL: LiveSessionDetailDto = {
  ...DEMO_LIVE_SESSIONS[0],
  totalParticipants: 24,
  totalClassStudents: 30,
  participants: [
    { id: "p1", name: "Mrs Blessing Okoro", role: "host" },
    { id: "p2", name: "Michael Dave", role: "student" },
    { id: "p3", name: "Sarah Davis", role: "student" },
    { id: "p4", name: "Alex Johnson", role: "student" },
    { id: "p5", name: "Godson Will", role: "student" },
  ],
};

// ─── Messages (mirrors GET /api/v1/academic/live-sessions/{sessionId}/messages)
export const DEMO_MESSAGES: LiveSessionMessageDto[] = [
  {
    id: "msg-1",
    content: "Welcome everyone! Today we'll cover calculus integration techniques.",
    senderId: "p1",
    senderName: "Mrs Blessing Okoro",
    senderProfilePicture: null,
    createdAt: "2026-06-28T10:02:00.000Z",
    isMe: false,
  },
  {
    id: "msg-2",
    content: "Good morning, Mrs Sarah!",
    senderId: "p2",
    senderName: "John Smith",
    senderProfilePicture: null,
    createdAt: "2026-06-28T10:07:00.000Z",
    isMe: false,
  },
  {
    id: "msg-3",
    content: "Can you please share the formula on screen?",
    senderId: "p3",
    senderName: "Emma Wilson",
    senderProfilePicture: null,
    createdAt: "2026-06-28T10:08:00.000Z",
    isMe: false,
  },
];

// ─── Questions (mirrors ClassActivityQuestionsResponseDto.data) ───────────────
export const DEMO_QUESTIONS: QuestionDto[] = [
  {
    id: "q-1",
    text: "Evaluate: ∫(3x³−4x+7)dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "3x⁴−4x²+7x+C" },
      { label: "B", text: "43x⁴−4x+7x+C" },
      { label: "C", text: "3x⁴−2x²+7x+C" },
      { label: "D", text: "12x⁴−2x²+7x+C" },
    ],
    points: 1,
    order: 1,
  },
  {
    id: "q-2",
    text: "Find: ∫5x²dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "5x³³ + C" },
      { label: "B", text: "5x³+C" },
      { label: "C", text: "5x²+C" },
      { label: "D", text: "15x+C" },
    ],
    points: 1,
    order: 2,
  },
  {
    id: "q-3",
    text: "Find: ∫5x²dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "5x³³ + C" },
      { label: "B", text: "5x³+C" },
      { label: "C", text: "5x²+C" },
      { label: "D", text: "15x+C" },
    ],
    points: 1,
    order: 3,
  },
  {
    id: "q-4",
    text: "Find: ∫5x²dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "5x³³ + C" },
      { label: "B", text: "5x³+C" },
      { label: "C", text: "5x²+C" },
      { label: "D", text: "15x+C" },
    ],
    points: 1,
    order: 4,
  },
  {
    id: "q-5",
    text: "Find: ∫5x²dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "5x³³ + C" },
      { label: "B", text: "5x³+C" },
      { label: "C", text: "5x²+C" },
      { label: "D", text: "15x+C" },
    ],
    points: 1,
    order: 5,
  },
  {
    id: "q-6",
    text: "Find: ∫5x²dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "5x³³ + C" },
      { label: "B", text: "5x³+C" },
      { label: "C", text: "5x²+C" },
      { label: "D", text: "15x+C" },
    ],
    points: 1,
    order: 6,
  },
  {
    id: "q-7",
    text: "Evaluate: ∫(3x³−4x+7)dx",
    type: "multiple_choice",
    options: [
      { label: "A", text: "3x⁴−4x²+7x+C" },
      { label: "B", text: "43x⁴−4x+7x+C" },
      { label: "C", text: "3x⁴−2x²+7x+C" },
      { label: "D", text: "12x⁴−2x²+7x+C" },
    ],
    points: 1,
    order: 7,
  },
];

// ─── Start Activity Response (mirrors POST .../start) ─────────────────────────
export const DEMO_START_ACTIVITY: StartActivityResponseDto = {
  classActivityId: "act-1",
  attemptId: "attempt-1",
  startTime: "2026-06-28T10:00:00.000Z",
  duration: "20 mins",
  status: "pending",
  answers: {},
};

// ─── Learning Materials (mirrors LearningMaterialDto[]) ──────────────────────
export const DEMO_MATERIALS: LearningMaterialDto[] = [
  { id: "mat-1", name: "Calculus Integration - Full Notes", fileType: "pdf", duration: null, views: 142 },
  { id: "mat-2", name: "Electromagnetic Induction Slides", fileType: "pdf", duration: null, views: 98 },
  { id: "mat-3", name: "Organic Chemistry Synthesis Recap", fileType: "doc", duration: null, views: 67 },
  { id: "mat-4", name: "Integration Techniques - Video Lesson", fileType: "video", duration: "24:30", views: 210 },
  { id: "mat-5", name: "Past Questions - Calculus", fileType: "pdf", duration: null, views: 305 },
  { id: "mat-6", name: "Physics Lab Report Template", fileType: "doc", duration: null, views: 44 },
];

// ─── Assignment Meta (UI-only, no direct API equivalent) ─────────────────────
// TODO: derive from class activity endpoint once confirmed
export const ASSIGNMENT_META = {
  title: "Week 4 - Calculus Integration Techniques",
  subject: "Mathematics",
  teacher: "Mrs Blessing Okoro",
  dueDate: "Sep 12 at 10:59 AM",
  durationMinutes: 20,
  instructions: [
    "Read each question carefully",
    "Solve all problems using the methods taught in today's class",
    "Show all your workings clearly",
    "You can use provided materials if needed",
    "Review your answers before submitting",
    "Submit before the due date to avoid penalties",
  ],
};