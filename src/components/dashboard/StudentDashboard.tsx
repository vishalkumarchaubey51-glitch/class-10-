import React from 'react';
import { StudentProfile, TestAttempt, Chapter, Subject } from '../../types';
import { storageService } from '../../services/storageService';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from '../../data/syllabusData';
import {
  Flame,
  Zap,
  Award,
  CheckCircle2,
  TrendingUp,
  AlertOctagon,
  Clock,
  ArrowRight,
  BookOpen,
  Brain,
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';

interface StudentDashboardProps {
  profile: StudentProfile;
  onOpenChapter: (chapterId: string) => void;
  onViewResult: (attempt: TestAttempt) => void;
  onRetakeTest: (chapterId: string, setNumber: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  onOpenChapter,
  onViewResult,
  onRetakeTest,
}) => {
  const attempts = storageService.getTestAttempts();
  const badges = storageService.getBadges();
  const allChapters = storageService.getChapters();

  // Aggregate stats
  const testsAttempted = attempts.length;
  const questionsSolved = attempts.reduce((acc, a) => acc + a.totalQuestions, 0);
  const totalCorrect = attempts.reduce((acc, a) => acc + a.correctAnswers, 0);
  const avgScore = testsAttempted > 0 ? Math.round(totalCorrect / testsAttempted) : 0;
  const avgAccuracy =
    testsAttempted > 0
      ? Math.round(
          attempts.reduce((acc, a) => acc + a.accuracy, 0) / testsAttempted
        )
      : 0;

  // Weak topics aggregator
  const weakTopicsSet = new Set<string>();
  attempts.forEach((a) => {
    a.weakAreas.forEach((w) => weakTopicsSet.add(w));
  });
  const weakTopicsList = Array.from(weakTopicsSet).slice(0, 4);

  // Subject-wise progress
  const subjectProgress = INITIAL_SUBJECTS.map((subj) => {
    const chaptersOfSubj = allChapters.filter((c) => c.subjectId === subj.id);
    const completedCount = chaptersOfSubj.filter((c) => c.isCompleted).length;
    const pct = chaptersOfSubj.length > 0 ? Math.round((completedCount / chaptersOfSubj.length) * 100) : 0;
    return {
      ...subj,
      completedChapters: completedCount,
      percentage: pct,
    };
  });

  // Recently accessed chapters
  const recentChapters = allChapters.filter((c) =>
    profile.recentViewedChapters.includes(c.id)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900/60 via-slate-900 to-indigo-900/40 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{profile.avatar}</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, {profile.name}! 👋
              </h1>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              You are preparing for <strong>{profile.classGrade} {profile.board}</strong>.
              Keep up your streak and master Class 10 chapter by chapter!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Card */}
            <div className="p-3.5 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-orange-400 font-bold text-xs">
                <Flame className="w-4 h-4 animate-bounce" /> Streak
              </div>
              <span className="text-2xl font-black text-white mt-1 block">
                {profile.streakDays} <span className="text-xs text-orange-400">Days</span>
              </span>
            </div>

            {/* Total XP Card */}
            <div className="p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1 text-indigo-300 font-bold text-xs">
                <Zap className="w-4 h-4" /> Total XP
              </div>
              <span className="text-2xl font-black text-white mt-1 block">
                {profile.xp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Tests Attempted</span>
          <span className="text-2xl sm:text-3xl font-black text-white block">
            {testsAttempted}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Real Board Simulation
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Questions Solved</span>
          <span className="text-2xl sm:text-3xl font-black text-white block">
            {questionsSolved}
          </span>
          <span className="text-[11px] text-brand-400 font-semibold">
            Across 10 Sets Engine
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Average Score</span>
          <span className="text-2xl sm:text-3xl font-black text-white block">
            {avgScore} <span className="text-sm font-semibold text-slate-400">/ 50</span>
          </span>
          <span className="text-[11px] text-indigo-400 font-semibold">
            {Math.round((avgScore / 50) * 100)}% Mean Performance
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Overall Accuracy</span>
          <span className="text-2xl sm:text-3xl font-black text-white block">
            {avgAccuracy}%
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Target: 90%+ for Boards
          </span>
        </div>
      </div>

      {/* Main Row: Subject-wise Progress & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-Wise Progress (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-400" /> Subject-Wise Syllabus Progress
            </h3>
            <span className="text-xs text-slate-400">Class 10 NCERT 2025</span>
          </div>

          <div className="space-y-4">
            {subjectProgress.map((s) => (
              <div key={s.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{s.name}</span>
                  <span className="text-slate-400 font-semibold">
                    {s.completedChapters} / {s.chaptersCount} Chapters ({s.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${s.percentage}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics to Improve (1 Col) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertOctagon className="w-5 h-5" /> AI Diagnostic: Weak Topics
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Based on your recent test sets, these topics require focused revision:
          </p>

          <div className="space-y-2.5">
            {weakTopicsList.length > 0 ? (
              weakTopicsList.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200 flex items-center justify-between"
                >
                  <span className="font-medium truncate mr-2">{topic}</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 shrink-0">
                    Needs Practice
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300">
                Great job! No major weak topics detected. Maintain your high accuracy!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-400" /> Continue Learning
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentChapters.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenChapter(c.id)}
              className="group cursor-pointer p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-brand-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-400 uppercase">
                  {c.subjectId}
                </span>
                <span className="text-slate-400">{c.estimatedHours}h study</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                {c.name}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-400">
                <span>Resume chapter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tests Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" /> Recent Test Attempts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 uppercase font-bold text-slate-400 text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Test Series Name</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {attempts.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {a.testTitle}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-400">
                      {a.score} / {a.totalQuestions}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{a.accuracy}%</td>
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(a.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onViewResult(a)}
                      className="px-2.5 py-1 rounded-lg bg-brand-600/20 hover:bg-brand-600/40 text-brand-300 font-semibold"
                    >
                      View Result
                    </button>
                    <button
                      onClick={() => onRetakeTest(a.chapterId, a.setNumber)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      Retake
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gamification Badges Showcase */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Unlockable Achievement Badges
          </h3>
          <span className="text-xs text-slate-400">Gamified Class 10 Learning</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                b.isUnlocked
                  ? 'bg-slate-800/60 border-amber-500/40 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="text-3xl">{b.icon}</div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{b.title}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-2">{b.description}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${b.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
