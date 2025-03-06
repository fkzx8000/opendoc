import { Language } from "../types/documentTypes";

/**
 * מעצב שם סטודנט לפי שפה
 */
export const formatStudentName = (name: string, language: Language): string => {
  if (language === "hebrew") {
    return name;
  }

  // עבור אנגלית: שם פרטי קטן, שם משפחה גדול
  const nameParts = name.split(" ");
  if (nameParts.length > 1) {
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.slice(1).join(" ").toUpperCase();
    return `${firstName} ${lastName}`;
  }
  return name;
};

/**
 * מעצב כתובת אימייל (תמיד באותיות קטנות)
 */
export const formatEmail = (email: string): string => {
  return email.toLowerCase();
};

/**
 * מעצב כותרת לפי שפה
 */
export const formatTitle = (title: string, language: Language): string => {
  if (language === "hebrew") {
    return title;
  }

  // עבור אנגלית: כל מילה מתחילה באות גדולה
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * מעצב מילות מפתח לפי שפה
 */
export const formatKeywords = (
  keywords: string,
  language: Language
): string => {
  const keywordsList = keywords
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k);

  if (language === "english") {
    // באנגלית כל המילים באותיות קטנות
    return keywordsList.map((k) => k.toLowerCase()).join(" ; ");
  }

  return keywordsList.join(" ; ");
};

/**
 * מעצב תקציר לפי שפה
 */
export const formatAbstract = (
  abstract: string,
  language: Language
): string => {
  if (language === "english") {
    // באנגלית פסקה אחת - מחליף שורות חדשות ברווחים
    return abstract.replace(/\n/g, " ");
  }

  // בעברית שומר על שורות חדשות
  return abstract.replace(/\n/g, "<br>");
};

/**
 * מעצב שם מוסד לפי שפה
 */
export const formatInstitution = (
  institution: string,
  language: Language
): string => {
  if (language === "english") {
    // באנגלית באותיות גדולות
    return institution.toUpperCase();
  }
  return institution;
};
