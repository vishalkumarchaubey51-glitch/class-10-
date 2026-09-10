import React, { useState, useEffect, useRef } from 'react';
import { Question, TestAttempt, Chapter } from '../../types';
import { QuestionPalette } from './QuestionPalette';
import { ConfirmModal } from '../common/ConfirmModal';
import { storageService } from '../../services/storageService';
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, Bookmark, RotateCcw, Send, CheckCircle2 } from 'lucide-react';

interface TestEngineProps {
  testTitle: string;
  chapter: Chapter;
  setNumber: number;
  questions: Question[];
  durationMinutes?: number;
  onFinishTest: (attempt: TestAttempt) => void;
  onCancelTest: () => void;
}

export const TestEngine: React.FC<TestEngineProps> = ({
  testTitle,
  chapter,
  setNumber,
  questions,
  durationMinutes = 50,
  onFinishTest,
  onCancelTest,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitFinal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((i) => i !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const handleSubmitFinal = () => {
    const totalQuestions = questions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattempted = 0;

    const topicScores: Record<string, { correct: number; total: number }> = {};

    const questionResults = questions.map((q, idx) => {
      const userAns = answers[idx] ?? null;
      const isCorrect = userAns === q.correctAnswer;
      if (userAns === null) {
        unattempted++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 };
      }
      topicScores[q.topic].total++;
      if (isCorrect) topicScores[q.topic].correct++;

      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic,
        difficulty: q.difficulty,
      };
    });

    // Identify strong & weak areas
    const strongAreas: string[] = [];
    const weakAreas: string[] = [];
    Object.entries(topicScores).forEach(([topic, stat]) => {
      const pct = (stat.correct / stat.total) * 100;
      if (pct >= 70) strongAreas.push(topic);
      else weakAreas.push(topic);
    });

    const durationSpent = Math.min(
      durationMinutes * 60,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      testId: `${chapter.id}-set${setNumber}`,
      testTitle: `${chapter.name} — Set ${String(setNumber).padStart(2, '0')}`,
      subjectId: chapter.subjectId,
      chapterId: chapter.id,
      setNumber,
      timestamp: Date.now(),
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattempted,
      score: correctCount,
      percentage: Math.round((correctCount / totalQuestions) * 100),
      accuracy:
        correctCount + incorrectCount > 0
          ? Math.round((correctCount / (correctCount + incorrectCount)) * 100 * 10) / 10
          : 0,
      timeSpentSeconds: durationSpent,
      strongAreas: strongAreas.length > 0 ? strongAreas : ['General Concepts'],
      weakAreas: weakAreas.length > 0 ? weakAreas : ['Higher Order Problems'],
      questionResults,
    };

    storageService.saveTestAttempt(attempt);
    setShowConfirmModal(false);
    onFinishTest(attempt);
  };

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = answers[currentIndex] !== undefined;
  const isMarked = markedForReview.includes(currentIndex);

  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Top Test Header */}
      <div className="p-4 rounded-2xl glass-panel flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30 uppercase">
              {chapter.subjectId}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {testTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Class 10 CBSE Board Examination Standard
          </p>
        </div>

        {/* Timer & Submit CTA */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm font-bold ${
              timeLeft < 300
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                : 'bg-slate-800 text-brand-300 border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Submit Test
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-brand-500 h-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Grid: Question View + Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Question Meta info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 font-bold text-sm flex items-center justify-center border border-brand-500/30">
                  {currentIndex + 1}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentQ.questionType}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    currentQ.difficulty === 'Easy'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : currentQ.difficulty === 'Medium'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {currentQ.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentQ.id}
                </span>
              </div>
            </div>

            {/* Question Topic */}
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
              Topic: {currentQ.topic}
            </p>

            {/* Question Statement */}
            <div className="text-base sm:text-lg font-medium text-white leading-relaxed whitespace-pre-line min-h-[70px]">
              {currentQ.question}
            </div>

            {/* 4 Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answers[currentIndex] === oIdx;
                const optionLetter = ['A', 'B', 'C', 'D'][oIdx];

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? 'bg-brand-500/20 border-brand-500 text-white shadow-md'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/70 text-slate-300'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                      }`}
                    >
                      {optionLetter}
                    </span>
                    <span className="text-sm leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions for current Question */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReview}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    isMarked
                      ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {isMarked ? 'Marked for Review' : 'Mark for Review'}
                </button>

                {isAnswered && (
                  <button
                    onClick={handleClearAnswer}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear Answer
                  </button>
                )}
              </div>

              {/* Prev / Next navigation */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() =>
                    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
                  }
                  className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white shadow-md transition-all"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Question Palette & Navigation Panel */}
        <div className="space-y-4">
          <QuestionPalette
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            markedForReview={markedForReview}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider">Exam Shortcuts</h5>
            <p>• Click any question square to jump directly.</p>
            <p>• Answers are stored automatically in memory.</p>
            <p>• Use "Mark for Review" to flag doubts before submission.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal to prevent accidental submission */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSubmitFinal}
        title="Submit Class 10 Test Series"
        message="Are you sure you want to submit your answers? You will immediately receive a detailed performance analysis with solutions and explanations."
        stats={{
          answered: answeredCount,
          unanswered: questions.length - answeredCount,
          markedForReview: markedForReview.length,
          total: questions.length,
        }}
      />
    </div>
  );
};
