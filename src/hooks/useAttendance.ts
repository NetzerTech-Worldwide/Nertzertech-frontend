// src/hooks/useAttendance.ts
"use client";

import { useEffect, useState } from "react";
import {
  fetchAttendanceOverview,
  fetchAttendanceCalendar,
  fetchAttendanceSubjects,
  fetchAttendanceHistory,
} from "@/app/utils/attendanceApi";
import type {
  AttendanceOverview,
  AttendanceSubjectsSummary,
  CalendarData,
  AttendanceHistoryResponse,
} from "@/types/attendance";

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAttendanceOverview(params?: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<AttendanceOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAttendanceOverview(params)
      .then((res) => { if (!cancelled) { setData(res); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [params?.startDate, params?.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}

export function useAttendanceCalendar(month: number, year: number) {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAttendanceCalendar({ month, year })
      .then((res) => { if (!cancelled) { setData(res); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [month, year]);

  return { data, loading, error };
}

export function useAttendanceSubjects() {
  const [data, setData] = useState<AttendanceSubjectsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAttendanceSubjects()
      .then((res) => { if (!cancelled) { setData(res); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useAttendanceHistory(params?: {
  page?: number;
  limit?: number;
  status?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<AttendanceHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAttendanceHistory(params)
      .then((res) => { if (!cancelled) { setData(res); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [params?.page, params?.limit, params?.status, params?.subject, params?.startDate, params?.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}
