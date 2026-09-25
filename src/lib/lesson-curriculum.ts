export const SUBJECT_IDS = ["spanish", "italian", "french", "german", "korean", "math", "english"] as const;
export type SubjectId = (typeof SUBJECT_IDS)[number];

export type { Exercise, Lesson } from "./curriculum/types";
import type { Lesson } from "./curriculum/types";
import { LESSONS as SPANISH } from "./curriculum/spanish";
import { LESSONS as ITALIAN } from "./curriculum/italian";
import { LESSONS as FRENCH } from "./curriculum/french";
import { LESSONS as GERMAN } from "./curriculum/german";
import { LESSONS as KOREAN } from "./curriculum/korean";
import { LESSONS as MATH } from "./curriculum/math";
import { LESSONS as ENGLISH } from "./curriculum/english";

export type Subject = {
  id: SubjectId;
  name: string;
  greeting: string;
  description: string;
  lessons: Lesson[];
};

export const SUBJECTS: Subject[] = [
  {
    id: "spanish", name: "Spanish", greeting: "Vamos.", description: "Build useful conversation, grammar, reading, and writing skills.",
    lessons: SPANISH,
  },
  {
    id: "italian", name: "Italian", greeting: "Andiamo.", description: "Learn practical Italian through everyday exchanges.",
    lessons: ITALIAN,
  },
  {
    id: "french", name: "French", greeting: "On y va.", description: "Grow confident in conversation, grammar, and comprehension.",
    lessons: FRENCH,
  },
  {
    id: "german", name: "German", greeting: "Los geht’s.", description: "Master useful German structure without drowning in grammar tables.",
    lessons: GERMAN,
  },
  {
    id: "korean", name: "Korean", greeting: "시작해요.", description: "Read Hangul and build respectful everyday Korean.",
    lessons: KOREAN,
  },
  {
    id: "math", name: "Math", greeting: "Show your work.", description: "Understand the method, practice it, and stop fearing the symbols.",
    lessons: MATH,
  },
  {
    id: "english", name: "English", greeting: "Words. In order.", description: "Strengthen grammar, vocabulary, reading, and clear writing.",
    lessons: ENGLISH,
  },
];

export const getSubject = (id: string) => SUBJECTS.find((subject) => subject.id === id);
export const getLesson = (subjectId: string, lessonId: string) => getSubject(subjectId)?.lessons.find((lesson) => lesson.id === lessonId);
