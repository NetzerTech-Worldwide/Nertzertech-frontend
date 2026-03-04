"use client";

import { Fragment, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  FileText,
  Info,
  Medal,
  Search,
  Trophy,
} from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dev-netzertech-backend.vercel.app";
const OVERVIEW_PAGE_SIZE = 6;

const RECORDS_ENDPOINTS = {
  terms: "/api/v1/records/terms",
  reportCard: "/api/v1/records/report-card",
  performance: "/api/v1/records/performance",
  download: "/api/v1/records/download",
} as const;

const TAB_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "academic-history", label: "Academic History" },
  { key: "transcript", label: "Transcript" },
  { key: "report-cards", label: "Report Cards" },
  { key: "documents", label: "Documents" },
] as const;

const TOKEN_STORAGE_KEYS = ["nt_access_token", "accessToken", "token", "auth_token", "jwt", "nt_auth", "auth"] as const;

const TERM_ORDER: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  "1st": 1,
  "2nd": 2,
  "3rd": 3,
};

type RecordTabKey = (typeof TAB_ITEMS)[number]["key"];
type SortDirection = "asc" | "desc";

type TermDto = {
  academicYear: string;
  term: string;
  label: string;
};

type ReportCardStudentInfoDto = {
  fullName: string;
  className: string;
  studentId: string;
};

type ReportCardSummaryDto = {
  averageScore: number;
  totalScore: number;
  numberOfSubjects: number;
  attendancePercentage: number;
  gpa: string;
  completedCredits: string;
  classRank: string;
};

type SubjectRecordDto = {
  subject: string;
  assignmentScore: number;
  testScore: number;
  examScore: number;
  totalScore: number;
  teacher: string;
  credits: string;
  attendancePercentage: number | null;
  grade: string;
  remark: string;
};

type ReportCardDto = {
  academicYear: string;
  term: string;
  student: ReportCardStudentInfoDto;
  summary: ReportCardSummaryDto;
  subjects: SubjectRecordDto[];
  teacherRemark: string;
  teacherName: string;
  principalRemark: string;
  principalName: string;
};

type PerformanceAnalyticsDto = {
  termLabel: string;
  averageScore: number;
};

type DownloadPayload = { kind: "url" | "base64"; value: string } | null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
}

function pickString(source: Record<string, unknown>, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const raw = asText(source[key]).trim();
    if (raw) return raw;
  }
  return fallback;
}

function pickNumber(source: Record<string, unknown>, keys: string[], fallback = 0): number {
  for (const key of keys) {
    const value = asNumber(source[key], Number.NaN);
    if (Number.isFinite(value)) return value;
  }
  return fallback;
}

function termKey(term: Pick<TermDto, "academicYear" | "term">): string {
  return `${term.academicYear}::${term.term}`;
}

function parseTab(value: string | null): RecordTabKey {
  const matched = TAB_ITEMS.find((item) => item.key === value);
  return matched?.key ?? "overview";
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.floor(parsed));
}

function parseSort(value: string | null): SortDirection {
  return value === "desc" ? "desc" : "asc";
}

function getTermOrder(term: string): number {
  const normalized = term.trim().toLowerCase();
  if (TERM_ORDER[normalized] !== undefined) return TERM_ORDER[normalized];
  const numberMatch = normalized.match(/\d+/);
  return numberMatch ? Number(numberMatch[0]) : 0;
}

