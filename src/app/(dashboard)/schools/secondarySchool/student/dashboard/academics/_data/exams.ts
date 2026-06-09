export type ExamStatus = "due-soon" | "upcoming" | "completed";

export type Exam = {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  questions: number;
  score?: string;
  status: ExamStatus;
  artworkIndex: number;
};

export const EXAMINATIONS_BASE = "/schools/secondarySchool/student/dashboard/academics/examinations";

export const EXAMS: Exam[] = [
  {
    id: "mathematics",
    subject: "Mathematics",
    date: "14 Jan 2026",
    time: "8:30AM",
    duration: "1 hour 30 minutes",
    questions: 45,
    status: "due-soon",
    artworkIndex: 0,
  },
  {
    id: "english-language",
    subject: "English Language",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour",
    questions: 40,
    status: "upcoming",
    artworkIndex: 0,
  },
  {
    id: "chemistry",
    subject: "Chemistry",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour 20 minutes",
    questions: 50,
    status: "upcoming",
    artworkIndex: 1,
  },
  {
    id: "physics",
    subject: "Physics",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour 20 minutes",
    questions: 50,
    score: "82%",
    status: "completed",
    artworkIndex: 2,
  },
  {
    id: "geography",
    subject: "Geography",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour",
    questions: 35,
    status: "upcoming",
    artworkIndex: 3,
  },
  {
    id: "agric",
    subject: "Agric",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour",
    questions: 35,
    score: "76%",
    status: "completed",
    artworkIndex: 4,
  },
  {
    id: "civic-education",
    subject: "Civic Education",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "45 minutes",
    questions: 30,
    score: "91%",
    status: "completed",
    artworkIndex: 1,
  },
  {
    id: "computer-science",
    subject: "Computer Science",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour",
    questions: 40,
    status: "upcoming",
    artworkIndex: 0,
  },
  {
    id: "biology",
    subject: "Biology",
    date: "14 Jan 2026",
    time: "10:30AM",
    duration: "1 hour 15 minutes",
    questions: 45,
    score: "88%",
    status: "completed",
    artworkIndex: 1,
  },
];

export function getExamById(id: string) {
  return EXAMS.find((exam) => exam.id === id);
}

export function getExamAction(exam: Exam) {
  if (exam.status === "completed") {
    return { label: "View Result", href: `${EXAMINATIONS_BASE}/${exam.id}/result` };
  }

  if (exam.status === "due-soon") {
    return { label: "Start Examination", href: `${EXAMINATIONS_BASE}/${exam.id}/start` };
  }

  return { label: "Prepare", href: `${EXAMINATIONS_BASE}/${exam.id}/prepare` };
}
