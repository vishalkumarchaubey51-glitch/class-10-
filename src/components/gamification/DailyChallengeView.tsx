import React, { useState, useEffect } from 'react';
import { Question } from '../../types';
import { getRandomQuestions } from '../../data/questionBankEngine';
import { storageService } from '../../services/storageService';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Zap, CheckCircle2, Award, ArrowLeft, Send } from 'lucide-react';

interface DailyChallengeViewProps {
  onBack: () => void;
  onDone: () => void;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({ onBack, onDone }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Generate 10 mixed questions for today's challenge
    const qList = getRandomQuestions('math-quadratic-equations', 10);
    setQuestions(qList);
  }, []);

  useEffect(() => {
    if (!hasStarted || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, isCompleted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });
    setFinalScore(score);
    setIsCompleted(true);

    // Award bonus XP
    const awardedXP = score * 15 + 100; // 100 completion bonus
    storageService.addXP(awardedXP);

    const profile = storageService.getProfile();
    profile.dailyChallengeCompleted = true;
    storageService.saveProfile(profile);

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Zap className="w-3.5 h-3.5" /> +250 XP Reward
          </span>
        </div>
      </div>

      {/* Intro card if not started */}
      {!hasStarted && !isCompleted && (
        <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 mx-auto flex items-center justify-center text-3xl shadow-lg">
            ⚡
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Daily Class 10 Blitz
            </span>
            <h1 className="text-3xl font-black text-white">Today's Daily Challenge</h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Test your speed and board readiness with 10 handpicked questions across Class 10 NCERT in 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <Clock className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <strong>10 Minutes</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <strong>10 Questions</strong>
            </div>
          </div>

          <button
            onClick={() => setHasStarted(true)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all"
          >
            Start Today's Challenge Now
          </button>
        </div>
      )}

      {/* Quiz Screen */}
      {hasStarted && !isCompleted && currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-amber-400 bg-amber-500/15 px-3 py-1 rounded-xl border border-amber-500/30">
              <Clock className="w-4 h-4" /> {formatTimer(timeLeft)}
            </div>
          </div>

          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQ.question}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = answers[currentIndex] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center gap-3 ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-white'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-slate-900 text-slate-300 font-bold flex items-center justify-center shrink-0">
                    {['A', 'B', 'C', 'D'][oIdx]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((p) => p + 1)}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/25"
              >
                <Send className="w-3.5 h-3.5" /> Submit Challenge
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion Result Screen */}
      {isCompleted && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl border border-emerald-500/40">
            🎉
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Daily Challenge Completed!</h2>
            <p className="text-xs text-slate-400 mt-1">You solved today's Class 10 lightning quiz.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 max-w-sm mx-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Score:</span>
              <span className="font-bold text-emerald-400">{finalScore} / 10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">XP Earned:</span>
              <span className="font-bold text-indigo-400">+{finalScore * 15 + 100} XP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Streak Updated:</span>
              <span className="font-bold text-orange-400">6 Days 🔥</span>
            </div>
          </div>

          <button
            onClick={onDone}
            className="px-8 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white"
          >
            Go to Student Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
