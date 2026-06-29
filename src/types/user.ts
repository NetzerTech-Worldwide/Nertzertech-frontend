export interface User {
  id: string;
  email: string;
  userType: string;
  isActive: boolean;
  lastLoginAt: string;
  studentId: string;
  fullName: string;
  dateOfBirth: string;
  grade: string;
  school: string;
  gender: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUserData: (user: User | null) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
}