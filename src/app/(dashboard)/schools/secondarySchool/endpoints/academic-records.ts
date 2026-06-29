// endpoints/academics-record.ts
//
// Dummy-data fetchers for the Academics → Records flow. Each function returns
// a Promise with an artificial delay so loading states behave like real
// network calls. Swap the body of each function for a real `fetch(...)` call
// against the BFF proxy once the upstream endpoints exist — keep the return
// shapes identical so components don't need to change.

import type {
  AcademicRecordOverview,
  AcademicHistoryYear,
  TranscriptData,
  ReportCardDetail,
  AcademicDocument,
} from "@/types/academic-record";

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ── Overview ───────────────────────────────────────────────────────────────

const OVERVIEW_DUMMY: AcademicRecordOverview = {
  academicYear: "2025/2026",
  term: "First",
  student: {
    fullName: "Emma Wilson",
    className: "10th Grade - Section A",
    studentId: "STU0001",
  },
  summary: {
    averageScore: 89,
    totalScore: 534,
    numberOfSubjects: 6,
    attendancePercentage: 91.6,
    gpa: "3.8",
    completedCredits: "18/24",
    classRank: "5th/120",
  },
  subjects: [
    {
      id: "math",
      name: "Math",
      teacher: "Mr. Adams",
      credits: 4,
      gpa: 3.8,
      attendancePercentage: 92,
      grade: "A",
      detail: {
        midtermScore: 91,
        midtermTotal: 100,
        finalScore: 94,
        finalTotal: 100,
        assignmentsCompleted: 14,
        assignmentsTotal: 15,
        quizzesPassed: 9,
        quizzesTotal: 10,
      },
    },
    {
      id: "science",
      name: "Science",
      teacher: "Ms. Lee",
      credits: 4,
      gpa: 3.8,
      attendancePercentage: 92,
      grade: "A",
      detail: {
        midtermScore: 88,
        midtermTotal: 100,
        finalScore: 90,
        finalTotal: 100,
        assignmentsCompleted: 13,
        assignmentsTotal: 15,
        quizzesPassed: 8,
        quizzesTotal: 10,
      },
    },
    {
      id: "english",
      name: "English",
      teacher: "Mrs. Taylor",
      credits: 4,
      gpa: 3.7,
      attendancePercentage: 94,
      grade: "A-",
      detail: {
        midtermScore: 90,
        midtermTotal: 100,
        finalScore: 92,
        finalTotal: 100,
        assignmentsCompleted: 15,
        assignmentsTotal: 15,
        quizzesPassed: 10,
        quizzesTotal: 10,
      },
    },
    {
      id: "history",
      name: "History",
      teacher: "Mr. Okon",
      credits: 3,
      gpa: 3.2,
      attendancePercentage: 90,
      grade: "B+",
      detail: {
        midtermScore: 80,
        midtermTotal: 100,
        finalScore: 85,
        finalTotal: 100,
        assignmentsCompleted: 11,
        assignmentsTotal: 15,
        quizzesPassed: 7,
        quizzesTotal: 10,
      },
    },
    {
      id: "computer-science",
      name: "Computer Science",
      teacher: "Mr. T",
      credits: 4,
      gpa: 4.0,
      attendancePercentage: 100,
      grade: "A+",
      detail: {
        midtermScore: 96,
        midtermTotal: 100,
        finalScore: 98,
        finalTotal: 100,
        assignmentsCompleted: 15,
        assignmentsTotal: 15,
        quizzesPassed: 10,
        quizzesTotal: 10,
      },
    },
    {
      id: "physics",
      name: "Physics",
      teacher: "Mr. Thankgod",
      credits: 4,
      gpa: 4.0,
      attendancePercentage: 100,
      grade: "A+",
      detail: {
        midtermScore: 85,
        midtermTotal: 100,
        finalScore: 87,
        finalTotal: 100,
        assignmentsCompleted: 15,
        assignmentsTotal: 15,
        quizzesPassed: 10,
        quizzesTotal: 10,
      },
    },
  ],
  teacherRemark:
    "Emma demonstrates exceptional dedication and consistently performs above expectations. Her analytical skills are outstanding.",
  teacherName: "Class Teacher",
  principalRemark: "Excellent result. Keep up the good work.",
  principalName: "Admin",
};

export async function fetchAcademicRecordOverview(): Promise<AcademicRecordOverview> {
  return delay(OVERVIEW_DUMMY);
}

// ── Academic History ────────────────────────────────────────────────────────

const HISTORY_DUMMY: AcademicHistoryYear[] = [
  {
    id: "2024-2025",
    academicYear: "2024-2025",
    gradeLabel: "9th Grade",
    termGpa: 3.6,
    classRank: "#6/120",
    subjects: [
      { name: "Algebra I", credits: 4, grade: "A" },
      { name: "Biology", credits: 4, grade: "A-" },
      { name: "English", credits: 4, grade: "B+" },
      { name: "English 9", credits: 3, grade: "B" },
      { name: "World History", credits: 3, grade: "A+" },
      { name: "Physical Ed.", credits: 1, grade: "A" },
    ],
  },
  {
    id: "2023-2024",
    academicYear: "2023-2024",
    gradeLabel: "8th Grade",
    termGpa: 3.6,
    classRank: "#8/120",
    subjects: [
      { name: "Algebra I", credits: 4, grade: "A" },
      { name: "Biology", credits: 4, grade: "A-" },
    ],
  },
];

