export type Exercise = {
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  objective: string;
  sections: Array<{ heading: string; body: string; examples: string[] }>;
  exercises: Exercise[];
};
