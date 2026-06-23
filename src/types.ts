export interface Question {
  id: string;
  section: string; // e.g. "Section A: Adolescent Health"
  category: string; // e.g. "Puberty & Hormones"
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type QuizMode = 'exam' | 'practice';

export interface QuizAttempt {
  id: string;
  date: string;
  mode: QuizMode;
  score: number;
  totalQuestions: number;
  incorrectAnswers: {
    questionId: string;
    selectedOptionIndex: number;
  }[];
  durationSeconds: number;
  completed: boolean;
}

export interface SectionProgress {
  sectionName: string;
  totalAnswered: number;
  correctCount: number;
  totalAvailable: number;
}

export interface QuizTheme {
  id: string;
  name: string;
  previewColor: string; // Hex or simple tailwind color
  bodyBg: string; // classes for the outer page background
  cardBg: string; // classes for the card container description
  textPrimary: string;
  textSecondary: string;
  accentColor: string; // button hover / focused border
  buttonActive: string;
}
