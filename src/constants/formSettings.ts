// src/constants/formSettings.ts
import { FormState } from "../types/formTypes";
import { INSTRUCTOR_TITLES } from "./languages";

/**
 * מצב ברירת מחדל לטופס
 */
export const DEFAULT_FORM_STATE: FormState = {
  language: "hebrew",
  title: "",
  projectNumber: "",
  students: [{ name: "", email: "" }],
  instructors: [
    {
      id: "0",
      title: INSTRUCTOR_TITLES.hebrew[0],
      name: "",
      institution: "",
    },
  ],
  hasExternalInstructor: false,
  externalInstructor: {
    title: INSTRUCTOR_TITLES.hebrew[0],
    name: "",
    source: "",
  },
  abstract: "",
  keywords: "",
  content: "",
};

/**
 * הגדרות וולידציה של הטופס
 */
export const FORM_VALIDATION = {
  minTitleLength: 3,
  maxTitleLength: 100,
  maxStudents: 10,
  maxInstructors: 5,
  abstractMinWords: 50,
  keywordsMin: 3,
  keywordsMax: 10,
};

/**
 * מידע על שדות חובה
 */
export const REQUIRED_FIELDS = {
  title: true,
  projectNumber: false, // רק באנגלית
  studentName: true,
  studentEmail: false,
  instructorName: true,
  instructorInstitution: false,
  externalInstructorSource: true, // אם יש מנחה חיצוני
  abstract: true,
  keywords: false,
  content: false,
};

/**
 * הסברים והוראות למשתמש
 */
export const FORM_INSTRUCTIONS = {
  hebrew: {
    title: "הנחיות עיצוב לעברית:",
    instructions: [
      "גופן: David",
      "גודל טקסט: 12",
      'שוליים: 2.54 ס"מ',
      "מרווח שורות: בודד",
      "כותרת: מודגשת וממורכזת",
      "תקציר: עד 200 מילים",
    ],
  },
  english: {
    title: "English Formatting Guidelines:",
    instructions: [
      "Font: Times New Roman",
      "Text size: 12",
      "Margins: 2.54 cm",
      "Line spacing: single",
      "Title: First letter of each word capitalized, bold and centered",
      "Project number: Listed below the title",
      "Student names: First name lowercase, LAST NAME uppercase",
      "Students separated with semicolons (;)",
      "Institution name: UPPERCASE, bold with yellow highlighting",
      'Advisor: Preceded by "Advisor:" in bold',
      "Abstract: Up to 300 words as a single paragraph",
      'Keywords: Separated by semicolons (;) with "Keywords:" in bold',
    ],
  },
};

/**
 * הגדרות תצוגה
 */
export const DISPLAY_SETTINGS = {
  animateTransitions: true,
  showWordCounter: true,
  sectionSpacing: "20px",
  borderRadius: "4px",
  errorColor: "#f44336",
  successColor: "#4caf50",
  primaryColor: "#0078d4",
  secondaryColor: "#f0f0f0",
  fontSizes: {
    small: "12px",
    medium: "16px",
    large: "20px",
  },
};

/**
 * הגדרות מסמך יוצא
 */
export const DOCUMENT_SETTINGS = {
  mimeType: "application/msword",
  extension: ".doc",
  lineSpacing: 1.0,
  marginSize: "2.54cm",
  fontSize: "12pt",
  titleSize: "14pt",
};
