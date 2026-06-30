import type { StudentProfileResponse } from "@/types/profile";

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export async function fetchStudentProfile(): Promise<StudentProfileResponse> {
  const res = await fetch("/api/profile", {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(errorBody || `Profile request failed: ${res.status}`);
  }

  return res.json();
}

export async function changeStudentPassword(payload: ChangePasswordPayload) {
  const res = await fetch("/api/profile/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(errorBody || `Password update failed: ${res.status}`);
  }

  if (res.status === 204) return null;

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
