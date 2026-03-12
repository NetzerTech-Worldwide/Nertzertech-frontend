// const baseUrl = 'https://netzertech-api.onrender.com/api/v1'

const baseUrl = "https://dev-netzertech-backend.vercel.app/api/v1";

export const loginStudent = async (credentials: {
  studentId: string;
  fullName: string;
  password: string;
}) => {
  const response = await fetch(
    `${baseUrl}/auth/login/student/secondary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // store token if backend returns one
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const loginParent = async (credentials: {
  email: string;
  studentId: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/login/parent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const loginTeacher = async (credentials: {
  staffId: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/login/teacher`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const forgetPassword = async (email: {
  email: string
}) => {
  const response = await fetch(`${baseUrl}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send reset password email');
  }

  return await response.json();
};

export const resetPassword = async(credential: string) =>{
   const response = await fetch(`${baseUrl}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send reset password email');
  }

  return await response.json();
}