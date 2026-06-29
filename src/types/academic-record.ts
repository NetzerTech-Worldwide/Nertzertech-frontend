export interface RecordStudent {
  fullName: string;
  className: string;
  studentId: string;
}

export interface RecordSummary {
  averageScore: number;
  totalScore: number;
  numberOfSubjects: number;
  attendancePercentage: number;
  gpa: string;
  completedCredits: string; // e.g. "18/24"
  classRank: string; // e.g. "5th/120"
}

export interface RecordSubjectDetail {
  midtermScore: number;
  midtermTotal: number;
  finalScore: number;
  finalTotal: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  quizzesPassed: number;
  quizzesTotal: number;
}

export interface RecordSubject {
  id: string;
  name: string;
  teacher: string;
  credits: number;
  gpa: number;
  attendancePercentage: number;
  grade: string;
  detail: RecordSubjectDetail;
}

export interface AcademicRecordOverview {
  academicYear: string;
  term: string;
  student: RecordStudent;
  summary: RecordSummary;
  subjects: RecordSubject[];
  teacherRemark: string;
  teacherName: string;
  principalRemark: string;
  principalName: string;
}

// ── Academic History ────────────────────────────────────────────────────────

export interface AcademicHistorySubject {
  name: string;
  credits: number;
  grade: string;
}

export interface AcademicHistoryYear {
  id: string;
  academicYear: string; // "2024-2025"
  gradeLabel: string; // "9th Grade"
  termGpa: number;
  classRank: string; // "#6/120"
  subjects: AcademicHistorySubject[];
}

// ── Transcript ───────────────────────────────────────────────────────────────

export interface TranscriptSubjectRow {
  name: string;
  teacher: string;
  credits: number;
  score: number;
  grade: string;
}

export interface TranscriptTerm {
  id: string;
  label: string; // "Current Term — 2025/2026"
  isCurrent: boolean;
  termGpa?: number;
  classRank?: string;
  subjects: TranscriptSubjectRow[];
}

export interface TranscriptData {
  student: {
    fullName: string;
    studentId: string;
    currentGrade: string;
    cumulativeGpa: number;
  };
  terms: TranscriptTerm[];
}

// ── Report Cards ─────────────────────────────────────────────────────────────

export interface ReportCardSubjectRow {
  name: string;
  score: number;
  grade: string;
}

export interface ReportCardSummary {
  id: string;
  termLabel: string; // "Term 1-2025/2026"
  dateLabel: string; // "November 15, 2025"
  gpa: number;
  classRank: string;
  status: string; // "Excellent" | "Outstanding" | ...
}

export interface ReportCardDetail extends ReportCardSummary {
  subjects: ReportCardSubjectRow[];
  teacherComment: string;
}

// ── Documents ─────────────────────────────────────────────────────────────────

export type DocumentKind =
  | "certificate"
  | "report-card"
  | "transcript"
  | "medical"
  | "scholarship"
  | "other";

export interface AcademicDocument {
  id: string;
  title: string;
  dateLabel: string;
  fileType: string; // "PDF"
  kind: DocumentKind;
}