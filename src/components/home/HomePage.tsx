import React from 'react';
import { Subject } from '../../types';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { Subject3DCard } from '../3d/Subject3DCard';
import {
  Sparkles,
  BookOpen,
  Brain,
  Hash,
  FileCheck,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Flame,
  Zap
} from 'lucide-react';

interface HomePageProps {
  subjects: Subject[];
  onSelectSubject: (subjectId: string) => void;
  onStartLearning: () => void;
  onTakeTest: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  subjects,
  onSelectSubject,
  onStartLearning,
  onTakeTest,
}) => {
  return (
    <div className="space-y-20 pb-12 animate-in fade-in duration-300">
      {/* 3D Hero Section */}
      <section className="relative pt-6 sm:pt-10 lg:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen 3D EdTech Platform for Class 10</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                Master Class 10.{' '}
                <span className="text-gradient block sm:inline">
                  One Chapter at a Time.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Notes, MCQs, Numericals and Test Series — Everything you need for Class 10 CBSE &
                NCERT board examination excellence. Built with 500 MCQs per chapter across 10 timed sets.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartLearning}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all duration-300"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onTakeTest}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" /> Take a Test
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>500 MCQs per chapter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step-by-Step Numericals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% NCERT Aligned</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Canvas Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full relative">
                {/* 3D WebGL Canvas */}
                <Hero3DCanvas />

                {/* Floating Overlay Badges */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl glass-panel text-xs flex items-center gap-2.5 shadow-xl animate-float-slow">
                  <span className="text-xl">📚</span>
                  <div>
                    <span className="font-bold text-white block">Formulas & Notes</span>
                    <span className="text-[10px] text-brand-400">Class 10 CBSE</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-2 p-3 rounded-2xl glass-panel text-xs flex items-center gap-2.5 shadow-xl animate-float-slow" style={{ animationDelay: '2s' }}>
                  <span className="text-xl">🧠</span>
                  <div>
                    <span className="font-bold text-white block">10 Sets Engine</span>
                    <span className="text-[10px] text-emerald-400">500 MCQs / Chapter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore 5 Core Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              CBSE Class 10 Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Explore Subjects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Click on any subject to enter its dedicated 3D chapter dashboard with notes, numericals, and 50-Q tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Subject3DCard
              key={subject.id}
              subject={subject}
              onClick={() => onSelectSubject(subject.id)}
            />
          ))}
        </div>
      </section>

      {/* Why RankRise 10? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Built for Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why RankRise 10?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed from the ground up for Class 10 board aspirants seeking depth, speed, and real exam confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Chapter-wise Learning',
                desc: 'Structured NCERT syllabus breakdown with formula cheatsheets and definitions.',
                color: 'text-blue-400',
              },
              {
                icon: Brain,
                title: '500+ Questions per Chapter',
                desc: '10 standardized 50-question sets per chapter, covering conceptual, formula, and case questions.',
                color: 'text-emerald-400',
              },
              {
                icon: FileCheck,
                title: 'Smart Test Series',
                desc: 'Live countdown timers, question palette navigation, and instant auto-evaluation.',
                color: 'text-purple-400',
              },
              {
                icon: Hash,
                title: 'Detailed Numerical Solutions',
                desc: 'Step-by-step problem solver for Science and Mathematics with "Show Solution" toggle.',
                color: 'text-amber-400',
              },
              {
                icon: BarChart3,
                title: 'Performance Tracking',
                desc: 'Circular animated score gauges, accuracy metrics, and AI-driven weak topic detection.',
                color: 'text-cyan-400',
              },
              {
                icon: Award,
                title: 'Exam-focused Preparation',
                desc: 'Model marking schemes, previous year high-yield questions, and board exam tips.',
                color: 'text-rose-400',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-850/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Simple 6-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How It Works</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Select Subject', desc: 'Maths, Science, SST, English, Hindi' },
            { step: '02', title: 'Select Chapter', desc: 'NCERT official syllabus tree' },
            { step: '03', title: 'Study Notes', desc: 'Formulas, definitions, tips' },
            { step: '04', title: 'Practice Questions', desc: 'Solve step-by-step numericals' },
            { step: '05', title: 'Take 50-Q Test', desc: 'Timed examination with timer' },
            { step: '06', title: 'Analyze Result', desc: 'Diagnose weak areas & solutions' },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 relative group hover:border-brand-500/50 transition-all"
            >
              <span className="text-2xl font-black text-brand-500/40 group-hover:text-brand-400 transition-colors">
                {s.step}
              </span>
              <h4 className="text-xs font-bold text-white">{s.title}</h4>
              <p className="text-[11px] text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-purple-950 border border-brand-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Start Your Class 10 Preparation Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Join thousands of Class 10 students preparing for CBSE board examinations with RankRise 10.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartLearning}
                className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                Launch RankRise 10 Now →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
