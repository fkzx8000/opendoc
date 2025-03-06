// src/components/ExternalInstructorForm.tsx
import React from "react";
import { ExternalInstructor } from "../types/documentTypes";
import { Language } from "../types/documentTypes";
import { INSTRUCTOR_TITLES } from "../constants/languages";
// import "../styles/ExternalInstructorForm.css";

interface ExternalInstructorFormProps {
  hasExternalInstructor: boolean;
  externalInstructor: ExternalInstructor;
  language: Language;
  onHasExternalChange: (hasExternal: boolean) => void;
  onExternalInstructorChange: (instructor: ExternalInstructor) => void;
}

/**
 * קומפוננטת טופס עבור מנחה חיצוני
 */
const ExternalInstructorForm: React.FC<ExternalInstructorFormProps> = ({
  hasExternalInstructor,
  externalInstructor,
  language,
  onHasExternalChange,
  onExternalInstructorChange,
}) => {
  const titles = INSTRUCTOR_TITLES[language];

  /**
   * עדכון שדה של מנחה חיצוני
   */
  const handleFieldChange = (
    field: keyof ExternalInstructor,
    value: string
  ) => {
    onExternalInstructorChange({
      ...externalInstructor,
      [field]: value,
    });
  };

  /**
   * טיפול בשינוי בתיבת הסימון
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHasExternalChange(e.target.checked);
  };

  return (
    <div className="external-instructor-form">
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={hasExternalInstructor}
            onChange={handleCheckboxChange}
          />
          הוספת מנחה חיצוני (מתעשייה/מוסד אחר)
        </label>
      </div>

      {hasExternalInstructor && (
        <div className="external-instructor-fields">
          <div className="form-group">
            <label htmlFor="externalMentorTitle">תואר המנחה החיצוני:</label>
            <select
              id="externalMentorTitle"
              value={externalInstructor.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            >
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="externalMentorName">שם המנחה החיצוני:</label>
            <input
              id="externalMentorName"
              type="text"
              value={externalInstructor.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="הזן את שם המנחה החיצוני כאן"
            />
          </div>

          <div className="form-group">
            <label htmlFor="externalMentorSource">
              מקור (שם מוסד/חברה) - <span className="required">חובה</span>:
            </label>
            <input
              id="externalMentorSource"
              type="text"
              value={externalInstructor.source}
              onChange={(e) => handleFieldChange("source", e.target.value)}
              placeholder="לדוגמה: חברת אינטל / אוניברסיטת תל אביב"
              required
              className={
                hasExternalInstructor && !externalInstructor.source
                  ? "error"
                  : ""
              }
            />
            {hasExternalInstructor && !externalInstructor.source && (
              <div className="error-message">
                שדה חובה - יש להזין את מקור המנחה החיצוני
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalInstructorForm;
