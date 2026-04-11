"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, ChevronRight, X, Check } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";

type CatalogItem = {
  id: string;
  name: string;
  teacher: string;
  type: "Compulsory" | "Elective";
};

const SUBJECT_CATALOG: CatalogItem[] = [
  { id: "eng", name: "English Language", teacher: "Mr. John Adeyemi", type: "Compulsory" },
  { id: "math", name: "Mathematics", teacher: "Mrs. Grace Okafor", type: "Compulsory" },
  { id: "bio", name: "Biology", teacher: "Mr. Peter Musa", type: "Compulsory" },
  { id: "chem", name: "Chemistry", teacher: "Mrs. Esther Ibrahim", type: "Compulsory" },
  { id: "phy", name: "Physic", teacher: "Mr. Samuel Ogunleye", type: "Compulsory" },
  { id: "cs", name: "Computer Studies", teacher: "Mrs. Mary Nwosu", type: "Compulsory" },
  { id: "geo", name: "Geography", teacher: "Mr. James Bello", type: "Compulsory" },
  { id: "agri", name: "Agricultural Science", teacher: "Mrs. Joy Eze", type: "Elective" },
  { id: "td", name: "Technical Drawing", teacher: "Mr. David Abubakar", type: "Elective" },
  { id: "yor", name: "Yoruba Language", teacher: "Mrs. Victoria Uche", type: "Compulsory" },
  { id: "pl", name: "Programming Language", teacher: "Mrs. Elizabeth Okeke", type: "Compulsory" },
];

function StatCard({ label, value, iconSrc, iconAlt = "" }: { label: string; value: string | number; iconSrc: string; iconAlt?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50">
          <Image src={iconSrc} alt={iconAlt} width={20} height={20} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3 py-1.5 text-xs leading-none transition
      ${active ? "bg-[#2A7EAF] text-white border-[#2A7EAF]" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}
    >
      {label}
    </Link>
  );
}

type SimpleSubject = {
  id: string;
  name: string;
  teacher: string;
  registered: boolean;
  img?: string;
};

