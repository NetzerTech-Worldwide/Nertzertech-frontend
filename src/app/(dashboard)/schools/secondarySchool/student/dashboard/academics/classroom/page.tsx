"use client";
import React, { useState } from "react";
import AcademicsNavigation from "../_components/academicsNavigation";
import AcademicsPageHeader from "../_components/academicsPageHeader";

import { ClassroomTabs } from "./_components/classroomTabs";
import { LiveClassCards } from "./_components/liveClassCards";
import { SetReminderModal } from "./_components/setReminderMOdal";
import { SuccessModal } from "./_components/successModal";
import { LiveClassroomView } from "./_components/liveClassroomView";
import { LeaveClassModal, ClassEndedModal, AssignmentCompleteModal } from "./_components/classModals";
import { StartAssignment } from "./_components/startAssignment";
import { QuestionsView } from "./_components/questionsView";
import { LearningRoadmap } from "./_components/learningRoadmap";
import { LearningMaterials } from "./_components/learningMaterials";

import type { ClassroomTab, ClassroomView, ReminderForm, AnswerMap, LiveSessionDto } from "@/types/academic-classroom";
type LiveClass = LiveSessionDto;
import { DEMO_QUESTIONS } from "./demoData";

// ─── Modal state union ────────────────────────────────────────────────────────
type ModalState =
  | { type: "none" }
  | { type: "set-reminder"; cls: LiveClass }
  | { type: "reminder-success"; cls: LiveClass; form: ReminderForm }
  | { type: "leaving-class" }
  | { type: "class-ended" }
  | { type: "assignment-complete" };

const ClassroomPage = () => {
  // ── Tab state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ClassroomTab>("live-classes");

  // ── View state machine (for live class flow) ───────────────────────────────
  const [view, setView] = useState<ClassroomView>("list");
  const [activeClass, setActiveClass] = useState<LiveClass | null>(null);
  const [pendingAnswers, setPendingAnswers] = useState<AnswerMap>({});

  // ── Modal state ────────────────────────────────────────────────────────────
  const [modal, setModal] = useState<ModalState>({ type: "none" });

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleJoinClass = (cls: LiveClass) => {
    setActiveClass(cls);
    setView("live");
  };

  const handleSetReminder = (cls: LiveClass) => {
    setModal({ type: "set-reminder", cls });
  };

  const handleReminderSuccess = (cls: LiveClass, form: ReminderForm) => {
    setModal({ type: "reminder-success", cls, form });
  };

  const handleCloseReminder = () => {
    setModal({ type: "none" });
  };

  // Leave class flow
  const handleLeaveIntent = () => {
    setModal({ type: "leaving-class" });
  };

  const handleConfirmLeave = () => {
    setModal({ type: "class-ended" });
  };

  const handleStayInClass = () => {
    setModal({ type: "none" });
  };

  // Class ended
  const handleClassEndedLater = () => {
    setModal({ type: "none" });
    setView("replay");
  };

  const handleClassEndedStartAssignment = () => {
    setModal({ type: "none" });
    setView("start-assignment");
  };

  // Assignment flow
  const handleStartAssignment = () => {
    setView("questions");
  };

  const handleSubmitAnswers = (answers: AnswerMap) => {
    const unanswered = DEMO_QUESTIONS.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setPendingAnswers(answers);
      setView("incomplete");
    } else {
      setModal({ type: "assignment-complete" });
    }
  };

  const handleReturnToQuestions = () => {
    setView("questions");
  };

  const handleAssignmentDone = () => {
    setModal({ type: "none" });
    setView("list");
    setActiveClass(null);
  };

  const handleBackToList = () => {
    setView("list");
    setActiveClass(null);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full bg-gray-50 px-4 pt-0 pb-4 md:px-6 md:pt-0 md:pb-6 gap-4 md:gap-5 overflow-auto">

      {/* Page header — always visible */}
      <div className="space-y-4">
        <AcademicsPageHeader
          title="Classroom"
          subtitle="Join live classes and access learning Materials"
          showBack
        />
        <AcademicsNavigation />
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

        {/* Tab bar — only show on list view */}
        {view === "list" && (
          <div className="px-2 md:px-4 pt-1 overflow-x-auto border-b border-gray-200">
            <ClassroomTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}

        {/* Content area */}
        <div className="p-4 md:p-5">

          {/* ── LIST VIEW ── */}
          {view === "list" && (
            <>
              {activeTab === "live-classes" && (
                <LiveClassCards
                  onJoinClass={handleJoinClass}
                  onSetReminder={handleSetReminder}
                />
              )}
              {activeTab === "learning-roadmap" && <LearningRoadmap />}
              {activeTab === "learning-materials" && <LearningMaterials />}
            </>
          )}

          {/* ── LIVE CLASSROOM ── */}
          {view === "live" && activeClass && (
            <LiveClassroomView
              cls={activeClass}
              isReplay={false}
              onLeaveClass={handleLeaveIntent}
            />
          )}

          {/* ── REPLAY VIEW ── */}
          {view === "replay" && activeClass && (
            <LiveClassroomView
              cls={activeClass}
              isReplay={true}
              onLeaveClass={handleBackToList}
              onCheckAssignment={handleClassEndedStartAssignment}
            />
          )}

          {/* ── START ASSIGNMENT ── */}
          {view === "start-assignment" && (
            <StartAssignment
              onBack={handleBackToList}
              onStart={handleStartAssignment}
            />
          )}

          {/* ── QUESTIONS ── */}
          {view === "questions" && (
            <QuestionsView
              onBack={() => setView("start-assignment")}
              onSubmit={handleSubmitAnswers}
            />
          )}

          {/* ── SUBMISSION INCOMPLETE ── */}
          {view === "incomplete" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-amber-900">Incomplete Submission</h3>
              <p className="mt-2 text-sm text-amber-800">Please answer all remaining questions before submitting.</p>
              <button
                onClick={handleReturnToQuestions}
                className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                Return to Questions
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── MODALS ── */}

      {modal.type === "set-reminder" && (
        <SetReminderModal
          cls={modal.cls}
          onClose={handleCloseReminder}
          onSuccess={handleReminderSuccess}
        />
      )}

      {modal.type === "reminder-success" && (
        <SuccessModal
          title="Successful!"
          message={`You've successfully added a reminder for\n${modal.cls.subject}, ${modal.form.time} Class`}
          primaryLabel="Done"
          secondaryLabel="Add New"
          onPrimary={handleCloseReminder}
          onSecondary={() => setModal({ type: "set-reminder", cls: modal.cls })}
        />
      )}

      {modal.type === "leaving-class" && (
        <LeaveClassModal
          onLeave={handleConfirmLeave}
          onStay={handleStayInClass}
        />
      )}

      {modal.type === "class-ended" && (
        <ClassEndedModal
          onLater={handleClassEndedLater}
          onStartAssignment={handleClassEndedStartAssignment}
        />
      )}

      {modal.type === "assignment-complete" && (
        <AssignmentCompleteModal
          onNextClass={handleAssignmentDone}
          onDashboard={handleAssignmentDone}
        />
      )}

    </div>
  );
};

export default ClassroomPage;