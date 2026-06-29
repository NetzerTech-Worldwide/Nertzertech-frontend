// app/academics/records/_components/documentsTab.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  FileBadge2,
  FileText,
  ScrollText,
  HeartPulse,
  Award,
} from "lucide-react";
import type { AcademicDocument, DocumentKind } from "@/types/academic-record";
import { TabEmpty } from "./recordTabs";

const KIND_STYLES: Record<DocumentKind, { Icon: LucideIcon; tint: string }> = {
  certificate: { Icon: FileBadge2, tint: "bg-sky-50 text-sky-700" },
  "report-card": { Icon: FileText, tint: "bg-sky-50 text-sky-700" },
  transcript: { Icon: ScrollText, tint: "bg-orange-50 text-orange-600" },
  medical: { Icon: HeartPulse, tint: "bg-rose-50 text-rose-600" },
  scholarship: { Icon: Award, tint: "bg-amber-50 text-amber-600" },
  other: { Icon: FileText, tint: "bg-slate-100 text-slate-600" },
};

export function DocumentsTab({ documents }: { documents: AcademicDocument[] }) {
  if (!documents.length) {
    return <TabEmpty message="No documents available yet." />;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => {
        const { Icon, tint } = KIND_STYLES[doc.kind];
        return (
          <button
            key={doc.id}
            className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-left transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tint}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">{doc.title}</p>
              <p className="text-xs text-slate-400">{doc.dateLabel}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {doc.fileType}
              </p>
            </div>
          </button>
        );
      })}
    </section>
  );
}