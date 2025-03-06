// src/components/DocumentGenerator.tsx
import React, { useState, useEffect } from "react";
import "../styles/DocumentGenerator.css";

interface Student {
  name: string;
  email: string;
}

interface Mentor {
  id: string;
  title: string; // מר, גב', ד"ר, פרופסור
  name: string;
  institutionId: string; // מזהה המוסד אליו שייך המנחה
}

interface Institution {
  id: string;
  name: string;
}

type Language = "hebrew" | "english";

const DocumentGenerator: React.FC = () => {
  const mentorsList = [
    "Dr.Karim Abu-Affash",
    "Dr.Irina Rabaev",
    "Dr.Alexander Churkin",
    "Dr.Natalia Vanetik",
    "Dr.Hadas Chassidim",
    "Dr.Marina Litvak",
    "Dr.Yochai Twitto",
    "Ms.Alona Kutsyy",
    "Mr.Alexander Lazarovi",
  ];
  const [mentorCunter, setMentorCunter] = useState<number>(0);
  const [language, setLanguage] = useState<Language>("english");
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState<Student[]>([
    { name: "", email: "" },
  ]);
  const [institutions, setInstitutions] = useState<Institution[]>([
    { id: "1", name: "" },
  ]);
  const [mentors, setMentors] = useState<Mentor[]>([
    { id: "1", title: "Dr.", name: "", institutionId: "1" },
  ]);
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // אפשרויות תואר למנחים
  const mentorTitles = {
    hebrew: ["מר", "גב'", 'ד"ר', "פרופסור"],
    english: ["Mr.", "Ms.", "Dr.", "Prof."],
  };

  // הגבלת מילים לפי שפה
  const wordLimit = language === "hebrew" ? 200 : 120;
  const isOverLimit = wordCount > wordLimit;

  // ספירת מילים בתוכן
  useEffect(() => {
    const words = content.trim().split(/\s+/);
    setWordCount(content.trim() ? words.length : 0);
  }, [content]);

  // הוספת סטודנט חדש
  const addStudent = () => {
    setStudents([...students, { name: "", email: "" }]);
  };

  // עדכון פרטי סטודנט
  const updateStudent = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  // הסרת סטודנט
  const removeStudent = (index: number) => {
    if (students.length > 1) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    }
  };
  // הוספת מנחה חדש
  const addMentor = (institutionId: string) => {
    const newId = Date.now().toString();
    setMentors([
      ...mentors,
      {
        id: newId,
        title: language === "english" ? "Dr." : 'ד"ר',
        name: "",
        institutionId,
      },
    ]);
  };
  // הוספת מוסד חדש
  const addInstitution = () => {
    const newId = (
      parseInt(institutions[institutions.length - 1].id) + 1
    ).toString();
    setInstitutions([...institutions, { id: newId, name: "" }]);
    addMentor(newId);
  };

  // עדכון שם מוסד
  const updateInstitution = (id: string, name: string) => {
    const updatedInstitutions = institutions.map((inst) =>
      inst.id === id ? { ...inst, name } : inst
    );
    setInstitutions(updatedInstitutions);
  };

  // הסרת מוסד
  const removeInstitution = (id: string) => {
    if (institutions.length > 1) {
      // הסרת המוסד
      const updatedInstitutions = institutions.filter((inst) => inst.id !== id);
      setInstitutions(updatedInstitutions);

      // הסרת מנחים ששייכים למוסד זה
      const updatedMentors = mentors.filter(
        (mentor) => mentor.institutionId !== id
      );
      setMentors(updatedMentors);
    }
  };

  // עדכון פרטי מנחה
  const updateMentor = (
    id: string,
    field: keyof Omit<Mentor, "id" | "institutionId">,
    value: string
  ) => {
    const updatedMentors = mentors.map((mentor) =>
      mentor.id === id ? { ...mentor, [field]: value } : mentor
    );
    setMentors(updatedMentors);
  };

  // הסרת מנחה
  const removeMentor = (id: string) => {
    // בדיקה שיש לפחות מנחה אחד במוסד
    const mentorToRemove = mentors.find((m) => m.id === id);
    if (!mentorToRemove) return;

    const mentorsInSameInstitution = mentors.filter(
      (m) => m.institutionId === mentorToRemove.institutionId
    );

    if (mentorsInSameInstitution.length > 1) {
      const updatedMentors = mentors.filter((mentor) => mentor.id !== id);
      setMentors(updatedMentors);
    }
  };

  // שינוי שפה
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = e.target.value as Language;
    setLanguage(newLanguage);

    // עדכון תארי המנחים לפי השפה
    const updatedMentors = mentors.map((mentor) => ({
      ...mentor,
      title: newLanguage === "hebrew" ? 'ד"ר' : "Dr.",
    }));
    setMentors(updatedMentors);
  };

  // יצירת והורדת המסמך
  const generateDocument = () => {
    if (isOverLimit) {
      setError(`התוכן חורג ממגבלת ${wordLimit} המילים`);
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      setSuccess(false);

      // עיבוד מילות מפתח
      let keywordsHtml = "";
      if (keywords.trim()) {
        const keywordsList = keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k);

        if (language === "english") {
          // באנגלית מילות מפתח באותיות קטנות
          const lowercaseKeywords = keywordsList.map((k) => k.toLowerCase());
          keywordsHtml = `
            <p class="keywords-header"><strong>Keywords:</strong> ${lowercaseKeywords.join(
              " ; "
            )}</p>
          `;
        } else {
          keywordsHtml = `
            <p class="keywords-header">מילות מפתח:</p>
            <p class="keywords">${keywordsList.join(" ; ")}</p>
          `;
        }
      }

      // עיבוד רשימת סטודנטים
      let studentsHtml = "";
      const validStudents = students.filter((s) => s.name.trim());

      if (validStudents.length > 0) {
        if (language === "english") {
          const formattedStudents = validStudents.map((student) => {
            // עיצוב שמות באנגלית: שם פרטי באותיות קטנות, שם משפחה באותיות גדולות
            const nameParts = student.name.trim().split(" ");
            let formattedName = student.name;

            if (nameParts.length > 1) {
              const firstName = nameParts[0].toLowerCase();
              const lastName = nameParts.slice(1).join(" ").toUpperCase();
              formattedName = `${firstName} ${lastName}`;
            }

            let studentLine = formattedName;
            if (student.email) {
              studentLine += ` ; ${student.email.toLowerCase()} \n`; // אימייל באותיות קטנות
            }
            return studentLine;
          });

          studentsHtml = `
            <p class="students-header"></p>
            <p class="student-line">${formattedStudents.join(" <br> ")}</p>
          `;
        } else {
          studentsHtml = `<p class="students-header"></p>`;
          validStudents.forEach((student) => {
            let studentLine = student.name;
            if (student.email) {
              studentLine += ` ; ${student.email}`;
            }
            studentsHtml += `<p class="student-line">${studentLine}</p>`;
          });
        }
      }

      // עיבוד מנחים ומוסדות
      let mentorsAndInstitutionsHtml = "";

      // קיבוץ מנחים לפי מוסד
      // בדיקה האם יש יותר ממוסד אחד עם מנחים
      const institutionsWithMentors = institutions.filter(
        (institution) =>
          mentors.some(
            (m) => m.institutionId === institution.id && m.name.trim()
          ) && institution.name.trim()
      );
      const hasMultipleInstitutions = institutionsWithMentors.length > 1;

      // יצירת מפה למנחים כדי להקצות להם מספרי מוסדות
      const mentorInstitutionMap = new Map();
      let institutionCounter = 1;

      // הקצאת מספרי מוסדות למנחים אם יש יותר ממוסד אחד
      if (hasMultipleInstitutions) {
        institutionsWithMentors.forEach((institution) => {
          // מציאת כל המנחים השייכים למוסד הנוכחי
          const institutionMentors = mentors.filter(
            (m) => m.institutionId === institution.id && m.name.trim()
          );

          // הקצאת מספר המוסד לכל מנחה במוסד זה
          institutionMentors.forEach((mentor) => {
            mentorInstitutionMap.set(mentor.id, institutionCounter);
          });

          institutionCounter++;
        });
      }

      // יצירת רשימת מנחים (כולם בשורה אחת)
      let mentorsHtml = "";
      if (language === "english") {
        // פורמט באנגלית
        mentorsHtml += `<p class="mentor"><strong>Advisor${
          mentors.length > 1 ? "s" : ""
        }:</strong> `;

        // סינון מנחים שיש להם שם ועיבוד כל מנחה
        mentors
          .filter((m) => m.name.trim())
          .forEach((mentor, index, filteredMentors) => {
            // הוספת שם המנחה עם התואר המתאים
            if (
              mentor.name.includes("Mr.") ||
              mentor.name.includes("Dr.") ||
              mentor.name.includes("Ms.") ||
              mentor.name.includes("Prof.")
            ) {
              // אם התואר כבר כלול בשם, לא צריך להוסיף אותו שוב
              mentorsHtml += `${mentor.name}`;
            } else {
              mentorsHtml += `${mentor.title} ${mentor.name}`;
            }

            // הוספת מספר עילי אם יש יותר ממוסד אחד
            if (hasMultipleInstitutions) {
              mentorsHtml += `<sup>${mentorInstitutionMap.get(
                mentor.id
              )}</sup>`;
            }

            // הוספת פסיק או סיום הרשימה
            if (index < filteredMentors.length - 1) {
              mentorsHtml += ", ";
            }
          });

        mentorsHtml += `</p>`;
      } else {
        // פורמט בעברית
        mentorsHtml += `<p class="mentor">בהנחיית: `;

        // סינון מנחים שיש להם שם ועיבוד כל מנחה
        mentors
          .filter((m) => m.name.trim())
          .forEach((mentor, index, filteredMentors) => {
            mentorsHtml += `${mentor.title} ${mentor.name}`;

            // הוספת מספר עילי אם יש יותר ממוסד אחד
            if (hasMultipleInstitutions) {
              mentorsHtml += `<sup>${mentorInstitutionMap.get(
                mentor.id
              )}</sup>`;
            }

            // הוספת פסיק או סיום הרשימה
            if (index < filteredMentors.length - 1) {
              mentorsHtml += ", ";
            }
          });

        mentorsHtml += `</p>`;
      }

      // יצירת רשימת מוסדות (כל אחד בשורה נפרדת)
      let institutionsHtml = "";
      institutionsWithMentors.forEach((institution, index) => {
        if (language === "english") {
          // פורמט באנגלית
          institutionsHtml += `<p class="institution">`;
          // הוספת מספר עילי ליד שם המוסד אם יש יותר ממוסד אחד
          if (hasMultipleInstitutions) {
            institutionsHtml += `<sup>${index + 1}</sup>`;
          }
          institutionsHtml += `<span class="institution-name">${institution.name}</span></p>`;
        } else {
          // פורמט בעברית
          institutionsHtml += `<p class="institution">`;
          // הוספת מספר עילי ליד שם המוסד אם יש יותר ממוסד אחד
          if (hasMultipleInstitutions) {
            institutionsHtml += `<sup>${index + 1}</sup>`;
          }
          institutionsHtml += `${institution.name}</p>`;
        }
      });

      // שילוב רשימת המנחים והמוסדות
      mentorsAndInstitutionsHtml += `<div class="institution-group">${mentorsHtml}${institutionsHtml}</div>`;

      // עיבוד תוכן המסמך
      const formattedContent =
        language === "english"
          ? content.replace(/\n/g, " ") // באנגלית מחליף ירידות שורה ברווחים (פסקה אחת)
          : content.replace(/\n/g, "<br>"); // בעברית שומר על ירידות שורה

      // עיצוב הכותרת
      const formattedTitle =
        language === "english" && title
          ? title
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ") // באנגלית: אות ראשונה גדולה בכל מילה
          : title;

      // הגדרת כיוון טקסט ופונט לפי שפה
      const textDirection = language === "english" ? "ltr" : "rtl";
      const fontFamily =
        language === "english"
          ? "'Times New Roman', serif"
          : "David, 'Times New Roman', serif";

      // יצירת HTML למסמך
      const docContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${
            formattedTitle ||
            (language === "english" ? "Untitled Document" : "מסמך ללא כותרת")
          }</title>
          <style>
            @page {
              margin: 2.54cm;
            }
            body {
              font-family: ${fontFamily};
              font-size: 12pt;
              line-height: 1.0;
              direction: ${textDirection};
            }
            .title {
              text-align: center;
              font-weight: bold;
              font-size: 18pt;
              margin-bottom: 20pt;
            }
            .students-header, .keywords-header {
              text-align: center;
              font-weight: bold;
              margin-top: 15pt;
              margin-bottom: 5pt;
            }
            .student-line {
            text-align: center;
              margin-bottom: 8pt;
            }
            .institution-group {
              text-align: center;
              margin-top: 15pt;
              margin-bottom: 15pt;
            }
            .mentor {
              margin-bottom: 5pt;
            }
            .institution {
              margin-bottom: 10pt;
              font-style: italic;
            }
            .institution-name {
              font-weight: bold;
            }
            .keywords {
              margin-bottom: 8pt;
            }
            .content {
              white-space: pre-wrap;
              margin-top: 20pt;
            }
          </style>
        </head>
        <body>
          <div class="title">${
            formattedTitle ||
            (language === "english" ? "Untitled Document" : "מסמך ללא כותרת")
          }</div>
          ${studentsHtml}
          ${mentorsAndInstitutionsHtml}       
          <div class="content">${
            formattedContent ||
            (language === "english" ? "Sample content" : "תוכן לדוגמה")
          }</div>
          ${keywordsHtml}
        </body>
        </html>
      `;

      // יצירת Blob עם התוכן
      const blob = new Blob([docContent], { type: "application/msword" });

      // יצירת קישור להורדה
      const link = window.document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${
        formattedTitle || (language === "english" ? "Document" : "מסמך")
      }.doc`;

      // הורדת הקובץ
      window.document.body.appendChild(link);
      link.click();

      // ניקוי
      setTimeout(() => {
        window.document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        setIsGenerating(false);
        setSuccess(true);

        // הסתרת הודעת ההצלחה אחרי 3 שניות
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 100);
    } catch (err) {
      console.error("Error generating document:", err);
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
      setIsGenerating(false);
    }
  };

  return (
    <div className="document-generator">
      <h1>יוצר מסמכי וורד</h1>

      <div className="form-section language-section">
        <h2 className="section-title">שפת המסמך</h2>
        <div className="language-options">
          <label>
            <input
              type="radio"
              name="language"
              value="hebrew"
              checked={language === "hebrew"}
              onChange={handleLanguageChange}
            />
            עברית
          </label>
          <label>
            <input
              type="radio"
              name="language"
              value="english"
              checked={language === "english"}
              onChange={handleLanguageChange}
            />
            אנגלית
          </label>
        </div>

        <div className={`language-info ${language}-info`}>
          {language === "hebrew" ? (
            <div>
              <p>
                <strong>הנחיות עיצוב לעברית:</strong>
              </p>
              <ul>
                <li>גופן: David</li>
                <li>גודל כותרת: 18</li>
                <li>כיוון טקסט: מימין לשמאל</li>
                <li>מגבלת תוכן: עד 200 מילים</li>
              </ul>
            </div>
          ) : (
            <div>
              <p>
                <strong>English Formatting Guidelines:</strong>
              </p>
              <ul>
                <li>Font: Times New Roman</li>
                <li>Title Size: 18pt</li>
                <li>Text Direction: Left to Right</li>
                <li>Content Limit: Up to 120 words</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">פרטי מסמך</h2>
        <div className="form-group">
          <label htmlFor="title">כותרת:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              language === "hebrew" ? "הזן כותרת כאן" : "Enter title here"
            }
            dir={language === "english" ? "ltr" : "rtl"}
          />
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">פרטי סטודנטים</h2>
        {students.map((student, index) => (
          <div key={index} className="student-row">
            <input
              type="text"
              value={student.name}
              onChange={(e) => updateStudent(index, "name", e.target.value)}
              placeholder={
                language === "hebrew" ? "שם הסטודנט" : "Student name"
              }
              className="student-name"
              dir={language === "english" ? "ltr" : "rtl"}
            />
            <input
              type="email"
              value={student.email}
              onChange={(e) => updateStudent(index, "email", e.target.value)}
              placeholder={
                language === "hebrew" ? "כתובת מייל" : "Email address"
              }
              className="student-email"
              dir="ltr" // כתובות מייל תמיד משמאל לימין
            />
            {students.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => removeStudent(index)}
                aria-label="הסר סטודנט"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-button" onClick={addStudent}>
          {language === "hebrew" ? "הוסף סטודנט" : "Add Student"}
        </button>
      </div>

      <div className="form-section">
        <h2 className="section-title">מנחים ומוסדות</h2>

        {institutions.map((institution) => (
          <div key={institution.id} className="institution-block">
            <div className="institution-header">
              <div className="form-group">
                <label htmlFor={`institution-${institution.id}`}>
                  {language === "hebrew" ? "שם המוסד:" : "Institution name:"}
                </label>
                <div className="institution-input-row">
                  <input
                    id={`institution-${institution.id}`}
                    type="text"
                    value={institution.name}
                    onChange={(e) =>
                      updateInstitution(institution.id, e.target.value)
                    }
                    placeholder={
                      language === "hebrew"
                        ? "שם המוסד האקדמי/חברה"
                        : "Academic institution/company name"
                    }
                    dir={language === "english" ? "ltr" : "rtl"}
                  />
                  {/* כפתור SCE חדש */}
                  <button
                    type="button"
                    className="sce-button"
                    onClick={() =>
                      updateInstitution(
                        institution.id,
                        "SCE - Shamoon College of Engineering, Be'er-Sheva"
                      )
                    }
                    title={
                      language === "hebrew"
                        ? "הוסף את המכללה האקדמית להנדסה סמי שמעון"
                        : "Add Shamoon College of Engineering"
                    }
                  >
                    SCE
                  </button>
                  {institutions.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeInstitution(institution.id)}
                      aria-label="הסר מוסד"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mentors-container">
              <h3 className="subsection-title">
                {language === "hebrew" ? "מנחים:" : "Mentors:"}
              </h3>
              {mentors
                .filter((mentor) => mentor.institutionId === institution.id)
                .map((mentor) => (
                  <div key={mentor.id} className="mentor-row">
                    {/* בחירה מרשימה - תוצג רק אם אין טקסט חופשי או נבחר מרצה מהרשימה */}
                    {(!mentor.name || mentorsList.includes(mentor.name)) && (
                      <select
                        id="mentorSelect"
                        name="mentorSelect"
                        onChange={(e) => {
                          if (e.target.value !== "custom") {
                            // אם נבחר מרצה מהרשימה, עדכן את השם
                            updateMentor(mentor.id, "name", e.target.value);
                          } else {
                            // אם נבחרה האופציה "בחר מרצה", נקה את שדה השם
                            updateMentor(mentor.id, "name", "");
                          }
                        }}
                        value={
                          mentorsList.includes(mentor.name)
                            ? mentor.name
                            : "custom"
                        }
                      >
                        <option value="custom">
                          {language === "hebrew"
                            ? "בחר מרצה מהרשימה"
                            : "Choose a lecturer"}
                        </option>
                        {mentorsList.map((mentorName) => (
                          <option key={mentorName} value={mentorName}>
                            {mentorName}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* מילה "או" - תוצג רק אם שני השדות מוצגים */}
                    {(!mentor.name || mentorsList.includes(mentor.name)) &&
                      mentor.name === "" && (
                        <p> {language === "hebrew" ? "או" : "or"} </p>
                      )}

                    {/* שדה טקסט חופשי - יוצג רק אם אין בחירה מהרשימה או השדה ריק */}
                    {(!mentor.name || !mentorsList.includes(mentor.name)) && (
                      <>
                        <input
                          type="text"
                          value={mentor.name}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            updateMentor(mentor.id, "name", newValue);
                          }}
                          placeholder={
                            language === "hebrew" ? "שם המנחה" : "Mentor name"
                          }
                          className="mentor-name"
                          dir={language === "english" ? "ltr" : "rtl"}
                        />
                        <select
                          value={mentor.title}
                          onChange={(e) =>
                            updateMentor(mentor.id, "title", e.target.value)
                          }
                          className="mentor-title"
                        >
                          {mentorTitles[language].map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    {mentors.filter((m) => m.institutionId === institution.id)
                      .length > 1 && (
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeMentor(mentor.id)}
                        aria-label="הסר מנחה"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

              <button
                type="button"
                className="add-button small-button"
                onClick={() => addMentor(institution.id)}
              >
                {language === "hebrew" ? "+ הוסף מנחה" : "+ Add mentor"}
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="add-button institution-button"
          onClick={addInstitution}
        >
          {language === "hebrew" ? "הוסף מוסד" : "Add Institution"}
        </button>
      </div>

      <div className="form-section">
        <h2 className="section-title">תוכן המסמך</h2>
        <div className="form-group">
          <label htmlFor="keywords">
            {language === "hebrew"
              ? "מילות מפתח (הפרד בפסיקים):"
              : "Keywords (separate with commas):"}
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={
              language === "hebrew"
                ? "לדוגמה: מילה1, מילה2, מילה3"
                : "Example: word1, word2, word3"
            }
            dir={language === "english" ? "ltr" : "rtl"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">
            {language === "hebrew"
              ? `תוכן (עד ${wordLimit} מילים):`
              : `Content (up to ${wordLimit} words):`}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              language === "hebrew"
                ? "הזן את התוכן כאן"
                : "Enter your content here"
            }
            className={isOverLimit ? "error" : ""}
            dir={language === "english" ? "ltr" : "rtl"}
          />
          <div
            className={`word-counter ${isOverLimit ? "limit-exceeded" : ""}`}
          >
            <span>{wordCount}</span> / {wordLimit}{" "}
            {language === "hebrew" ? "מילים" : "words"}
          </div>
          {isOverLimit && (
            <div className="limit-warning">
              {language === "hebrew"
                ? `התוכן חורג ממגבלת ${wordLimit} המילים`
                : `Content exceeds the ${wordLimit} word limit`}
            </div>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          {language === "hebrew"
            ? "המסמך נוצר בהצלחה!"
            : "Document created successfully!"}
        </div>
      )}

      <button
        onClick={generateDocument}
        disabled={isGenerating || isOverLimit}
        className="generate-button"
      >
        {isGenerating
          ? language === "hebrew"
            ? "מייצר מסמך..."
            : "Generating document..."
          : language === "hebrew"
          ? "צור מסמך"
          : "Generate Document"}
      </button>
    </div>
  );
};

export default DocumentGenerator;
