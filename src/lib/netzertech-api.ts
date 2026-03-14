const NETZERTECH_API_BASE_URL =
  process.env.NEXT_PUBLIC_NETZERTECH_API_BASE_URL ?? "https://dev-netzertech-backend.vercel.app";

export const STORAGE_ACCESS_TOKEN_KEY = "nt_access_token";
export const STORAGE_AUTH_USER_KEY = "nt_auth_user";

type ApiRequestOptions = Omit<RequestInit, "headers" | "body"> & {
  token?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { token, headers = {}, body, ...rest } = options;
  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(`${NETZERTECH_API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : Array.isArray(payload?.message)
        ? payload.message.join(", ")
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export type SecondaryStudentLoginRequest = {
  studentId: string;
  fullName: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  mustChangePassword: boolean;
  user: Record<string, unknown>;
  message?: string;
};

export type SecondaryStudentProfileDto = {
  fullName: string;
  studentId: string;
  grade: string | null;
  school: string | null;
  email: string;
  profilePicture: string | null;
};

export type NextClassDto = {
  id: string;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string | null;
};

export type ClassActivityDto = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  totalPoints: number;
};

export type UpcomingTestDto = {
  id: string;
  title: string;
  subject: string;
  testDate: string;
  totalPoints: number;
};

export type AcademicProgressDto = {
  gpa: number | null;
  grades: Record<string, unknown> | null;
  totalCredits: number;
  completedCredits: number;
  progressPercentage: number;
};

export type ReminderDto = {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  isImportant: boolean;
  type: string | null;
  status: string;
};

export type ForumTopicDto = {
  id: string;
  title: string;
  content: string;
  views: number;
  replies: number;
  createdAt: string;
};

export type EventDto = {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  location: string | null;
  image: string | null;
};

export type SecondaryStudentDashboardDto = {
  profile: SecondaryStudentProfileDto;
  nextClass: NextClassDto | null;
  classActivities: ClassActivityDto[];
  upcomingTests: UpcomingTestDto[];
  academicProgress: AcademicProgressDto | null;
  reminders: ReminderDto[];
  latestForumTopics: ForumTopicDto[];
  upcomingEvents: EventDto[];
};

export async function loginSecondaryStudent(payload: SecondaryStudentLoginRequest) {
  return apiRequest<AuthResponse>("/api/v1/auth/login/student/secondary", {
    method: "POST",
    body: payload,
  });
}

export async function getSecondaryStudentDashboard(token: string) {
  return apiRequest<SecondaryStudentDashboardDto>("/api/v1/dashboard/secondary-student", {
    method: "GET",
    token,
  });
}

export async function getCurrentUserProfile(token: string) {
  return apiRequest<Record<string, unknown>>("/api/v1/auth/profile", {
    method: "GET",
    token,
  });
}

export async function logoutCurrentUser(token: string) {
  return apiRequest<Record<string, unknown>>("/api/v1/auth/logout", {
    method: "POST",
    token,
  });
}

export function setStoredAuth(accessToken: string, user: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(user));
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
}

export function getStoredAuthUser(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_AUTH_USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(STORAGE_AUTH_USER_KEY);
}
