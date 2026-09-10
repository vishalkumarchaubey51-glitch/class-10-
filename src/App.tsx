import React, { useState, useEffect } from 'react';
import { Subject, Chapter, TestAttempt, StudentProfile } from './types';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from './data/syllabusData';
import { getChapterNotes } from './data/sampleNotes';
import { getQuestionsForChapterAndSet, getRandomQuestions } from './data/questionBankEngine';
import { storageService } from './services/storageService';

// Layout
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';

// Pages & Views
import { HomePage } from './components/home/HomePage';
import { SubjectPage } from './components/study/SubjectPage';
import { ChapterDashboard } from './components/study/ChapterDashboard';
import { NotesViewer } from './components/study/NotesViewer';
import { NumericalSolver } from './components/study/NumericalSolver';
import { TestEngine } from './components/test/TestEngine';
import { ResultView } from './components/test/ResultView';
import { TestSeriesHub } from './components/test/TestSeriesHub';
import { DailyChallengeView } from './components/gamification/DailyChallengeView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { BookmarksView } from './components/dashboard/BookmarksView';
import { ProfileView } from './components/dashboard/ProfileView';
import { AdminPanel } from './components/admin/AdminPanel';

// Modals
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { SetSelectorModal } from './components/test/SetSelectorModal';

