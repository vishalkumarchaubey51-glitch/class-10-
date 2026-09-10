import React from 'react';
import { Sparkles, Shield, Heart, Award, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#080b12] text-slate-400 text-sm mt-20 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-xl shadow-lg">
                🎓
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                RankRise <span className="text-brand-400">10</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              India's premier 3D interactive learning ecosystem for Class 10 CBSE & NCERT students.
              Engineered with 500 MCQs per chapter, step-by-step numerical solvers, and high-yield board revision notes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <Shield className="w-3.5 h-3.5" /> 100% NCERT Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold border border-brand-500/20">
                <Award className="w-3.5 h-3.5" /> CBSE 2025 Syllabus
              </span>
            </div>
          </div>

          {/* Subjects Col */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Class 10 Subjects</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('subject', 'mathematics')} className="hover:text-brand-400 transition-colors">
                  Class 10 Mathematics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subject', 'science')} className="hover:text-brand-400 transition-colors">
                  Class 10 Science (Phy/Chem/Bio)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subject', 'social-science')} className="hover:text-brand-400 transition-colors">
                  Class 10 Social Science (SST)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subject', 'english')} className="hover:text-brand-400 transition-colors">
                  Class 10 English Literature
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subject', 'hindi')} className="hover:text-brand-400 transition-colors">
                  Class 10 Hindi (क्षितिज / कृतिका)
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Study Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('test-series')} className="hover:text-brand-400 transition-colors">
                  10-Set MCQ Practice Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('daily-challenge')} className="hover:text-brand-400 transition-colors">
                  Daily 10-Min Speed Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-brand-400 transition-colors">
                  Student Progress Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bookmarks')} className="hover:text-brand-400 transition-colors">
                  My Bookmarks & Formulas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-brand-400 transition-colors">
                  Admin Curriculum Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Future Expansion */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Future Ecosystem</h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700">Class 9</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700">Class 11</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700">Class 12</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700">JEE Main</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700">NEET UG</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-4">
              Architecture engineered for multi-board scalability (ICSE, State Boards).
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 RankRise 10. Built for student excellence in CBSE Board Examinations.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Crafted with modern 3D WebGL, React, and TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};
