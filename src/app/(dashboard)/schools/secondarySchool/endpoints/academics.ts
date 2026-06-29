import type {
  AcademicSubjectsResponse,
  AcademicRoadmapDetail,
} from "@/types/academic";

async function academicFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api/academic/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(errorBody || `Academic request failed: ${res.status}`);
  }

  return res.json();
}

export const fetchAcademicSubjects = () =>
  academicFetch<AcademicSubjectsResponse>("subjects");

export const fetchAcademicRoadmap = (subjectName: string) =>
  academicFetch<AcademicRoadmapDetail>(`roadmap/${encodeURIComponent(subjectName)}`);