function SubjectCard({ s }: { s: SimpleSubject }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-40 w-full overflow-hidden bg-slate-100">
        {s.img ? (
          <Image src={s.img} alt={s.name} width={640} height={320} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-slate-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-slate-900">{s.name}</p>
            <p className="mt-1 text-[11px] text-slate-500">{s.teacher}</p>
          </div>
          <span
            className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              s.registered ? "border border-sky-100 bg-sky-50 text-sky-700" : "border border-amber-200 bg-amber-50 text-amber-600"
            }`}
          >
            {s.registered ? "Registered" : "Not Registered"}
          </span>
        </div>
        <button className="mt-3 inline-flex items-center gap-1 rounded-md bg-sky-800 px-3 py-2 text-[12px] font-medium text-white hover:bg-sky-900">
          Learning Roadmap <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function SubjectPickerModal({
  open,
  onClose,
  initial,
  onSave,
  student,
}: {
  open: boolean;
  onClose: () => void;
  initial: string[];
  onSave: (ids: string[]) => void;
  student: { name: string; id: string; term: string; klass: string };
}) {
  const [picked, setPicked] = useState<string[]>(initial);

  useEffect(() => setPicked(initial), [initial, open]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const [left, right] = useMemo(() => {
    const mid = Math.ceil(SUBJECT_CATALOG.length / 2);
    return [SUBJECT_CATALOG.slice(0, mid), SUBJECT_CATALOG.slice(mid)];
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-slate-500">Choose your subjects</p>
              <h3 className="text-lg font-semibold text-slate-900">{student.name}</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4 rounded-xl bg-slate-50 p-3 text-[12px]">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <span className="font-semibold">Student ID:</span> <span>{student.id}</span>
              </div>
              <div>
                <span className="font-semibold">Term:</span> <span>{student.term || "First Term"}</span>
              </div>
              <div>
                <span className="font-semibold">Class:</span> <span>{student.klass}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[left, right].map((col, idx) => (
              <div key={idx} className="space-y-3">
                {col.map((s) => {
                  const checked = picked.includes(s.id);
                  return (
                    <label key={s.id} className="flex cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(s.id)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-700">{s.name}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button onClick={onClose} className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button onClick={() => onSave(picked)} className="inline-flex items-center gap-1 rounded-md bg-[#2A7EAF] px-5 py-2 text-sm font-medium text-white hover:bg-[#236a90]">
              <Check className="h-4 w-4" />
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedSubjectsTable({ ids, student }: { ids: string[]; student: { name: string; id: string; term: string; klass: string } }) {
  const rows = useMemo(
    () =>
      SUBJECT_CATALOG.filter((c) => ids.includes(c.id)).map((c) => ({
        subject: c.name,
        teacher: c.teacher,
        type: c.type,
      })),
    [ids]
  );

  if (!rows.length) {
    return (
      <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-500">
        You have not selected any subjects yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13px] font-semibold tracking-wide text-slate-900">SAMUEL SMITH DETAILS</p>
        <div className="mt-2 grid gap-6 text-[12px] text-slate-700 sm:grid-cols-3">
          <div>
            <span className="font-medium">Student ID:</span> <span>{student.id}</span>
          </div>
          <div>
            <span className="font-medium">Term:</span> <span>{student.term}</span>
          </div>
          <div>
            <span className="font-medium">Class:</span> <span>{student.klass}</span>
          </div>
        </div>
        <p className="mt-2 text-[12px] font-medium text-slate-700">Total Subject: {rows.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[520px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <th className="px-3 py-2 font-medium">Subject</th>
              <th className="px-3 py-2 font-medium">Teachers</th>
              <th className="px-3 py-2 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.subject} className="border-b border-slate-100">
                <td className="px-3 py-2">{r.subject}</td>
                <td className="px-3 py-2">{r.teacher}</td>
                <td className="px-3 py-2">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TOP_FILTERS = [
  { label: "Subject", href: SUBJECTS_BASE },
  { label: "Classroom", href: `${SUBJECTS_BASE}/classroom` },
  { label: "Assignment", href: `${SUBJECTS_BASE}/assignment` },
  { label: "Examinations", href: `${SUBJECTS_BASE}/examinations` },
  { label: "Records", href: `${SUBJECTS_BASE}/records` },
  { label: "Attendance", href: `${SUBJECTS_BASE}/attendance` },
  { label: "Timetable", href: `${SUBJECTS_BASE}/timetable` },
  { label: "Library", href: `${SUBJECTS_BASE}/library` },
] as const;

const SIMPLE_SUBJECTS: SimpleSubject[] = SUBJECT_CATALOG.slice(0, 9).map((c, i) => ({
  id: c.id,
  name: c.name,
  teacher: c.teacher,
  registered: i % 3 === 1,
  img: "/_assets/books.png",
}));

export default function AcademicsPage() {
  const [tab, setTab] = useState<"subjects" | "registration" | "selected">("subjects");
  const [query, setQuery] = useState("");

  const [form, setForm] = useState({
    session: "2024/2025",
    term: "",
    klass: "SS 2",
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("nt_selected_subjects");
    if (raw) setSelectedIds(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("nt_selected_subjects", JSON.stringify(selectedIds));
  }, [selectedIds]);

  const [openPicker, setOpenPicker] = useState(false);
  const readyToPick = form.session && form.term && form.klass;

  const filteredGrid = SIMPLE_SUBJECTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="space-y-6 px-4 py-6 sm:px-5 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Subjects</h1>
            <p className="text-sm text-slate-500">Access your learning materials and track progress</p>
          </div>

          <div className="w-full md:w-[360px]">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search anything here"
                className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
              />
              <Search className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {TOP_FILTERS.map(({ label, href }) => (
            <FilterPill key={href} href={href} label={label} />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <StatCard label="Enrolled Subjects" value="10" iconSrc="/_assets/Vector3.png" iconAlt="Enrolled subjects" />
          <StatCard label="Average Progress" value="78%" iconSrc="/_assets/Vector4.png" iconAlt="Average progress" />
          <StatCard label="Total Students" value="56" iconSrc="/_assets/Vector5.png" iconAlt="Total students" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 px-4 pt-4 sm:px-6">
            {[
              { key: "subjects", label: "Subjects" },
              { key: "registration", label: `Subject Registration (${selectedIds.length})` },
              { key: "selected", label: "Selected Subjects" },
            ].map((t) => {
              const active = tab === (t.key as typeof tab);
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key as typeof tab)}
                  className={`relative -mb-px border-b-2 px-1.5 py-3 text-sm font-medium ${
                    active ? "border-[#2A7EAF] text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 sm:p-6">
            {tab === "subjects" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGrid.map((s) => (
                  <SubjectCard key={s.id} s={s} />
                ))}
              </div>
            )}

            {tab === "registration" && (
              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Subject Registration</h3>
                  <p className="text-xs text-slate-500">Create and manage subjects in your school</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[13px] font-semibold tracking-wide text-slate-900">SAMUEL SMITH DETAILS</p>
                  <div className="mt-2 grid gap-6 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div>
                      <span className="font-medium">Student ID:</span>
                      <span className="ml-1">STU0034</span>
                    </div>
                    <div>
                      <span className="font-medium">Term:</span>
                      <span className="ml-1">{form.term || ""}</span>
                    </div>
                    <div>
                      <span className="font-medium">Class:</span>
                      <span className="ml-1">{form.klass}</span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (readyToPick) setOpenPicker(true);
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <label className="text-xs font-medium text-slate-600">
                      SESSION
                      <div className="relative mt-1">
                        <select
                          value={form.session}
                          onChange={(e) => setForm((f) => ({ ...f, session: e.target.value }))}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                        >
                          {["2023/2024", "2024/2025", "2025/2026"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">v</span>
                      </div>
                    </label>

                    <label className="text-xs font-medium text-slate-600">
                      TERM
                      <div className="relative mt-1">
                        <select
                          value={form.term}
                          onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                        >
                          <option value="" disabled>
                            Select Term
                          </option>
                          <option>First Term</option>
                          <option>Second Term</option>
                          <option>Third Term</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">v</span>
                      </div>
                    </label>

                    <label className="text-xs font-medium text-slate-600">
                      CLASS
                      <div className="relative mt-1">
                        <select
                          value={form.klass}
                          onChange={(e) => setForm((f) => ({ ...f, klass: e.target.value }))}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none"
                        >
                          <option>SS 1</option>
                          <option>SS 2</option>
                          <option>SS 3</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">v</span>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={!readyToPick}
                      className={`inline-flex items-center rounded-md bg-[#2A7EAF] px-5 py-2 text-sm font-medium text-white transition ${
                        readyToPick ? "hover:bg-[#236a90]" : "opacity-50"
                      }`}
                    >
                      Proceed
                    </button>
                  </div>
                </form>
              </section>
            )}

            {tab === "selected" && (
              <SelectedSubjectsTable
                ids={selectedIds}
                student={{
                  name: "Samuel Smith",
                  id: "STU0034",
                  term: form.term || "First Term",
                  klass: form.klass,
                }}
              />
            )}
          </div>
        </div>
      </div>

      <SubjectPickerModal
        open={openPicker}
        onClose={() => setOpenPicker(false)}
        initial={selectedIds}
        student={{
          name: "Samuel Smith",
          id: "STU0034",
          term: form.term || "First Term",
          klass: form.klass,
        }}
        onSave={(ids) => {
          setSelectedIds(ids);
          setOpenPicker(false);
          setTab("selected");
        }}
      />
    </>
  );
}
