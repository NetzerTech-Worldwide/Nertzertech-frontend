import { useMemo } from "react";
import { type CatalogItem, type StudentMeta } from "../_components/subjectModals";

type Props = {
  ids: string[];
  catalog: CatalogItem[];
  student: StudentMeta;
};

export function SelectedSubjectsTable({ ids, catalog, student }: Props) {
  const rows = useMemo(
    () => catalog.filter((c) => ids.includes(c.id)),
    [ids, catalog]
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
      {/* Student info box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13px] font-semibold tracking-wide text-slate-900">
          {student.name.toUpperCase()} DETAILS
        </p>
        <div className="mt-2 grid gap-4 text-[12px] text-slate-700 sm:grid-cols-4">
          <div>
            <span className="font-medium">Student ID:</span>{" "}
            <span>{student.id}</span>
          </div>
          <div>
            <span className="font-medium">Term:</span>{" "}
            <span>{student.term}</span>
          </div>
          <div>
            <span className="font-medium">Class:</span>{" "}
            <span>{student.klass}</span>
          </div>
          <div>
            <span className="font-medium">Total Subjects:</span>{" "}
            <span>{rows.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
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
              <tr key={r.id} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-2.5 text-slate-800">{r.name}</td>
                <td className="px-3 py-2.5 text-slate-600">{r.teacher}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      r.type === "Compulsory"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {r.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}