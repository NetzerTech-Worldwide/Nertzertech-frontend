"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";
const RECORDS_BASE = `${SUBJECTS_BASE}/records`;

const GRADE_OPTIONS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"] as const;
const SECTION_OPTIONS = ["Section A", "Section B"] as const;

type GradeOption = (typeof GRADE_OPTIONS)[number];
type SectionOption = (typeof SECTION_OPTIONS)[number];

type StudentInfo = {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  grade: GradeOption;
  section: SectionOption;
  gpa: string;
  attendance: string;
};

const STUDENTS: StudentInfo[] = [
  { id: "STU001", initials: "EW", name: "Emma Wilson", email: "emma.wilson@school.edu", phone: "+1 234-567-8901", grade: "10th Grade", section: "Section A", gpa: "3.8", attendance: "95%" },
  { id: "STU002", initials: "LJ", name: "Liam Johnson", email: "liam.johnson@school.edu", phone: "+1 234-567-8902", grade: "10th Grade", section: "Section A", gpa: "3.6", attendance: "91%" },
  { id: "STU003", initials: "OB", name: "Olivia Brown", email: "olivia.brown@school.edu", phone: "+1 234-567-8903", grade: "10th Grade", section: "Section B", gpa: "3.9", attendance: "93%" },
  { id: "STU004", initials: "ND", name: "Noah Davis", email: "noah.davis@school.edu", phone: "+1 234-567-8904", grade: "11th Grade", section: "Section A", gpa: "3.9", attendance: "93%" },
  { id: "STU005", initials: "AM", name: "Ava Martinez", email: "ava.martinez@school.edu", phone: "+1 234-567-8905", grade: "11th Grade", section: "Section B", gpa: "4", attendance: "99%" },
  { id: "STU006", initials: "EG", name: "Ethan Garcia", email: "ethan.garcia@school.edu", phone: "+1 234-567-8906", grade: "12th Grade", section: "Section A", gpa: "3.9", attendance: "93%" },
  { id: "STU007", initials: "SR", name: "Sophia Rodriguez", email: "sophia.rodriguez@school.edu", phone: "+1 234-567-8907", grade: "12th Grade", section: "Section B", gpa: "3.8", attendance: "94%" },
  { id: "STU008", initials: "ML", name: "Mason Lee", email: "mason.lee@school.edu", phone: "+1 234-567-8908", grade: "9th Grade", section: "Section A", gpa: "3.9", attendance: "93%" },
];

function FilterPill({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== SUBJECTS_BASE && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-4 py-2 text-xs leading-none transition
      ${active ? "border-[#2A7EAF] bg-[#2A7EAF] text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}
    >
      {label}
    </Link>
  );
}

function InputField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function TextInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-slate-300"
    />
  );
}

function SelectField<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none transition focus:border-slate-300"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default function EditStudentPage() {
  const [queryStudentId, setQueryStudentId] = useState<string | null>(null);
  const student = useMemo(() => STUDENTS.find((s) => s.id === queryStudentId) ?? STUDENTS[0], [queryStudentId]);

  const [pageSearch, setPageSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQueryStudentId(params.get("id"));
    }
  }, []);
  const [name, setName] = useState(student.name);
  const [studentId, setStudentId] = useState(student.id);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);
  const [grade, setGrade] = useState<GradeOption>(student.grade);
  const [section, setSection] = useState<SectionOption>(student.section);
  const [gpa, setGpa] = useState(student.gpa);
  const [attendance, setAttendance] = useState(student.attendance);

  useEffect(() => {
    setName(student.name);
    setStudentId(student.id);
    setEmail(student.email);
    setPhone(student.phone);
    setGrade(student.grade);
    setSection(student.section);
    setGpa(student.gpa);
    setAttendance(student.attendance);
  }, [student]);

  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[21px] font-semibold text-slate-900">Examinations</h1>
          <p className="text-xs text-slate-500">Manage your examinations and practice tests</p>
        </div>

        <div className="w-full md:max-w-[360px]">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
            <input
              type="text"
              value={pageSearch}
              onChange={(event) => setPageSearch(event.target.value)}
              placeholder="Search anything here"
              className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
            />
            <Search className="h-4 w-4 text-[#2A7EAF]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="inline-flex h-7 items-center gap-1 rounded-md bg-[#1B628A] px-3 text-[10px] font-medium text-white transition hover:bg-[#164f70]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <div className="flex flex-wrap gap-2">
        <FilterPill href={SUBJECTS_BASE} label="Subject" />
        <FilterPill href={`${SUBJECTS_BASE}/classroom`} label="Classroom" />
        <FilterPill href={`${SUBJECTS_BASE}/assignment`} label="Assignment" />
        <FilterPill href={`${SUBJECTS_BASE}/examinations`} label="Examinations" />
        <FilterPill href={RECORDS_BASE} label="Records" />
        <FilterPill href={`${SUBJECTS_BASE}/attendance`} label="Attendance" />
        <FilterPill href={`${SUBJECTS_BASE}/timetable`} label="Timetable" />
        <FilterPill href={`${SUBJECTS_BASE}/library`} label="Library" />
      </div>

      <section className="space-y-1">
        <h2 className="text-[26px] leading-[1.1] font-semibold text-slate-900">Edit Student Information</h2>
        <p className="text-[12px] text-slate-500">Update student details and academic information</p>
      </section>

      <section className="max-w-[690px] rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1F658D] text-[21px] font-semibold text-white">
            {student.initials}
          </span>
          <div>
            <p className="text-[13px] font-medium text-slate-900">Student Avatar</p>
            <p className="text-[11px] text-slate-500">Auto-generated from student name</p>
          </div>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="First Name" required>
              <TextInput value={name} onChange={setName} />
            </InputField>

            <InputField label="Student ID" required>
              <TextInput value={studentId} onChange={setStudentId} />
            </InputField>

            <InputField label="Email Address" required>
              <TextInput value={email} onChange={setEmail} />
            </InputField>

            <InputField label="Phone Number" required>
              <TextInput value={phone} onChange={setPhone} />
            </InputField>

            <InputField label="Grade" required>
              <SelectField value={grade} options={GRADE_OPTIONS} onChange={setGrade} />
            </InputField>

            <InputField label="Section" required>
              <SelectField value={section} options={SECTION_OPTIONS} onChange={setSection} />
            </InputField>

            <InputField label="GPA" required>
              <TextInput value={gpa} onChange={setGpa} />
            </InputField>

            <InputField label="Attendance Rate (%)" required>
              <TextInput value={attendance} onChange={setAttendance} />
            </InputField>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={RECORDS_BASE}
                className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-md border border-[#2A7EAF] bg-white px-6 text-[11px] font-medium text-[#2A7EAF] transition hover:bg-sky-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-md bg-[#1B628A] px-6 text-[11px] font-medium text-white transition hover:bg-[#164f70]"
              >
                Save Change
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

