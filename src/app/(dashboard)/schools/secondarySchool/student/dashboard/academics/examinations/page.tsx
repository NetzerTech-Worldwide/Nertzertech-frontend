import Link from "next/link";
import AcademicsNavigation from "../_components/academicsNavigation";
import AcademicsPageHeader from "../_components/academicsPageHeader";
import ExamCard from "../_components/examCard";
import { EXAMINATIONS_BASE, EXAMS, ExamStatus } from "../_data/exams";

type ExamTab = "all" | "upcoming" | "submitted";

type ExaminationsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const TABS: { key: ExamTab; label: string }[] = [
  { key: "all", label: "All Examinations" },
  { key: "upcoming", label: "Upcoming" },
  { key: "submitted", label: "Submitted" },
];

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function countForTab(tab: ExamTab) {
  if (tab === "all") return EXAMS.length;
  if (tab === "upcoming") return EXAMS.filter((exam) => exam.status !== "completed").length;
  return EXAMS.filter((exam) => exam.status === "completed").length;
}

function matchesTab(status: ExamStatus, tab: ExamTab) {
  if (tab === "all") return true;
  if (tab === "upcoming") return status !== "completed";
  return status === "completed";
}

function tabHref(tab: ExamTab, query: string) {
  const params = new URLSearchParams();
  if (tab !== "all") params.set("tab", tab);
  if (query) params.set("q", query);
  return `${EXAMINATIONS_BASE}${params.toString() ? `?${params.toString()}` : ""}`;
}

export default async function ExaminationsPage({ searchParams }: ExaminationsPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawTab = getParam(resolvedSearchParams?.tab);
  const activeTab: ExamTab = rawTab === "upcoming" || rawTab === "submitted" ? rawTab : "all";
  const query = getParam(resolvedSearchParams?.q)?.trim() ?? "";
  const normalizedQuery = query.toLowerCase();

  const exams = EXAMS.filter((exam) => matchesTab(exam.status, activeTab)).filter((exam) =>
    normalizedQuery ? exam.subject.toLowerCase().includes(normalizedQuery) : true
  );

  return (
    <div className="space-y-5 px-4 pt-0 pb-6 sm:px-5 md:px-6">
      <AcademicsPageHeader
        title="Examinations"
        subtitle="Manage your examinations and practice tests"
        showBack
        searchValue={query}
        searchParamName="q"
      />

      <AcademicsNavigation />

      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-6 border-b border-slate-100 px-4 pt-4 sm:px-5">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <Link
                key={tab.key}
                href={tabHref(tab.key, query)}
                aria-current={active ? "page" : undefined}
                className={`relative -mb-px inline-flex items-center gap-2 border-b-2 px-1.5 pb-3 text-sm font-medium transition ${
                  active ? "border-[#216388] text-[#216388]" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                <span className="rounded-full bg-[#173f5b] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                  {countForTab(tab.key)}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">
          {exams.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
              No examinations match your filters yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
