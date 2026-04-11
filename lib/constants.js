export const examNavLinks = [
    {
        id: "abc",
        title: "all examinations",
        link: "examinations",
        number: 9
    },
    {
        id: "def",
        title: "upcoming",
        link: "upcoming",
        number: 3
    },
    {
        id: "ghi",
        title: "submitted",
        link: "submitted",
        number: 3
    },
]

// export const examData = [
//     {
//         id: "abc",
//         subject: "Mathematics",
//         examType: "Midterm Exam",
//         chapters: "1-8",
//         topics: ["calculus", "integration", "differential equations"],
//         date: "2025-08-05",
//         start: "11:00AM",
//         end: "2:00PM",
//         duration: "3 hours",
//         status: "due date"
//     },
//     {
//         id: "def",
//         subject: "Biology",
//         examType: "Examination",
//         chapters: "1-8",
//         topics: ["photosynthesis and its importance to plants"],
//         date: "2025-08-05",
//         start: "12:00PM",
//         end: "3:00PM",
//         duration: "3 hours",
//         status: "upcoming"
//     },
//     {
//         id: "ghi",
//         subject: "Biology",
//         examType: "Examination",
//         chapters: "1-8",
//         topics: ["photosynthesis and its importance to plants"],
//         date: "2025-08-05",
//         start: "12:00PM",
//         end: "3:00PM",
//         duration: "3 hours",
//         status: "completed"
//     },
//     {
//         id: "jkl",
//         subject: "Biology",
//         examType: "Examination",
//         chapters: "1-8",
//         topics: ["photosynthesis and its importance to plants"],
//         date: "2025-08-05",
//         start: "12:00PM",
//         end: "3:00PM",
//         duration: "3 hours",
//         status: "upcoming"
//     },
//     {
//         id: "mno",
//         subject: "Biology",
//         examType: "Examination",
//         chapters: "1-8",
//         topics: ["photosynthesis and its importance to plants"],
//         date: "2025-08-05",
//         start: "12:00PM",
//         end: "3:00PM",
//         duration: "3 hours",
//         status: "completed"
//     }
// ]

export const examDetails = {
    subject: "Advanced mathematics details",
    syllabus: "chapters 1 - 8",
    topics: ["calculus", "integration", "differential equations"],
    start: "9:00AM",
    end: "12:00PM",
    date: "2026-01-09",
    class: "SS 2",
    totalMaterials: 4,
    downloaded: 2,
    totalTests: 4,
    testsDone: 3
}

export const studyMaterial = [
    {
        id: "abc",
        size:2.3,
        topic: "chapter: 1 - 4 Review Notes"
    },
    {
        id: "def",
        size:1.3,
        topic: "Integration techniques guide"
    },
    {
        id: "ghi",
        size:3.1,
        topic: "Practice problem set"
    },
    {
        id: "jkl",
        size:0.9,
        topic: "Formula reference sheet"
    },
]

export const examTips = [
    "Review all practice tests thoroughly",
    "Get 8 hours of sleep before exam",
    "Arrive 15 minutes early",
    "Read questions carefully",
    "Bring required materials"
]

export const testTips = [
    "Answer all questions",
    "Review before submitting",
    "Use the timer wisely"
]

export const recommendedSteps = [
    "Review Problem Solving section",
    "Take another practice test"
]

// export const questions = [
//         {
//             id: "abc",
//             text: "What is the derivative of sin(x)?",
//             options: [{label: "A", option: "Cos(x)"}, {label: "B", option: "-Cos(x)"}, {label: "C", option: "Sin(x)"}, {label: "D", option: "Tan(x)"} ],
//             answer:"cos(x)",
//             page: 1,
//             total: 30,
//             totalPages: 3
//         },
//         {
//             id: "def",
//             text: "Solve 2x + 5 = 13",
//             options: [{label: "A", option: "x = 2"}, {label: "B", option: "x = 4"}, {label: "C", option: "x = 5"}, {label: "D", option: "x = 3"} ],
//             answer:"cos(x)",
//             page: 2,
//             total: 30,
//             totalPages: 3
//         },
//         {
//             id: "ghi",
//             text: "What is the sum of interior angles in a triangle?",
//             options: [{label: "A", option: "90°"}, {label: "B", option: "180°"}, {label: "C", option: "270°"}, {label: "D", option: "360°"} ],
//             answer:"cos(x)",
//             page: 3,
//             total: 30,
//             totalPages: 3
//         }
//     ]


export const question = {
  data: [
    {
      id: "abc",
      text: "Solve 2x + 5 = 13",
      type: "multiple_choice",
      options: [
        {label: "A", option: "x = 2"}, 
        {label: "B", option: "x = 4"}, 
        {label: "C", option: "x = 5"}, 
        {label: "D", option: "x = 3"}
      ],
      points: 0,
      order: 0
    }
  ],
  total: 3,
  page: 1,
  limit: 0,
  totalPages: 3
}

export const faqs = [
    {
        title: "How do I reset my password?",
        content: `To reset your password, click on your profile icon in the top right corner, navigate to "Account & Security", and select "Change Password". Enter your
            current password followed by your new password and confirm the change.`
    },
    {
        title: "My payment is not reflecting in my account",
        content: ``
    },
    {
        title: "I cannot access my online classes",
        content: ``
    },
    {
        title: "How can I download my payment receipt?",
        content: ``
    },
    {
        title: "How do I update my profile information?",
        content: ``
    },
]

export const tickets = [
    {
        id: "TXT-0147",
        cat: "Academic Issues",
        subject: "Request for Grade Review, Mathematics",
        status: "in progress",
        dateSubmitted: "Mar 6,2026"
    },
    {
        id: "TXT-0132",
        cat: "Fee/Payment",
        subject: "Payment Confirmation Receipt",
        status: "resolved",
        dateSubmitted: "Mar 6,2026"
    }
]