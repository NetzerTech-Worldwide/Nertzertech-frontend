"use client";

import { useEffect, useRef, useState } from "react";
import AcademicsNavigation from "./_components/academicsNavigation";
import AcademicsPageHeader from "./_components/academicsPageHeader";
import { StatCard, SubjectCard, type SimpleSubject } from "./_components/subjectCards";
import {
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { SubjectPickerModal, SuccessModal, type CatalogItem } from "./_components/subjectModals";
import { SelectedSubjectsTable } from "./_components/selectedSubjectsTable";
import { SubjectRoadmap } from "./_components/Subjectroadmap";
import {
  fetchAcademicRoadmap,
  fetchAcademicSubjects,
} from "../../../endpoints/academics";
import type { AcademicRoadmapDetail } from "@/types/academic";

// ─── Constants ────────────────────────────────────────────────────────────────

const STUDENT = {
  name:  "Samuel Smith",
  id:    "STU0034",
  klass: "SS 2",
};

type Tab = "subjects" | "registration" | "selected";

function toSubjectId(name: string, index: number) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `subject-${index}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AcademicsPage() {
  // UI state
  const [tab, setTab]     = useState<Tab>("subjects");
  const [query, setQuery] = useState("");

  const [activeRoadmapSubject, setActiveRoadmapSubject] = useState("");
  const [activeRoadmap, setActiveRoadmap] = useState<AcademicRoadmapDetail | null>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmapError, setRoadmapError] = useState("");

  async function handleOpenRoadmap(subjectId: string) {
    const subject = subjects.find((item) => item.id === subjectId);
    const subjectName = subject?.name ?? "";

    setActiveRoadmapSubject(subjectName);
    setActiveRoadmap(null);
    setRoadmapError("");
    setRoadmapLoading(true);
    setTab("subjects");

    try {
      const roadmap = await fetchAcademicRoadmap(subjectName);
      setActiveRoadmap(roadmap);
    } catch (err) {
      setRoadmapError(err instanceof Error ? err.message : "Unable to load roadmap");
    } finally {
      setRoadmapLoading(false);
    }
  }

  function handleCloseRoadmap() {
    setActiveRoadmapSubject("");
    setActiveRoadmap(null);
    setRoadmapError("");
    setRoadmapLoading(false);
  }

  // Registration form
  const [form, setForm] = useState({
    session: "2024/2025",
    term:    "",
    klass:   "SS 2",
  });
  const readyToPick = Boolean(form.session && form.term && form.klass);

  // Modal visibility
  const [pickerOpen,  setPickerOpen]  = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // Selected subject IDs (persisted to localStorage)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("nt_selected_subjects");
    if (raw) setSelectedIds(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("nt_selected_subjects", JSON.stringify(selectedIds));
  }, [selectedIds]);

  // Subjects grid
  const [subjects,        setSubjects]        = useState<SimpleSubject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [subjectsError,   setSubjectsError]   = useState("");
  const fetchedSubjects = useRef(false);

  useEffect(() => {
    let mounted = true;
    if (fetchedSubjects.current) return;
    fetchedSubjects.current = true;

    (async () => {
      setSubjectsLoading(true);
      setSubjectsError("");
      try {
        const data = await fetchAcademicSubjects();
        if (!mounted) return;

        const subjectsData =
          Array.isArray(data)
            ? data
            : Array.isArray((data as any)?.subjects)
            ? (data as any).subjects
            : Array.isArray((data as any)?.data?.subjects)
            ? (data as any).data.subjects
            : Array.isArray((data as any)?.data)
            ? (data as any).data
            : null;

        if (!subjectsData) {
          throw new Error("Invalid academic subjects response");
        }

        setSubjects(
          subjectsData.map((s: { name: string; teacherName?: string; isRegistered: boolean }, i: number) => ({
            id:         toSubjectId(s.name, i),
            name:       s.name,
            teacher:    s.teacherName ?? "Unknown",
            registered: s.isRegistered,
            img:        "/_assets/books.png",
          }))
        );
      } catch (err) {
        if (!mounted) return;
        setSubjectsError(err instanceof Error ? err.message : "Unable to load subjects");
      } finally {
        if (mounted) setSubjectsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const visibleSubjects  = subjects;
  const filteredSubjects = visibleSubjects.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  // Catalog derived from real subjects — feeds the picker modal + selected table
  const catalog: CatalogItem[] = subjects.map((s) => ({
    id:      s.id,
    name:    s.name,
    teacher: s.teacher,
    type:    "Compulsory", // placeholder until backend returns compulsory/elective info
  }));

  // Handlers
  function handleSave(ids: string[]) {
    setSelectedIds(ids);
    setPickerOpen(false);
    setSuccessOpen(true);
  }

  function handleViewRegistered() {
    setSuccessOpen(false);
    setTab("selected");
  }

  const studentMeta = {
    ...STUDENT,
    term:    form.term || "First Term",
    session: form.session,
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="space-y-6 px-4 pt-0 pb-6 sm:px-5 md:px-6">
        <AcademicsPageHeader
          title="Subjects"
          subtitle="Access your learning materials and track progress"
          searchValue={query}
          onSearchChange={setQuery}
        />

        <AcademicsNavigation />

        {/* Stat cards — hidden when roadmap is open to reduce visual noise */}
        {!activeRoadmapSubject && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <StatCard
              label="Enrolled Subjects"
              value={subjects.filter((s) => s.registered).length || selectedIds.length}
              Icon={BookOpen}
            />

            <StatCard
              label="Total Subjects"
              value={visibleSubjects.length}
              Icon={GraduationCap}
            />
          </div>
        )}

        {/* Main card */}
        <div className="rounded-2xl border border-slate-200 bg-white">
          {/* Tab bar */}
          <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 px-4 pt-4 sm:px-6">
            {(
              [
                { key: "subjects",      label: "Subjects" },
                { key: "registration",  label: `Subject Registration (${selectedIds.length})` },
                { key: "selected",      label: "Selected Subjects" },
              ] as { key: Tab; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  if (key !== "subjects") handleCloseRoadmap();
                }}
                className={`relative -mb-px border-b-2 px-1.5 py-3 text-sm font-medium transition-colors ${
                  tab === key
                    ? "border-[#2A7EAF] text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-6">

            {/* ── Subjects tab ── */}
            {tab === "subjects" && (
              <>
                {/* Inline roadmap view */}
                {activeRoadmapSubject ? (
                  <SubjectRoadmap
                    subjectName={activeRoadmapSubject}
                    roadmap={activeRoadmap}
                    loading={roadmapLoading}
                    error={roadmapError}
                    onBack={handleCloseRoadmap}
                  />
                ) : subjectsLoading ? (
                  <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
                    Loading subjects…
                  </div>
                ) : subjectsError ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
                    {subjectsError}
                  </div>
                ) : filteredSubjects.length ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSubjects.map((s) => (
                      <SubjectCard
                        key={s.id}
                        s={s}
                        onRoadmap={handleOpenRoadmap}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
                    No subjects found.
                  </div>
                )}
              </>
            )}

            {/* ── Registration form ── */}
            {tab === "registration" && (
              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Subject Registration</h3>
                  <p className="text-xs text-slate-500">Create and manage subjects in your school</p>
                </div>

                {/* Student info */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[13px] font-semibold tracking-wide text-slate-900">
                    SAMUEL SMITH DETAILS
                  </p>
                  <div className="mt-2 grid gap-4 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div><span className="font-medium">Student ID:</span> STU0034</div>
                    <div><span className="font-medium">Term:</span> {form.term || "—"}</div>
                    <div><span className="font-medium">Class:</span> {form.klass}</div>
                  </div>
                </div>

                {/* Session / term / class selects */}
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <label className="text-xs font-medium text-slate-600">
                      SESSION
                      <select
                        value={form.session}
                        onChange={(e) => setForm((f) => ({ ...f, session: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                      >
                        {["2023/2024", "2024/2025", "2025/2026"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs font-medium text-slate-600">
                      TERM
                      <select
                        value={form.term}
                        onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                      >
                        <option value="" disabled>Select Term</option>
                        <option>First Term</option>
                        <option>Second Term</option>
                        <option>Third Term</option>
                      </select>
                    </label>

                    <label className="text-xs font-medium text-slate-600">
                      CLASS
                      <select
                        value={form.klass}
                        onChange={(e) => setForm((f) => ({ ...f, klass: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                      >
                        <option>SS 1</option>
                        <option>SS 2</option>
                        <option>SS 3</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!readyToPick}
                      onClick={() => readyToPick && setPickerOpen(true)}
                      className="inline-flex items-center rounded-md bg-[#2A7EAF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#236a90] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ── Selected subjects table ── */}
            {tab === "selected" && (
              <SelectedSubjectsTable
                ids={selectedIds}
                catalog={catalog}
                student={studentMeta}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubjectPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        catalog={catalog}
        initial={selectedIds}
        student={studentMeta}
        onSave={handleSave}
      />

      <SuccessModal
        open={successOpen}
        student={studentMeta}
        onViewSubjects={handleViewRegistered}
      />
    </>
  );
}