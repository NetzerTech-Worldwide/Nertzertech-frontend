// src/types/attendance.ts

export type DayStatus = "present" | "absent" | "late" | "missing" | "today" | "empty";
export type AttendanceStatus = "Present" | "Absent" | "Late";
export type AttendanceFilter = "All" | AttendanceStatus;

export interface AttendanceOverview {
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
  recentAttendance: unknown[];
}

export interface AttendanceDayRecord {
  day: number;
  status: DayStatus;
}

export interface AttendanceMonthSummary {
  present: number;
  absent: number;
  late: number;
  missing: number;
}

export interface CalendarData {
  days: AttendanceDayRecord[];
  summary: AttendanceMonthSummary;
}

export interface AttendanceHistoryRecord {
  date: string;
  subject: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
}

export interface AttendanceHistoryResponse {
  records: AttendanceHistoryRecord[];
  total: number;
}

export interface AttendanceSubjectsSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface AttendanceBreakdownItem {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyTrendPoint {
  month: string;
  present: number;
  absent: number;
  late: number;
}
