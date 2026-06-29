// app/academics/records/_components/recordTabs.tsx
"use client";

export type RecordTab = "overview" | "history" | "transcript" | "report-cards" | "documents";

const TABS: { key: RecordTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "history", label: "Academic History" },
  { key: "transcript", label: "Transcript" },
  { key: "report-cards", label: "Report Cards" },
  { key: "documents", label: "Documents" },
];

export function RecordTabs({
  active,
  onChange,
}: {
  active: RecordTab;
  onChange: (tab: RecordTab) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 px-4 pt-4 sm:px-6">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`relative -mb-px border-b-2 px-1.5 py-3 text-sm font-medium transition-colors ${
            active === key
              ? "border-teal-700 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Shared bits used across every tab ───────────────────────────────────────

export function GradePill({ grade }: { grade: string }) {
  const positive = grade.startsWith("A");
  const tone = positive
    ? "bg-sky-50 text-sky-700"
    : "bg-orange-50 text-orange-600";
  return (
    <span className={`inline-flex h-6 min-w-[2rem] items-center justify-center rounded-md px-1.5 text-xs font-semibold ${tone}`}>
      {grade}
    </span>
  );
}

export function TabLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
      {label}
    </div>
  );
}

export function TabError({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
      {message}
    </div>
  );
}

export function TabEmpty({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
      {message}
    </div>
  );
}