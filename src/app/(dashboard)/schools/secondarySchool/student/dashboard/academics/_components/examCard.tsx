import Link from "next/link";
import { CalendarDays, Clock, GraduationCap } from "lucide-react";
import { Exam, ExamStatus, getExamAction } from "../_data/exams";

const statusStyles: Record<ExamStatus, string> = {
  "due-soon": "bg-rose-50 text-rose-600",
  upcoming: "bg-orange-50 text-orange-600",
  completed: "bg-emerald-50 text-emerald-600",
};

const statusLabels: Record<ExamStatus, string> = {
  "due-soon": "Due Soon",
  upcoming: "Upcoming",
  completed: "Completed",
};

const artworkStyles = [
  "from-fuchsia-500 to-purple-700",
  "from-sky-500 to-[#216388]",
  "from-teal-500 to-emerald-700",
  "from-orange-400 to-orange-800",
  "from-blue-400 to-cyan-700",
];

type ExamCardProps = {
  exam: Exam;
};

export default function ExamCard({ exam }: ExamCardProps) {
  const action = getExamAction(exam);
  const artworkStyle = artworkStyles[exam.artworkIndex % artworkStyles.length];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`relative aspect-[1.65] overflow-hidden rounded-xl bg-gradient-to-br ${artworkStyle}`}>
        <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/20" />
        <div className="absolute bottom-0 right-0 h-20 w-24 rounded-tl-full bg-white/15" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/90 text-[#216388] shadow-sm">
            <GraduationCap className="h-9 w-9" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{exam.subject}</h2>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusStyles[exam.status]}`}>
          {statusLabels[exam.status]}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5 text-[#216388]" />
          Date . {exam.date}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#216388]" />
          {exam.time}
        </span>
      </div>

      <Link
        href={action.href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#216388] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1a5070]"
      >
        {action.label}
      </Link>
    </article>
  );
}
