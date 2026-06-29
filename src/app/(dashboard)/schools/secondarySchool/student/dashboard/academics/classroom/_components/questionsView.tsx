"use client";
import React, { useState } from "react";
import type { AnswerMap, QuestionDto } from "@/types/academic-classroom";
import { DEMO_QUESTIONS, DEMO_START_ACTIVITY } from "../demoData";

interface QuestionsViewProps {
  // TODO: replace with real data from API
  questions?: QuestionDto[];
  attemptId?: string; // from StartActivityResponseDto — needed for submit
  onBack: () => void;
  onSubmit: (answers: AnswerMap) => void; // AnswerMap: questionId → option label ("A"|"B"|...)
}

const QUESTIONS_PER_PAGE = 4;

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  questions = DEMO_QUESTIONS,
  attemptId = DEMO_START_ACTIVITY.attemptId,
  onBack,
  onSubmit,
}) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const pageQuestions = questions.slice(
    page * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE + QUESTIONS_PER_PAGE
  );
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (questionId: string, label: string) => {
    // value stored is the option label — matches submit payload: { [questionId]: "A" }
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onSubmit(answers);
    }
  };

  const isLastPage = page === totalPages - 1;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Questions On</h1>
            <p className="text-sm text-gray-500">Calculus Integration Techniques • Mrs Blessing Okoro</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#216388] hover:bg-[#1a5070] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {isLastPage ? "Submit" : "Next"}
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="px-5 py-2 flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {answeredCount} / {questions.length} answered
          </span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#216388] rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {pageQuestions.map((q) => {
          const selected = answers[q.id]; // this is a label e.g. "A"
          const options = q.options ?? [];

          return (
            <div key={q.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-100">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#216388] text-white text-xs font-bold flex items-center justify-center">
                  {q.order}
                </span>
                <p className="text-sm font-semibold text-gray-800 pt-0.5">{q.text}</p>
              </div>

              <div className="flex flex-col divide-y divide-gray-100">
                {options.map((opt) => {
                  const isSelected = selected === opt.label;
                  return (
                    <label
                      key={opt.label}
                      className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-50/60" : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? "border-[#216388] bg-[#216388]" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.label}
                        checked={isSelected}
                        onChange={() => handleSelect(q.id, opt.label)}
                        className="sr-only"
                      />
                      <span className="text-sm text-gray-500 font-medium w-4">{opt.label}.</span>
                      <span className="text-sm text-gray-700">{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-end gap-3 pb-2">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#216388] hover:bg-[#1a5070] text-white rounded-lg text-sm font-semibold transition-colors"
        >
          {isLastPage ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};