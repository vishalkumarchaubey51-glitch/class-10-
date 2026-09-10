import React from 'react';
import { Chapter, Subject } from '../../types';
import { storageService } from '../../services/storageService';
import {
  BookOpen,
  Brain,
  Hash,
  FileCheck,
  Star,
  BarChart3,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

interface ChapterDashboardProps {
  chapter: Chapter;
  subject?: Subject;
  onBack: () => void;
  onSelectAction: (action: 'notes' | 'mcq' | 'numericals' | 'test-series' | 'important' | 'performance') => void;
}

export const ChapterDashboard: React.FC<ChapterDashboardProps> = ({
  chapter,
  subject,
  onBack,
  onSelectAction,
}) => {
  const profile = storageService.getProfile();
  const isCompleted = profile.completedChapters.includes(chapter.id);
  const attempts = storageService.getTestAttempts().filter((a) => a.chapterId === chapter.id);
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : chapter.bestScore || 0;

  const actions = [
    {
      id: 'notes',
      title: 'Study Notes',
      subtitle: 'Formulas, definitions, shortcuts & printable PDF notes',
      icon: BookOpen,
      color: '#3b82f6',
      badge: `${chapter.formulasCount} Formulas`,
      gradient: 'from-blue-600/20 via-blue-900/30 to-slate-900',
    },
    {
      id: 'mcq',
      title: 'MCQ Practice (500 MCQs)',
      subtitle: '10 exhaustive sets with 50 questions each',
      icon: Brain,
      color: '#10b981',
      badge: '10 Sets × 50 Qs',
      gradient: 'from-emerald-600/20 via-emerald-900/30 to-slate-900',
    },
    {
      id: 'numericals',
      title: 'Numerical Practice',
      subtitle: 'Step-by-step problem solver with "Show Solution" toggle',
      icon: Hash,
      color: '#f59e0b',
      badge: `${chapter.numericalCount} Problems`,
      gradient: 'from-amber-600/20 via-amber-900/30 to-slate-900',
    },
    {
      id: 'test-series',
      title: 'Chapter Test Series',
      subtitle: 'Timed examination with question palette and instant analysis',
      icon: FileCheck,
      color: '#8b5cf6',
      badge: 'Board Exam Pattern',
      gradient: 'from-purple-600/20 via-purple-900/30 to-slate-900',
    },
    {
      id: 'important',
      title: 'Important & PYQ Questions',
      subtitle: 'Previous 10 years CBSE board questions with marking criteria',
      icon: Star,
      color: '#ec4899',
      badge: 'High-Yield Board',
      gradient: 'from-pink-600/20 via-pink-900/30 to-slate-900',
    },
    {
      id: 'performance',
      title: 'Chapter Performance',
      subtitle: 'Review recent attempts, accuracy percentage, and weak topics',
      icon: BarChart3,
      color: '#06b6d4',
      badge: `Best: ${bestScore}/50`,
      gradient: 'from-cyan-600/20 via-cyan-900/30 to-slate-900',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subject
        </button>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" /> Completed
            </span>
          )}
          <span className="text-xs text-slate-400">
            Est. Study Time: <strong>{chapter.estimatedHours} Hours</strong>
          </span>
        </div>
      </div>

      {/* 3D Chapter Hero Banner */}
      <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-[#101524] to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="ambient-glow -top-24 -left-24 w-96 h-96 bg-brand-500/20" />
        <div className="ambient-glow -bottom-24 -right-24 w-96 h-96 bg-purple-500/20" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30 uppercase">
              Chapter {chapter.chapterNumber} • {chapter.subjectId}
            </span>
            <span className="text-xs text-slate-400">NCERT Class 10 Syllabus</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {chapter.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {chapter.description}
          </p>

          {/* Chapter Topics Tags */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Key NCERT Topics Covered:
            </span>
            <div className="flex flex-wrap gap-2">
              {chapter.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs border border-slate-700/80 hover:border-slate-600 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Total Questions</span>
              <span className="text-lg font-bold text-white">500 MCQs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Question Sets</span>
              <span className="text-lg font-bold text-emerald-400">10 Sets (50 Q each)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Numericals</span>
              <span className="text-lg font-bold text-amber-400">{chapter.numericalCount} Problems</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Your Best Score</span>
              <span className="text-lg font-bold text-brand-300">{bestScore}/50</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Interactive 3D Action Cards */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Select Study Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                onClick={() => onSelectAction(act.id as any)}
                className="group relative cursor-pointer rounded-2xl p-6 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Glow */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity"
                  style={{ backgroundColor: act.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${act.color}25, ${act.color}45)`,
                        color: act.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {act.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {act.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Launch module</span>
                  <span
                    className="group-hover:translate-x-1 transition-transform"
                    style={{ color: act.color }}
                  >
                    Open →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
