export interface ProfileMetrics {
  attendancePercentage: number;
  totalClasses: number;
  averageGrade: number;
}

export interface ProfilePersonalInfo {
  fullName: string;
  studentId: string;
  matricNumber: string | null;
  admissionDate: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  bloodGroup: string | null;
  genotype: string | null;
  medicalCondition: string | null;
  allergies: string | null;
}

export interface ProfileContactInfo {
  phoneNumber: string | null;
  residentialAddress: string | null;
  stateOfOrigin: string | null;
  lga: string | null;
  nationality: string | null;
}

export interface ProfileGuardianInfo {
  fullName: string | null;
  relationship: string | null;
  phoneNumber: string | null;
  email: string | null;
  occupation: string | null;
  address: string | null;
  workAddress: string | null;
}

export interface StudentProfileResponse {
  metrics: ProfileMetrics;
  personalInfo: ProfilePersonalInfo;
  contactInfo: ProfileContactInfo;
  guardianInfo: ProfileGuardianInfo;
}
