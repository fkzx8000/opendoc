// src/components/InstructorForm.tsx
import React from "react";
import { Instructor } from "../types/documentTypes";
import { Language } from "../types/documentTypes";
import { LANGUAGE_SETTINGS } from "../constants/languages";
import { INSTRUCTOR_TITLES } from "../constants/languages";
import { FORM_VALIDATION } from "../constants/formSettings";
import FormSection from "./FormSection";
// import "../styles/InstructorForm.css";

interface InstructorFormProps {
  instructors: Instructor[];
  language: Language;
  onInstructorsChange: (instructors: Instructor[]) => void;
}

/**
 * קומפוננטת טופס עבור המנחים
 */
const InstructorForm: React.FC<InstructorFormProps> = ({
  instructors,
  language,
  onInstructorsChange,
}) => {
  const placeholders = LANGUAGE_SETTINGS[language].placeholders;
  const titles = INSTRUCTOR_TITLES[language];

  /**
   * עדכון שדה של מנחה
   */
  const handleInstructorChange = (
    id: string,
    field: keyof Omit<Instructor, "id">,
    value: string
  ) => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === id ? { ...instructor, [field]: value } : instructor
    );
    onInstructorsChange(updatedInstructors);
  };

  /**
   * הוספת מנחה חדש
   */
  const handleAddInstructor = () => {
    if (instructors.length < FORM_VALIDATION.maxInstructors) {
      const newId = String(
        parseInt(instructors[instructors.length - 1].id) + 1
      );
      onInstructorsChange([
        ...instructors,
        {
          id: newId,
          title: titles[0],
          name: "",
          institution: "",
        },
      ]);
    }
  };

  /**
   * הסרת מנחה
   */
  const handleRemoveInstructor = (id: string) => {
    if (instructors.length > 1) {
      const updatedInstructors = instructors.filter(
        (instructor) => instructor.id !== id
      );
      onInstructorsChange(updatedInstructors);
    }
  };

  return (
    <FormSection title="פרטי מנחים">
      <div className="instructors-container">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="instructor-block">
            {instructors.length > 1 && (
              <button
                type="button"
                className="remove-instructor"
                onClick={() => handleRemoveInstructor(instructor.id)}
                aria-label="הסר מנחה"
              >
                &times;
              </button>
            )}

            <div className="form-group">
              <label htmlFor={`instructorTitle-${instructor.id}`}>
                תואר המנחה:
              </label>
              <select
                id={`instructorTitle-${instructor.id}`}
                value={instructor.title}
                onChange={(e) =>
                  handleInstructorChange(instructor.id, "title", e.target.value)
                }
                className="instructor-title"
              >
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`instructorName-${instructor.id}`}>
                שם המנחה:
              </label>
              <input
                id={`instructorName-${instructor.id}`}
                type="text"
                value={instructor.name}
                onChange={(e) =>
                  handleInstructorChange(instructor.id, "name", e.target.value)
                }
                placeholder={placeholders.instructorName}
                className="instructor-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`instructorInstitution-${instructor.id}`}>
                מוסד המנחה:
              </label>
              <input
                id={`instructorInstitution-${instructor.id}`}
                type="text"
                value={instructor.institution}
                onChange={(e) =>
                  handleInstructorChange(
                    instructor.id,
                    "institution",
                    e.target.value
                  )
                }
                placeholder={placeholders.instructorInstitution}
                className="instructor-institution"
              />
            </div>
          </div>
        ))}

        {instructors.length < FORM_VALIDATION.maxInstructors && (
          <button
            type="button"
            className="add-button"
            onClick={handleAddInstructor}
          >
            הוסף מנחה נוסף
          </button>
        )}
      </div>
    </FormSection>
  );
};

export default InstructorForm;