export async function fetchAcademicHistory(): Promise<AcademicHistoryYear[]> {
  return delay(HISTORY_DUMMY);
}

// ── Transcript ───────────────────────────────────────────────────────────────

const TRANSCRIPT_DUMMY: TranscriptData = {
  student: {
    fullName: "Emma Wilson",
    studentId: "STU0001",
    currentGrade: "10th Grade",
    cumulativeGpa: 3.8,
  },
  terms: [
    {
      id: "current",
      label: "Current Term — 2025/2026",
      isCurrent: true,
      subjects: [
        { name: "Math", teacher: "Mr. Adams", credits: 4, score: 94, grade: "A" },
        { name: "Science", teacher: "Ms. Lee", credits: 4, score: 90, grade: "A" },
        { name: "English", teacher: "Mrs. Taylor", credits: 4, score: 93, grade: "A" },
        { name: "History", teacher: "Mr. Okon", credits: 4, score: 85, grade: "B+" },
        { name: "Computer Science", teacher: "Mr. T", credits: 4, score: 98, grade: "A+" },
        { name: "Physics", teacher: "Mr. Thankgod", credits: 4, score: 87, grade: "B+" },
      ],
    },
    {
      id: "2024-2025",
      label: "2024-2025 — 9th Grade",
      isCurrent: false,
      termGpa: 3.7,
      classRank: "#6/120",
      subjects: [
        { name: "Algebra I", teacher: "Mr. Adams", credits: 4, score: 94, grade: "A" },
        { name: "Biology", teacher: "Ms. Lee", credits: 4, score: 90, grade: "A" },
        { name: "English 9", teacher: "Mrs. Taylor", credits: 4, score: 93, grade: "A" },
        { name: "World History", teacher: "Mr. Okon", credits: 4, score: 85, grade: "B+" },
        { name: "Intro to CS", teacher: "Mr. T", credits: 4, score: 98, grade: "A+" },
        { name: "Physical Ed.", teacher: "Mr. Thankgod", credits: 4, score: 87, grade: "B+" },
      ],
    },
    {
      id: "2023-2024",
      label: "2023-2024 — 8th Grade",
      isCurrent: false,
      subjects: [
        { name: "Algebra I", teacher: "Mr. Adams", credits: 4, score: 94, grade: "A" },
        { name: "Biology", teacher: "Ms. Lee", credits: 4, score: 90, grade: "A" },
      ],
    },
  ],
};

export async function fetchTranscript(): Promise<TranscriptData> {
  return delay(TRANSCRIPT_DUMMY);
}

// ── Report Cards ─────────────────────────────────────────────────────────────

const REPORT_CARDS_DUMMY: ReportCardDetail[] = [
  {
    id: "term1-2025-2026",
    termLabel: "Term 1-2025/2026",
    dateLabel: "November 15, 2025",
    gpa: 3.7,
    classRank: "#6/120",
    status: "Excellent",
    subjects: [
      { name: "Math", score: 93, grade: "A" },
      { name: "Science", score: 89, grade: "A-" },
      { name: "English", score: 92, grade: "A" },
      { name: "History", score: 84, grade: "B+" },
      { name: "Computer Science", score: 97, grade: "A+" },
      { name: "Physics", score: 86, grade: "B+" },
    ],
    teacherComment:
      "Emma demonstrates exceptional dedication and consistently performs above expectations. Her analytical skills are outstanding.",
  },
  {
    id: "term2-2024-2025",
    termLabel: "Term 2-2024/2025",
    dateLabel: "February 25, 2026",
    gpa: 3.8,
    classRank: "#5/120",
    status: "Outstanding",
    subjects: [
      { name: "Math", score: 95, grade: "A" },
      { name: "Science", score: 91, grade: "A" },
      { name: "English", score: 90, grade: "A-" },
      { name: "History", score: 88, grade: "B+" },
      { name: "Computer Science", score: 99, grade: "A+" },
      { name: "Physics", score: 89, grade: "A-" },
    ],
    teacherComment:
      "A strong term overall. Emma continues to show great improvement, especially in the sciences.",
  },
];

export async function fetchReportCards(): Promise<ReportCardDetail[]> {
  return delay(REPORT_CARDS_DUMMY);
}

// ── Documents ─────────────────────────────────────────────────────────────────

const DOCUMENTS_DUMMY: AcademicDocument[] = [
  { id: "doc-1", title: "Enrollment Certificate", dateLabel: "Sep 2, 2024", fileType: "PDF", kind: "certificate" },
  { id: "doc-2", title: "Term 1 Report Card", dateLabel: "November 15, 2025", fileType: "PDF", kind: "report-card" },
  { id: "doc-3", title: "Term 2 Report Card", dateLabel: "February 25, 2026", fileType: "PDF", kind: "report-card" },
  { id: "doc-4", title: "Official Transcript", dateLabel: "Mar 1, 2026", fileType: "PDF", kind: "transcript" },
  { id: "doc-5", title: "Medical Clearance", dateLabel: "Aug 20, 2024", fileType: "PDF", kind: "medical" },
  { id: "doc-6", title: "Scholarship Letter", dateLabel: "Jan 10, 2025", fileType: "PDF", kind: "scholarship" },
];

export async function fetchAcademicDocuments(): Promise<AcademicDocument[]> {
  return delay(DOCUMENTS_DUMMY);
}