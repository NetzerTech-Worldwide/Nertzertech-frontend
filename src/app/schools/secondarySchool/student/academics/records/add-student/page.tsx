"use client";

import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Plus, Search } from "lucide-react";

const SUBJECTS_BASE = "/schools/secondarySchool/student/academics";
const RECORDS_BASE = `${SUBJECTS_BASE}/records`;

const GRADE_OPTIONS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"] as const;
const SECTION_OPTIONS = ["Section A", "Section B"] as const;

type GradeOption = (typeof GRADE_OPTIONS)[number];
type SectionOption = (typeof SECTION_OPTIONS)[number];
type FieldErrors = {
  firstName?: string;
  studentId?: string;
  email?: string;
  phoneNumber?: string;
  gpa?: string;
  attendance?: string;
};

function normalizeGrade(value: string | null): GradeOption {
  if (value && GRADE_OPTIONS.includes(value as GradeOption)) return value as GradeOption;
  return "9th Grade";
}

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
  errorMessage,
  children,
}: {
  label: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {errorMessage && <p className="mt-1 text-[9px] leading-none text-[#E5484D]">{errorMessage}</p>}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={`h-10 w-full rounded-md bg-white px-3 text-xs text-slate-700 placeholder:text-slate-400 outline-none transition
      ${invalid ? "border border-[#EFA0A0] focus:border-[#E5484D]" : "border border-slate-200 focus:border-slate-300"}`}
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

export default function AddStudentPage() {
  const [defaultGrade, setDefaultGrade] = useState<GradeOption>("9th Grade");

  const [pageSearch, setPageSearch] = useState("");
  const [firstName, setFirstName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState<GradeOption>(defaultGrade);
  const [section, setSection] = useState<SectionOption>("Section A");
  const [gpa, setGpa] = useState("");
  const [attendance, setAttendance] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setDefaultGrade(normalizeGrade(params.get("grade")));
    }
  }, []);

  useEffect(() => {
    setGrade(defaultGrade);
  }, [defaultGrade]);

  const avatarText = firstName.trim() ? firstName.trim().slice(0, 1).toUpperCase() : "?";
  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!firstName.trim()) nextErrors.firstName = "Student name is required";
    if (!studentId.trim()) nextErrors.studentId = "Student ID is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    if (!phoneNumber.trim()) nextErrors.phoneNumber = "Phone number is required";
    if (!gpa.trim()) nextErrors.gpa = "GPA is required";
    if (!attendance.trim()) nextErrors.attendance = "Attendance rate is required";

    return nextErrors;
  };

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
        <h2 className="text-[26px] leading-[1.1] font-semibold text-slate-900">Add New Student</h2>
        <p className="text-[12px] text-slate-500">Fill in the student information below</p>
      </section>

      <section className="max-w-[690px] rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1F658D] text-[21px] font-semibold text-white">
            {avatarText}
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
            setErrors(validate());
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="First Name" required errorMessage={errors.firstName}>
              <TextInput value={firstName} onChange={setFirstName} placeholder="Enter first name" invalid={!!errors.firstName} />
            </InputField>

            <InputField label="Student ID" required errorMessage={errors.studentId}>
              <TextInput value={studentId} onChange={setStudentId} placeholder="Enter last name" invalid={!!errors.studentId} />
            </InputField>

            <InputField label="Email Address" required errorMessage={errors.email}>
              <TextInput value={email} onChange={setEmail} placeholder="user@example.com" invalid={!!errors.email} />
            </InputField>

            <InputField label="Phone Number" required errorMessage={errors.phoneNumber}>
              <TextInput value={phoneNumber} onChange={setPhoneNumber} placeholder="(+123) 98766555" invalid={!!errors.phoneNumber} />
            </InputField>

            <InputField label="Grade" required>
              <SelectField value={grade} options={GRADE_OPTIONS} onChange={setGrade} />
            </InputField>

            <InputField label="Section" required>
              <SelectField value={section} options={SECTION_OPTIONS} onChange={setSection} />
            </InputField>

            <InputField label="GPA" required errorMessage={errors.gpa}>
              <TextInput value={gpa} onChange={setGpa} placeholder="0.0-4.0" invalid={!!errors.gpa} />
            </InputField>

            <InputField label="Attendance Rate (%)" required errorMessage={errors.attendance}>
              <TextInput value={attendance} onChange={setAttendance} placeholder="0-100" invalid={!!errors.attendance} />
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
                className="inline-flex h-10 min-w-[150px] items-center justify-center gap-1 rounded-md bg-[#1B628A] px-6 text-[11px] font-medium text-white transition hover:bg-[#164f70]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Student
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

