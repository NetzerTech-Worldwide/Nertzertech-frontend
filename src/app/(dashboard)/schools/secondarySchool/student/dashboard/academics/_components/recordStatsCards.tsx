// app/academics/records/_components/recordStatCards.tsx
import type { LucideIcon } from "lucide-react";
import { BookOpen, CheckCircle2, Trophy, Sparkles } from "lucide-react";
import type { RecordSummary } from "@/types/academic-record";

function StatCard({
  label,
  value,
  sub,
  Icon,
  tint,
}: {
  label: string;
  value: string;
  sub?: string;
  Icon: LucideIcon;
  tint: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-xl font-semibold text-slate-900">
          {value}
          {sub && <span className="ml-1 text-xs font-normal text-slate-400">{sub}</span>}
        </p>
      </div>
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
    </div>
  );
}

export function RecordStatCards({ summary }: { summary: RecordSummary }) {
  const [rankNumber, rankOutOf] = summary.classRank.split("/");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="My GPA"
        value={summary.gpa}
        Icon={BookOpen}
        tint="bg-sky-50 text-sky-700"
      />
      <StatCard
        label="My Attendance"
        value={`${summary.attendancePercentage}%`}
        Icon={CheckCircle2}
        tint="bg-emerald-50 text-emerald-700"
      />
      <StatCard
        label="Completed Credits"
        value={summary.completedCredits}
        Icon={Trophy}
        tint="bg-amber-50 text-amber-700"
      />
      <StatCard
        label="My Class Rank"
        value={`#${rankNumber}`}
        sub={rankOutOf ? `out of ${rankOutOf}` : undefined}
        Icon={Sparkles}
        tint="bg-violet-50 text-violet-700"
      />
    </div>
  );
}