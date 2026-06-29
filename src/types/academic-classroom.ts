// ─── Tab Navigation ───────────────────────────────────────────────────────────
export type ClassroomTab = "live-classes" | "learning-roadmap" | "learning-materials";

// ─── API DTOs (mirrors backend exactly) ──────────────────────────────────────

export type LiveSessionStatus = "scheduled" | "live" | "completed" | "cancelled";

/** GET /api/v1/academic/live-sessions */
export interface LiveSessionDto {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO date-time
  endTime: string;   // ISO date-time
  status: LiveSessionStatus;
  canJoin: boolean;  // whether THIS student can join now
  meetingUrl?: string;
  subjectName: string;
  className: string;
  teacherName: string;
}

/** GET /api/v1/academic/live-sessions/{sessionId} */
export interface LiveSessionDetailDto extends LiveSessionDto {
  totalParticipants: number;
  totalClassStudents: number;
  participants: ParticipantDto[];
}

export interface ParticipantDto {
  id: string;
  name: string;
  profilePicture?: string | null;
  role?: string;
}

/** GET /api/v1/academic/live-sessions/{sessionId}/messages */
export interface LiveSessionMessageDto {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderProfilePicture: object | null;
  createdAt: string; // ISO date-time
  isMe: boolean;
}

/** POST /api/v1/academic/live-sessions/{sessionId}/messages */
export interface SendLiveSessionMessageDto {
  content: string;
}

// ─── Questions ────────────────────────────────────────────────────────────────

export type QuestionType = "multiple_choice" | "true_false" | "short_answer";

export interface QuestionOptionDto {
  label: string; // e.g. "A"
  text: string;  // e.g. "5x2+C"
}

export interface QuestionDto {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOptionDto[] | null;
  points: number;
  order: number;
}

export interface ClassActivityQuestionsResponseDto {
  data: QuestionDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** POST /api/v1/academic/class-activities/{classActivityId}/start */
export interface StartActivityResponseDto {
  classActivityId: string;
  attemptId: string;
  startTime: string; // ISO date-time
  duration: string;  // e.g. "45 mins"
  status: "pending" | "completed";
  answers: Record<string, string>; // questionId → selected option text
}

// ─── Learning Materials ───────────────────────────────────────────────────────

export type MaterialFileType = "video" | "audio" | "pdf" | "image" | "doc";

export interface LearningMaterialDto {
  id: string;
  name: string;
  fileType: MaterialFileType;
  duration: string | null;
  views: number;
}

// ─── Local UI-only types (not from API) ──────────────────────────────────────

export type NoteTab = "notes" | "materials" | "ai-summary";

/**
 * Answers built locally before submission.
 * key   → QuestionDto.id
 * value → QuestionOptionDto.label (e.g. "A", "B", "C", "D")
 *
 * Matches submit payload shape: { "q-uuid-1": "A" }
 */
export type AnswerMap = Record<string, string>;

export type ReminderType = "Class Session" | "Assignment" | "Exam/Test";
export type RepeatOption = "Once" | "Daily" | "Weekly";
export type NotificationChannel = "inWebsite" | "email" | "sms";

export interface ReminderForm {
  type: ReminderType;
  title: string;
  date: string;
  repeat: RepeatOption;
  time: string;
  description: string;
  channels: NotificationChannel[];
}

// ─── View state machine ───────────────────────────────────────────────────────
export type ClassroomView =
  | "list"             // Live Classes card list
  | "live"             // Inside live class
  | "replay"           // Post-class replay (completed session)
  | "start-assignment" // Assignment brief before starting
  | "questions"        // MCQ questions
  | "incomplete"       // Submission blocked — unanswered questions
  | "completed";       // Assignment submitted successfully