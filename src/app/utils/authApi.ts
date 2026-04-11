const baseUrl = "https://dev-netzertech-backend.vercel.app/api/v1";

/**
 * STUDENT LOGIN
 * Uses Next.js API route as proxy
 */
export const loginStudent = async (credentials: {
  studentId: string;
  fullName: string;
  password: string;
}) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * PARENT LOGIN
 */
export const loginParent = async (credentials: {
  email: string;
  studentId: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/login/parent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * TEACHER LOGIN
 */
export const loginTeacher = async (credentials: {
  staffId: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/login/teacher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * FORGOT PASSWORD
 */
export const forgetPassword = async (payload: {
  email: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset password email");
  }

  return data;
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (credential: string) => {
  const response = await fetch(`${baseUrl}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};