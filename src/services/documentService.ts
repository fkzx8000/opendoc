// src/services/documentService.ts
import {
  Document as WordDocument,
  Language,
  Student,
  Instructor,
  ExternalInstructor,
} from "../types/documentTypes";
import { LANGUAGE_SETTINGS } from "../constants/languages";
import { DOCUMENT_SETTINGS } from "../constants/formSettings";
import {
  formatStudentName,
  formatEmail,
  formatTitle,
  formatKeywords,
  formatAbstract,
  formatInstitution,
} from "../utils/formatters";

/**
 * פונקציה המעבדת מידע של סטודנטים למבנה HTML
 */
const processStudents = (students: Student[], language: Language): string => {
  const settings = LANGUAGE_SETTINGS[language];

  let studentsHtml = `<p class="students-header">${settings.labels.studentsHeader}</p>`;

  if (language === "english") {
    // באנגלית: כל הסטודנטים בשורה אחת מופרדים בנקודה-פסיק
    const formattedStudents = students
      .filter((s) => s.name.trim())
      .map((student) => {
        const formattedName = formatStudentName(student.name, language);
        const formattedEmail = student.email
          ? ` ${formatEmail(student.email)}`
          : "";
        return `${formattedName}${formattedEmail}`;
      });

    if (formattedStudents.length > 0) {
      studentsHtml += `<p class="student-line">${formattedStudents.join(
        " ; "
      )}</p>`;
    }
  } else {
    // בעברית: כל סטודנט בשורה נפרדת
    students
      .filter((s) => s.name.trim())
      .forEach((student) => {
        let studentLine = student.name;
        if (student.email) {
          studentLine += ` ; ${student.email}`;
        }
        studentsHtml += `<p class="student-line">${studentLine}</p>`;
      });
  }

  return studentsHtml;
};

/**
 * פונקציה המעבדת מידע של מנחים למבנה HTML
 */
const processInstructors = (
  instructors: Instructor[],
  externalInstructor: ExternalInstructor | undefined,
  hasExternalInstructor: boolean,
  language: Language
): string => {
  const settings = LANGUAGE_SETTINGS[language];
  let instructorsHtml = "";

  // מנחים רגילים
  instructors
    .filter((inst) => inst.name.trim())
    .forEach((instructor, index) => {
      if (language === "english") {
        const label =
          index === 0 ? settings.labels.advisor : settings.labels.coAdvisor;
        const formattedInstitution = instructor.institution
          ? `, <span class="institution">${formatInstitution(
              instructor.institution,
              language
            )}</span>`
          : "";

        instructorsHtml += `<p class="instructor"><strong>${label}</strong> ${instructor.title} ${instructor.name}${formattedInstitution}</p>`;
      } else {
        const label =
          index === 0 ? settings.labels.advisor : settings.labels.coAdvisor;
        const formattedInstitution = instructor.institution
          ? `, ${instructor.institution}`
          : "";

        instructorsHtml += `<p class="instructor">${label} ${instructor.title} ${instructor.name}${formattedInstitution}</p>`;
      }
    });

  // מנחה חיצוני
  if (
    hasExternalInstructor &&
    externalInstructor &&
    externalInstructor.name.trim()
  ) {
    const isFirst = instructorsHtml === "";

    if (language === "english") {
      const label = isFirst
        ? settings.labels.advisor
        : settings.labels.coAdvisor;
      const formattedSource = externalInstructor.source
        ? ` <span class="institution">(${formatInstitution(
            externalInstructor.source,
            language
          )})</span>`
        : "";

      instructorsHtml += `<p class="instructor"><strong>${label}</strong> ${externalInstructor.title} ${externalInstructor.name}${formattedSource}</p>`;
    } else {
      const label = isFirst
        ? settings.labels.advisor
        : settings.labels.coAdvisor;
      const formattedSource = externalInstructor.source
        ? ` (${externalInstructor.source})`
        : "";

      instructorsHtml += `<p class="instructor">${label} ${externalInstructor.title} ${externalInstructor.name}${formattedSource}</p>`;
    }
  }

  return instructorsHtml;
};

/**
 * פונקציה המעבדת מידע של תקציר למבנה HTML
 */
const processAbstract = (abstract: string, language: Language): string => {
  if (!abstract.trim()) return "";

  const settings = LANGUAGE_SETTINGS[language];

  if (language === "english") {
    return `
      <p class="abstract-header"><strong>${
        settings.labels.abstract
      }</strong></p>
      <p class="abstract">${formatAbstract(abstract, language)}</p>
    `;
  } else {
    return `
      <p class="abstract-header">${settings.labels.abstract}</p>
      <p class="abstract">${formatAbstract(abstract, language)}</p>
    `;
  }
};

