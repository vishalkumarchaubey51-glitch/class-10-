import React, { useState } from 'react';
import { Subject, Chapter } from '../../types';
import { storageService } from '../../services/storageService';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  BookOpen,
  Brain,
  Hash,
  Sparkles
} from 'lucide-react';

interface SubjectPageProps {
  subject: Subject;
  chapters: Chapter[];
  onBack: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export const SubjectPage: React.FC<SubjectPageProps> = ({
  subject,
  chapters,
  onBack,
  onSelectChapter,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const profile = storageService.getProfile();

  const filteredChapters = chapters.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const completedCount = chapters.filter((c) =>
    profile.completedChapters.includes(c.id)
  ).length;

  const progressPercentage = chapters.length > 0
    ? Math.round((completedCount / chapters.length) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Subjects
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Chapters:</span>
          <span className="font-bold text-white">
            {completedCount} of {chapters.length} Completed ({progressPercentage}%)
          </span>
        </div>
      </div>

      {/* 3D Subject Portal Hero */}
      <div
        className={`relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r ${subject.bannerGradient} border border-slate-800 shadow-2xl overflow-hidden`}
      >
        <div
          className="ambient-glow -top-24 -right-24 w-96 h-96 opacity-30"
          style={{ backgroundColor: subject.color }}
        />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-bold text-white border border-white/10 uppercase">
              {subject.code} • CBSE Class 10
            </span>
            <span className="text-xs text-slate-300">Official NCERT Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Class 10 {subject.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {subject.description}
          </p>

          {/* Progress bar in banner */}
          <div className="space-y-1.5 pt-2 max-w-md">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Overall Subject Completion</span>
              <span className="font-bold text-white">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: subject.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Chapter Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <h2 className="text-xl font-bold text-white">
          All Chapters ({chapters.length})
        </h2>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search chapters or topics..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Chapter Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChapters.map((chapter) => {
          const isCompleted = profile.completedChapters.includes(chapter.id);

          return (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="group cursor-pointer p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-brand-300 border border-slate-700">
                    Chapter {chapter.chapterNumber}
                  </span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">
                      {chapter.estimatedHours}h Study
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {chapter.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {chapter.description}
                </p>

                {/* Sub-features badges */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Brain className="w-3 h-3 text-emerald-400" /> 500 MCQs (10 Sets)
                  </span>
                  {chapter.numericalCount > 0 && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                      <Hash className="w-3 h-3 text-amber-400" /> {chapter.numericalCount} Numericals
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                    <BookOpen className="w-3 h-3 text-blue-400" /> Notes & Formulas
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300">
                <span>Explore Chapter Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
