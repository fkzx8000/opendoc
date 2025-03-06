import { Language } from "../types/documentTypes";
import { LANGUAGE_SETTINGS } from "../constants/languages";

/**
 * בודק אם התקציר עומד במגבלת המילים
 */
export const isAbstractValid = (
  abstract: string,
  language: Language
): boolean => {
  const abstractLimit = LANGUAGE_SETTINGS[language].abstractLimit;
  const words = abstract
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length <= abstractLimit;
};

/**
 * מחזיר את מספר המילים בתקציר
 */
export const countAbstractWords = (abstract: string): number => {
  const words = abstract
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length;
};

/**
 * בודק אם האימייל תקין
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * בודק אם שדה חובה מלא
 */
export const isRequiredFieldFilled = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * בודק אם יש מנחה חיצוני תקין
 */
export const isExternalInstructorValid = (
  hasExternal: boolean,
  source: string
): boolean => {
  return !hasExternal || (hasExternal && source.trim().length > 0);
};
