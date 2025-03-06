// סוגי שפות נתמכות
export type Language = "hebrew" | "english";

// מידע של סטודנט
export interface Student {
  name: string;
  email: string;
}

// מידע על מנחה
export interface Instructor {
  id: string;
  title: string;
  name: string;
  institution: string;
}

// מידע על מנחה חיצוני
export interface ExternalInstructor {
  title: string;
  name: string;
  source: string;
}

// המסמך השלם
export interface Document {
  language: Language;
  title: string;
  projectNumber?: string; // רלוונטי רק לאנגלית
  students: Student[];
  instructors: Instructor[];
  externalInstructor?: ExternalInstructor;
  abstract: string;
  keywords: string;
  content: string;
}
