import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import AcademicsNavigation from "../../../_components/academicsNavigation";
import AcademicsPageHeader from "../../../_components/academicsPageHeader";
import { EXAMINATIONS_BASE, getExamById } from "../../../_data/exams";

type PreparePageProps = {
  params: Promise<{ examId: string }>;
};

export default async function PrepareExamPage({ params }: PreparePageProps) {
  const { examId } = await params;
  const exam = getExamById(examId);

  if (!exam) notFound();

  return (
    <div className="space-y-5 px-4 pt-0 pb-6 sm:px-5 md:px-6">
      <AcademicsPageHeader title="Examinations" subtitle="Review the exam details before you begin" showBack />
      <AcademicsNavigation />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Preparation</p>
            <h1 className="text-xl font-semibold text-slate-900">{exam.subject}</h1>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">Upcoming</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Clock className="h-5 w-5 text-[#216388]" />
            <p className="mt-2 text-xs text-slate-500">Duration</p>
            <p className="text-sm font-semibold text-slate-900">{exam.duration}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <BookOpen className="h-5 w-5 text-[#216388]" />
            <p className="mt-2 text-xs text-slate-500">Questions</p>
            <p className="text-sm font-semibold text-slate-900">{exam.questions} questions</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <CheckCircle className="h-5 w-5 text-[#216388]" />
            <p className="mt-2 text-xs text-slate-500">Schedule</p>
            <p className="text-sm font-semibold text-slate-900">{exam.date} at {exam.time}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-sky-100 bg-sky-50 px-4 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Before you start</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Confirm your internet connection is stable.</li>
            <li>Keep your student login active for the full exam window.</li>
            <li>Read every question carefully before selecting an answer.</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href={`${EXAMINATIONS_BASE}/${exam.id}/start`}
            className="rounded-md bg-[#216388] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a5070]"
          >
            Start Examination
          </Link>
        </div>
      </section>
    </div>
  );
}
