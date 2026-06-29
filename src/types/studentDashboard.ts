export type DashboardProfile = {
  fullName: string;
  studentId: string;
  grade: string;
  school: string;
  email: string;
  profilePicture: string | null;
};

export type DashboardAcademicProgress = {
  gpa: string;
  grades: Record<string, number>;
  totalCredits: number;
  completedCredits: number;
  progressPercentage: number;
};

export type DashboardSummaryItem = {
  title?: string;
  subject?: string;
  name?: string;
  description?: string;
  time?: string;
  date?: string;
  status?: string;
  image?: string | null;
};

export type StudentDashboard = {
  profile: DashboardProfile;
  nextClass: DashboardSummaryItem | null;
  classActivities: DashboardSummaryItem[];
  upcomingTests: DashboardSummaryItem[];
  academicProgress: DashboardAcademicProgress;
  reminders: DashboardSummaryItem[];
  latestForumTopics: DashboardSummaryItem[];
  upcomingEvents: DashboardSummaryItem[];
};
