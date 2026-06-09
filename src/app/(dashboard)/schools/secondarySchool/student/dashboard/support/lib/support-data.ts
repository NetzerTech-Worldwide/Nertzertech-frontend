export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketCategory =
  | "Academic Issues"
  | "Fee/Payment Issues"
  | "Technical Issues"
  | "Document Requests";

export interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  attachmentName?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: TicketCategory;
}

export const CATEGORIES: {
  label: TicketCategory;
  description: string;
  icon: string;
}[] = [
  {
    label: "Academic Issues",
    description: "Get help with grades, assignments, course enrollment, and academic queries.",
    icon: "graduation",
  },
  {
    label: "Fee/Payment Issues",
    description: "Resolve payment concerns, request receipts, or inquire about fee structures.",
    icon: "credit-card",
  },
  {
    label: "Technical Issues",
    description: "Report portal access problems, login issues, or technical difficulties.",
    icon: "monitor",
  },
  {
    label: "Document Requests",
    description: "Request transcripts, certificates, letters, or other official documents.",
    icon: "file-text",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I reset my password?",
    answer:
      'To reset your password, click on your profile icon in the top right corner, navigate to "Account & Security", and select "Change Password". Enter your current password followed by your new password and confirm the change.',
    category: "Technical Issues",
  },
  {
    id: "faq-2",
    question: "My payment is not reflecting in my account",
    answer:
      "Payments can take up to 24 hours to reflect. If it has been more than 24 hours, please visit the Fee/Payment section and check your transaction history. If the issue persists, submit a support ticket with your payment receipt attached.",
    category: "Fee/Payment Issues",
  },
  {
    id: "faq-3",
    question: "I cannot access my online classes",
    answer:
      "First, ensure you are logged in with your student credentials. Check that your course enrollment is active under the Academics section. If you still cannot access classes, clear your browser cache or try a different browser. Contact technical support if the issue continues.",
    category: "Technical Issues",
  },
  {
    id: "faq-4",
    question: "How can I download my payment receipt?",
    answer:
      'Navigate to Student Life → Fees, then click on the "Receipts" tab. Select the payment you need and click "Download Receipt". Receipts are available in PDF format.',
    category: "Fee/Payment Issues",
  },
  {
    id: "faq-5",
    question: "How do I update my profile information?",
    answer:
      'Go to the Profile section from the sidebar. Click "Edit Profile" to update your personal information. Note that some fields like your student ID and date of birth can only be changed by an administrator.',
    category: "Academic Issues",
  },
];

// Dummy ticket history data
export const DUMMY_TICKETS: Ticket[] = [
  {
    id: "TKT-2024-001",
    subject: "Unable to view my semester results",
    category: "Academic Issues",
    description: "My semester results are not showing on the portal even though results have been released.",
    status: "resolved",
    createdAt: "2024-11-10T09:30:00Z",
    updatedAt: "2024-11-12T14:20:00Z",
  },
  {
    id: "TKT-2024-002",
    subject: "Fee payment not reflecting",
    category: "Fee/Payment Issues",
    description: "I paid my second semester fees on Nov 15 but it still shows as unpaid.",
    status: "in_progress",
    createdAt: "2024-11-16T11:00:00Z",
    updatedAt: "2024-11-17T08:45:00Z",
    attachmentName: "payment_receipt.pdf",
  },
  {
    id: "TKT-2024-003",
    subject: "Request for admission letter",
    category: "Document Requests",
    description: "I need an official admission letter for visa application purposes.",
    status: "open",
    createdAt: "2024-11-18T10:15:00Z",
    updatedAt: "2024-11-18T10:15:00Z",
  },
  {
    id: "TKT-2024-004",
    subject: "Login issues on mobile browser",
    category: "Technical Issues",
    description: "I cannot log in using Chrome on my Android phone. The page keeps refreshing.",
    status: "closed",
    createdAt: "2024-10-22T14:00:00Z",
    updatedAt: "2024-10-25T09:30:00Z",
  },
  {
    id: "TKT-2024-005",
    subject: "Course enrollment error",
    category: "Academic Issues",
    description: "I am unable to enroll in ENG 302 despite meeting all prerequisites.",
    status: "resolved",
    createdAt: "2024-10-05T08:00:00Z",
    updatedAt: "2024-10-07T16:00:00Z",
  },
];