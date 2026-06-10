// lib/approval-data.ts

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: string;
  requestType: string;
  dateSubmitted: string;
  leaveDate: string;
  returnDate: string;
  status: LeaveStatus;
  approvedBy: string;
  reason: string;
  adminComment: string;
}

export const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    requestType: "Sick Leave",
    dateSubmitted: "Mar 10, 2026",
    leaveDate: "Mar 18, 2026",
    returnDate: "Mar 20, 2026",
    status: "Pending",
    approvedBy: "Dr. Sarah Wilson",
    reason:
      "Medical appointment scheduled for routine checkup and follow-up consultation.",
    adminComment: "",
  },
  {
    id: "2",
    requestType: "Family Event",
    dateSubmitted: "Mar 8, 2026",
    leaveDate: "Mar 9, 2026",
    returnDate: "Mar 13, 2026",
    status: "Approved",
    approvedBy: "Dr. Sarah Wilson",
    reason:
      "Medical appointment scheduled for routine checkup and follow-up consultation.",
    adminComment: "Approved. Please submit medical certificate upon return.",
  },
  {
    id: "3",
    requestType: "Early Dismissal",
    dateSubmitted: "Mar 1, 2026",
    leaveDate: "Mar 3, 2026",
    returnDate: "Mar 4, 2026",
    status: "Pending",
    approvedBy: "In Progress",
    reason: "Family emergency requiring early pickup from school.",
    adminComment: "",
  },
  {
    id: "4",
    requestType: "Personal Leave",
    dateSubmitted: "Feb 8, 2026",
    leaveDate: "Feb 12, 2026",
    returnDate: "Feb 14, 2026",
    status: "Rejected",
    approvedBy: "Dr. Sarah Wilson",
    reason:
      "Medical appointment scheduled for routine checkup and follow-up consultation.",
    adminComment:
      "Denied due to scheduled mid-term examination on this date.",
  },
  {
    id: "5",
    requestType: "Sick Leave",
    dateSubmitted: "Jan 8, 2026",
    leaveDate: "Jan 9, 2026",
    returnDate: "Jan 10, 2026",
    status: "Pending",
    approvedBy: "Dr. Sarah Wilson",
    reason: "Flu symptoms and doctor-recommended rest.",
    adminComment: "",
  },
];