// src/components/DocumentForm.tsx
import React from "react";
import { Language } from "../types/documentTypes";
import { LANGUAGE_SETTINGS } from "../constants/languages";
import { countAbstractWords } from "../utils/validators";
import FormSection from "./FormSection";
import "../styles/DocumentForm.css";

// הגדרה מתוקנת של טיפוס ה-Placeholders
interface Placeholders {
  title: string;
  students: string;
  emails: string;
  abstract: string;
  keywords: string;
  content: string;
  instructorName: string;
  instructorInstitution: string;
  projectNumber?: string; // שדה אופציונלי
}

interface DocumentFormProps {
  language: Language;
  title: string;
  projectNumber: string;
  abstract: string;
  keywords: string;
  content: string;
  onTitleChange: (title: string) => void;
  onProjectNumberChange: (number: string) => void;
  onAbstractChange: (abstract: string) => void;
  onKeywordsChange: (keywords: string) => void;
  onContentChange: (content: string) => void;
}

/**
 * קומפוננטת טופס עבור תוכן המסמך
 */
const DocumentForm: React.FC<DocumentFormProps> = ({
  language,
  title,
  projectNumber,
  abstract,
  keywords,
  content,
  onTitleChange,
  onProjectNumberChange,
  onAbstractChange,
  onKeywordsChange,
  onContentChange,
}) => {
  const settings = LANGUAGE_SETTINGS[language];
  const placeholders = settings.placeholders as Placeholders;
  const abstractLimit = settings.abstractLimit;

  // חישוב מספר המילים בתקציר
  const abstractWordCount = countAbstractWords(abstract);
  const isOverLimit = abstractWordCount > abstractLimit;

  return (
    <FormSection title="תוכן המסמך">
      <div className="document-form">
        <div className="form-group">
          <label htmlFor="title">כותרת:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={placeholders.title}
          />
        </div>

        {language === "english" && (
          <div className="form-group">
            <label htmlFor="projectNumber">מספר הפרויקט / הקורס:</label>
            <input
              id="projectNumber"
              type="text"
              value={projectNumber}
              onChange={(e) => onProjectNumberChange(e.target.value)}
              placeholder={
                placeholders.projectNumber || "Enter project/course number"
              }
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="abstract">
            {language === "hebrew"
              ? "תקציר (עד 200 מילים):"
              : "Abstract (up to 300 words):"}
          </label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => onAbstractChange(e.target.value)}
            placeholder={placeholders.abstract}
            className={isOverLimit ? "error" : ""}
          />
          <div className={`word-counter ${isOverLimit ? "error" : ""}`}>
            <span id="abstractWordCount">{abstractWordCount}</span> /{" "}
            {abstractLimit} מילים
          </div>
          {isOverLimit && (
            <div className="error-message">התקציר חורג ממגבלת המילים</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="keywords">מילות מפתח:</label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder={placeholders.keywords}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">תוכן:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder={placeholders.content}
            className="content-textarea"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default DocumentForm;
