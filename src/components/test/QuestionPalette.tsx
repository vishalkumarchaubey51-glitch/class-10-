import React from 'react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, number>;
  markedForReview: number[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  markedForReview,
  onSelectQuestion,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Question Palette ({totalQuestions})
        </h4>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>In Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-700" />
          <span>Unattempted</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-5 lg:grid-cols-10 gap-1.5 max-h-60 overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = answers[i] !== undefined;
          const isMarked = markedForReview.includes(i);
          const isCurrent = currentIndex === i;

          let bgClass = 'bg-slate-800/80 text-slate-300 border-slate-700/60';
          if (isMarked) {
            bgClass = 'bg-yellow-500/25 text-yellow-300 border-yellow-500/60 font-bold';
          } else if (isAnswered) {
            bgClass = 'bg-emerald-600/30 text-emerald-300 border-emerald-500/60 font-bold';
          }

          if (isCurrent) {
            bgClass += ' ring-2 ring-brand-400 scale-105';
          }

          return (
            <button
              key={i}
              onClick={() => onSelectQuestion(i)}
              className={`h-8 rounded-lg text-xs font-medium border transition-all flex items-center justify-center hover:scale-105 ${bgClass}`}
              title={`Jump to Question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
