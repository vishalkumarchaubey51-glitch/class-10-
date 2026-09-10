import React, { useState } from 'react';
import { SubjectId } from '../../types';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from '../../data/syllabusData';
import { storageService } from '../../services/storageService';
import {
  FileCheck,
  Clock,
  Award,
  Play,
  Filter,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  BookOpen
} from 'lucide-react';

interface TestSeriesHubProps {
  onStartTest: (chapterId: string, setNumber: number, title?: string) => void;
}

export const TestSeriesHub: React.FC<TestSeriesHubProps> = ({ onStartTest }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'chapter' | 'subject' | 'full' | 'numerical'
  >('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const pastAttempts = storageService.getTestAttempts();

  // Test cards data
  const testList = [
    {
      id: 'ts-math-quad',
      title: 'Class 10 Maths: Quadratic Equations Standard Test',
      category: 'chapter',
      subject: 'Mathematics',
      subjectId: 'mathematics',
      chapterId: 'math-quadratic-equations',
      setNumber: 1,
      chaptersCovered: 'Ch 4: Quadratic Equations',
      questionsCount: 50,
      duration: '50 Mins',
      difficulty: 'Medium',
      attemptsCount: 1420,
    },
    {
      id: 'ts-sci-light',
      title: 'Class 10 Science: Light Reflection & Refraction Test',
      category: 'chapter',
      subject: 'Science',
      subjectId: 'science',
      chapterId: 'sci-light',
      setNumber: 1,
      chaptersCovered: 'Ch 9: Light',
      questionsCount: 50,
      duration: '50 Mins',
      difficulty: 'Hard',
      attemptsCount: 1890,
    },
    {
      id: 'ts-sci-elec',
      title: 'Class 10 Physics: Electricity Numerical & Circuit Test',
      category: 'numerical',
      subject: 'Science',
      subjectId: 'science',
      chapterId: 'sci-electricity',
      setNumber: 2,
      chaptersCovered: 'Ch 11: Electricity & Circuits',
      questionsCount: 50,
      duration: '50 Mins',
      difficulty: 'Hard',
      attemptsCount: 1250,
    },
    {
      id: 'ts-math-full',
      title: 'Class 10 Mathematics: Full Term 2 Mock Examination',
      category: 'full',
      subject: 'Mathematics',
      subjectId: 'mathematics',
      chapterId: 'math-quadratic-equations',
      setNumber: 3,
      chaptersCovered: 'Full Class 10 Maths (14 Chapters)',
      questionsCount: 50,
      duration: '60 Mins',
      difficulty: 'Hard',
      attemptsCount: 3100,
    },
    {
      id: 'ts-sst-nationalism',
      title: 'Class 10 Social Science: Nationalism Comprehensive Series',
      category: 'subject',
      subject: 'Social Science',
      subjectId: 'social-science',
      chapterId: 'sst-nationalism-europe',
      setNumber: 1,
      chaptersCovered: 'Europe & India Nationalism',
      questionsCount: 50,
      duration: '45 Mins',
      difficulty: 'Medium',
      attemptsCount: 980,
    },
    {
      id: 'ts-eng-lit',
      title: 'Class 10 English: First Flight Literature Mastery Test',
      category: 'subject',
      subject: 'English',
      subjectId: 'english',
      chapterId: 'eng-letter-to-god',
      setNumber: 1,
      chaptersCovered: 'First Flight Literature Prose & Extracts',
      questionsCount: 50,
      duration: '45 Mins',
      difficulty: 'Easy',
      attemptsCount: 840,
    },
  ];

  const filteredTests = testList.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (selectedSubject !== 'all' && t.subjectId !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30 uppercase">
            Official Class 10 Mock Examination Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Class 10 Test Series
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Timed CBSE exam simulations featuring 50 questions per test, live countdown timers,
            question navigation palette, and instant score diagnosis.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Tests' },
            { id: 'chapter', label: 'Chapter Tests' },
            { id: 'subject', label: 'Subject Tests' },
            { id: 'full', label: 'Full Syllabus' },
            { id: 'numerical', label: 'Numerical Tests' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
        >
          <option value="all">All 5 Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
          <option value="social-science">Social Science</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => {
          const attempt = pastAttempts.find((a) => a.chapterId === test.chapterId);
          const bestScore = attempt ? `${attempt.score}/50 (${attempt.percentage}%)` : 'Not Attempted';

          return (
            <div
              key={test.id}
              className="group p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-brand-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-slate-800 text-brand-300 border border-slate-700">
                    {test.subject}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      test.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : test.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                  {test.title}
                </h3>

                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  {test.chaptersCovered}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                  <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800/80 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-400" />
                    <span>{test.questionsCount} Questions</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{test.duration}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 pt-1 flex items-center justify-between">
                  <span>Attempts: <strong>{test.attemptsCount.toLocaleString()}</strong></span>
                  <span className="text-emerald-400 font-semibold">Best: {bestScore}</span>
                </div>
              </div>

              {/* Start button */}
              <div className="pt-5 mt-4 border-t border-slate-800">
                <button
                  onClick={() => onStartTest(test.chapterId, test.setNumber, test.title)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 group-hover:scale-[1.02] transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Start 50-Q Test Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