function getAcademicYearStart(value: string): number {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function sortTermsDesc(terms: TermDto[]): TermDto[] {
  return [...terms].sort((left, right) => {
    const yearDiff = getAcademicYearStart(right.academicYear) - getAcademicYearStart(left.academicYear);
    if (yearDiff !== 0) return yearDiff;

    const termDiff = getTermOrder(right.term) - getTermOrder(left.term);
    if (termDiff !== 0) return termDiff;

    return right.label.localeCompare(left.label);
  });
}

function toGpa(averageScore: number): number {
  const raw = averageScore / 25;
  const bounded = Math.max(0, Math.min(4, raw));
  return Number(bounded.toFixed(1));
}

function resolveSummaryGpa(summary?: ReportCardSummaryDto | null): number | null {
  if (!summary) return null;
  const fromApi = asNumber(summary.gpa, Number.NaN);
  if (Number.isFinite(fromApi)) {
    const bounded = Math.max(0, Math.min(4, fromApi));
    return Number(bounded.toFixed(2));
  }
  if (Number.isFinite(summary.averageScore)) {
    return toGpa(summary.averageScore);
  }
  return null;
}

function formatSummaryGpa(summary?: ReportCardSummaryDto | null): string {
  const value = resolveSummaryGpa(summary);
  return value === null ? "--" : value.toFixed(1);
}

function formatCompletedCredits(summary?: ReportCardSummaryDto | null): string {
  if (!summary) return "-- / --";

  const fromApi = summary.completedCredits.trim();
  if (fromApi) {
    const normalized = fromApi.match(/^(.+?)\s*\/\s*(.+)$/);
    if (normalized) {
      return `${normalized[1].trim()} / ${normalized[2].trim()}`;
    }
    return fromApi;
  }

  return `${summary.numberOfSubjects} / ${summary.numberOfSubjects}`;
}

function parseClassRank(rankValue: string): { valueText: string; outOfText: string; inlineText: string } {
  const raw = rankValue.trim();
  if (!raw) return { valueText: "N/A", outOfText: "out of N/A", inlineText: "N/A" };

  const slashMatch = raw.match(/(\d+)[^\d]*\/[^\d]*(\d+)/);
  if (slashMatch) {
    const position = Number(slashMatch[1]);
    const total = Number(slashMatch[2]);
    return {
      valueText: `#${position}`,
      outOfText: `out of ${total}`,
      inlineText: `#${position}/${total}`,
    };
  }

  const outOfMatch = raw.match(/(\d+)[^\d]+out\s*of[^\d]*(\d+)/i);
  if (outOfMatch) {
    const position = Number(outOfMatch[1]);
    const total = Number(outOfMatch[2]);
    return {
      valueText: `#${position}`,
      outOfText: `out of ${total}`,
      inlineText: `#${position}/${total}`,
    };
  }

  const single = raw.match(/(\d+)/);
  if (single) {
    const position = Number(single[1]);
    return { valueText: `#${position}`, outOfText: "out of N/A", inlineText: `#${position}` };
  }

  return { valueText: raw, outOfText: "", inlineText: raw };
}

function formatSubjectGpa(totalScore: number): string {
  if (!Number.isFinite(totalScore)) return "--";
  const value = totalScore <= 4 ? totalScore : toGpa(totalScore);
  return value.toFixed(1);
}

function formatSubjectScore(totalScore: number): string {
  if (!Number.isFinite(totalScore)) return "N/A";
  return totalScore > 4 ? `${Math.round(totalScore)}%` : totalScore.toFixed(1);
}

function getInitials(name: string): string {
  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "ST";
}

function classifyTermPerformance(gpaValue: number): string {
  if (gpaValue >= 3.8) return "Outstanding";
  if (gpaValue >= 3.5) return "Excellent";
  if (gpaValue >= 3.0) return "Good";
  return "Developing";
}

function gradeBadgeClass(grade: string): string {
  if (grade.startsWith("A")) return "bg-[#E8F2F9] text-[#2A6F98]";
  if (grade.startsWith("B")) return "bg-[#FCEEE7] text-[#DD7A43]";
  if (grade.startsWith("C")) return "bg-[#FDF3E3] text-[#C38A2A]";
  if (grade.startsWith("D")) return "bg-[#FDEBEC] text-[#CA4C62]";
  return "bg-slate-100 text-slate-600";
}

function asApiErrorMessage(body: unknown, status: number): string {
  if (isRecord(body)) {
    const primary = body.message;
    if (typeof primary === "string" && primary.trim()) return primary;
    const nested = body.error;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  if (status === 401) return "Authentication failed. Please sign in with a valid student token.";
  return `Request failed with status ${status}.`;
}

function unwrapApiPayload(payload: unknown): unknown {
  if (isRecord(payload)) {
    if ("data" in payload) return payload.data;
    if ("result" in payload) return payload.result;
  }
  return payload;
}

async function fetchRecordsEndpoint(
  path: string,
  options: {
    token: string;
    query?: Record<string, string | number | undefined>;
  }
): Promise<unknown> {
  const url = new URL(path, API_BASE_URL);
  Object.entries(options.query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && `${value}`.trim() !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const headers: HeadersInit = {
    Accept: "application/json, text/plain, */*",
  };
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(asApiErrorMessage(body, response.status));
  }

  return unwrapApiPayload(body);
}

function normalizeTerms(payload: unknown): TermDto[] {
  if (!Array.isArray(payload)) return [];
  return payload
    .filter((item) => isRecord(item))
    .map((item) => ({
      academicYear: asString(item.academicYear),
      term: asString(item.term),
      label: asString(item.label) || `${asString(item.term)} ${asString(item.academicYear)}`.trim(),
    }))
    .filter((item) => item.academicYear && item.term);
}

function normalizePerformance(payload: unknown): PerformanceAnalyticsDto[] {
  if (!Array.isArray(payload)) return [];
  return payload
    .filter((item) => isRecord(item))
    .map((item) => ({
      termLabel: asString(item.termLabel),
      averageScore: asNumber(item.averageScore),
    }))
    .filter((item) => item.termLabel);
}

function normalizeReportCard(payload: unknown, fallbackTerm: TermDto): ReportCardDto {
  const source = isRecord(payload) ? payload : {};
  const studentRaw = isRecord(source.student) ? source.student : {};
  const summaryRaw = isRecord(source.summary) ? source.summary : {};
  const teacherName = pickString(source, ["teacherName", "classTeacher", "homeroomTeacher"]);

  const subjects = Array.isArray(source.subjects)
    ? source.subjects
        .filter((item) => isRecord(item))
        .map((item) => {
          const assignmentScore = pickNumber(item, ["assignmentScore", "assignment", "assignmentTotal", "continuousAssessment"], 0);
          const testScore = pickNumber(item, ["testScore", "midtermScore", "midterm", "quizScore"], 0);
          const examScore = pickNumber(item, ["examScore", "finalScore", "exam", "finalExam"], 0);
          const totalScore = pickNumber(item, ["totalScore", "score", "overallScore", "percentage", "finalMark"], assignmentScore + testScore + examScore);
          const subjectAttendance = pickNumber(item, ["attendancePercentage", "attendance", "subjectAttendance"], Number.NaN);

          // Records payloads may omit subject-level teacher/credits; fallback to term-level teacher and "N/A".
          return {
            subject: pickString(item, ["subject", "subjectName", "name", "course"], "Untitled Subject"),
            assignmentScore,
            testScore,
            examScore,
            totalScore,
            teacher: pickString(item, ["teacher", "teacherName", "instructor", "instructorName"], teacherName || "N/A"),
            credits: pickString(item, ["credits", "credit", "creditUnit", "creditUnits"], "N/A"),
            attendancePercentage: Number.isFinite(subjectAttendance) ? subjectAttendance : null,
            grade: pickString(item, ["grade", "letterGrade", "resultGrade"], "N/A"),
            remark: pickString(item, ["remark", "comment", "teacherRemark"], "No remark"),
          };
        })
    : [];

  return {
    academicYear: pickString(source, ["academicYear"], fallbackTerm.academicYear),
    term: pickString(source, ["term"], fallbackTerm.term),
    student: {
      fullName: pickString(studentRaw, ["fullName", "name", "studentName"], "Student"),
      className: pickString(studentRaw, ["className", "class", "classLevel"], "Class N/A"),
      studentId: pickString(studentRaw, ["studentId", "id", "admissionNumber"], "N/A"),
    },
    summary: {
      averageScore: pickNumber(summaryRaw, ["averageScore", "average", "avgScore"], Number.NaN),
      totalScore: pickNumber(summaryRaw, ["totalScore", "score", "sumScore"], Number.NaN),
      numberOfSubjects: pickNumber(summaryRaw, ["numberOfSubjects", "subjectsCount", "totalSubjects"], 0),
      attendancePercentage: pickNumber(summaryRaw, ["attendancePercentage", "attendance", "attendanceRate"], Number.NaN),
      gpa: pickString(summaryRaw, ["gpa", "GPA", "termGpa"]),
      completedCredits: pickString(summaryRaw, ["completedCredits", "creditsCompleted", "creditStatus"]),
      classRank: pickString(summaryRaw, ["classRank", "rank", "position"]),
    },
    subjects,
    teacherRemark: pickString(source, ["teacherRemark", "classTeacherRemark"]),
    teacherName,
    principalRemark: pickString(source, ["principalRemark"]),
    principalName: pickString(source, ["principalName"]),
  };
}

function parseDownloadString(value: string): DownloadPayload {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return { kind: "url", value: trimmed };
  if (trimmed.startsWith("data:application/pdf")) return { kind: "base64", value: trimmed };
  if (/^[A-Za-z0-9+/=\s]+$/.test(trimmed)) return { kind: "base64", value: trimmed.replace(/\s+/g, "") };
  return null;
}

function normalizeDownloadPayload(payload: unknown): DownloadPayload {
  if (typeof payload === "string") {
    return parseDownloadString(payload);
  }
  if (isRecord(payload)) {
    const candidates = ["url", "downloadUrl", "fileUrl", "file", "pdf", "base64", "data"];
    for (const key of candidates) {
      const value = payload[key];
      if (typeof value === "string") {
        const parsed = parseDownloadString(value);
        if (parsed) return parsed;
      }
    }
  }
  return null;
}

function tryParseToken(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (isRecord(parsed)) {
        const keys = ["accessToken", "token", "jwt", "authToken"];
        for (const key of keys) {
          const value = parsed[key];
          if (typeof value === "string" && value.trim()) return value.trim();
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  return trimmed;
}

function getStoredAuthToken(): string {
  if (typeof window === "undefined") return "";
  for (const key of TOKEN_STORAGE_KEYS) {
    try {
      const localValue = window.localStorage.getItem(key);
      if (localValue) {
        const token = tryParseToken(localValue);
        if (token) return token;
      }

      const sessionValue = window.sessionStorage.getItem(key);
      if (sessionValue) {
        const token = tryParseToken(sessionValue);
        if (token) return token;
      }
    } catch {
      continue;
    }
  }
  return "";
}

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== SUBJECTS_BASE && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-4 py-2 text-xs leading-none transition ${
        active ? "border-[#2A7EAF] bg-[#2A7EAF] text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}

function MetricCard({
  label,
  value,
  icon,
  iconClassName,
  subLabel,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  iconClassName: string;
  subLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#5F6368]">{label}</p>
          <p className="mt-1 text-[29px] leading-[0.95] font-semibold tracking-[-0.03em] text-[#111827]">{value}</p>
          {subLabel && <p className="mt-1 text-xs text-slate-500">{subLabel}</p>}
        </div>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md border ${iconClassName}`}>{icon}</span>
      </div>
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
      <p>{message}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-4">
      <div className="flex items-start gap-2 text-rose-700">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="space-y-2">
          <p className="text-sm">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center rounded-md border border-rose-300 bg-white px-3 py-1 text-[11px] font-medium text-rose-700 transition hover:bg-rose-100"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-7 text-center">
      <p className="text-[11px] font-medium text-slate-700">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default function RecordsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<RecordTabKey>("overview");
  const [pageSearch, setPageSearch] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [overviewPage, setOverviewPage] = useState(1);

  const [terms, setTerms] = useState<TermDto[]>([]);
  const [termsLoading, setTermsLoading] = useState(true);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [performancePoints, setPerformancePoints] = useState<PerformanceAnalyticsDto[]>([]);
  const [performanceLoading, setPerformanceLoading] = useState(true);
  const [performanceError, setPerformanceError] = useState<string | null>(null);

  const [selectedTermKey, setSelectedTermKey] = useState("");
  const [expandedOverviewSubject, setExpandedOverviewSubject] = useState<string | null>(null);
  const [expandedHistoryTerms, setExpandedHistoryTerms] = useState<string[]>([]);

  const [reportCardsByKey, setReportCardsByKey] = useState<Record<string, ReportCardDto>>({});
  const [loadingReportCardKeys, setLoadingReportCardKeys] = useState<Record<string, boolean>>({});
  const [reportCardErrors, setReportCardErrors] = useState<Record<string, string>>({});

  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const [authToken, setAuthToken] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [reloadSignal, setReloadSignal] = useState(0);

  const initializedFromQueryRef = useRef(false);
  const reportCardsRef = useRef<Record<string, ReportCardDto>>({});

  useEffect(() => {
    reportCardsRef.current = reportCardsByKey;
  }, [reportCardsByKey]);

  useEffect(() => {
    if (initializedFromQueryRef.current) return;
    if (typeof window === "undefined") return;
    initializedFromQueryRef.current = true;
    const params = new URLSearchParams(window.location.search);

    setActiveTab(parseTab(params.get("tab")));
    setPageSearch(params.get("q") ?? "");
    setSortDirection(parseSort(params.get("sort")));
    setOverviewPage(parsePage(params.get("page")));

    const yearFromUrl = params.get("year");
    const termFromUrl = params.get("term");
    if (yearFromUrl && termFromUrl) {
      setSelectedTermKey(termKey({ academicYear: yearFromUrl, term: termFromUrl }));
    }
  }, []);

  useEffect(() => {
    const token = getStoredAuthToken();
    setAuthToken(token);
    setAuthReady(true);
  }, []);

  const syncQuery = useCallback(
    (patch: Record<string, string | null | undefined>) => {
      const source = typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(source);
      Object.entries(patch).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const loadReportCard = useCallback(
    async (term: TermDto, force = false): Promise<ReportCardDto> => {
      const key = termKey(term);
      const cached = reportCardsRef.current[key];
      if (cached && !force) return cached;

      setLoadingReportCardKeys((previous) => ({ ...previous, [key]: true }));
      setReportCardErrors((previous) => {
        if (!previous[key]) return previous;
        const next = { ...previous };
        delete next[key];
        return next;
      });

      try {
        const payload = await fetchRecordsEndpoint(RECORDS_ENDPOINTS.reportCard, {
          token: authToken,
          query: {
            academicYear: term.academicYear,
            term: term.term,
          },
        });
        const normalized = normalizeReportCard(payload, term);
        setReportCardsByKey((previous) => {
          const next = { ...previous, [key]: normalized };
          reportCardsRef.current = next;
          return next;
        });
        return normalized;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch report card.";
        setReportCardErrors((previous) => ({ ...previous, [key]: message }));
        throw error;
      } finally {
        setLoadingReportCardKeys((previous) => ({ ...previous, [key]: false }));
      }
    },
    [authToken]
  );

  const retryInitialLoad = useCallback(() => {
    setReloadSignal((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    let alive = true;

    const run = async () => {
      setTermsLoading(true);
      setTermsError(null);
      setPerformanceLoading(true);
      setPerformanceError(null);

      const [termsResult, performanceResult] = await Promise.allSettled([
        fetchRecordsEndpoint(RECORDS_ENDPOINTS.terms, { token: authToken }),
        fetchRecordsEndpoint(RECORDS_ENDPOINTS.performance, { token: authToken }),
      ]);

      if (!alive) return;

      if (termsResult.status === "fulfilled") {
        setTerms(sortTermsDesc(normalizeTerms(termsResult.value)));
      } else {
        setTerms([]);
        setTermsError(termsResult.reason instanceof Error ? termsResult.reason.message : "Failed to load terms.");
      }
      setTermsLoading(false);

      if (performanceResult.status === "fulfilled") {
        setPerformancePoints(normalizePerformance(performanceResult.value));
      } else {
        setPerformancePoints([]);
        setPerformanceError(
          performanceResult.reason instanceof Error ? performanceResult.reason.message : "Failed to load performance trend."
        );
      }
      setPerformanceLoading(false);
    };

    void run();
    return () => {
      alive = false;
    };
  }, [authReady, authToken, reloadSignal]);

  useEffect(() => {
    if (!terms.length) return;
    setSelectedTermKey((current) => {
      if (current && terms.some((term) => termKey(term) === current)) return current;
      return termKey(terms[0]);
    });
  }, [terms]);

  const selectedTerm = useMemo(() => {
    if (!selectedTermKey) return null;
    return terms.find((term) => termKey(term) === selectedTermKey) ?? null;
  }, [selectedTermKey, terms]);

  useEffect(() => {
    if (!selectedTerm) return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const yearInUrl = params.get("year");
    const termInUrl = params.get("term");
    if (yearInUrl === selectedTerm.academicYear && termInUrl === selectedTerm.term) return;
    syncQuery({ year: selectedTerm.academicYear, term: selectedTerm.term });
  }, [selectedTerm, syncQuery]);

  useEffect(() => {
    if (!selectedTerm || !authReady) return;
    void loadReportCard(selectedTerm);
  }, [authReady, loadReportCard, selectedTerm]);

  const loadAllReportCards = useCallback(async () => {
    if (!terms.length) return;
    await Promise.all(
      terms.map(async (term) => {
        try {
          await loadReportCard(term);
        } catch {
          return;
        }
      })
    );
  }, [loadReportCard, terms]);

  useEffect(() => {
    if (activeTab === "academic-history" || activeTab === "transcript" || activeTab === "documents" || activeTab === "report-cards") {
      void loadAllReportCards();
    }
  }, [activeTab, loadAllReportCards]);

  const filteredTerms = useMemo(() => {
    const query = pageSearch.trim().toLowerCase();
    if (!query) return terms;
    return terms.filter((term) =>
      [term.label, term.academicYear, term.term].some((field) => field.toLowerCase().includes(query))
    );
  }, [pageSearch, terms]);

  const selectedReportCard = selectedTerm ? reportCardsByKey[selectedTermKey] ?? null : null;
  const selectedReportCardLoading = selectedTerm ? Boolean(loadingReportCardKeys[selectedTermKey]) : false;
  const selectedReportCardError = selectedTerm ? reportCardErrors[selectedTermKey] : undefined;

  const student = selectedReportCard?.student;
  const summary = selectedReportCard?.summary;

  const completedCredits = formatCompletedCredits(summary);
  const classRankDisplay = parseClassRank(summary?.classRank ?? "");

  const overviewRows = useMemo(() => {
    const query = pageSearch.trim().toLowerCase();
    const rows = selectedReportCard?.subjects ?? [];
    const filtered = rows.filter((row) => {
      if (!query) return true;
      return [row.subject, row.grade, row.remark, row.teacher, row.credits].some((field) => field.toLowerCase().includes(query));
    });

    return [...filtered].sort((left, right) =>
      sortDirection === "asc" ? left.subject.localeCompare(right.subject) : right.subject.localeCompare(left.subject)
    );
  }, [pageSearch, selectedReportCard, sortDirection]);

  const overviewTotalPages = Math.max(1, Math.ceil(overviewRows.length / OVERVIEW_PAGE_SIZE));
  useEffect(() => {
    setOverviewPage((current) => Math.min(Math.max(1, current), overviewTotalPages));
  }, [overviewTotalPages]);

  const paginatedOverviewRows = useMemo(() => {
    const start = (overviewPage - 1) * OVERVIEW_PAGE_SIZE;
    return overviewRows.slice(start, start + OVERVIEW_PAGE_SIZE);
  }, [overviewPage, overviewRows]);

  const transcriptCards = useMemo(() => {
    return terms
      .map((term) => {
        const key = termKey(term);
        const report = reportCardsByKey[key];
        return report ? { term, report } : null;
      })
      .filter((entry): entry is { term: TermDto; report: ReportCardDto } => Boolean(entry));
  }, [reportCardsByKey, terms]);

  const cumulativeGpa = useMemo(() => {
    if (!transcriptCards.length) return "--";

    const gpaValues = transcriptCards
      .map((entry) => resolveSummaryGpa(entry.report.summary))
      .filter((value): value is number => value !== null);
    if (!gpaValues.length) return "--";

    const total = gpaValues.reduce((acc, gpa) => acc + gpa, 0);
    return (total / gpaValues.length).toFixed(1);
  }, [transcriptCards]);

  const performanceInsight = useMemo(() => {
    if (!performancePoints.length) return "No performance trend available yet.";
    if (performancePoints.length === 1) {
      return `Current average score is ${performancePoints[0].averageScore.toFixed(1)}%.`;
    }

    const latest = performancePoints[performancePoints.length - 1];
    const previous = performancePoints[performancePoints.length - 2];
    const delta = latest.averageScore - previous.averageScore;
    if (delta > 0) return `Average score improved by ${delta.toFixed(1)} points compared to the previous term.`;
    if (delta < 0) return `Average score dropped by ${Math.abs(delta).toFixed(1)} points compared to the previous term.`;
    return "Average score is stable compared to the previous term.";
  }, [performancePoints]);

  const handleDownload = useCallback(
    async (term: TermDto) => {
      const key = termKey(term);
      setDownloadError(null);
      setDownloadingKey(key);

      try {
        const payload = await fetchRecordsEndpoint(RECORDS_ENDPOINTS.download, {
          token: authToken,
          query: {
            academicYear: term.academicYear,
            term: term.term,
          },
        });

        const parsed = normalizeDownloadPayload(payload);
        if (!parsed) {
          throw new Error("Download endpoint returned an unsupported payload.");
        }

        if (parsed.kind === "url") {
          window.open(parsed.value, "_blank", "noopener,noreferrer");
          return;
        }

        const dataUri = parsed.value.startsWith("data:application/pdf")
          ? parsed.value
          : `data:application/pdf;base64,${parsed.value}`;
        const anchor = document.createElement("a");
        anchor.href = dataUri;
        anchor.download = `report-card-${term.academicYear}-${term.term}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } catch (error) {
        setDownloadError(error instanceof Error ? error.message : "Failed to download the report card PDF.");
      } finally {
        setDownloadingKey(null);
      }
    },
    [authToken]
  );

  const handleTabChange = (tab: RecordTabKey) => {
    setActiveTab(tab);
    syncQuery({ tab: tab === "overview" ? null : tab });
  };

  const handleSearchChange = (value: string) => {
    setPageSearch(value);
    setOverviewPage(1);
    syncQuery({ q: value || null, page: "1" });
  };

  const handleSortToggle = () => {
    const next: SortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(next);
    setOverviewPage(1);
    syncQuery({ sort: next, page: "1" });
  };

  const handleOverviewPageChange = (page: number) => {
    const clamped = Math.min(Math.max(1, page), overviewTotalPages);
    setOverviewPage(clamped);
    syncQuery({ page: String(clamped) });
  };

  const handleSelectTerm = (term: TermDto) => {
    setSelectedTermKey(termKey(term));
    void loadReportCard(term);
  };

  const handleToggleHistoryTerm = (term: TermDto) => {
    const key = termKey(term);
    setExpandedHistoryTerms((previous) =>
      previous.includes(key) ? previous.filter((value) => value !== key) : [...previous, key]
    );
    if (!reportCardsRef.current[key]) {
      void loadReportCard(term);
    }
  };

  const retrySelectedReportCard = () => {
    if (!selectedTerm) return;
    void loadReportCard(selectedTerm, true);
  };

  const renderOverviewTab = () => {
    if (termsLoading) return <LoadingState message="Loading overview..." />;
    if (termsError) return <ErrorState message={termsError} onRetry={retryInitialLoad} />;
    if (!selectedTerm) return <EmptyState title="No terms available" description="No academic term was returned by the records API." />;
    if (selectedReportCardLoading && !selectedReportCard) return <LoadingState message="Loading report card data..." />;
    if (selectedReportCardError && !selectedReportCard) return <ErrorState message={selectedReportCardError} onRetry={retrySelectedReportCard} />;
    if (!selectedReportCard)
      return <EmptyState title="No report card data" description="Select a term to view subject performance details." />;

    return (
      <div className="space-y-5">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500">
                <th className="w-[26%] px-4 py-3 font-medium">
                  <button type="button" onClick={handleSortToggle} className="inline-flex items-center gap-1">
                    Subject
                    <ChevronDown className={`h-3 w-3 transition ${sortDirection === "asc" ? "" : "rotate-180"}`} />
                  </button>
                </th>
                <th className="w-[22%] px-2 py-3 font-medium">Teacher</th>
                <th className="w-[12%] px-2 py-3 font-medium">GPA</th>
                <th className="w-[20%] px-2 py-3 font-medium">Attendance</th>
                <th className="w-[20%] px-2 py-3 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOverviewRows.map((row) => {
                const rowKey = `${row.subject}-${row.grade}`;
                const expanded = expandedOverviewSubject === rowKey;
                const attendanceValue = row.attendancePercentage ?? summary?.attendancePercentage ?? null;
                return (
                  <Fragment key={rowKey}>
                    <tr className="border-b border-slate-100 text-sm text-slate-700">
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setExpandedOverviewSubject((previous) => (previous === rowKey ? null : rowKey))}
                          className="text-left text-[10px] font-medium text-slate-900 hover:text-[#1B628A]"
                        >
                          {row.subject}
                        </button>
                      </td>
                      <td className="px-2 py-3 text-[12px] text-slate-500">{row.teacher}</td>
                      <td className="px-2 py-3 text-[10px] font-medium text-slate-700">{formatSubjectGpa(row.totalScore)}</td>
                      <td className="px-2 py-3 text-[12px] text-slate-600">
                        {attendanceValue !== null && Number.isFinite(attendanceValue) ? `${attendanceValue.toFixed(1)}%` : "N/A"}
                      </td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${gradeBadgeClass(row.grade)}`}>
                          {row.grade}
                        </span>
                      </td>
                    </tr>
                    {expanded && (
                      <tr>
                        <td colSpan={5} className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-md bg-[#DDE6ED] px-3 py-2 text-center">
                              <p className="text-[11px] text-slate-600">Midterm Score</p>
                              <p className="mt-1 text-[16px] font-semibold text-slate-800">{Math.round(row.testScore)}</p>
                              <p className="text-[11px] text-slate-500">/100</p>
                            </div>
                            <div className="rounded-md bg-[#DDE6ED] px-3 py-2 text-center">
                              <p className="text-[11px] text-slate-600">Final Score</p>
                              <p className="mt-1 text-[16px] font-semibold text-slate-800">{Math.round(row.examScore)}</p>
                              <p className="text-[11px] text-slate-500">/100</p>
                            </div>
                            <div className="rounded-md bg-[#DDE6ED] px-3 py-2 text-center">
                              <p className="text-[11px] text-slate-600">Assignments</p>
                              <p className="mt-1 text-[16px] font-semibold text-slate-800">{Math.round(row.assignmentScore)}/100</p>
                              <p className="text-[11px] text-slate-500">completed</p>
                            </div>
                            <div className="rounded-md bg-[#DDE6ED] px-3 py-2 text-center">
                              <p className="text-[11px] text-slate-600">Remark</p>
                              <p className="mt-1 text-[12px] font-semibold text-slate-800">{row.remark}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {!paginatedOverviewRows.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-10">
                    <EmptyState title="No subjects found" description="Try adjusting your search query for this term." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {overviewRows.length > OVERVIEW_PAGE_SIZE && (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => handleOverviewPageChange(overviewPage - 1)}
              disabled={overviewPage <= 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: overviewTotalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handleOverviewPageChange(page)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-medium ${
                  page === overviewPage ? "bg-[#1B628A] text-white" : "border border-slate-200 text-slate-600"
                }`}
                aria-current={page === overviewPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleOverviewPageChange(overviewPage + 1)}
              disabled={overviewPage >= overviewTotalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-[#D7E6F0] bg-[#EAF3F9] px-4 py-5 text-[#1C5E84]">
          <div className="flex gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="space-y-1 text-sm">
              <p className="text-[11px] font-medium">Keep track of your academic progress across subjects.</p>
              {performanceLoading ? (
                <p className="text-xs text-[#1C5E84]/90">Loading performance trend...</p>
              ) : performanceError ? (
                <p className="text-xs text-rose-600">{performanceError}</p>
              ) : (
                <p className="text-xs text-[#1C5E84]/90">{performanceInsight}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAcademicHistoryTab = () => {
    if (termsLoading) return <LoadingState message="Loading academic history..." />;
    if (termsError) return <ErrorState message={termsError} onRetry={retryInitialLoad} />;
    if (!filteredTerms.length) {
      return <EmptyState title="No matching terms" description="No academic history matched your search." />;
    }

    return (
      <div className="space-y-3">
        {filteredTerms.map((term) => {
          const key = termKey(term);
          const report = reportCardsByKey[key];
          const loading = Boolean(loadingReportCardKeys[key]);
          const error = reportCardErrors[key];
          const expanded = expandedHistoryTerms.includes(key);
          const gpa = report ? formatSummaryGpa(report.summary) : "--";
          const rankInline = report ? parseClassRank(report.summary.classRank).inlineText : "N/A";

          return (
            <div key={key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => handleToggleHistoryTerm(term)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#EEF4FA] text-[#2A6F98]">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-slate-900">{term.academicYear}</p>
                    <p className="text-xs text-slate-500">{term.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[18px] font-semibold text-[#2A6F98]">GPA {gpa}</p>
                    <p className="text-xs text-slate-500">Rank {rankInline}</p>
                  </div>
                  {expanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                </div>
              </button>

              {expanded && (
                <div className="border-t border-slate-200">
                  {loading && !report ? (
                    <div className="p-4">
                      <LoadingState message={`Loading ${term.label} details...`} />
                    </div>
                  ) : error && !report ? (
                    <div className="p-4">
                      <ErrorState message={error} onRetry={() => void loadReportCard(term, true)} />
                    </div>
                  ) : report ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500">
                            <th className="px-4 py-3 font-medium">Subject</th>
                            <th className="px-4 py-3 font-medium">Credits</th>
                            <th className="px-4 py-3 font-medium">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.subjects.map((subject) => (
                            <tr key={`${key}-${subject.subject}`} className="border-b border-slate-100 text-sm last:border-b-0">
                              <td className="px-4 py-3 text-slate-700">{subject.subject}</td>
                              <td className="px-4 py-3 text-slate-500">{subject.credits}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${gradeBadgeClass(subject.grade)}`}
                                >
                                  {subject.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {!report.subjects.length && (
                            <tr>
                              <td colSpan={3} className="px-4 py-6">
                                <EmptyState title="No subjects" description="This term has no subject records yet." />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTranscriptTab = () => {
    if (termsLoading) return <LoadingState message="Loading transcript..." />;
    if (termsError) return <ErrorState message={termsError} onRetry={retryInitialLoad} />;
    if (!terms.length) return <EmptyState title="No transcript data" description="No terms were returned for transcript generation." />;

    const transcriptStudent = transcriptCards[0]?.report.student ?? selectedReportCard?.student;
    const renderedTerms = filteredTerms.length ? filteredTerms : terms;

    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-[11px] font-semibold text-slate-900">Official Transcript</h3>
          <p className="text-xs text-slate-500">Consolidated academic record</p>
          <div className="mt-3 grid gap-3 text-xs text-slate-600 sm:grid-cols-4">
            <p>
              <span className="text-[10px] font-medium text-slate-800">Student:</span> {transcriptStudent?.fullName ?? "N/A"}
            </p>
            <p>
              <span className="text-[10px] font-medium text-slate-800">Student ID:</span> {transcriptStudent?.studentId ?? "N/A"}
            </p>
            <p>
              <span className="text-[10px] font-medium text-slate-800">Class:</span> {transcriptStudent?.className ?? "N/A"}
            </p>
            <p>
              <span className="text-[10px] font-medium text-slate-800">Cumulative GPA:</span> {cumulativeGpa}
            </p>
          </div>
        </div>

        {renderedTerms.map((term) => {
          const key = termKey(term);
          const report = reportCardsByKey[key];
          const loading = Boolean(loadingReportCardKeys[key]);
          const error = reportCardErrors[key];
          return (
            <div key={key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <p className="text-[11px] font-semibold text-slate-900">
                  {term.academicYear} - {term.term} Term
                </p>
                {report && (
                  <p className="text-xs text-[#2A6F98]">
                    GPA {formatSummaryGpa(report.summary)}
                    <span className="ml-2 text-slate-500">Rank {parseClassRank(report.summary.classRank).inlineText}</span>
                  </p>
                )}
              </div>

              {loading && !report ? (
                <div className="p-4">
                  <LoadingState message={`Loading transcript rows for ${term.label}...`} />
                </div>
              ) : error && !report ? (
                <div className="p-4">
                  <ErrorState message={error} onRetry={() => void loadReportCard(term, true)} />
                </div>
              ) : report ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3 font-medium">Subject</th>
                        <th className="px-4 py-3 font-medium">Teacher</th>
                        <th className="px-4 py-3 font-medium">Credits</th>
                        <th className="px-4 py-3 font-medium">Score</th>
                        <th className="px-4 py-3 font-medium">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.subjects.map((subject) => (
                        <tr key={`${key}-${subject.subject}`} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-4 py-3">{subject.subject}</td>
                          <td className="px-4 py-3 text-slate-500">{subject.teacher}</td>
                          <td className="px-4 py-3 text-slate-500">{subject.credits}</td>
                          <td className="px-4 py-3">{formatSubjectScore(subject.totalScore)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${gradeBadgeClass(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState title="No data for this term" description="This term has no loaded report card yet." />
                </div>
              )}
            </div>
          );
        })}

        <div className="rounded-xl border border-[#D7E6F0] bg-[#EAF3F9] px-4 py-3 text-sm text-[#1C5E84]">
          Cumulative GPA: <span className="text-[11px] font-semibold">{cumulativeGpa}</span>/4.0
        </div>
      </div>
    );
  };

  const renderReportCardsTab = () => {
    if (termsLoading) return <LoadingState message="Loading report cards..." />;
    if (termsError) return <ErrorState message={termsError} onRetry={retryInitialLoad} />;
    if (!filteredTerms.length) {
      return <EmptyState title="No terms found" description="Try updating your search to find a report card term." />;
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-3">
          {filteredTerms.map((term) => {
            const key = termKey(term);
            const report = reportCardsByKey[key];
            const active = key === selectedTermKey;
            const loading = Boolean(loadingReportCardKeys[key]);
            const gpa = report ? formatSummaryGpa(report.summary) : "--";
            const gpaValue = report ? resolveSummaryGpa(report.summary) : null;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTerm(term)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  active ? "border-[#2A7EAF] bg-[#EEF4FA]" : "border-slate-200 bg-[#F2F5F8] hover:bg-slate-100"
                }`}
              >
                <p className="text-[17px] font-semibold text-slate-900">
                  {term.term}-{term.academicYear}
                </p>
                <p className="text-xs text-slate-500">Academic Year {term.academicYear}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] font-medium text-[#2A6F98]">GPA {gpa}</p>
                  <p className="text-[11px] text-[#2A6F98]">
                    {report && gpaValue !== null ? classifyTermPerformance(gpaValue) : loading ? "Loading..." : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 px-4 py-4">
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                {selectedTerm ? `${selectedTerm.term}-${selectedTerm.academicYear}` : "Term report card"}
              </p>
              <p className="text-xs text-slate-500">Detailed subject performance</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">GPA</p>
              <p className="text-[23px] font-semibold text-[#2A6F98]">
                {selectedReportCard ? formatSummaryGpa(selectedReportCard.summary) : "--"}
              </p>
              <button
                type="button"
                onClick={() => selectedTerm && void handleDownload(selectedTerm)}
                disabled={!selectedTerm || downloadingKey === selectedTermKey}
                className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#1B628A] px-2.5 py-1 text-[10px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="h-3 w-3" />
                {downloadingKey === selectedTermKey ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>

          {selectedReportCardLoading && !selectedReportCard ? (
            <div className="p-4">
              <LoadingState message="Loading selected term report card..." />
            </div>
          ) : selectedReportCardError && !selectedReportCard ? (
            <div className="p-4">
              <ErrorState message={selectedReportCardError} onRetry={retrySelectedReportCard} />
            </div>
          ) : selectedReportCard ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3 font-medium">Subject</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReportCard.subjects.map((subject) => (
                      <tr key={subject.subject} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-4 py-3">{subject.subject}</td>
                        <td className="px-4 py-3">{formatSubjectScore(subject.totalScore)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${gradeBadgeClass(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!selectedReportCard.subjects.length && (
                      <tr>
                        <td colSpan={3} className="px-4 py-6">
                          <EmptyState title="No subjects in this term" description="The selected report card has no subject entries." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#EFF5FA] px-4 py-4 text-sm text-[#1C5E84]">
                <p className="text-[11px] font-semibold">Teacher&apos;s Comment</p>
                <p className="mt-1 text-xs italic text-[#1C5E84]/90">
                  {selectedReportCard.teacherRemark || "No teacher comment provided for this term."}
                </p>
              </div>
            </>
          ) : (
            <div className="p-4">
              <EmptyState title="No term selected" description="Select a term from the left panel to view details." />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDocumentsTab = () => {
    if (termsLoading) return <LoadingState message="Loading documents..." />;
    if (termsError) return <ErrorState message={termsError} onRetry={retryInitialLoad} />;
    if (!filteredTerms.length) {
      return <EmptyState title="No documents found" description="No report-card document matched your search." />;
    }

    return (
      <div className="space-y-3">
        {/* API mismatch: The records module only exposes report-card PDF generation; enrollment/transcript/medical docs are not exposed. */}
        <p className="text-xs text-slate-500">Documents are generated from the available report-card terms in the records API.</p>
        {downloadError && <ErrorState message={downloadError} />}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTerms.map((term) => {
            const key = termKey(term);
            const isLoading = downloadingKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => void handleDownload(term)}
                disabled={isLoading}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF3F9] text-[#2A6F98]">
                  <FileText className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-slate-900">
                    {term.term} Report Card ({term.academicYear})
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">Academic Year {term.academicYear}</span>
                  <span className="mt-1 inline-flex rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                    {isLoading ? "Downloading..." : "PDF"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab();
      case "academic-history":
        return renderAcademicHistoryTab();
      case "transcript":
        return renderTranscriptTab();
      case "report-cards":
        return renderReportCardsTab();
      case "documents":
        return renderDocumentsTab();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-slate-900">Record</h1>
          <p className="text-xs text-slate-500">Track your academic performance across all subjects</p>
        </div>

        <div className="w-full md:max-w-[360px]">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
            <input
              type="text"
              value={pageSearch}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search anything here"
              className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
            />
            <Search className="h-4 w-4 text-[#2A7EAF]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="inline-flex h-7 items-center gap-1 rounded-md bg-[#1B628A] px-3 text-[9px] font-medium text-white transition hover:bg-[#164f70]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <div className="flex flex-wrap gap-2">
        <FilterPill href={SUBJECTS_BASE} label="Subject" />
        <FilterPill href={`${SUBJECTS_BASE}/classroom`} label="Classroom" />
        <FilterPill href={`${SUBJECTS_BASE}/assignment`} label="Assignment" />
        <FilterPill href={`${SUBJECTS_BASE}/examinations`} label="Examinations" />
        <FilterPill href={`${SUBJECTS_BASE}/records`} label="Records" />
        <FilterPill href={`${SUBJECTS_BASE}/attendance`} label="Attendance" />
        <FilterPill href={`${SUBJECTS_BASE}/timetable`} label="Timetable" />
        <FilterPill href={`${SUBJECTS_BASE}/library`} label="Library" />
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1F658D] text-[10px] font-semibold text-white">
            {getInitials(student?.fullName ?? "Student")}
          </span>
          <div>
            <h2 className="text-[23px] font-semibold text-slate-900">{student?.fullName ?? "Student Name"}</h2>
            <p className="text-xs text-slate-500">Student ID: {student?.studentId ?? "N/A"}</p>
            <p className="text-xs text-slate-500">{student?.className ?? "Class N/A"}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="My GPA"
            value={formatSummaryGpa(summary)}
            icon={<BookOpenText className="h-4 w-4 stroke-[1.7]" />}
            iconClassName="border-[#A8D2FF] bg-[#EEF6FF] text-[#4D9BF2]"
          />
          <MetricCard
            label="My Attendance"
            value={summary && Number.isFinite(summary.attendancePercentage) ? `${summary.attendancePercentage.toFixed(1)}%` : "--"}
            icon={<BadgeCheck className="h-4 w-4 stroke-[1.7]" />}
            iconClassName="border-[#A9E39A] bg-[#F2FBEE] text-[#65B34F]"
          />
          <MetricCard
            label="Completed Credits"
            value={completedCredits}
            icon={<Trophy className="h-4 w-4 stroke-[1.7]" />}
            iconClassName="border-[#F6D1A7] bg-[#FFF7EE] text-[#E89A3A]"
          />
          <MetricCard
            label="My Class Rank"
            value={classRankDisplay.valueText}
            icon={<Medal className="h-4 w-4 stroke-[1.7]" />}
            iconClassName="border-[#D8C1FF] bg-[#F7F0FF] text-[#9B6DE3]"
            subLabel={classRankDisplay.outOfText || undefined}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 px-3 pt-3 sm:px-4">
          {TAB_ITEMS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`relative -mb-px px-3 py-2.5 text-[11px] font-medium transition ${
                  active ? "text-[#2A6F98]" : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab.label}
                {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#2A7EAF]" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">{renderTabContent()}</div>
      </section>
    </div>
  );
}