/**
 * פונקציה המעבדת מידע של מילות מפתח למבנה HTML
 */
const processKeywords = (keywords: string, language: Language): string => {
  if (!keywords.trim()) return "";

  const settings = LANGUAGE_SETTINGS[language];
  const formattedKeywords = formatKeywords(keywords, language);

  if (language === "english") {
    return `<p class="keywords-header"><strong>${settings.labels.keywords}</strong> ${formattedKeywords}</p>`;
  } else {
    return `
      <p class="keywords-header">${settings.labels.keywords}</p>
      <p class="keywords">${formattedKeywords}</p>
    `;
  }
};

/**
 * פונקציה היוצרת את ה-HTML המלא של המסמך
 */
export const generateDocumentHtml = (docData: WordDocument): string => {
  const {
    language,
    title,
    projectNumber,
    students,
    instructors,
    externalInstructor,
    abstract,
    keywords,
    content,
  } = docData;

  const settings = LANGUAGE_SETTINGS[language];
  const hasExternalInstructor = Boolean(externalInstructor);
  const formattedTitle = formatTitle(title, language);

  // מספר פרויקט (רק לאנגלית)
  let projectNumberHtml = "";
  if (language === "english" && projectNumber) {
    projectNumberHtml = `<p class="project-number">Project/Course Number: ${projectNumber}</p>`;
  }

  // עיבוד החלקים השונים של המסמך
  const studentsHtml = processStudents(students, language);
  const instructorsHtml = processInstructors(
    instructors,
    externalInstructor,
    hasExternalInstructor,
    language
  );
  const abstractHtml = processAbstract(abstract, language);
  const keywordsHtml = processKeywords(keywords, language);

  // יצירת המסמך המלא
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${formattedTitle}</title>
      <style>
        @page {
          margin: ${DOCUMENT_SETTINGS.marginSize};
        }
        body {
          font-family: ${settings.fontFamily};
          font-size: ${DOCUMENT_SETTINGS.fontSize};
          line-height: ${DOCUMENT_SETTINGS.lineSpacing};
          direction: ${settings.direction};
        }
        .title {
          text-align: center;
          font-weight: bold;
          font-family: ${settings.fontFamily};
          margin-bottom: 10pt;
        }
        .project-number {
          text-align: center;
          font-family: ${settings.fontFamily};
          margin-bottom: 20pt;
        }
        .students-header {
          font-family: ${settings.fontFamily};
          font-weight: bold;
          margin-bottom: 5pt;
        }
        .student-line {
          font-family: ${settings.fontFamily};
          margin-bottom: 10pt;
        }
        .instructor {
          font-family: ${settings.fontFamily};
          margin-top: 10pt;
          margin-bottom: 10pt;
        }
        .institution {
          font-weight: bold;
          background-color: yellow;
        }
        .abstract-header, .keywords-header {
          font-family: ${settings.fontFamily};
          font-weight: bold;
          margin-top: 20pt;
          margin-bottom: 5pt;
        }
        .abstract, .keywords {
          font-family: ${settings.fontFamily};
          margin-bottom: 20pt;
        }
        .content {
          white-space: pre-wrap;
          margin-top: 20pt;
        }
      </style>
    </head>
    <body>
      <div class="title">${formattedTitle}</div>
      ${projectNumberHtml}
      ${studentsHtml}
      ${instructorsHtml}
      ${abstractHtml}
      ${keywordsHtml}
      <div class="content">${content.replace(/\n/g, "<br>")}</div>
    </body>
    </html>
  `;
};

/**
 * פונקציה היוצרת ומורידה את קובץ המסמך
 */
export const generateAndDownloadDocument = (
  docData: WordDocument
): Promise<void> => {
  try {
    const html = generateDocumentHtml(docData);
    const blob = new Blob([html], { type: DOCUMENT_SETTINGS.mimeType });
    const url = URL.createObjectURL(blob);

    // חשוב: שימוש ב-window.document במקום document כדי לוודא שמדובר באובייקט הגלובלי
    const link = window.document.createElement("a");

    link.href = url;
    link.download = `${docData.title || "Document"}${
      DOCUMENT_SETTINGS.extension
    }`;

    // הוספת הלינק למסמך והפעלתו
    window.document.body.appendChild(link);
    link.click();

    // הסרת הלינק מהמסמך לאחר הלחיצה
    return new Promise((resolve) => {
      setTimeout(() => {
        window.document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      }, 100);
    });
  } catch (error) {
    console.error("Error generating document:", error);
    return Promise.reject(error);
  }
};
