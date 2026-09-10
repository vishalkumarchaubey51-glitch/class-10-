import React, { useState } from 'react';
import { ChapterNotes, Bookmark } from '../../types';
import { storageService } from '../../services/storageService';
import {
  Printer,
  Bookmark as BookmarkIcon,
  CheckCircle2,
  Search,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';

interface NotesViewerProps {
  notes: ChapterNotes;
  onBack: () => void;
  onStartMCQ: () => void;
  onStartNumericals: () => void;
}

export const NotesViewer: React.FC<NotesViewerProps> = ({
  notes,
  onBack,
  onStartMCQ,
  onStartNumericals,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    return storageService.getProfile().completedChapters.includes(notes.chapterId);
  });
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    return storageService.getBookmarks().map((b) => b.targetId);
  });

  const handleToggleComplete = () => {
    const updated = storageService.toggleChapterCompleted(notes.chapterId);
    setIsCompleted(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const handleToggleBookmark = (item: { id: string; name: string; formula?: string; content?: string }) => {
    if (bookmarkedIds.includes(item.id)) {
      storageService.removeBookmark(item.id);
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== item.id));
    } else {
      storageService.addBookmark({
        type: item.formula ? 'formula' : 'note',
        title: item.name,
        subtitle: item.formula || (item.content ? item.content.slice(0, 60) + '...' : ''),
        targetId: item.id,
        chapterId: notes.chapterId,
        subjectId: notes.subjectId,
      });
      setBookmarkedIds([...bookmarkedIds, item.id]);
    }
  };

  const filterText = (text: string) => {
    if (!searchTerm) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Action Bar (no-print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Chapter
        </button>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Print / PDF button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            title="Print or Export Notes to PDF"
          >
            <Printer className="w-3.5 h-3.5" /> Print / PDF
          </button>

          {/* Quick Jump to Numericals */}
          <button
            onClick={onStartNumericals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
          >
            🔢 Practice Numericals
          </button>

          {/* Quick Jump to 500 MCQs */}
          <button
            onClick={onStartMCQ}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            🧠 500 MCQs (10 Sets)
          </button>

          {/* Mark as completed toggle */}
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed ✓' : 'Mark Chapter Completed'}
          </button>
        </div>
      </div>

      {/* Printable Notes Container */}
      <div className="printable-content space-y-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
        {/* Header Title */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-400 border border-brand-500/30">
              Class 10 {notes.subjectId.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">NCERT Comprehensive Notes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {notes.chapterName}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
            {notes.introduction}
          </p>
        </div>

        {/* Local Search within Notes (no-print) */}
        <div className="no-print relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search keywords or topics inside this chapter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Section 1: Core Concepts */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold text-white">1. Important Concepts & Principles</h2>
          </div>

          <div className="space-y-4">
            {notes.concepts
              .filter((c) => filterText(c.title) || filterText(c.content))
              .map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <button
                      onClick={() => handleToggleBookmark({ id: c.id, name: c.title, content: c.content })}
                      className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                      title="Bookmark this concept"
                    >
                      <BookmarkIcon
                        className={`w-4 h-4 ${bookmarkedIds.includes(c.id) ? 'fill-amber-400 text-amber-400' : ''}`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{c.content}</p>

                  {c.subpoints && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-2">
                      {c.subpoints.map((sp, idx) => (
                        <li key={idx}>{sp}</li>
                      ))}
                    </ul>
                  )}

                  {c.example && (
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                      <span className="font-bold text-blue-400 block mb-1">Worked Example:</span>
                      {c.example}
                    </div>
                  )}

                  {c.keyTakeaway && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
                      <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Key Takeaway:</strong> {c.keyTakeaway}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Section 2: Definitions */}
        {notes.definitions && notes.definitions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xl">📖</span>
              <h2 className="text-xl font-bold text-white">2. Essential Definitions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.definitions.map((def, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/60">
                  <h4 className="text-sm font-bold text-brand-300 mb-1">{def.term}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{def.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Formulas & Equations */}
        {notes.formulas && notes.formulas.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xl">📐</span>
              <h2 className="text-xl font-bold text-white">3. Formula Cheatsheet</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.formulas.map((f) => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700 hover:border-brand-500/50 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{f.name}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyFormula(f.id, f.formula)}
                        className="p-1 text-slate-400 hover:text-white rounded"
                        title="Copy formula"
                      >
                        {copiedFormulaId === f.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleToggleBookmark({ id: f.id, name: f.name, formula: f.formula })}
                        className="p-1 text-slate-400 hover:text-amber-400"
                        title="Bookmark formula"
                      >
                        <BookmarkIcon
                          className={`w-3.5 h-3.5 ${bookmarkedIds.includes(f.id) ? 'fill-amber-400 text-amber-400' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-sm font-bold text-brand-300 overflow-x-auto text-center border border-slate-800">
                    {f.formula}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Variables:</strong> {f.variables}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Application:</strong> {f.application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Short Tricks & Exam Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Short Tricks */}
          {notes.shortTricks && notes.shortTricks.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Lightbulb className="w-4 h-4" /> Short Tricks & Memory Hacks
              </div>
              <ul className="space-y-2 text-xs text-amber-200/90 list-disc list-inside">
                {notes.shortTricks.map((trick, i) => (
                  <li key={i}>{trick}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Exam Tips */}
          {notes.examTips && notes.examTips.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" /> CBSE Board Exam Tips & Pitfalls
              </div>
              <ul className="space-y-2 text-xs text-rose-200/90 list-disc list-inside">
                {notes.examTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 5: High-Yield Board Questions */}
        {notes.importantQuestions && notes.importantQuestions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">4. High-Yield Board Exam Questions</h2>
            </div>
            <div className="space-y-4">
              {notes.importantQuestions.map((iq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400">Question {idx + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                      {iq.marks} Marks
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">{iq.question}</p>
                  <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong className="text-emerald-400 block mb-1">Standard CBSE Model Solution:</strong>
                    {iq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
