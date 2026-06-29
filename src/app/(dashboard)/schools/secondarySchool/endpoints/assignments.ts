import type { AcademicAssignment } from "@/types/academic";

async function assignmentFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api/assignment/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(errorBody || `Assignment request failed: ${res.status}`);
  }

  return res.json();
}

export const fetchAssignments = (status: "all" | "pending" | "submitted" = "all") =>
  assignmentFetch<AcademicAssignment[]>(`assignments/${encodeURIComponent(status)}`);
