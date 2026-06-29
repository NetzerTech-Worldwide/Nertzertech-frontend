"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Check, CheckCircle2 } from "lucide-react";

// ─── Shared types ─────────────────────────────────────────────────────────────

export type CatalogItem = {
  id: string;
  name: string;
  teacher: string;
  type: "Compulsory" | "Elective";
};

export type StudentMeta = {
  name: string;
  id: string;
  term: string;
  klass: string;
  session?: string;
};

// ─── SubjectPickerModal ───────────────────────────────────────────────────────

type SubjectPickerModalProps = {
  open: boolean;
  onClose: () => void;
  catalog: CatalogItem[];
  initial: string[];
  student: StudentMeta;
  onSave: (ids: string[]) => void;
};

export function SubjectPickerModal({
  open,
  onClose,
  catalog,
  initial,
  student,
  onSave,
}: SubjectPickerModalProps) {
  const [picked, setPicked] = useState<string[]>(initial);

  useEffect(() => {
    if (open) setPicked(initial);
  }, [initial, open]);

  const toggle = (id: string) =>
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const [left, right] = useMemo(() => {
    const mid = Math.ceil(catalog.length / 2);
    return [catalog.slice(0, mid), catalog.slice(mid)];
  }, [catalog]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">

          {/* Header */}
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-[12px] text-slate-500">Choose your subjects</p>
              <h3 className="text-2xl font-semibold text-slate-900">{student.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Student meta */}
          <div className="mb-4 rounded-xl bg-slate-50 p-3 text-[13px]">
            <div className="grid gap-4 sm:grid-cols-3 text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Student ID:</span>{" "}
                <span>{student.id}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Term:</span>{" "}
                <span>{student.term || "First Term"}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Class:</span>{" "}
                <span>{student.klass}</span>
              </div>
            </div>
          </div>

          {/* Subject checkboxes */}
          <div className="grid gap-6 sm:grid-cols-2">
            {[left, right].map((col, idx) => (
              <div key={idx} className="space-y-3">
                {col.map((s) => {
                  const checked = picked.includes(s.id);
                  return (
                    <label
                      key={s.id}
                      className="flex cursor-pointer items-center gap-2.5"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(s.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                      />
                      <span className="text-[13px] text-slate-700">{s.name}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(picked)}
              disabled={picked.length === 0}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#2A7EAF] px-5 py-2 text-sm font-medium text-white hover:bg-[#236a90] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Check className="h-4 w-4" />
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SuccessModal ─────────────────────────────────────────────────────────────

type SuccessModalProps = {
  open: boolean;
  student: StudentMeta;
  onViewSubjects: () => void;
};

export function SuccessModal({ open, student, onViewSubjects }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-emerald-400 bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-500" />
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-2">
          Subject registration successfully!
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          You've successfully registered your {student.term.toLowerCase()} subjects
          <br />
          for {student.session ?? "2024 / 2025"} session
        </p>

        <button
          onClick={onViewSubjects}
          className="rounded-lg border border-slate-300 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          View registered subjects
        </button>
      </div>
    </div>
  );
}