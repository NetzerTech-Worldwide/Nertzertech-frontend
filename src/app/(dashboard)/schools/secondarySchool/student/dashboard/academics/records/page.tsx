// app/academics/records/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import AcademicsNavigation from "../_components/academicsNavigation";
import { RecordHeader } from "../_components/recordHeader";
import { RecordStatCards } from "../_components/recordStatsCards";
import { RecordTabs, type RecordTab, TabLoading, TabError } from "../_components/recordTabs";
import { OverviewTab } from "../_components/overviewTab";
import { AcademicHistoryTab } from "../_components/academicHistoryTab";
import { TranscriptTab } from "../_components/transcriptTab";
import { ReportCardsTab } from "../_components/reportCardTab";
import { DocumentsTab } from "../_components/documentsTab";
import {
  fetchAcademicRecordOverview,
  fetchAcademicHistory,
  fetchTranscript,
  fetchReportCards,
  fetchAcademicDocuments,
} from "../../../../endpoints/academic-records";
import type {
  AcademicRecordOverview,
  AcademicHistoryYear,
  TranscriptData,
  ReportCardDetail,
  AcademicDocument,
} from "@/types/academic-record";

// Generic per-tab async state — avoids refetching a tab once it has loaded.
function useLazyTabData<T>(loader: () => Promise<T>, enabled: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetched = useRef(false);

  useEffect(() => {
    if (!enabled || fetched.current) return;
    fetched.current = true;
    let mounted = true;

    setLoading(true);
    setError("");
    loader()
      .then((result) => {
        if (mounted) setData(result);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { data, loading, error };
}

export default function AcademicRecordsPage() {
  const [tab, setTab] = useState<RecordTab>("overview");
  const [query, setQuery] = useState("");

  const overview = useLazyTabData<AcademicRecordOverview>(fetchAcademicRecordOverview, true);
  const history = useLazyTabData<AcademicHistoryYear[]>(fetchAcademicHistory, tab === "history");
  const transcript = useLazyTabData<TranscriptData>(fetchTranscript, tab === "transcript");
  const reportCards = useLazyTabData<ReportCardDetail[]>(fetchReportCards, tab === "report-cards");
  const documents = useLazyTabData<AcademicDocument[]>(fetchAcademicDocuments, tab === "documents");

  return (
    <div className="space-y-6 px-4 pt-0 pb-6 sm:px-5 md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Record</h1>
          <p className="text-sm text-slate-500">Track your academic performance across all subjects</p>
        </div>
        <div className="relative w-full max-w-xs sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything here"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 focus:border-sky-300 focus:outline-none"
          />
        </div>
      </div>

      <AcademicsNavigation />

      {overview.data && (
        <RecordHeader student={overview.data.student} classLabel={overview.data.student.className} />
      )}

      {overview.loading && !overview.data && <TabLoading label="Loading your record…" />}
      {overview.error && <TabError message={overview.error} />}

      {overview.data && <RecordStatCards summary={overview.data.summary} />}

      <div className="rounded-2xl border border-slate-200 bg-white">
        <RecordTabs active={tab} onChange={setTab} />

        <div className="p-4 sm:p-6">
          {tab === "overview" && (
            <>
              {overview.loading && !overview.data && <TabLoading />}
              {overview.error && <TabError message={overview.error} />}
              {overview.data && <OverviewTab data={overview.data} />}
            </>
          )}

          {tab === "history" && (
            <>
              {history.loading && <TabLoading />}
              {history.error && <TabError message={history.error} />}
              {history.data && <AcademicHistoryTab years={history.data} />}
            </>
          )}

          {tab === "transcript" && (
            <>
              {transcript.loading && <TabLoading />}
              {transcript.error && <TabError message={transcript.error} />}
              {transcript.data && <TranscriptTab data={transcript.data} />}
            </>
          )}

          {tab === "report-cards" && (
            <>
              {reportCards.loading && <TabLoading />}
              {reportCards.error && <TabError message={reportCards.error} />}
              {reportCards.data && <ReportCardsTab cards={reportCards.data} />}
            </>
          )}

          {tab === "documents" && (
            <>
              {documents.loading && <TabLoading />}
              {documents.error && <TabError message={documents.error} />}
              {documents.data && <DocumentsTab documents={documents.data} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}