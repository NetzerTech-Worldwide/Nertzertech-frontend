const baseUrl = 'https://netzertech-api.onrender.com/api/v1'

export const loginStudent = async (credentials: {
  fullName: string;
  studentId: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/auth/login/student`, {
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
  fullName: string;
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

export const resetPassword = async (email: string) => {
  const response = await fetch(`${baseUrl}/api/v1/auth/forgot-password`, {
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