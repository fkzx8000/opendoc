import {
  Language,
  Student,
  Instructor,
  ExternalInstructor,
} from "./documentTypes";

// מצב הטופס
export interface FormState {
  language: Language;
  title: string;
  projectNumber: string;
  students: Student[];
  instructors: Instructor[];
  hasExternalInstructor: boolean;
  externalInstructor: ExternalInstructor;
  abstract: string;
  keywords: string;
  content: string;
}

// פרופס לקומפוננטת מקטע טופס
export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}
