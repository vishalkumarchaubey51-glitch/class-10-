import React, { useState } from 'react';
import { NumericalProblem, Chapter } from '../../types';
import { getNumericalsForChapter } from '../../data/sampleNumericals';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface NumericalSolverProps {
  chapter: Chapter;
  onBack: () => void;
}

export const NumericalSolver: React.FC<NumericalSolverProps> = ({ chapter, onBack }) => {
  const numericals = getNumericalsForChapter(chapter.id);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const toggleReveal = (id: string) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((item) => item !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const toggleSolved = (id: string) => {
    if (solvedIds.includes(id)) {
      setSolvedIds(solvedIds.filter((item) => item !== id));
    } else {
      setSolvedIds([...solvedIds, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Chapter
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Solved:</span>
          <span className="font-bold text-emerald-400">
            {solvedIds.length} of {numericals.length}
          </span>
        </div>
      </div>

      {/* Chapter Numerical Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900/30 via-slate-900 to-indigo-900/30 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            Class 10 Numerical Lab
          </span>
          <span className="text-xs text-slate-400">Step-by-Step Self-Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {chapter.name} — Numerical Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master high-weightage numericals for CBSE Board Exams. Try solving on paper first, then click
          <strong> "Show Solution"</strong> to verify your working steps and final answers.
        </p>
      </div>

      {/* Numericals List */}
      <div className="space-y-6">
        {numericals.map((num, index) => {
          const isRevealed = revealedIds.includes(num.id);
          const isSolved = solvedIds.includes(num.id);

          return (
            <div
              key={num.id}
              className={`p-6 rounded-2xl border transition-all ${
                isSolved
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                    #{index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{num.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      num.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : num.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {num.difficulty}
                  </span>
                  <button
                    onClick={() => toggleSolved(num.id)}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                      isSolved
                        ? 'bg-emerald-500/30 text-emerald-300'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Mark as solved"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-medium text-white mb-4 leading-relaxed">
                {num.question}
              </p>

              {/* Given Data Box */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 mb-4 text-xs space-y-1.5">
                <span className="font-bold text-brand-400 block">Given Data & Parameters:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {num.givenData.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Applicable Formula (always visible as reference) */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 font-mono text-xs text-brand-300 border border-slate-800 mb-4">
                <span className="font-bold text-slate-400">Formula:</span>
                <span>{num.formula}</span>
              </div>

              {/* Show / Hide Solution Toggle Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={() => toggleReveal(num.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isRevealed
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-600/20'
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-4 h-4" /> Hide Solution
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" /> Show Step-by-Step Solution
                    </>
                  )}
                </button>

                {isRevealed && (
                  <span className="text-xs font-semibold text-emerald-400 animate-in fade-in">
                    Full CBSE Working Revealed
                  </span>
                )}
              </div>

              {/* Step-by-step Solution Area */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-in slide-in-from-top-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Working
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                    {num.stepByStepSolution.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 whitespace-pre-line"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  {/* Final Answer Highlight Box */}
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-600/40 text-xs text-emerald-200 font-bold flex items-center justify-between">
                    <span>Final Answer:</span>
                    <span className="text-emerald-400 font-mono text-sm">{num.finalAnswer}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
