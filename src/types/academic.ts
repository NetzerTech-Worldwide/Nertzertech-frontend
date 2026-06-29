export type AcademicSubject = {
  name: string;
  teacherName: string;
  isRegistered: boolean;
};

export type AcademicSubjectsResponse = {
  subjects: AcademicSubject[];
};

export type AcademicRoadmapMilestone = {
  title: string;
  sessionYear: string;
  term: string;
  level: string;
  status: string;
  grade: number;
  startDate: string;
  endDate: string;
  modules: string[];
};

export type AcademicRoadmapDetail = {
  subject: string;
  overallProgress: number;
  milestones: AcademicRoadmapMilestone[];
};

export type AcademicAssignment = {
  id: string;
  title: string;
  subject: string;
  status: string;
  dueDate: string;
  description: string;
  type: string;
  points: number;
  priority: string;
};
