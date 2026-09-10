import React from 'react';
import { Chapter, TestAttempt } from '../../types';
import { storageService } from '../../services/storageService';
import { X, Play, CheckCircle2, Clock, Award, Sparkles, BookOpen } from 'lucide-react';

interface SetSelectorModalProps {
  isOpen: boolean;
  chapter: Chapter;
  onClose: () => void;
  onSelectSet: (setNumber: number) => void;
}

export const SetSelectorModal: React.FC<SetSelectorModalProps> = ({
  isOpen,
  chapter,
  onClose,
  onSelectSet,
}) => {
  if (!isOpen) return null;

  const pastAttempts = storageService.getTestAttempts();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                10 MCQ Sets Engine (500 Questions)
              </span>
              <span className="text-xs text-slate-400">Class 10 CBSE Standard</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {chapter.name} — MCQ Sets
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select any of the 10 sets below. Each set includes exactly 50 unique questions, timed simulation, and full answer explanations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 10 Sets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Array.from({ length: 10 }, (_, i) => {
            const setNum = i + 1;
            const setPad = String(setNum).padStart(2, '0');
            const attempt = pastAttempts.find(
              (a) => a.chapterId === chapter.id && a.setNumber === setNum
            );

            return (
              <div
                key={setNum}
                onClick={() => {
                  onSelectSet(setNum);
                  onClose();
                }}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/50 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 text-brand-400 font-bold flex items-center justify-center border border-slate-700 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-md">
                    {setPad}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                      Set {setPad} — 50 Questions
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 50 Mins
                      </span>
                      <span>•</span>
                      <span>50 Marks</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {attempt ? (
                    <div>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {attempt.score}/50
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {attempt.percentage}%
                      </span>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600/20 text-brand-300 group-hover:bg-brand-600 group-hover:text-white text-xs font-bold transition-colors">
                      <Play className="w-3 h-3 fill-current" /> Start
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>• 10 Sets × 50 Questions = 500 MCQs per chapter</span>
          <span className="text-brand-400 font-semibold">NCERT Exemplar + Board Syllabus</span>
        </div>
      </div>
    </div>
  );
};
