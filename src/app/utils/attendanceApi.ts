// src/utils/attendanceApi.ts
import {
  AttendanceOverview,
  AttendanceSubjectsSummary,
  CalendarData,
  AttendanceHistoryResponse,
} from "@/types/attendance";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchAttendanceOverview(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<AttendanceOverview> {
  const res = await fetch(`/api/attendance/overview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: params?.startDate,
      endDate: params?.endDate,
    }),
  });
  return handleResponse<AttendanceOverview>(res);
}

export async function fetchAttendanceCalendar(params: {
  month: number;
  year: number;
}): Promise<CalendarData> {
  const query = new URLSearchParams({
    month: String(params.month),
    year: String(params.year),
  });

  const res = await fetch(`/api/attendance/calendar?${query}`);
  return handleResponse<CalendarData>(res);
}

export async function fetchAttendanceSubjects(): Promise<AttendanceSubjectsSummary> {
  const res = await fetch(`/api/attendance/subjects`);
  return handleResponse<AttendanceSubjectsSummary>(res);
}

export async function fetchAttendanceHistory(params?: {
  page?: number;
  limit?: number;
  status?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
}): Promise<AttendanceHistoryResponse> {
  const query = new URLSearchParams();
  if (params?.page)      query.set("page", String(params.page));
  if (params?.limit)     query.set("limit", String(params.limit));
  if (params?.status)    query.set("status", params.status);
  if (params?.subject)   query.set("subject", params.subject);
  if (params?.startDate) query.set("startDate", params.startDate);
  if (params?.endDate)   query.set("endDate", params.endDate);

  const res = await fetch(`/api/attendance/history?${query}`);
  return handleResponse<AttendanceHistoryResponse>(res);
}
