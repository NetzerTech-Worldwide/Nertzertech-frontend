// lib/profile-data.ts

export interface StudentProfile {
  name: string;
  photo: string;
  school: string;
  age: number;
  mother: string;
  father: string;
  classTeacher: string;
  studentId: string;
  overallGpa: number;
  attendance: number;
  completedCredits: number;
  totalCredits: number;
  classRank: number;
  classTotal: number;
  currentTermGpa: number;
  percentile: number;
  classRankDisplay: string;
  performanceProgress: number;
}

export interface FeeStatus {
  status: "Overdue" | "Paid" | "Pending";
  lastPaymentDate: string;
  nextPaymentFor: string;
  amountPaid: string;
  amountDue: string;
  paymentMethod: string;
  dueDate: string;
}

export interface FeeItem {
  item: string;
  amount: number;
}

export interface FeeBreakdown {
  academicSession: string;
  term: string;
  items: FeeItem[];
  amountPaid: number;
}

export interface ActivityItem {
  id: string;
  type: "assignment" | "payment" | "attendance" | "general";
  description: string;
  timeAgo: string;
}

export interface SessionDevice {
  id: string;
  device: string;
  browser: string;
  location: string;
  date: string;
  isActive: boolean;
}

export const studentProfile: StudentProfile = {
  name: "Samuel James",
  photo: "https://i.pravatar.cc/120?img=11",
  school: "Purple Heaven College",
  age: 15,
  mother: "Samuel Esther Rita",
  father: "Samuel Mike Daniels",
  classTeacher: "Mercy Grace",
  studentId: "STU0023",
  overallGpa: 3.8,
  attendance: 91.6,
  completedCredits: 18,
  totalCredits: 24,
  classRank: 5,
  classTotal: 120,
  currentTermGpa: 3.9,
  percentile: 78,
  classRankDisplay: "5th/23",
  performanceProgress: 88,
};

export const feeStatus: FeeStatus = {
  status: "Overdue",
  lastPaymentDate: "Feb 15, 2026",
  nextPaymentFor: "Term 2 Fees",
  amountPaid: "₦25,000",
  amountDue: "₦45,000",
  paymentMethod: "Bank Transfer",
  dueDate: "Apr 1, 2026",
};

export const feeBreakdown: FeeBreakdown = {
  academicSession: "2025/2026",
  term: "First Term",
  items: [
    { item: "Tuition Fee", amount: 25000 },
    { item: "Development Levy", amount: 5000 },
    { item: "Laboratory Fee", amount: 15000 },
    { item: "PTA Fee", amount: 2000 },
    { item: "Examination Fee", amount: 1000 },
  ],
  amountPaid: 48000,
};

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "assignment",
    description: "Submission of Mathematics Assignment",
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    type: "payment",
    description: "Fee Payment Successful-₦25,000",
    timeAgo: "3 hours ago",
  },
  {
    id: "3",
    type: "attendance",
    description: "Attendance Marked",
    timeAgo: "3 hours ago",
  },
  {
    id: "4",
    type: "assignment",
    description: "Submission of English Assignment",
    timeAgo: "2 hours ago",
  },
  {
    id: "5",
    type: "assignment",
    description: "Submission of Mathematics Assignment",
    timeAgo: "3 hours ago",
  },
  {
    id: "6",
    type: "assignment",
    description: "Submission of Mathematics Assignment",
    timeAgo: "3 hours ago",
  },
];

export const sessionDevices: SessionDevice[] = [
  {
    id: "1",
    device: "MacBook Pro",
    browser: "Chrome",
    location: "Lagos, Nigeria",
    date: "March 3, 2026 at 10:30 AM",
    isActive: true,
  },
  {
    id: "2",
    device: "Iphone",
    browser: "Chrome",
    location: "Enugu, Nigeria",
    date: "March 2, 2026 at 11:30 AM",
    isActive: false,
  },
  {
    id: "3",
    device: "Iphone",
    browser: "Chrome",
    location: "Enugu, Nigeria",
    date: "March 2, 2026 at 11:30 AM",
    isActive: false,
  },
];