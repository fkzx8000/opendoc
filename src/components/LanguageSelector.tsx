// src/components/LanguageSelector.tsx
import React from "react";
import { Language } from "../types/documentTypes";
import { FORM_INSTRUCTIONS } from "../constants/formSettings";
// import "../styles/LanguageSelector.css";

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

/**
 * קומפוננטה לבחירת שפת המסמך עם הצגת הנחיות
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = e.target.value as Language;
    onLanguageChange(newLanguage);
  };

  return (
    <div className="language-selector">
      <div className="language-options">
        <label>שפת המסמך:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="docLanguage"
              value="hebrew"
              checked={language === "hebrew"}
              onChange={handleChange}
            />
            עברית
          </label>
          <label>
            <input
              type="radio"
              name="docLanguage"
              value="english"
              checked={language === "english"}
              onChange={handleChange}
            />
            אנגלית
          </label>
        </div>
      </div>

      {/* הנחיות עיצוב לפי שפה */}
      <div
        className={`language-guide ${
          language === "hebrew" ? "hebrew-guide" : "english-guide"
        }`}
      >
        <p>
          <strong>{FORM_INSTRUCTIONS[language].title}</strong>
        </p>
        <ul>
          {FORM_INSTRUCTIONS[language].instructions.map(
            (instruction, index) => (
              <li key={index}>{instruction}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
