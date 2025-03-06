// src/constants/languages.ts
export const LANGUAGE_SETTINGS = {
  hebrew: {
    // fontFamily: "David, 'Times New Roman', serif",
    fontFamily: "David, 'David', serif",
    direction: "rtl",
    abstractLimit: 200,
    placeholders: {
      title: "הזן כותרת כאן",
      students: "רשום כל סטודנט בשורה נפרדת",
      emails: "רשום כל כתובת מייל בשורה נפרדת (באותו סדר כמו שמות הסטודנטים)",
      abstract: "הזן את התקציר כאן",
      keywords: "הפרד מילות מפתח בפסיקים",
      content: "הזן את התוכן כאן",
      instructorName: "הזן את שם המנחה כאן",
      instructorInstitution: "יש לרשום את שם המוסד המלא והקמפוס של המנחה",
      projectNumber: "הזן את מספר הפרויקט או הקורס", // הוספת שדה חסר
    },
    labels: {
      studentsHeader: "שמות הסטודנטים:",
      advisor: "בהנחיית:",
      coAdvisor: "ובהנחיית:",
      abstract: "תקציר:",
      keywords: "מילות מפתח:",
      generateButton: "צור מסמך",
    },
  },
  english: {
    fontFamily: "'Times New Roman', serif",
    direction: "ltr",
    abstractLimit: 300,
    placeholders: {
      title: "Enter title here",
      students: "Write each student on a separate line (First name Last name)",
      emails:
        "Write each email on a separate line (same order as student names)",
      abstract: "Enter abstract here (up to 300 words)",
      keywords: "Separate keywords with commas (all lowercase)",
      content: "Enter content here",
      instructorName: "Enter instructor name here (First name Last name)",
      instructorInstitution: "Enter the full institution name and campus",
      projectNumber: "Enter project/course number",
    },
    labels: {
      studentsHeader: "Students:",
      advisor: "Advisor:",
      coAdvisor: "Co-Advisor:",
      abstract: "Abstract:",
      keywords: "Keywords:",
      generateButton: "Generate Document",
    },
  },
};

export const INSTRUCTOR_TITLES = {
  hebrew: ["ד״ר", "מר", "פרופסור", "גב׳"],
  english: ["Dr.", "Mr.", "Prof.", "Ms."],
};
