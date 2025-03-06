// src/components/FormSection.tsx
import React from "react";
import { FormSectionProps } from "../types/formTypes";
// import "../styles/FormSection.css";

/**
 * קומפוננטה מקטע בטופס עם כותרת ותוכן
 */
const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>
      <div className="form-section-content">{children}</div>
    </div>
  );
};

export default FormSection;
