// src/components/StudentForm.tsx
import React from "react";
import { Student } from "../types/documentTypes";
import { Language } from "../types/documentTypes";
import { LANGUAGE_SETTINGS } from "../constants/languages";
import { FORM_VALIDATION } from "../constants/formSettings";
import FormSection from "./FormSection";
// import "../styles/StudentForm.css";

interface StudentFormProps {
  students: Student[];
  language: Language;
  onStudentsChange: (students: Student[]) => void;
}

/**
 * קומפוננטת טופס עבור פרטי הסטודנטים
 */
const StudentForm: React.FC<StudentFormProps> = ({
  students,
  language,
  onStudentsChange,
}) => {
  const placeholders = LANGUAGE_SETTINGS[language].placeholders;

  /**
   * עדכון שדה של סטודנט
   */
  const handleStudentChange = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value,
    };
    onStudentsChange(updatedStudents);
  };

  /**
   * הוספת סטודנט חדש
   */
  const handleAddStudent = () => {
    if (students.length < FORM_VALIDATION.maxStudents) {
      const updatedStudents = [...students, { name: "", email: "" }];
      updatedStudents.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      onStudentsChange(updatedStudents);
    }
  };

  /**
   * הסרת סטודנט
   */
  const handleRemoveStudent = (index: number) => {
    if (students.length > 1) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      onStudentsChange(updatedStudents);
    }
  };

  return (
    <FormSection title="פרטי סטודנטים">
      <div className="students-container">
        {students.map((student, index) => (
          <div key={index} className="student-row">
            <div className="student-fields">
              <div className="form-group">
                <label htmlFor={`studentName-${index}`}>שם סטודנט:</label>
                <input
                  id={`studentName-${index}`}
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    handleStudentChange(index, "name", e.target.value)
                  }
                  placeholder={placeholders.students}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`studentEmail-${index}`}>כתובת מייל:</label>
                <input
                  id={`studentEmail-${index}`}
                  type="email"
                  value={student.email}
                  onChange={(e) =>
                    handleStudentChange(index, "email", e.target.value)
                  }
                  placeholder={placeholders.emails}
                />
              </div>
            </div>

            {students.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveStudent(index)}
                aria-label="הסר סטודנט"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        {students.length < FORM_VALIDATION.maxStudents && (
          <button
            type="button"
            className="add-button"
            onClick={handleAddStudent}
          >
            הוסף סטודנט
          </button>
        )}
      </div>
    </FormSection>
  );
};

export default StudentForm;