export function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [activeSubjectId, setActiveSubjectId] = useState<string>('mathematics');
  const [activeChapterId, setActiveChapterId] = useState<string>('math-quadratic-equations');
  const [activeSetNumber, setActiveSetNumber] = useState<number>(1);
  const [activeTestTitle, setActiveTestTitle] = useState<string>('Quadratic Equations — Set 01');
  const [activeAttempt, setActiveAttempt] = useState<TestAttempt | null>(null);

  // Profile & State
  const [profile, setProfile] = useState<StudentProfile>(() => storageService.getProfile());
  const [allChapters, setAllChapters] = useState<Chapter[]>(() => storageService.getChapters());
  const [searchOpen, setSearchOpen] = useState(false);
  const [setSelectorOpen, setSetSelectorOpen] = useState(false);

  // Sync scroll on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, activeSubjectId, activeChapterId]);

  // Keep state updated
  const refreshAppData = () => {
    setProfile(storageService.getProfile());
    setAllChapters(storageService.getChapters());
  };

  // Navigators
  const handleNavigate = (view: string, param?: any) => {
    if (view === 'subject' && param) {
      setActiveSubjectId(param);
      setActiveView('subject');
    } else if (view === 'chapter' && param) {
      setActiveChapterId(param);
      setActiveView('chapter');
    } else {
      setActiveView(view);
    }
  };

  const handleSelectSubject = (subjId: string) => {
    setActiveSubjectId(subjId);
    setActiveView('subject');
  };

  const handleSelectChapter = (chId: string) => {
    setActiveChapterId(chId);
    // Mark as recently viewed
    const prof = storageService.getProfile();
    prof.recentViewedChapters = [chId, ...prof.recentViewedChapters.filter((id) => id !== chId)].slice(0, 5);
    storageService.saveProfile(prof);
    setProfile(prof);
    setActiveView('chapter');
  };

  const handleStartSetTest = (chId: string, setNum: number, title?: string) => {
    setActiveChapterId(chId);
    setActiveSetNumber(setNum);
    const chapter = allChapters.find((c) => c.id === chId) || allChapters[0];
    setActiveTestTitle(title || `${chapter.name} — Set ${String(setNum).padStart(2, '0')}`);
    setActiveView('test');
  };

  const currentSubject = INITIAL_SUBJECTS.find((s) => s.id === activeSubjectId) || INITIAL_SUBJECTS[0];
  const currentChapter = allChapters.find((c) => c.id === activeChapterId) || allChapters[0];
  const currentNotes = getChapterNotes(currentChapter.id);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {/* VIEW 1: Home Landing Page */}
        {activeView === 'home' && (
          <HomePage
            subjects={INITIAL_SUBJECTS}
            onSelectSubject={handleSelectSubject}
            onStartLearning={() => {
              setActiveSubjectId('mathematics');
              setActiveView('subject');
            }}
            onTakeTest={() => setActiveView('test-series')}
          />
        )}

        {/* VIEW 2: Subjects Catalog */}
        {activeView === 'subjects' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Class 10 CBSE Curriculum
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white">Select a Subject</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Choose from Mathematics, Science, Social Science, English, or Hindi to access NCERT chapter notes, formulas, and 500-question test sets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_SUBJECTS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelectSubject(s.id)}
                  className="group cursor-pointer p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-brand-300">
                      {s.code}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{s.chaptersCount} Chapters</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400">
                    <span>View all chapters</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Specific Subject Page */}
        {activeView === 'subject' && (
          <SubjectPage
            subject={currentSubject}
            chapters={allChapters.filter((c) => c.subjectId === currentSubject.id)}
            onBack={() => setActiveView('subjects')}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {/* VIEW 4: Chapter 3D Dashboard */}
        {activeView === 'chapter' && (
          <ChapterDashboard
            chapter={currentChapter}
            subject={currentSubject}
            onBack={() => setActiveView('subject')}
            onSelectAction={(action) => {
              if (action === 'notes') setActiveView('chapter-notes');
              else if (action === 'mcq') setSetSelectorOpen(true);
              else if (action === 'numericals') setActiveView('chapter-numericals');
              else if (action === 'test-series') {
                handleStartSetTest(currentChapter.id, 1, `${currentChapter.name} — Board Exam Test Series`);
              } else if (action === 'important') setActiveView('chapter-notes');
              else if (action === 'performance') setActiveView('dashboard');
            }}
          />
        )}

        {/* VIEW 5: Notes & Formulas */}
        {activeView === 'chapter-notes' && (
          <NotesViewer
            notes={currentNotes}
            onBack={() => setActiveView('chapter')}
            onStartMCQ={() => setSetSelectorOpen(true)}
            onStartNumericals={() => setActiveView('chapter-numericals')}
          />
        )}

        {/* VIEW 6: Numerical Practice */}
        {activeView === 'chapter-numericals' && (
          <NumericalSolver
            chapter={currentChapter}
            onBack={() => setActiveView('chapter')}
          />
        )}

        {/* VIEW 7: Timed 50-Q Test Engine */}
        {activeView === 'test' && (
          <TestEngine
            testTitle={activeTestTitle}
            chapter={currentChapter}
            setNumber={activeSetNumber}
            questions={getQuestionsForChapterAndSet(currentChapter.id, activeSetNumber)}
            durationMinutes={50}
            onFinishTest={(attempt) => {
              setActiveAttempt(attempt);
              refreshAppData();
              setActiveView('result');
            }}
            onCancelTest={() => setActiveView('chapter')}
          />
        )}

        {/* VIEW 8: Test Result & Diagnostic Review */}
        {activeView === 'result' && activeAttempt && (
          <ResultView
            attempt={activeAttempt}
            onRetake={() => {
              setActiveView('test');
            }}
            onBackToChapter={() => setActiveView('chapter')}
            onPracticeSimilar={(topic) => {
              setActiveView('chapter-numericals');
            }}
          />
        )}

        {/* VIEW 9: Test Series Hub */}
        {activeView === 'test-series' && (
          <TestSeriesHub
            onStartTest={(chId, setNum, title) => {
              handleStartSetTest(chId, setNum, title);
            }}
          />
        )}

        {/* VIEW 10: Daily Challenge */}
        {activeView === 'daily-challenge' && (
          <DailyChallengeView
            onBack={() => setActiveView('home')}
            onDone={() => {
              refreshAppData();
              setActiveView('dashboard');
            }}
          />
        )}

        {/* VIEW 11: Student Dashboard */}
        {activeView === 'dashboard' && (
          <StudentDashboard
            profile={profile}
            onOpenChapter={handleSelectChapter}
            onViewResult={(attempt) => {
              setActiveAttempt(attempt);
              setActiveView('result');
            }}
            onRetakeTest={(chId, setNum) => handleStartSetTest(chId, setNum)}
          />
        )}

        {/* VIEW 12: Bookmarks */}
        {activeView === 'bookmarks' && (
          <BookmarksView
            onBack={() => setActiveView('dashboard')}
            onOpenChapter={handleSelectChapter}
          />
        )}

        {/* VIEW 13: Student Profile */}
        {activeView === 'profile' && (
          <ProfileView
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            onBack={() => setActiveView('dashboard')}
          />
        )}

        {/* VIEW 14: Admin Panel */}
        {activeView === 'admin' && (
          <AdminPanel
            onBack={() => {
              refreshAppData();
              setActiveView('home');
            }}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectChapter={(chId) => {
          handleSelectChapter(chId);
        }}
        onSelectSection={(chId, section) => {
          setActiveChapterId(chId);
          if (section === 'notes') setActiveView('chapter-notes');
          else if (section === 'mcq') setSetSelectorOpen(true);
          else if (section === 'numericals') setActiveView('chapter-numericals');
        }}
      />

      {/* 10-Set Selector Modal */}
      <SetSelectorModal
        isOpen={setSelectorOpen}
        chapter={currentChapter}
        onClose={() => setSetSelectorOpen(false)}
        onSelectSet={(setNum) => {
          handleStartSetTest(currentChapter.id, setNum);
        }}
      />

      {/* Desktop & Mobile Navigation Bottom Bar */}
      <MobileBottomNav activeView={activeView} onNavigate={handleNavigate} />

      {/* Platform Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
