import Link from "next/link";
import { notFound } from "next/navigation";
import AcademicsNavigation from "../../../_components/academicsNavigation";
import AcademicsPageHeader from "../../../_components/academicsPageHeader";
import { EXAMINATIONS_BASE, getExamById } from "../../../_data/exams";

type StartPageProps = {
  params: Promise<{ examId: string }>;
};

const sampleQuestions = [
  {
    question: "Which of the following best describes the main concept in this subject area?",
    options: ["A structured process", "A random event", "A visual pattern", "A classroom rule"],
  },
  {
    question: "What should you do before submitting your final answers?",
    options: ["Review all selected answers", "Refresh the page", "Close the browser", "Skip unanswered questions"],
  },
];

export default async function StartExamPage({ params }: StartPageProps) {
  const { examId } = await params;
  const exam = getExamById(examId);

  if (!exam) notFound();

  return (
    <div className="space-y-5 px-4 pt-0 pb-6 sm:px-5 md:px-6">
      <AcademicsPageHeader title="Examinations" subtitle="Complete your examination within the allotted time" showBack />
      <AcademicsNavigation />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{exam.subject}</h1>
            <p className="mt-1 text-sm text-slate-500">{exam.questions} questions . {exam.duration}</p>
          </div>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">In Progress</span>
        </div>

        <div className="mt-6 space-y-4">
          {sampleQuestions.map((item, index) => (
            <div key={item.question} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">Question {index + 1}</p>
              <p className="mt-2 text-sm text-slate-700">{item.question}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.options.map((option) => (
                  <label key={option} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <input type="radio" name={`question-${index}`} className="h-4 w-4 text-[#216388]" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Save Progress
          </button>
          <Link
            href={`${EXAMINATIONS_BASE}/${exam.id}/result`}
            className="rounded-md bg-[#216388] px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#1a5070]"
          >
            Submit Examination
          </Link>
        </div>
      </section>
    </div>
  );
}
