import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Trophy } from "lucide-react";
import AcademicsNavigation from "../../../_components/academicsNavigation";
import AcademicsPageHeader from "../../../_components/academicsPageHeader";
import { EXAMINATIONS_BASE, getExamById } from "../../../_data/exams";

type ResultPageProps = {
  params: Promise<{ examId: string }>;
};

export default async function ExamResultPage({ params }: ResultPageProps) {
  const { examId } = await params;
  const exam = getExamById(examId);

  if (!exam) notFound();

  const score = exam.score ?? "Pending";

  return (
    <div className="space-y-5 px-4 pt-0 pb-6 sm:px-5 md:px-6">
      <AcademicsPageHeader title="Examinations" subtitle="View your examination result and feedback" showBack />
      <AcademicsNavigation />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Result</p>
            <h1 className="text-xl font-semibold text-slate-900">{exam.subject}</h1>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Submitted</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
            <Trophy className="mx-auto h-8 w-8 text-emerald-600" />
            <p className="mt-3 text-sm text-emerald-700">Score</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-700">{score}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Summary</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="text-sm font-medium text-slate-900">{exam.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Time</p>
                <p className="text-sm font-medium text-slate-900">{exam.time}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Questions</p>
                <p className="text-sm font-medium text-slate-900">{exam.questions}</p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-700">
              <CheckCircle className="mt-0.5 h-5 w-5 text-[#216388]" />
              <p>Your examination has been submitted successfully. Detailed feedback will appear once your teacher completes the review.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href={EXAMINATIONS_BASE}
            className="rounded-md bg-[#216388] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a5070]"
          >
            Back to Examinations
          </Link>
        </div>
      </section>
    </div>
  );
}
