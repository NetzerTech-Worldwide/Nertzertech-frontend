import { Download, FileText } from "lucide-react";
import type { LectureNote } from "@/types/academic-classroom";

export default function LectureResourcesList({
  notes,
  onDownload,
}: {
  notes: LectureNote[];
  onDownload: (title: string, downloadUrl: string) => void;
}) {
  if (notes.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Lecture Note and Resources</h2>
      <div className="mt-3 space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600">
                <FileText className="h-4 w-4" />
              </span>
              {/* fileType/size aren't on the LectureNote schema — generic label until the API adds them */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{note.title}</p>
                <p className="text-[11px] text-slate-400">Document</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={`Download ${note.title}`}
              onClick={() => onDownload(note.title, note.downloadUrl)}
              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-sky-600"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}