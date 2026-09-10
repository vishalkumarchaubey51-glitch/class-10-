import React, { useState, useEffect } from 'react';
import { TestAttempt } from '../../types';
import { CircularProgress } from '../common/CircularProgress';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertOctagon,
  BookOpen
} from 'lucide-react';

interface ResultViewProps {
  attempt: TestAttempt;
  onRetake: () => void;
  onBackToChapter: () => void;
  onPracticeSimilar: (topic: string) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  attempt,
  onRetake,
  onBackToChapter,
  onPracticeSimilar,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  useEffect(() => {
    if (attempt.percentage >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [attempt.percentage]);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  const getPerformanceRating = (pct: number) => {
    if (pct >= 90) return { stars: '⭐⭐⭐⭐⭐', label: 'Outstanding Distinction', color: 'text-emerald-400' };
    if (pct >= 75) return { stars: '⭐⭐⭐⭐', label: 'Very Good Performance', color: 'text-brand-400' };
    if (pct >= 60) return { stars: '⭐⭐⭐', label: 'Good Effort', color: 'text-amber-400' };
    if (pct >= 40) return { stars: '⭐⭐', label: 'Average — Needs Revision', color: 'text-orange-400' };
    return { stars: '⭐', label: 'Needs Immediate Attention', color: 'text-rose-400' };
  };

  const rating = getPerformanceRating(attempt.percentage);

  const filteredQuestions = attempt.questionResults.filter((q) => {
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'incorrect') return !q.isCorrect && q.userAnswer !== null;
    if (filter === 'unattempted') return q.userAnswer === null;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <button
          onClick={onBackToChapter}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Chapter
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Test
          </button>
          <button
            onClick={() => onPracticeSimilar(attempt.weakAreas[0] || 'Quadratic Equations')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Practice Similar Questions
          </button>
        </div>
      </div>

      {/* Main Score & Performance Showcase Dashboard */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Circular Score Gauge */}
          <div className="flex flex-col items-center justify-center text-center">
            <CircularProgress
              score={attempt.score}
              maxScore={attempt.totalQuestions}
              percentage={attempt.percentage}
              size={190}
              strokeWidth={14}
            />
            <div className="mt-4">
              <span className="text-xl tracking-wider">{rating.stars}</span>
              <p className={`text-sm font-bold mt-1 ${rating.color}`}>{rating.label}</p>
            </div>
          </div>

          {/* Key Metrics Stats */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Official Result Card
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {attempt.testTitle}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Completed on {new Date(attempt.timestamp).toLocaleDateString()} at{' '}
                {new Date(attempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-center">
                <span className="text-xs text-slate-400 font-medium block">Correct</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  {attempt.correctAnswers}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-center">
                <span className="text-xs text-slate-400 font-medium block">Incorrect</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">
                  {attempt.incorrectAnswers}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-center">
                <span className="text-xs text-slate-400 font-medium block">Unattempted</span>
                <span className="text-2xl font-black text-slate-400 mt-1 block">
                  {attempt.unattempted}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-center">
                <span className="text-xs text-slate-400 font-medium block">Time Taken</span>
                <span className="text-xl font-black text-indigo-300 mt-1 block">
                  {formatDuration(attempt.timeSpentSeconds)}
                </span>
              </div>
            </div>

            {/* Diagnostic Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" /> Strong Areas
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {attempt.strongAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <AlertOctagon className="w-4 h-4" /> Topics to Improve
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {attempt.weakAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question-Wise In-Depth Review Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Comprehensive Question Review</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review every answer with official NCERT textbook explanations
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({attempt.questionResults.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'correct' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              🟢 Correct ({attempt.correctAnswers})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              🔴 Incorrect ({attempt.incorrectAnswers})
            </button>
            <button
              onClick={() => setFilter('unattempted')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'unattempted' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚪ Unattempted ({attempt.unattempted})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const letter = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {q.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                      </span>
                    ) : q.userAnswer !== null ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect (0)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-400 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                        <HelpCircle className="w-3.5 h-3.5" /> Unattempted
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">{q.questionId}</span>
                  </div>

                  <span className="text-xs font-semibold text-brand-400">{q.topic}</span>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-semibold text-white whitespace-pre-line">
                  {q.questionText}
                </p>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const isUserChoice = q.userAnswer === oIdx;
                    const isRightAnswer = q.correctAnswer === oIdx;

                    let optClass = 'bg-slate-800/40 border-slate-800 text-slate-400';
                    if (isRightAnswer) {
                      optClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isUserChoice && !isRightAnswer) {
                      optClass = 'bg-rose-950/50 border-rose-500 text-rose-200';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${optClass}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-900 text-slate-300 font-bold flex items-center justify-center shrink-0">
                          {letter[oIdx]}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation Callout */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-brand-400 block">Explanation & Conceptual Reason:</span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
