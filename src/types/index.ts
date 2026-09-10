export type SubjectId = 'mathematics' | 'science' | 'social-science' | 'english' | 'hindi';

export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  iconName: string;
  color: string;
  accentGradient: string;
  bannerGradient: string;
  description: string;
  chaptersCount: number;
  totalQuestions: number;
  completedChapters: number;
}

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  chapterNumber: number;
  name: string;
  hindiName?: string;
  description: string;
  icon: string;
  estimatedHours: number;
  topics: string[];
  totalSets: number; // 10 sets
  questionsPerSet: number; // 50 questions
  totalQuestions: number; // 500 questions
  numericalCount: number;
  formulasCount: number;
  isCompleted?: boolean;
  bestScore?: number;
}

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'Conceptual' | 'Formula based' | 'Application based' | 'Assertion/Reason' | 'Case-based';

export interface Question {
  id: string; // e.g. MATH-QUAD-S01-Q001
  subjectId: SubjectId;
  chapterId: string;
  setId: number; // 1 to 10
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
}

export interface NumericalProblem {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  topic: string;
  question: string;
  givenData: string[];
  formula: string;
  stepByStepSolution: string[];
  finalAnswer: string;
  difficulty: QuestionDifficulty;
}

export interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  variables: string;
  application: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  content: string;
  subpoints?: string[];
  keyTakeaway?: string;
  example?: string;
}

export interface ChapterNotes {
  chapterId: string;
  chapterName: string;
  subjectId: SubjectId;
  introduction: string;
  concepts: ConceptItem[];
  definitions: { term: string; definition: string }[];
  formulas: FormulaItem[];
  shortTricks: string[];
  examTips: string[];
  importantQuestions: { question: string; answer: string; marks: number }[];
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  subjectId: SubjectId;
  chapterId: string;
  setNumber: number;
  timestamp: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  score: number;
  percentage: number;
  accuracy: number;
  timeSpentSeconds: number;
  strongAreas: string[];
  weakAreas: string[];
  questionResults: {
    questionId: string;
    questionText: string;
    options: string[];
    userAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
    topic: string;
    difficulty: QuestionDifficulty;
  }[];
}

export interface Bookmark {
  id: string;
  type: 'note' | 'question' | 'formula' | 'numerical';
  title: string;
  subtitle: string;
  targetId: string;
  chapterId: string;
  subjectId: SubjectId;
  createdAt: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  classGrade: string;
  board: string;
  avatar: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  dailyChallengeCompleted: boolean;
  completedChapters: string[]; // chapter IDs
  recentViewedChapters: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: number;
  progress: number; // 0 to 100
}

export interface DailyChallenge {
  date: string;
  title: string;
  subject: string;
  chapter: string;
  totalQuestions: number;
  durationMinutes: number;
  xpReward: number;
  questions: Question[];
  isCompleted: boolean;
  score?: number;
}
